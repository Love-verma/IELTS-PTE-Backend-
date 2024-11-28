// routes/pteExamRoutes.js
import express from 'express';
import { createPTEExamAttempt } from '../controllers/pteExamSchema.controller.js';

import { changeExamStatus, testHistoryCalculation } from '../controllers/testHistory.controller.js';
const router = express.Router();

// Route to create a new PTE exam attempt
router.post('/attempt', createPTEExamAttempt);

router.get('/history/:userId', testHistoryCalculation);

router.put('/exam/:userId/:srNo/status', changeExamStatus);

export default router;
