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
- React 18 + Vite
- Modern component architecture
- Professional Blue-Grey theme
- Responsive design
- Font Awesome icons

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
   PORT=3002
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

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🎯 Usage

1. **Start Backend**: Backend runs on `http://localhost:3002`
2. **Start Frontend**: Frontend runs on `http://localhost:3000`
3. **Analyze Content**: 
   - Use the text input tab to paste social media content
   - Use the file upload tab to upload PDFs or images
   - Click "Analyze Content" to get AI insights

## 📊 API Endpoints

- `POST /api/analyze` - Analyze text content
- `POST /api/upload` - Upload and extract text from files
- `GET /api/analysis/history` - Get analysis history

## 🎨 Features

The application features a modern, professional design with:
- Clean, modern React component architecture
- Professional Blue-Grey SaaS theme
- Interactive tabs for text analysis and file upload
- Real-time AI-powered content analysis
- Responsive design for all devices
- Clean loading animations and status indicators

## 🔧 Development

### AI Service
The app uses Google Gemini AI API for content analysis with fallback models for reliability. If the API key is not provided or fails, it automatically falls back to a mock AI service for development.

### Project Structure
```
├── backend/              # Node.js + Express API
│   ├── config/          # Database and AI configuration
│   ├── controllers/     # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   └── services/        # Business logic
└── frontend/            # React + Vite app
    ├── src/
    │   ├── components/  # React components
    │   └── services/    # API integration
    └── public/          # Static assets
```

## 📝 License

MIT License