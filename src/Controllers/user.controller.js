import { Student } from "../Models/student.js";

import { uploadCloud } from "../utils/Cloudinary.js";

const refreshTokenGenerate = async (StudentId) => {
  try {
    const student = await Student.findById(StudentId);
    const refreshToken = await student.generateRefreshToken();
    student.refresh_token = refreshToken;
    await student.save({
      validateBeforeSave: false,
    });
    return refreshToken;
  } catch (error) {
    console.log("error in generating refreshToken", error);
  }
};

const accessTokenGenerate = async (StudentId) => {
  try {
    const student = await Student.findById(StudentId);
    const accessToken = await student.generateAccessToken();
    return accessToken;
  } catch (error) {
    console.log("error in generating acessToken", error);
  }
};

const userReg = async (req, res) => {
  try {
    const { firstName, lastName, address, email, password, school, phone } =
      req.body;

    const userCheck = await Student.findOne({ email: email });

    if (userCheck) {
      return res.status(404).json({
        message: "User Already Registered",
      });
    }
    const photo = `public/Student/${req.file.filename}`;

    if (!photo) {
      return res.status(404).json({
        message: "Photo not Found",
      });
    }

    const inCloud = await uploadCloud(photo);

    const createStudent = await Student.create({
      firstName,
      lastName,
      phone,
      address,
      school,
      email,
      password,
      studentPhoto: inCloud.url,
    });

    const createdStudent = await Student.findById(createStudent._id).select(
      "-password -refresh_token"
    );
    if (!createdStudent) {
      return res.status(401).json({
        message: "Student Not Created",
      });
    }

    res.status(201).json({
      message: "Student Sucessfully Created",
      data: createdStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error In UserReg",
      error: error,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email: email });
    if (!user) {
      return res.status(403).json({
        message: "User Not Found",
      });
    }
    const passwordCheck = await user.isPasswordCorrect(password);
    if (!passwordCheck) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const accesstoken = await accessTokenGenerate(user._id);
    const refreshtoken = await refreshTokenGenerate(user._id);
    if (!accesstoken || !refreshtoken) {
      return res.status(404).json({
        message: "Token Not Found",
      });
    }
    const loggedUser = await Student.findById(user._id).select(
      "-password -refresh_token"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("refreshtoken", refreshtoken, options);
    res.cookie("accesstoken", accesstoken, options);
    res.status(200).json({
      message: "User LoggedIn",
      data: loggedUser,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Server Error In UserLogin",
    });
  }
};

const studentFetch = async (req, res) => {
  try {
    const user = await Student.findById(req.Student._id).select(
      "-password -refresh_token"
    );
    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User Fetched",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error in userFetching",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await Student.findById(req.Student._id);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const passwordCheck = await user.isPasswordCorrect(currentPassword);
    if (!passwordCheck) {
      return res.status(403).json({
        message: "Password Doesnt Match",
      });
    }
    user.password = newPassword;
    res.status(200).json({
      message: "Password Changed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error in updating password",
    });
  }
};
export { userReg, userLogin, studentFetch, updatePassword };
