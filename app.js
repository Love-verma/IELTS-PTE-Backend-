import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();

const app = express();
connectDB();

app.use(express.json());

// Routes

//(login,reg) authentication 
app.use('/api/auth', authRoutes);

//admin specific 
// app.use('/api', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
