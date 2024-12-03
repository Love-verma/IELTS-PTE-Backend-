import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { imageClassification, objectDetection, sentimentAnl } from "../controller/tf.controller.js";

const router = Router();

router.route("/image-clf").post(upload.single("image"), imageClassification);
router.route("/obj-det").post(upload.single("image"), objectDetection);
router.route("/sent-anl").post(sentimentAnl);

export { router };