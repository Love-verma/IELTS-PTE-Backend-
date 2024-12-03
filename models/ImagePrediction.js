 const mongoose = require('mongoose');
  const ImagePredictionSchema = new mongoose.Schema({
     imageName :String,
       predictions:Array,
        task :String,
        createdAt: { type: Date, default: Date.now },
  });
   module.exports = mongoose.model('ImagePrediction ' , ImagePredictionSchema);