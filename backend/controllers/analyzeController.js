const Analysis = require('../models/Analysis');
const geminiService = require('../services/geminiService');

const analyzeContent = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        error: 'No text provided for analysis' 
      });
    }

    // Get AI analysis
    const analysisResult = await geminiService.analyzeContent(text.trim());

    // Save to database (optional - for text analysis)
    try {
      const analysis = new Analysis({
        fileName: 'text-input',
        fileType: 'text',
        extractedText: text.trim(),
        analysis: analysisResult
      });

      await analysis.save();
      console.log('Analysis saved to database');
    } catch (dbError) {
      console.warn('Failed to save to database:', dbError.message);
      // Don't fail the request if database save fails
    }

    res.json({
      success: true,
      message: 'Content analyzed successfully',
      analysis: analysisResult
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Analysis failed: ' + error.message 
    });
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