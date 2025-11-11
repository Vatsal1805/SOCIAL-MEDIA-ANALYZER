const { initializeGemini, GEMINI_CONFIG, ANALYSIS_PROMPT } = require('../config/gemini');
const mockAiService = require('./mockAiService');

let genAI;

// Initialize Gemini on module load
try {
  genAI = initializeGemini();
  console.log('✅ Gemini AI initialized successfully');
} catch (error) {
  console.error('❌ Gemini AI initialization failed:', error.message);
}

const analyzeContent = async (text) => {
  console.log('🚀 Starting Gemini analysis...');
  console.log('📝 Text length:', text.length);
  console.log('🔑 API Key present:', !!process.env.GEMINI_API_KEY);
  
  try {
    if (!genAI) {
      throw new Error('Gemini AI not initialized');
    }
    console.log('✅ Gemini client available');

    const model = genAI.getGenerativeModel({ 
      model: GEMINI_CONFIG.model,
      generationConfig: GEMINI_CONFIG.generationConfig,
      safetySettings: GEMINI_CONFIG.safetySettings
    });

    const prompt = ANALYSIS_PROMPT.replace('{content}', text);
    console.log('📝 Final prompt being sent to Gemini:', prompt.substring(0, 300) + '...');

    console.log('🤖 Analyzing content with Gemini AI...');
    const result = await model.generateContent(prompt);
    console.log('📡 Gemini API call completed, getting response...');
    
    const response = await result.response;
    const analysisText = response.text();
    console.log('📋 Full Gemini response:', analysisText);

    console.log('📝 Raw Gemini response:', analysisText.substring(0, 200) + '...');

    // Parse JSON from response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedResult = JSON.parse(jsonMatch[0]);
      console.log('✅ Successfully parsed Gemini response');
      return parsedResult;
    }

    throw new Error('No valid JSON found in Gemini response');

  } catch (error) {
    console.error('❌ Gemini API error:', error.message);
    console.error('🔍 Full error details:', error);
    console.log('🔑 API Key status:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
    console.log('📝 Content being analyzed:', text.substring(0, 100) + '...');
    
    // Use mock AI service instead of static fallback
    console.log('🎭 Switching to MOCK AI service...');
    return await mockAiService.analyzeContent(text);
  }
};

// Basic keyword extraction fallback
const extractBasicKeywords = (text) => {
  const words = text.toLowerCase().split(/\W+/);
  const commonWords = ['the', 'is', 'at', 'which', 'on', 'and', 'a', 'to', 'are', 'as', 'was', 'will', 'be'];
  
  return words
    .filter(word => word.length > 3 && !commonWords.includes(word))
    .slice(0, 5);
};

module.exports = { analyzeContent };