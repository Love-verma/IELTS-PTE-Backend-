import express from 'express';
import { addQuestion, getQuestions } from '../controllers/questionController.js';

const router = express.Router();

// API Endpoints
router.post('/', addQuestion); // Add a new question
router.get('/', getQuestions); // Get all questions with filters

export default router;
