import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/database.js';
import examRoutes from './routes/examRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/exams', examRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${PORT}`);
});
