import express from "express";
import * as controller from "../controllers/reports.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Reports endpoints
router.get("/tickets-sold", verifyToken, controller.getTicketsSold);
router.get("/selling-artists", verifyToken, controller.getSellingArtists);
router.get("/ticket-spenders", verifyToken, controller.getTicketSpenders);
router.get("/revenue", verifyToken, controller.getRevenue);
router.get("/popular-events", verifyToken, controller.getPopularEvents);

export default router;
