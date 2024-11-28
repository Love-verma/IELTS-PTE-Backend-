import Session from "../models/Session.js";
import { PDFDocument, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

export const getMonthlyReport = async (req, res) => {
  try {
    const filterDate = new Date();
    filterDate.setDate(filterDate.getDate() - 30);

    const sessions = await Session.find({
      attemptedOn: { $gte: filterDate },
    });
    if (!sessions.length) {
      return res
        .status(404)
        .json({ message: "No data available for the selected report type" });
    }

    const report = sessions.map((session) => ({
      testType: session.testType,
      testNumber: session.testNumber,
      attemptedOn: session.attemptedOn,
      status: session.status,
      score: session.score,
    }));
    res.status(200).json({
      message: "Monthly report generated successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error generating monthly report:", error);
    res.status(500).json({ message: "Error generating monthly report", error });
  }
};
export const getWeeklyReport = async (req, res) => {
  try {
    const filterDate = new Date();
    filterDate.setDate(filterDate.getDate() - 7);

    const sessions = await Session.find({
      attemptedOn: { $gte: filterDate },
    });

    if (!sessions.length) {
      return res
        .status(404)
        .json({ message: "No data available for the selected report type" });
    }

    const report = sessions.map((session) => ({
      testType: session.testType,
      testNumber: session.testNumber,
      attemptedOn: session.attemptedOn,
      status: session.status,
      score: session.score,
    }));
    res.status(200).json({
      message: "Weekly report generated successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error generating Weekly report:", error);
    res.status(500).json({ message: "Error generating Weekly report", error });
  }
};
export const downloadReport = async (req, res) => {
  try {
    const { type } = req.query;

    let filterDate;
    if (type === "weekly") {
      filterDate = new Date();
      filterDate.setDate(filterDate.getDate() - 7);
    } else if (type === "monthly") {
      filterDate = new Date();
      filterDate.setDate(filterDate.getDate() - 30);
    } else {
      return res.status(400).json({ message: "Invalid report type" });
    }

    console.log(`Fetching sessions from: ${filterDate}`);

    const sessions = await Session.find({ attemptedOn: { $gte: filterDate } });

    if (!sessions.length) {
      return res
        .status(404)
        .json({ message: "No data available for the selected report type" });
    }

    console.log("Sessions fetched:", sessions);

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Add report title
    const reportTitle = `${
      type === "weekly" ? "Weekly" : "Monthly"
    } Performance Report (Last ${type === "weekly" ? "7" : "30"} Days)`;
    page.drawText(reportTitle, {
      x: 55,
      y: height - 50,
      size: 18,
      color: rgb(0, 0, 0),
    });

    // Table header
    let y = height - 100;
    page.drawText("Sr. No.", { x: 50, y, size: 12, color: rgb(0, 0, 0) });
    page.drawText("Test Type", { x: 100, y, size: 12, color: rgb(0, 0, 0) });
    page.drawText("Test Number", { x: 250, y, size: 12, color: rgb(0, 0, 0) });
    page.drawText("Attempted On", { x: 400, y, size: 12, color: rgb(0, 0, 0) });
    page.drawText("Status", { x: 550, y, size: 12, color: rgb(0, 0, 0) });
    page.drawText("Score", { x: 700, y, size: 12, color: rgb(0, 0, 0) });
    y -= 20;

    // Add session data to the PDF
    sessions.forEach((session, index) => {
      page.drawText(`${index + 1}`, {
        x: 50,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(session.testType, {
        x: 100,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(`${session.testNumber}`, {
        x: 250,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(session.attemptedOn.toISOString().split("T")[0], {
        x: 400,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(session.status, {
        x: 550,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(`${session.score}`, {
        x: 700,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });
      y -= 20;

      if (y < 50) {
        y = height - 50;
        page = pdfDoc.addPage();
      }
    });

    const pdfBytes = await pdfDoc.save();

    const fileName = `${type}-report-${Date.now()}.pdf`;
    const filePath = path.join(process.cwd(), fileName); // Save in root directory
    fs.writeFileSync(filePath, pdfBytes);

    console.log(`Report saved at: ${filePath}`);
    res.status(200).json({
      message: "Report generated successfully",
      filePath: fileName,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Error downloading report", error });
  }
};
