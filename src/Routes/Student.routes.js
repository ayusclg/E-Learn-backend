import Router from "express";
import { userLogin, userReg } from "../Controllers/user.controller.js";
import { Upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/sreg").post(Upload.single("studentPhoto"), userReg);
router.route("/log").post(userLogin);

export default router;
