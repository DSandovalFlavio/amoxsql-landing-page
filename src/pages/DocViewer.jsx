import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from '../i18n';

const DocViewer = ({ filename }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { lang } = useTranslation();

  useEffect(() => {
    setLoading(true);
    // Fetch the raw markdown file from the language-specific folder
    fetch(`${import.meta.env.BASE_URL}docs/${lang}/${filename}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load documentation');
        return response.text();
      })
      .then(text => setContent(text))
      .catch(err => setContent('# Error\\nFailed to load the documentation file. Please try again.'))
      .finally(() => setLoading(false));
  }, [filename, lang]);

  if (loading) {
    return (
      <div className="doc-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="markdown-body" style={{ animation: 'fadeInUp 0.5s ease forwards' }}>
      <ReactMarkdown>{content}</ReactMarkdown>

      <style>{`
        .doc-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 300px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0, 229, 255, 0.1);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DocViewer;
