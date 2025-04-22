import Router from "express";
import {
  updatePassword,
  updateUser,
  userFetch,
  userLogin,
  userLogout,
  userReg,
} from "../Controllers/user.controller.js";
import { Upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import Joi from "joi";

const router = Router();

const validateStudentSchema = Joi.object({
  
})

router.route("/sreg").post(Upload.single("studentPhoto"), userReg);
router.route("/log").post(userLogin);
router.route("/see").get(verifyToken, userFetch);
router.route("/upass").post(verifyToken, updatePassword);
router.route("/uuser").post(verifyToken, updateUser);
router.route("/log").get(verifyToken, userLogout);

export default router;
