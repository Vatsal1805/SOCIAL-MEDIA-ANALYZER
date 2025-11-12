const textExtractionService = require('../services/textExtractionService');

const uploadFile = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: 'No files uploaded' 
      });
    }

    const results = [];

    // Process each uploaded file
    for (const file of req.files) {
      try {
        const filePath = file.path;
        const fileType = file.mimetype.startsWith('image/') ? 'image' : 'pdf';

        // Extract text from uploaded file
        const extractedText = await textExtractionService.extractText(filePath, fileType);

        results.push({
          fileName: file.originalname,
          fileType,
          extractedText
        });

      } catch (fileError) {
        console.error('Error processing file', file.originalname, ':', fileError.message);
        results.push({
          fileName: file.originalname,
          fileType: file.mimetype.startsWith('image/') ? 'image' : 'pdf',
          extractedText: '',
          error: 'Failed to extract text from this file'
        });
      }
    }

    res.json({
      success: true,
      message: `Successfully processed ${results.length} files`,
      results
    });

  } catch (error) {
    console.error('Upload controller error:', error);
    res.status(500).json({ 
      success: false,
      error: 'File upload failed: ' + error.message 
    });
  }
};

module.exports = { uploadFile };