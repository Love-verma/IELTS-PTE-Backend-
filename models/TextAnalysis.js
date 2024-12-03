const mongoose = require('mongoose');
const TextAnalysisSchema = new mongoose.Schema({
    inputtext : String,
     embedding:Array,
     createdAt: { type: Date, default: Date.now },
});
 module.exports = mongoose.model('TextAnalysis' , TextAnalysisSchema );