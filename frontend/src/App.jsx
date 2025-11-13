import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import UploadSection from './components/UploadSection'
import ResultsSection from './components/ResultsSection'
import LoadingOverlay from './components/LoadingOverlay'
import './App.css'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const resultsRef = useRef(null)

  const handleAnalysisComplete = (analysisResults) => {
    setResults(analysisResults)
    setShowSuccess(true)
    
    // Auto-scroll to results after a brief delay
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }, 500)
    
    // Hide success indicator after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading)
    if (isLoading) {
      setShowSuccess(false)
    }
  }

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <UploadSection 
          onAnalysisComplete={handleAnalysisComplete}
          onLoadingChange={handleLoadingChange}
          loading={loading}
        />
        
        {/* Success indicator */}
        {showSuccess && (
          <div className="success-banner">
            <i className="fas fa-check-circle"></i>
            <span>Analysis completed successfully!</span>
          </div>
        )}
        
        {results && (
          <div ref={resultsRef}>
            <ResultsSection results={results} />
          </div>
        )}
      </main>
      {loading && <LoadingOverlay />}
    </div>
  )
}

export default App