import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const historySchema = new Schema({
  srNo: { 
    type: Number, 
    required: true, 
    unique: true 
},
  id: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    unique: true, 
    auto: true 
},
  name: { 
    type: String, 
    required: true 
},
  attemptedOn: { 
    type: Date, 
    required: true 
},
  status: {
    type: String,
    enum: ['Completed', 'Failed', 'Pending'],
    required: true,
  },
  score: { type: Number, required: true },
});

const History = model('History', historySchema);

export default History;
