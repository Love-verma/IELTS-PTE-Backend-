import express from "express";
import { router as quesRoute } from "./routes/question.route.js";

const app = express();

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use("/ques", quesRoute);

app.get("/", (req, res) => {
  res.send("Welcome to PTE Exam!");
});
export { app };
