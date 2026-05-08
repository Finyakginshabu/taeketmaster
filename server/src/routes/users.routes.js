import express from "express"
import * as controller from "../controllers/users.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// require auth
router.get("/profile", verifyToken, controller.getProfile);
router.put("/profile", verifyToken, controller.updateProfile);
router.get("/address", verifyToken, controller.getAddress);
router.post("/address", verifyToken, controller.upsertAddress);
router.put("/address", verifyToken, controller.upsertAddress);

export default router;