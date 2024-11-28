// models/PTEExam.js
import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const pteExamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reading: {
    type: Number,
    required: true,
  },
  writing: {
    type: Number,
    required: true,
  },
  listening: {
    type: Number,
    required: true,
  },
  speaking: {
    type: Number,
    required: true,
  },
  attemptedOn: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'pending',
  },
  srNo: {
    type: Number,
    unique: true, // Ensure the serial number is unique
  },
});

// Use mongoose-sequence to auto-increment the srNo field
pteExamSchema.plugin(AutoIncrement, { inc_field: 'srNo' });

const PTEExam = mongoose.model('PTEExam', pteExamSchema);
export default PTEExam;
