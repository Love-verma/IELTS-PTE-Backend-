import { Router } from "express";
import {
  getQues,
  markQues,
} from "../controller/question.controller.js";

const router = Router();

router.route("/get-qb").get(getQues);
router.route("/mark").post(markQues);

export { router };
