const express = require('express');
const { upload, handleMulterError } = require('../config/multer');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

// Upload route
router.post('/', upload.single('file'), handleMulterError, uploadController.uploadFile);

module.exports = router;