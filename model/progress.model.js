import mongoose, { Schema, model } from "mongoose";

const userProgressSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  examId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Exam",
  },
  shuffledQuestions: {
    type: String,
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "Question",
  },
  attemptedQuestions: {
    type: [Schema.Types.ObjectId],
    ref: "Question",
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  lastActiveTime: {
    type: Date,
    default: Date.now,
  },
  endTime: { type: Date },
  remainingTime: { type: Number },
  status: {
    type: String,
    enum: ["in-progress", "paused", "completed", "expired"],
    default: "in-progress",
  },
});

userProgressSchema.index({ userId: 1, examId: 1 }, { unique: true });

export const UserProgress = model("UserProgress", userProgressSchema);
