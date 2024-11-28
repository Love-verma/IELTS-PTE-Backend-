// controllers/testHistoryController.js
import PTEExam from '../models/pteExamSchema.model.js';

// Function to calculate test history for a user
export const testHistoryCalculation = async (req, res) => {
  try {
    // Retrieve user ID from URL parameters
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch the user's exam attempts from the database
    const examAttempts = await PTEExam.find({ userId });

    if (examAttempts.length === 0) {
      return res.status(404).json({ message: 'No exam attempts found for this user' });
    }

    // Initialize status counts
    const statusCount = {
      completed: 0,
      pending: 0,
      failed: 0
    };

    // Count the number of attempts by status
    examAttempts.forEach(attempt => {
      if (attempt.status === 'completed') {
        statusCount.completed += 1;
      } else if (attempt.status === 'pending') {
        statusCount.pending += 1;
      } else if (attempt.status === 'failed') {
        statusCount.failed += 1;
      }
    });

    // Create a summary of the historical performance
    const historySummary = {
      totalAttempts: examAttempts.length,
      statusCount,
      attempts: examAttempts,  // Include all the attempts for more detailed data if needed
    };

    // Respond with the historical data
    res.status(200).json(historySummary);
  } catch (error) {
    console.error('Error calculating test history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Function to change the status of an exam attempt
export const changeExamStatus = async (req, res) => {
  try {
    const { userId, srNo } = req.params;  // Get userId and srNo from URL parameters
    const { status } = req.body;  // Get the new status from the request body

    // Validate the status value
    const validStatuses = ['completed', 'pending', 'failed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value. Must be one of: completed, pending, failed.' });
    }

    // Find the exam attempt by userId and srNo
    const examAttempt = await PTEExam.findOne({ userId, srNo });

    if (!examAttempt) {
      return res.status(404).json({ message: 'Exam attempt not found' });
    }

    // Update the status of the exam attempt
    examAttempt.status = status;
    await examAttempt.save();

    // Respond with the updated exam attempt
    res.status(200).json({
      message: 'Exam status updated successfully',
      examAttempt
    });

  } catch (error) {
    console.error('Error changing exam status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
