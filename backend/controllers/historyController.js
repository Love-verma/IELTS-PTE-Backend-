import Exam from '../models/exam.model.js';

// Calculate user test history
export const calculateTestHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const examAttempts = await Exam.find({ userId });

    if (!examAttempts.length) {
      return res.status(404).json({ message: 'No exam attempts found for this user' });
    }

    const statusSummary = {
      completed: 0,
      pending: 0,
      failed: 0,
    };

    examAttempts.forEach(attempt => {
      statusSummary[attempt.status] += 1;
    });

    const historySummary = {
      totalAttempts: examAttempts.length,
      statusSummary,
      attempts: examAttempts,
    };

    res.status(200).json(historySummary);
  } catch (error) {
    console.error("Error fetching test history:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update exam attempt status
export const updateExamStatus = async (req, res) => {
  try {
    const { userId, srNo } = req.params;
    const { status } = req.body;

    const validStatuses = ['completed', 'pending', 'failed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const examAttempt = await Exam.findOne({ userId, srNo });
    if (!examAttempt) {
      return res.status(404).json({ message: 'Exam attempt not found' });
    }

    examAttempt.status = status;
    await examAttempt.save();

    res.status(200).json({ message: 'Status updated successfully', examAttempt });
  } catch (error) {
    console.error("Error updating exam status:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
