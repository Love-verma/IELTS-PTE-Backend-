import { UserProgress } from "../model/progress.model.js";
import { Question } from "../model/question.model.js";

async function getExamQuestions(userId, examId) {
  const progress = await UserProgress.findOne({ userId, examId });

  if (!progress) {
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    const questionIds = questions.map((q) => q._id);

    await UserProgress.create({
      userId,
      examId,
      shuffledQuestions: questionIds,
      attemptedQuestions: [],
    });

    return questions;
  }

  const { shuffledQuestions, attemptedQuestions } = progress;
  const unattempted = shuffledQuestions.filter(
    (q) => !attemptedQuestions.includes(q)
  );

  const shuffled = unattempted.sort(() => Math.random() - 0.5);

  const questionIds = [...attemptedQuestions, ...shuffled];
  return await Question.find({ _id: { $in: questionIds } });
}

async function markQuestionAttempted(userId, examId, questionId) {
  await UserProgress.updateOne(
    { userId, examId },
    { $addToSet: { attemptedQuestions: questionId } }
  );
}

const markQues = async (req, res) => {
  try {
    const { userId, examId, questionId } = req.body;

    if (!userId || !examId || !questionId) {
      return res
        .status(400)
        .json({ message: "Missing userId, examId or questionId" });
    }

    await markQuestionAttempted(userId, examId, questionId);
    res.status(200).json({ message: "Question marked as attempted" });
  } catch (error) {
    console.error("Error marking question as attempted:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getQues = async (req, res) => {
  try {
    const { userId, examId } = req.query;

    if (!userId || !examId) {
      return res.status(400).json({ message: "Missing userId or examId" });
    }

    const questions = await getExamQuestions(userId, examId);

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching exam questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getQues, markQues };
