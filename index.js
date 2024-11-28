// app.js or server.js
import express from 'express';
import pteExamRoutes from './routes/pteExam.route.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the PTE exam routes
app.use('/api/pte-exam', pteExamRoutes);

// Start the server
const PORT = process.env.PORT || 8000;

app.listen(PORT , ()=> {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})


