import { Router } from "express";
import {
  getQues,
  markQues,
  pauseTestHandler,
  resumeTestHandler,
  startTestHandler,
} from "../controller/question.controller.js";

const router = Router();

router.route("/get-qb").get(getQues);
router.route("/mark").post(markQues);
router.route("/pause").post(pauseTestHandler);
router.route("/resume").post(resumeTestHandler);
router.route("/start").post(startTestHandler);

export { router };
