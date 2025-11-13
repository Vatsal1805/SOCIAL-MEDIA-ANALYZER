import React from 'react'

const ResultsSection = ({ results }) => {
  const { analysis, originalText, type, fileResults } = results
  const { engagementScore, suggestions, sentiment, keywords } = analysis

  const getScoreClass = (score) => {
    if (score >= 70) return 'score-high'
    if (score >= 40) return 'score-medium'
    return 'score-low'
  }

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'fa-smile'
      case 'negative': return 'fa-frown'
      default: return 'fa-meh'
    }
  }

  return (
    <section className="results-container">
      <div className="results-header">
        <span>Analysis Complete!</span>
      </div>
      
      <div className="analysis-content">
        <div className="score-display">
          <div className={`score-circle ${getScoreClass(engagementScore)}`}>
            {engagementScore}
          </div>
          <div className="score-label">Engagement Score</div>
        </div>
        
        <div className="results-grid">
          <div className="result-card">
            <h3>
              <i className="fas fa-lightbulb"></i> Suggestions
            </h3>
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="suggestion-item">
                  <div className="suggestion-category">{suggestion.category}</div>
                  <div className="suggestion-text">{suggestion.suggestion}</div>
                  <span className={`suggestion-priority priority-${suggestion.priority}`}>
                    {suggestion.priority} priority
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="result-card">
            <h3>
              <i className="fas fa-heart"></i> Sentiment Analysis
            </h3>
            <div className={`sentiment-display sentiment-${sentiment}`}>
              <i className={`fas ${getSentimentIcon(sentiment)}`}></i>
              <span>{sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}</span>
            </div>
          </div>
          
          <div className="result-card">
            <h3>
              <i className="fas fa-tags"></i> Key Topics
            </h3>
            <div className="keywords-list">
              {keywords.map((keyword, index) => (
                <span key={index} className="keyword-tag">{keyword}</span>
              ))}
            </div>
          </div>
          
          {fileResults && (
            <div className="result-card">
              <h3>
                <i className="fas fa-file-alt"></i> Processed Files
              </h3>
              <div className="processed-files">
                {fileResults.map((result, index) => (
                  <div key={index} className="processed-file">
                    <strong>{result.fileName}</strong>
                    <p>Extracted {result.extractedText.length} characters</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ResultsSection