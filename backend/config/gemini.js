const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const initializeGemini = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required in environment variables');
  }
  
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

// Gemini model configuration
const GEMINI_CONFIG = {
  model: "gemini-1.5-flash",  // Simple model name that should work
  generationConfig: {
    temperature: 1.0,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  },
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
  ],
};

// Analysis prompt template
const ANALYSIS_PROMPT = `
Analyze the following social media content and provide engagement improvement suggestions.

Content: "{content}"

Please respond with a valid JSON object containing:
{
  "engagementScore": (number 0-100),
  "suggestions": [
    {
      "category": "string (e.g., 'Content', 'Hashtags', 'Timing')",
      "suggestion": "string (specific actionable advice)",
      "priority": "string (low/medium/high)"
    }
  ],
  "sentiment": "string (positive/negative/neutral)",
  "keywords": ["array of relevant keywords"]
}

Focus on practical, actionable suggestions for better social media engagement.
`;

module.exports = {
  initializeGemini,
  GEMINI_CONFIG,
  ANALYSIS_PROMPT
};