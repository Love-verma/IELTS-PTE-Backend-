import express from 'express';
import { register, login } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);


router.get('/admin/dashboard', authMiddleware, roleMiddleware('Admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
  });
  
export default router;
