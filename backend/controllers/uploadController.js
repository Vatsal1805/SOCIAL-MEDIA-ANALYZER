const textExtractionService = require('../services/textExtractionService');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileType = req.file.mimetype.startsWith('image/') ? 'image' : 'pdf';

    // Extract text from uploaded file
    const extractedText = await textExtractionService.extractText(filePath, fileType);

    res.json({
      message: 'File uploaded and text extracted successfully',
      data: {
        fileName: req.file.originalname,
        fileType,
        extractedText
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
};

module.exports = { uploadFile };