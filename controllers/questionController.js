const Question = require('../models/Question');


exports.getQuestions = async (req, res) => {
  try {
    const filters = {};
    const { module, type, difficulty } = req.query;

    if (module) filters.module = module;
    if (type) filters.type = type;
    if (difficulty) filters.difficulty = difficulty;

    const questions = await Question.find(filters);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const question = await Question.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
