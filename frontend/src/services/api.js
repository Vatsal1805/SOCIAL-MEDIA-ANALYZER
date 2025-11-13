import axios from 'axios'

const API_BASE_URL = 'https://social-media-analyzer-33hq.onrender.com/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

// API service functions
export const analyzeText = async (text) => {
  try {
    const response = await api.post('/analyze', { text })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to analyze text')
  }
}

export const uploadFiles = async (files) => {
  try {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to upload files')
  }
}

export const getAnalysisHistory = async () => {
  try {
    const response = await api.get('/analysis/history')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to get analysis history')
  }
}

export default api