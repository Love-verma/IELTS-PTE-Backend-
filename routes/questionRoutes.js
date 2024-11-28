const express = require('express');
const router = express.Router();
const {
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questionController');

router.get('/api/questions', getQuestions);
router.put('/api/questions/:id', updateQuestion);
router.delete('/api/questions/:id', deleteQuestion);

module.exports = router;
