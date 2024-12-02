import * as tf from "@tensorflow/tfjs";

const model = tf.sequential({
  layers: [
    tf.layers.dense({ inputShape: [692], units: 35, activation: "relu" }),
    tf.layers.dense({ units: 15, activation: "softmax" }),
  ],
});
