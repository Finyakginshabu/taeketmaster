import express from "express";
import * as controller from "../controllers/reports.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Reports endpoints
router.get("/tickets-sold", verifyAdmin, controller.getTicketsSold);
router.get("/selling-artists", verifyAdmin, controller.getSellingArtists);
router.get("/ticket-spenders", verifyAdmin, controller.getTicketSpenders);
router.get("/revenue", verifyAdmin, controller.getRevenue);
router.get("/popular-events", verifyAdmin, controller.getPopularEvents);

export default router;
