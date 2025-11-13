import React, { useState } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3002/api'

const TextInput = ({ onAnalysisComplete, onLoadingChange, loading }) => {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some content to analyze')
      setTimeout(() => setError(''), 3000)
      return
    }

    setError('')
    setStatus('Analyzing content...')
    onLoadingChange(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/analyze`, {
        text: text.trim()
      })

      if (response.data.success) {
        setStatus('Analysis complete!')
        onAnalysisComplete({
          analysis: response.data.analysis,
          originalText: text.trim(),
          type: 'text'
        })
      } else {
        setError(response.data.error || 'Analysis failed')
      }
    } catch (error) {
      setError('Failed to analyze content. Please check if the server is running.')
    } finally {
      onLoadingChange(false)
      setTimeout(() => setStatus(''), 2000)
    }
  }

  return (
    <div className="text-input-section">
      {/* Error/Status Messages */}
      {error && (
        <div className="status-message error">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
      )}
      
      {status && (
        <div className="status-message loading">
          <i className="fas fa-spinner fa-spin"></i>
          {status}
        </div>
      )}
      
      <label htmlFor="content-text">Enter your social media content:</label>
      <textarea
        id="content-text"
        className={`content-textarea ${loading ? 'loading' : ''}`}
        placeholder="Paste your social media post content here...

Example: 'Just launched my new business! So excited to share this journey with you all. What do you think? 🚀 #entrepreneur #startup'"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="6"
        disabled={loading}
      />
      <button 
        className={`analyze-btn ${loading ? 'loading' : ''}`}
        onClick={handleAnalyze}
        disabled={!text.trim() || loading}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> 
            {status || 'Analyzing...'}
          </>
        ) : (
          <>
            <i className="fas fa-magic"></i> 
            Analyze Content
          </>
        )}
      </button>
    </div>
  )
}

export default TextInput