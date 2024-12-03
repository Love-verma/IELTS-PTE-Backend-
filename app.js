require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const imageRoutes = require('./routes/imageRoutes');
const textRoutes = require('./routes/textRoutes');

const app = express();
connectDB();

app.use(bodyParser.json());


app.use('/api/images', imageRoutes);
app.use('/api/text', textRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
