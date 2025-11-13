import React, { useState, useRef } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3002/api'

const FileUpload = ({ onAnalysisComplete, onLoadingChange, loading }) => {
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const [uploadStatus, setUploadStatus] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter(file => 
      ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    )
    
    if (validFiles.length !== selectedFiles.length) {
      setError('Some files were skipped. Only PDF, JPG, and PNG files are supported.')
      setTimeout(() => setError(''), 5000)
    } else {
      setError('')
    }
    
    setFiles(prev => [...prev, ...validFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setError('Please upload at least one file')
      setTimeout(() => setError(''), 3000)
      return
    }

    setError('')
    setUploadStatus('Uploading files...')
    onLoadingChange(true)

    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })

      // First upload files to extract text
      const uploadResponse = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (uploadResponse.data.success) {
        setUploadStatus('Analyzing content...')
        
        // Then analyze the extracted text
        const combinedText = uploadResponse.data.results
          .map(result => result.extractedText)
          .join('\n\n')

        const analyzeResponse = await axios.post(`${API_BASE_URL}/analyze`, {
          text: combinedText
        })

        if (analyzeResponse.data.success) {
          setUploadStatus('Analysis complete!')
          onAnalysisComplete({
            analysis: analyzeResponse.data.analysis,
            originalText: combinedText,
            type: 'file',
            fileResults: uploadResponse.data.results
          })
        } else {
          setError(analyzeResponse.data.error || 'Analysis failed')
        }
      } else {
        setError(uploadResponse.data.error || 'File upload failed')
      }
    } catch (error) {
      setError('Failed to analyze files. Please check if the server is running.')
    } finally {
      onLoadingChange(false)
      setTimeout(() => setUploadStatus(''), 2000)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType) => {
    if (fileType === 'application/pdf') return 'fa-file-pdf'
    if (fileType.startsWith('image/')) return 'fa-file-image'
    return 'fa-file'
  }

  return (
    <div className="file-upload-section">
      {/* Status Messages */}
      {error && (
        <div className="status-message error">
          ⚠️ {error}
        </div>
      )}
      
      {uploadStatus && (
        <div className="status-message loading">
          <i className="fas fa-spinner fa-spin"></i>
          {uploadStatus}
        </div>
      )}
      
      <div 
        className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !loading && fileInputRef.current?.click()}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
        <p>{loading ? 'Processing files...' : 'Drag & drop your files here'}</p>
        <p><span>or click to browse</span></p>
        <small>Supports: PDF, JPG, PNG files</small>
        <input
          ref={fileInputRef}
          type="file"
          className="file-input"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={loading}
        />
      </div>

      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <div className="file-info">
                <div className="file-name">
                  {file.type === 'application/pdf' ? '📄' : '🖼️'} {file.name}
                </div>
                <div className="file-size">{formatFileSize(file.size)}</div>
              </div>
              <button 
                className="remove-file" 
                onClick={() => removeFile(index)}
                title="Remove file"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button 
        className="analyze-btn"
        onClick={handleAnalyze}
        disabled={files.length === 0 || loading}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            {uploadStatus || 'Processing...'}
          </>
        ) : (
          <>
            <i className="fas fa-magic"></i> Analyze Files ({files.length})
          </>
        )}
      </button>
    </div>
  )
}

export default FileUpload