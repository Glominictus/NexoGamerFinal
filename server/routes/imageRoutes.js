const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const imageController = require('../controllers/imageController');

router.post('/upload/user-image', upload.single('image'), imageController.uploadUserImage);
router.post('/upload/article-image', upload.single('image'), imageController.uploadArticleImage);

module.exports = router;