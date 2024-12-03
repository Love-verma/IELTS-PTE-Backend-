import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSentiment } from './src/getSentiment.js';

const PORT = process.env.PORT || 3000;

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Use __dirname

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index', { sentiment: null, score: null }); // Initial render without sentiment
});

app.get('/analyze', (req, res) => {
    const text = req.query.text;
    const sentimentScore = getSentiment(text);

    // Convert the score to a sentiment label
    const sentimentLabel = getSentimentLabel(sentimentScore);

    // Render the result in the index.ejs view
    res.render('index', { sentiment: sentimentLabel, score: sentimentScore });
});

// Function to map sentiment score to label
function getSentimentLabel(score) {
    if (score > 0.2) {
        return 'Happy';  // Positive sentiment
    } else if (score < -0.2) {
        return 'Sad';  // Negative sentiment
    } else {
        return 'Neutral';  // Neutral sentiment
    }
}

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
