import Router from "express";
import {
  studentFetch,
  updatePassword,
  userLogin,
  userReg,
} from "../Controllers/user.controller.js";
import { Upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/sreg").post(Upload.single("studentPhoto"), userReg);
router.route("/log").post(userLogin);
router.route("/see").get(verifyToken, studentFetch);
router.route("/upass").post(verifyToken, updatePassword);

export default router;
