const express = require('express');
const analyzeController = require('../controllers/analyzeController');

const router = express.Router();

// Analyze content
router.post('/', analyzeController.analyzeContent);

// Get analysis history
router.get('/history', analyzeController.getAnalysisHistory);

module.exports = router;