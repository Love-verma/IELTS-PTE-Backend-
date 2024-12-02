import { promises as fs } from "fs";
const cocoSsd = await import("@tensorflow-models/coco-ssd");
const tf = await import("@tensorflow/tfjs-node");
const mobilenet = await import("@tensorflow-models/mobilenet");

const clf = async (image) => {
  const model = await mobilenet.load();
  const imageBuffer = await fs.readFile(image);
  const img = tf.node.decodeImage(imageBuffer);
  const predictions = await model.classify(img);
  return predictions;
};

const det = async (image) => {
  try {
    const [model, imageBuffer] = await Promise.all([
      cocoSsd.load(),
      fs.readFile(image),
    ]);

    const imgTensor = tf.node.decodeImage(new Uint8Array(imageBuffer), 3);
    const predictions = await model.detect(imgTensor);
    return predictions;
  } catch (error) {
    console.error("Error in detection:", error);
    throw error;
  }
};

const imageClassification = async (req, res) => {
  try {
    const path = req.file.path;
    const result = await clf(path);
    res.status(200).json({
      success: true,
      message: `See the results below: `,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};
const objectDetection = async (req, res) => {
  try {
    const path = req.file.path;
    const result = await det(path);
    res.status(200).json({
      success: true,
      message: `See the results below: `,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};

export { imageClassification, objectDetection };
