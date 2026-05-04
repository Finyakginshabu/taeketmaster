import express from "express";
import * as controller from "../controllers/bookings.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/booking/:id", controller.getBookingDetail);
router.get("/bookings", verifyToken, controller.getMyBookings);
router.post("/booking", verifyToken, controller.createBooking);

export default router;
