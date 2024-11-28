const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  module: { type: String, required: true },
  type: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
  options: [{ type: String }],
  correctAnswer: { type: String },
});

module.exports = mongoose.model('Question', questionSchema);
