# Social Media Content Analyzer

A full-stack application that analyzes social media content and provides AI-powered suggestions to improve engagement.

## 🚀 Features

- **Text Analysis**: Paste your social media content for instant analysis
- **File Upload**: Upload PDFs and images for text extraction and analysis
- **AI-Powered Insights**: Get engagement scores and improvement suggestions
- **Sentiment Analysis**: Understand the emotional tone of your content
- **Keyword Extraction**: Identify key topics and themes
- **Analysis History**: Track your past analyses

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js
- MongoDB (Atlas)
- Google Gemini AI API (with mock fallback)
- Tesseract.js (OCR)
- PDF-parse
- Multer (file uploads)

### Frontend
- Vanilla HTML/CSS/JavaScript
- Font Awesome icons
- Responsive design

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Google AI Studio API key (optional - app works with mock AI)

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

## 🎯 Usage

1. **Start Backend**: Backend runs on `http://localhost:5000`
2. **Start Frontend**: Frontend runs on `http://localhost:3000`
3. **Analyze Content**: 
   - Use the text input tab to paste social media content
   - Use the file upload tab to upload PDFs or images
   - Click "Analyze Content" to get AI insights

## 📊 API Endpoints

- `POST /api/analyze` - Analyze text content
- `POST /api/upload` - Upload and extract text from files
- `GET /api/analysis/history` - Get analysis history

## 🎨 Screenshots

The application features a modern, responsive design with:
- Clean card-based layout
- Interactive tabs for different input methods
- Real-time analysis results
- Beautiful data visualizations
- Analysis history tracking

## 🔧 Development

The app currently uses a mock AI service that provides realistic responses. This allows for full development and testing without requiring a working Gemini API key.

To switch to real Gemini AI:
1. Get a valid API key from Google AI Studio
2. Update the `.env` file
3. The app will automatically use the real API

## 📝 License

MIT License