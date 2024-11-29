import { UserProgress } from "../model/progress.model.js";
import { Question } from "../model/question.model.js";
import { Exam } from "../model/exam.model.js";

async function getExamQuestions(userId, examId) {
  const progress = await UserProgress.findOne({ userId, examId });

  if (!progress) {
    const exam = await Exam.findById(examId);
    if (!exam) throw new Error("Exam not found.");

    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    const questionIds = questions.map((q) => q._id);

    const now = new Date();
    const endTime = new Date(now.getTime() + exam.duration * 60 * 1000);

    await UserProgress.create({
      userId,
      examId,
      shuffledQuestions: questionIds,
      attemptedQuestions: [],
      startTime: now,
      endTime: endTime,
      status: "in-progress",
    });

    return {
      questions,
      remainingTime: exam.duration * 60,
    };
  }

  const now = new Date();
  if (progress.status === "expired" || (progress.endTime && now > progress.endTime)) {
    progress.status = "expired";
    await progress.save();
    throw new Error("Test has expired.");
  }

  if (progress.status === "paused") {
    throw new Error("Test is paused. Resume to fetch questions.");
  }

  const { shuffledQuestions, attemptedQuestions } = progress;
  const unattempted = shuffledQuestions.filter(
    (q) => !attemptedQuestions.includes(q)
  );

  const shuffled = unattempted.sort(() => Math.random() - 0.5);

  const questionIds = [...attemptedQuestions, ...shuffled];
  const questions = await Question.find({ _id: { $in: questionIds } });

  const remainingTime = Math.max(
    (progress.endTime.getTime() - now.getTime()) / 1000,
    0
  );

  return { questions, remainingTime };
}


async function markQuestionAttempted(userId, examId, questionId) {
  const progress = await UserProgress.findOne({ userId, examId });

  if (!progress || progress.status !== "in-progress") {
    throw new Error("Cannot attempt question. Test is not active.");
  }

  const now = new Date();
  if (now > progress.endTime) {
    progress.status = "expired";
    await progress.save();
    throw new Error("Test has expired.");
  }

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

const startTestHandler = async (req, res) => {
  try {
    const { userId, examId } = req.body;

    if (!userId || !examId) {
      return res.status(400).json({ message: "Missing userId or examId" });
    }

    const progress = await UserProgress.findOne({ userId, examId });

    if (progress && progress.status === "in-progress") {
      throw new Error("Test already in progress.");
    }

    if (progress && progress.status === "paused") {
      throw new Error("Test is paused. Resume instead.");
    }

    const exam = await Exam.findById(examId);
    if (!exam) throw new Error("Exam not found.");

    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    const questionIds = questions.map((q) => q._id);

    const now = new Date();
    const endTime = new Date(now.getTime() + exam.duration * 60 * 1000);

    await UserProgress.create({
      userId,
      examId,
      shuffledQuestions: questionIds,
      attemptedQuestions: [],
      startTime: now,
      endTime: endTime,
      status: "in-progress",
    });

    res.status(200).json({
      message: "The Test is started.",
      questions,
      remainingTime: exam.duration * 60,
    });
  } catch (error) {
    console.error("Error starting test:", error);
    res.status(500).json({ message: error.message });
  }
};

const pauseTestHandler = async (req, res) => {
  try {
    const { userId, examId } = req.body;

    if (!userId || !examId) {
      return res.status(400).json({ message: "Missing userId or examId" });
    }

    const progress = await UserProgress.findOne({ userId, examId });

    if (!progress || progress.status !== "in-progress") {
      throw new Error("Cannot pause. Test is not in progress.");
    }

    const now = new Date();
    const remainingTime = Math.max(
      (progress.endTime.getTime() - now.getTime()) / 1000, // Remaining time in seconds
      0
    );

    progress.status = "paused";
    progress.remainingTime = remainingTime;
    progress.endTime = null;
    await progress.save();
    res.status(200).json({ message: "The test is paused" });
  } catch (error) {
    console.error("Error pausing test:", error);
    res.status(500).json({ message: error.message });
  }
};

const resumeTestHandler = async (req, res) => {
  try {
    const { userId, examId } = req.body;

    if (!userId || !examId) {
      return res.status(400).json({ message: "Missing userId or examId" });
    }

    const progress = await UserProgress.findOne({ userId, examId });

    if (!progress || progress.status !== "paused") {
      throw new Error("Cannot resume. Test is not paused.");
    }

    const now = new Date();
    const newEndTime = new Date(now.getTime() + progress.remainingTime * 1000);

    progress.status = "in-progress";
    progress.startTime = now;
    progress.endTime = newEndTime;
    progress.remainingTime = null; 
    await progress.save();

    res.status(200).json({ message: "The test is resumed" });
  } catch (error) {
    console.error("Error resuming test:", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getQues,
  markQues,
  startTestHandler,
  pauseTestHandler,
  resumeTestHandler,
};
