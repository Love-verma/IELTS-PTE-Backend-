// routes/reportRoutes.js
import express from "express";
const router = express.Router();
import {
  getMonthlyReport,
  downloadReport,
  getWeeklyReport,
} from "../controllers/ReportController.js";
router.get("/weekly", getWeeklyReport);
router.get("/monthly", getMonthlyReport);
router.get("/download", downloadReport);

export default router;
