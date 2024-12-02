import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';
import testRoutes from './routes/testRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); 

app.use('/api/questions', questionRoutes);
app.use('/api/tests', testRoutes);

app.get("/",(req,res)=>{
  res.send("Hello :)");
});

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
