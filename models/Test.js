import { Schema, model } from 'mongoose';

const testSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    testType: { type: String, enum: ['Practice', 'Seasonal', 'Mock'], required: true },
    testDate: { type: Date, default: Date.now },
});

export default model('Test', testSchema);
