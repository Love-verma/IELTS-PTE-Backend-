// models/Session.js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    testType: {
      type: String,
      enum: ["PTE Listening", "PTE Speaking", "PTE Writing"],
      required: true,
    },
    testNumber: {
      type: Number,
      required: true,
    },
    attemptedOn: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Checked"],
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
