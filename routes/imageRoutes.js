const express = require('express');
 const multer = require('multer');
  const imageController =  require('../controllers/imageController');
  const router = express.Router();
   const upload = multer({ dest:'upload/'});
   router.post('/classify', upload.single('image'), imageController.classifyImage);
router.post('/detect', upload.single('image'), imageController.detectObjects);

module.exports = router;