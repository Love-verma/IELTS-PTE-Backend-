import mongoose, { Schema, model } from "mongoose";


const examSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    questionPool: {
        type: [Schema.Types.ObjectId], 
        ref: "Question",
    },
    examType: {
        type: String,
        enum: ["mock", "seasonal"],
        required: true,
    },
});

export const Exam = model("Exam", examSchema);
