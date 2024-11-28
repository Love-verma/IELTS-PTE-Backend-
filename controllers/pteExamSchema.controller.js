// controllers/pteExamController.js
import PTEExam from '../models/pteExamSchema.model.js';

// Create a new PTE exam attempt
export const createPTEExamAttempt = async (req, res) => {
  try {
    const { userId, reading, writing, listening, speaking, attemptedOn, status } = req.body;

    // Validate required fields
    if (!userId || !reading || !writing || !listening || !speaking || !attemptedOn) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new PTEExam instance
    const newPTEExamAttempt = new PTEExam({
      userId,
      reading,
      writing,
      listening,
      speaking,
      attemptedOn,
      status: status || 'pending',  // Default to 'pending' if no status is provided
    });

    // Save the PTE exam attempt to the database
    const savedPTEExamAttempt = await newPTEExamAttempt.save();

    // Respond with the saved attempt
    res.status(201).json(savedPTEExamAttempt);
  } catch (error) {
    console.error('Error creating PTE exam attempt:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
