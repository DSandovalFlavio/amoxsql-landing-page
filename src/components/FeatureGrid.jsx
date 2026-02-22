import React from 'react';

const features = [
    {
        title: 'Local-First Architecture',
        description: 'Powered by DuckDB. Analyze terabytes of data directly on your machine without cloud latency or exposed data.',
        icon: '⚡',
    },
    {
        title: 'Hybrid SQL Notebooks',
        description: 'Combine markdown documentation with executable SQL blocks. Export beautiful PDF reports instantly.',
        icon: '📓',
    },
    {
        title: 'Dynamic Visualizer',
        description: 'Interactive charts using Recharts. Build pivot tables and line graphs without writing tedious GROUP BY clauses.',
        icon: '📊',
    },
    {
        title: 'Zero Alucination AI',
        description: 'Connect offline Ollama models or use Cloud Gemini. Our smart RAG feeds schema context to prevent AI mistakes.',
        icon: '🧠',
    },
];

const FeatureGrid = () => {
    return (
        <section className="features-section container" id="features">
            <div className="features-header text-center animate-fade-in">
                <h2 className="section-title">
                    Built for <span className="gradient-text text-white">Maximum Performance</span>
                </h2>
                <p className="section-subtitle">
                    Everything you need for serious data analysis without leaving your desktop.
                </p>
            </div>

            <div className="grid">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`feature-card glass-panel animate-fade-in delay-${(index % 4) * 100}`}
                    >
                        <div className="feature-icon">{feature.icon}</div>
                        <h3 className="feature-title text-white">{feature.title}</h3>
                        <p className="feature-description text-secondary">{feature.description}</p>
                    </div>
                ))}
            </div>

            <style>{`
        .features-section {
          padding-top: 6rem;
          padding-bottom: 6rem;
        }

        .features-header {
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          margin-bottom: 1rem;
          color: var(--text-secondary);
        }

        .text-white {
          color: var(--text-primary);
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .feature-card {
          padding: 2rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%);
          pointer-events: none;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          width: 50px; height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid var(--border-subtle);
        }

        .feature-title {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .feature-description {
          font-size: 0.95rem;
          line-height: 1.6;
        }
      `}</style>
        </section>
    );
};

export default FeatureGrid;
