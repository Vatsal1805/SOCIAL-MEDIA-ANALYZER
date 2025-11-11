const Analysis = require('../models/Analysis');
const geminiService = require('../services/geminiService');

const analyzeContent = async (req, res) => {
  try {
    const { extractedText, fileName, fileType } = req.body;

    if (!extractedText || !fileName || !fileType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get AI analysis
    const analysisResult = await geminiService.analyzeContent(extractedText);

    // Save to database
    const analysis = new Analysis({
      fileName,
      fileType,
      extractedText,
      analysis: analysisResult
    });

    await analysis.save();

    res.json({
      message: 'Content analyzed successfully',
      analysis: analysisResult
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
};

const getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ analyses });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to get history' });
  }
};

module.exports = { analyzeContent, getAnalysisHistory };