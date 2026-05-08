import express from "express";
import * as controller from "../controllers/dashboard.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/001", verifyAdmin, controller.getTodayTicketSold);
router.get("/002", verifyAdmin, controller.getTopSellingArtists);
router.get("/003", verifyAdmin, controller.getTopTicketSpenders);
router.get("/004", verifyAdmin, controller.getMonthlyRevenue);
router.get("/005", verifyAdmin, controller.getQuaterRevenue);
router.get("/006", verifyAdmin, controller.getPopularEvent);
router.get("/007", verifyAdmin, controller.getTopSpenders);

export default router;
