import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const examSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reading: { type: Number, required: true },
  writing: { type: Number, required: true },
  listening: { type: Number, required: true },
  speaking: { type: Number, required: true },
  attemptedOn: { type: Date, required: true },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'pending',
  },
  srNo: { type: Number, unique: true },
});

examSchema.plugin(AutoIncrement, { inc_field: 'srNo' });

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
