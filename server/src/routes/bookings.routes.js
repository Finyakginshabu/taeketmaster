import express from "express";
import * as controller from "../controllers/bookings.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/reserve", verifyToken, controller.reserveTicket);
router.post("/payment", verifyToken, controller.createPayment);

export default router;
