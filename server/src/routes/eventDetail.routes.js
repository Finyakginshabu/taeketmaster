import express from "express";
import * as controller from "../controllers/eventDetails.controller.js";

const router = express.Router();

router.get("/event", controller.getEventDetail);

export default router;