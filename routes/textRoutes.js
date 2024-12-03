const express = require('express');
const textController = require('../controllers/textController');

const router = express.Router();

router.post('/analyze', textController.analyzeText);

module.exports = router;
