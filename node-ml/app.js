import express from "express";
import request from "request";

const app = express();

// middlewares
app.use(express.json());
// app.use(express.static("./static"));

// routes
app.get("/", (req, res) => {
  res.send("Welcome to Flask tutorial!");
});

app.get("/flask", (req, res) => {
  request("http://127.0.0.1:5000/flask", function (error, response, body) {
    console.error("error:", error);
    console.log("statusCode:", response && response.statusCode);
    console.log("body:", body);
    res.send(body);
  });
  // res.send("Welcome to Flask tutorial!");
});

app.post("/get-user", (req, res) => {
  const { name, email } = req.body;
  request.post(
    {
      url: "http://127.0.0.1:5000/user",
      json: {
        name,
        email,
      },
    },
    function (error, response, body) {
      console.error("error:", error);
      console.log("statusCode:", response && response.statusCode);
      console.log("body:", body);
      res.send(body);
    }
  );
  // res.send("Welcome to Flask tutorial!");
});

export { app };
