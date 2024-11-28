import express from 'express';
import { createExamAttempt } from '../controllers/examController.js';
import { calculateTestHistory, updateExamStatus } from '../controllers/historyController.js';

const router = express.Router();

router.post('/attempt', createExamAttempt);
router.get('/history/:userId', calculateTestHistory);
router.put('/status/:userId/:srNo', updateExamStatus);

export default router;
