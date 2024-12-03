const use = require('@tensorflow-models/universal-sentence-encoder');
const TextAnalysis = require('../models/TextAnalysis');

exports.analyzeText = async (req, res) => {
  try {
    const { text } = req.body;

    const model = await use.load();
    const embeddings = await model.embed([text]);

    // here i am saving to databse 
    const newTextAnalysis = new TextAnalysis({
      inputText: text,
      embeddings: embeddings.arraySync(),
    });
    await newTextAnalysis.save();

    res.json({ embeddings: embeddings.arraySync() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
