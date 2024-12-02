import express from "express";
import { router as modelRoute } from "./routes/tf.route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.static("./static"));

// routes 
app.use("/model", modelRoute);

app.get("/", (req, res) => {
  res.send("Welcome to TensoflowJS tutorial!");
});

export { app };
