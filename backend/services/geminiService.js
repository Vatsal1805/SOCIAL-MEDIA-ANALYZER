const { initializeGemini, GEMINI_CONFIG, ANALYSIS_PROMPT } = require('../config/gemini');

let genAI;

// Initialize Gemini on module load
try {
  genAI = initializeGemini();
  console.log('Gemini AI initialized successfully');
} catch (error) {
  console.error('Gemini AI initialization failed:', error.message);
}

const analyzeContent = async (text) => {
  // Validate and truncate content if too long
  if (text.length > 2000) {
    console.log('Content truncated to 2000 characters');
    text = text.substring(0, 2000) + '...';
  }
  
  try {
    if (!genAI) {
      throw new Error('Gemini AI not initialized');
    }

    // Try multiple models in case one is overloaded
    const modelsToTry = [
      GEMINI_CONFIG.model,
      "models/gemini-2.0-flash-001", 
      "models/gemini-flash-lite-latest",
      "models/gemini-pro-latest"
    ];

    const prompt = ANALYSIS_PROMPT.replace('{content}', text);

    let result;
    let lastError;

    for (let i = 0; i < modelsToTry.length; i++) {
      const modelName = modelsToTry[i];
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: GEMINI_CONFIG.generationConfig,
          safetySettings: GEMINI_CONFIG.safetySettings
        });

        result = await model.generateContent(prompt);
        break;
      } catch (modelError) {
        lastError = modelError;
        if (i === modelsToTry.length - 1) {
          throw lastError; // Throw the last error if all models fail
        }
      }
    }
    
    const response = await result.response;
    const analysisText = response.text();

    // Check if response is empty
    if (!analysisText || analysisText.trim().length === 0) {
      throw new Error('Gemini API returned empty response - content may be filtered or invalid');
    }

    // Parse JSON from response - improved extraction
    let cleanedResponse = analysisText;
    
    // Remove markdown code blocks if present
    cleanedResponse = cleanedResponse.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '');
    
    // Try to find complete JSON object
    const openBrace = cleanedResponse.indexOf('{');
    const closeBrace = cleanedResponse.lastIndexOf('}');
    
    if (openBrace !== -1 && closeBrace !== -1 && closeBrace > openBrace) {
      const jsonString = cleanedResponse.substring(openBrace, closeBrace + 1);
      try {
        const parsedResult = JSON.parse(jsonString);
        return parsedResult;
      } catch (parseError) {
        throw new Error('Invalid JSON in Gemini response');
      }
    }

    throw new Error('No valid JSON found in Gemini response');

  } catch (error) {
    console.error('Gemini API error:', error.message);
    throw new Error(`Gemini API failed: ${error.message}`);
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