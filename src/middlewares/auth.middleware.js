import jwt from "jsonwebtoken";
import { Student } from "../Models/student.js";

const verifyToken = async function (req, res, next) {
  try {
    const token = req.cookies?.accesstoken;
    if (!token) {
      return res.status(401).json({
        message: "Please LogIn",
      });
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await Student.findById(decode._id);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    req.Student = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "auth server failed",
    });
  }
};
export { verifyToken };
