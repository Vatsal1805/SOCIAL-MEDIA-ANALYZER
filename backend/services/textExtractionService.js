const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const fs = require('fs');

const extractText = async (filePath, fileType) => {
  try {
    if (fileType === 'image') {
      return await extractFromImage(filePath);
    } else if (fileType === 'pdf') {
      return await extractFromPDF(filePath);
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Text extraction error:', error);
    throw error;
  }
};

const extractFromImage = async (imagePath) => {
  const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
  return text.trim();
};

const extractFromPDF = async (pdfPath) => {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  return data.text.trim();
};

module.exports = { extractText };