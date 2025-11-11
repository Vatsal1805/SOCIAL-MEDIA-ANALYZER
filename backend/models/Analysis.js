// const mongoose = require('mongoose');

// const analysisSchema = new mongoose.Schema({
//   fileName: {
//     type: String,
//     required: true
//   },
//   fileType: {
//     type: String,
//     required: true,
//     enum: ['pdf', 'image']
//   },
//   extractedText: {
//     type: String,
//     required: true
//   },
//   analysis: {
//     engagementScore: Number,
//     suggestions: [{
//       category: String,
//       suggestion: String,
//       priority: {
//         type: String,
//         enum: ['low', 'medium', 'high']
//       }
//     }],
//     sentiment: {
//       type: String,
//       enum: ['positive', 'negative', 'neutral']
//     },
//     keywords: [String]
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Analysis', analysisSchema);


const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  fileName: String,
  fileType: String, // pdf or image
  extractedText: String,
  analysis: {
    engagementScore: Number,
    suggestions: [
      {
        category: String,
        suggestion: String,
        priority: String
      }
    ],
    sentiment: String,
    keywords: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analysis', analysisSchema);
