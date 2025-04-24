import { Student } from "../Models/student.js";

const fetchUser = async (req, res) => {
  try {
    const user = await Student.findById(req.Student?._id);
    if (user.isAdmin === false) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 2;
    const lastName = req.query.lastName;

    const userFilter = {};
    if (lastName) {
      userFilter.lastName = lastName;
    }

    const fetchUser = await Student.find(userFilter)
      .select("-password -refresh_token")
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalUser = await Student.countDocuments(userFilter);

    res.status(200).json({
      message: "User Fetched",
      Page: page,
      perPage: perPage,
      total: totalUser,
      user: fetchUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error in fetching User By Admin",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Student.findById(req.Student._id).select(
      "-password -refresh_token"
    );
    if (!user.isAdmin) {
      return res.status(403).json({
        message: "Unauthorized Access",
      });
    }
    const isAdmin = await Student.findById(req.params._id);
    if (isAdmin.isAdmin) {
      return res.status(404).json({
        message: "Admin Cant Be Deleted",
      });
    }
    const deleteuser = await Student.findByIdAndDelete(req.params._id);
    if (!deleteuser) {
      return res.status(401).json({
        messaged: "User Not Deleted",
      });
    }

    res.status(200).json({
      message: "User Successfully Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error in deleting User",
    });
  }
};

export { fetchUser, deleteUser };
