import express from "express";
import * as controller from "../controllers/eventDetails.controller.js";

const router = express.Router();

router.get("/event", controller.getEventDetail);
router.get("/event2", controller.getEventDetailTwo);
router.get("/event/available", controller.getAvailableSeat);
router.get("/event/zones", controller.getZoneLayout);
router.get("/event/seats", controller.getSeatLayout);

export default router;