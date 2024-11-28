import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/db.js";

// env configuration
dotenv.config({
  path: "./.env",
});


// serving the app
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is live at: http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });