import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  module: {
    type: String,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
    required: true,
  },
  type: {
    type: String,
    enum: ['Practice', 'Seasonal', 'Mock'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  answerKey: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
