import { Router } from 'express';
import { scheduleTest } from '../controllers/testController.js';


const router = Router();

router.post('/schedule', scheduleTest);

export default router;
