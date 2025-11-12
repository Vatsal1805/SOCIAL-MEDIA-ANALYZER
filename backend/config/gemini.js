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
  model: "models/gemini-2.0-flash",  // Alternative model (less busy)
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
Analyze this content for social media engagement potential: "{content}"

Even if this isn't typical social media content, provide suggestions on how it could be adapted or improved for social media sharing.

Respond with ONLY a valid JSON object (no extra text or code blocks):
{
  "engagementScore": (number 0-100),
  "suggestions": [
    {
      "category": "Content/Hashtags/Timing/CTA",
      "suggestion": "concise actionable advice (max 80 chars)",
      "priority": "high/medium/low"
    }
  ],
  "sentiment": "positive/negative/neutral",
  "keywords": ["max 5 relevant keywords"]
}

Always provide exactly 3 suggestions. Be creative for any content type.
`;

module.exports = {
  initializeGemini,
  GEMINI_CONFIG,
  ANALYSIS_PROMPT
};