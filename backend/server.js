const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import configurations
const connectDB = require('./config/database');

const app = express();
const PORT = parseInt(process.env.PORT) || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/upload', require('./routes/upload'));
// Routes
app.use('/api/upload', require('./routes/upload'));
app.use('/api', require('./routes/analyze'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at: http://localhost:${PORT}/api`);
});