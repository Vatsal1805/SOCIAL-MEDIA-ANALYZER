import React, { useState } from 'react'
import TextInput from './TextInput'
import FileUpload from './FileUpload'

const UploadSection = ({ onAnalysisComplete, onLoadingChange, loading }) => {
  const [activeTab, setActiveTab] = useState('text')

  return (
    <section className="upload-section">
      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Text Analysis
        </button>
        <button 
          className={`nav-tab ${activeTab === 'file' ? 'active' : ''}`}
          onClick={() => setActiveTab('file')}
        >
          File Upload
        </button>
      </div>

      {activeTab === 'text' && (
        <div className="text-section">
          <TextInput 
            onAnalysisComplete={onAnalysisComplete}
            onLoadingChange={onLoadingChange}
            loading={loading}
          />
        </div>
      )}
      
      {activeTab === 'file' && (
        <div className="file-upload-container">
          <FileUpload 
            onAnalysisComplete={onAnalysisComplete}
            onLoadingChange={onLoadingChange}
            loading={loading}
          />
        </div>
      )}
    </section>
  )
}

export default UploadSection