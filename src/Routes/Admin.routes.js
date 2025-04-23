import Router from "router";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { deleteUser, fetchUser } from "../Controllers/admin.controller.js";

const router = Router();

router.route("/fetch").get(verifyToken, fetchUser);
router.route("/del/:_id").get(verifyToken, deleteUser);

export default router;
