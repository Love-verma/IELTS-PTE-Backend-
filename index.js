import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON request bodies

// Routes
app.use('/api/questions', questionRoutes);

// Start Server
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
