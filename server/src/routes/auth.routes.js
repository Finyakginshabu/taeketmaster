import express from "express";
import * as controller from "../controllers/auth.controller.js";
// import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);
// router.get("/profile", authenticate, controller.getProfile);

export default router;