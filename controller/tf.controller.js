import { promises as fs } from "fs";
const cocoSsd = await import("@tensorflow-models/coco-ssd");
const tf = await import("@tensorflow/tfjs-node");
const mobilenet = await import("@tensorflow-models/mobilenet");
const use = await import("@tensorflow-models/universal-sentence-encoder");

let mobModel;
const loadMobModel = async () => {
  if (!mobModel) {
    mobModel = await mobilenet.load();
  }
};

const clf = async (image) => {
  await loadMobModel();
  const imageBuffer = await fs.readFile(image);
  const img = tf.node.decodeImage(imageBuffer);
  const predictions = await mobModel.classify(img);
  return predictions;
};

let cocoModel;
const loadCocoModel = async () => {
  if (!cocoModel) {
    cocoModel = await cocoSsd.load();
  }
};
const det = async (image) => {
  try {
    await loadCocoModel()
    const [imageBuffer] = await Promise.all([
      fs.readFile(image),
    ]);

    const imgTensor = tf.node.decodeImage(new Uint8Array(imageBuffer), 3);
    const predictions = await cocoModel.detect(imgTensor);
    return predictions;
  } catch (error) {
    throw error;
  }
};

let useModel;
const loadUseModel = async () => {
  if (!useModel) {
    useModel = await use.load();
  }
};

const anl = async (texts) => {
  await loadUseModel();
  const embeddings = await useModel.embed(texts);

  const sentimentWeights = tf.tensor1d(
    new Array(embeddings.shape[1]).fill(0.5)
  );

  const sentimentScores = tf.matMul(
    embeddings,
    sentimentWeights.reshape([embeddings.shape[1], 1])
  );
  const scoresArray = (await sentimentScores.array()).flat();

  const minScore = Math.min(...scoresArray);
  const maxScore = Math.max(...scoresArray);
  const normalizedScores = scoresArray.map(
    (score) => ((score - minScore) / (maxScore - minScore)) * 2 - 1
  );

  const sentiments = normalizedScores.map((score) => {
    if (score > 0.2) return "Positive";
    if (score < -0.2) return "Negative";
    return "Neutral";
  });

  return sentiments;
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
const sentimentAnl = async (req, res) => {
  try {
    const text = req.body.text;
    const texts = text.split(",").map((t) => t.trim()); // Ensure proper splitting
    if (!texts.length || texts.some((t) => t === "")) {
      throw new Error("Invalid input: Ensure text contains valid sentences.");
    }

    const result = await anl(texts);
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

export { imageClassification, objectDetection, sentimentAnl };
