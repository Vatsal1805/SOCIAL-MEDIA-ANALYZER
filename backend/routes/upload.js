const express = require('express');
const { upload, handleMulterError } = require('../config/multer');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

// Upload route - support multiple files
router.post('/', upload.array('files', 10), handleMulterError, uploadController.uploadFile);

module.exports = router;