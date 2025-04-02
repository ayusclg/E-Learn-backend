import Router from "express";
import {
  updatePassword,
  updateUser,
  userFetch,
  userLogin,
  userReg,
} from "../Controllers/user.controller.js";
import { Upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/sreg").post(Upload.single("studentPhoto"), userReg);
router.route("/log").post(userLogin);
router.route("/see").get(verifyToken, userFetch);
router.route("/upass").post(verifyToken, updatePassword);
router.route("/uuser").post(verifyToken, updateUser);

export default router;
