import Exam from '../models/exam.model.js';

// Create a new exam attempt
export const createExamAttempt = async (req, res) => {
  try {
    const { userId, reading, writing, listening, speaking, attemptedOn, status } = req.body;

    if (!userId || !reading || !writing || !listening || !speaking || !attemptedOn) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newExamAttempt = new Exam({
      userId,
      reading,
      writing,
      listening,
      speaking,
      attemptedOn,
      status: status || 'pending',
    });

    const savedExamAttempt = await newExamAttempt.save();
    res.status(201).json(savedExamAttempt);
  } catch (error) {
    console.error("Error creating exam attempt:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
