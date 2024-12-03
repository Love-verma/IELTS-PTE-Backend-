const mobilenet = require('@tensorflow-models/mobilenet');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const tf = require('@tensorflow/tfjs-node');
const ImagePrediction = require('../models/ImagePrediction');

exports.classifyImage = async (req, res) => {
  try {
    const image = fs.readFileSync(req.file.path);
    const tensor = tf.node.decodeImage(image);

    const model = await mobilenet.load();
    const predictions = await model.classify(tensor);

    
    const newPrediction = new ImagePrediction({
      imageName: req.file.filename,
      predictions,
      task: 'classification',
    });
    await newPrediction.save();

    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.detectObjects = async (req, res) => {
  try {
    const image = fs.readFileSync(req.file.path);
    const tensor = tf.node.decodeImage(image);

    const model = await cocoSsd.load();
    const predictions = await model.detect(tensor);

    
    const newPrediction = new ImagePrediction({
      imageName: req.file.filename,
      predictions,
      task: 'object detection',
    });
    await newPrediction.save();

    res.json(predictions);
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};
