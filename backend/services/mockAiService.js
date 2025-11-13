const mockAnalyzeContent = async (text) => {
  console.log('Using MOCK AI service (Gemini API unavailable)');
  console.log('Analyzing text:', text.substring(0, 100) + '...');
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = [
    {
      engagementScore: Math.floor(Math.random() * 30) + 60, // 60-90
      suggestions: [
        { 
          category: 'Content', 
          suggestion: 'Add more specific details and personal experiences to make the content more relatable', 
          priority: 'high' 
        },
        { 
          category: 'Hashtags', 
          suggestion: 'Include 2-3 trending hashtags relevant to your niche', 
          priority: 'medium' 
        }
      ],
      sentiment: 'positive',
      keywords: extractKeywords(text)
    },
    {
      engagementScore: Math.floor(Math.random() * 25) + 45, // 45-70
      suggestions: [
        { 
          category: 'Call-to-Action', 
          suggestion: 'Add a clear question to encourage comments and engagement', 
          priority: 'high' 
        },
        { 
          category: 'Timing', 
          suggestion: 'Consider posting during peak hours (7-9 PM) for better reach', 
          priority: 'medium' 
        }
      ],
      sentiment: 'neutral',
      keywords: extractKeywords(text)
    },
    {
      engagementScore: Math.floor(Math.random() * 20) + 75, // 75-95
      suggestions: [
        { 
          category: 'Visual', 
          suggestion: 'Add eye-catching emojis or visual elements to break up text', 
          priority: 'medium' 
        },
        { 
          category: 'Content', 
          suggestion: 'Share behind-the-scenes content to build authentic connections', 
          priority: 'high' 
        }
      ],
      sentiment: 'positive',
      keywords: extractKeywords(text)
    }
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  console.log('Mock analysis complete');
  return randomResponse;
};

const extractKeywords = (text) => {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did'];
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word));
  
  return [...new Set(words)].slice(0, 5);
};

module.exports = {
  analyzeContent: mockAnalyzeContent
};