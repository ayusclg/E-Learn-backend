import Router from "router";
import { verifyToken } from "../middlewares/auth.middleware";
import { fetchUser } from "../Controllers/admin.controller.js";

const router = Router();

router.route("/fetch").get(verifyToken, fetchUser);

export default router;
