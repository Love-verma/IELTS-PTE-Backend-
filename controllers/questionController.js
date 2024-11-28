import Question from '../models/Question.js';

// Add a new question
export const addQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ success: true, question });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Fetch all questions with optional filters
export const getQuestions = async (req, res) => {
  try {
    const { module, type, difficulty } = req.query;
    const filter = {};
    if (module) filter.module = module;
    if (type) filter.type = type;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter);
    res.status(200).json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
