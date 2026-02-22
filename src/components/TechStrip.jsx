import React from 'react';
import { useTranslation } from '../i18n';

const techStack = [
  { name: 'DuckDB', color: '#ffb300' },
  { name: 'Monaco Editor', color: '#007acc' },
  { name: 'Recharts', color: '#8884d8' },
  { name: 'React', color: '#61dafb' },
  { name: 'Ollama', color: '#ffffff' },
  { name: 'Node.js', color: '#68a063' },
];

const TechStrip = () => {
  const { t } = useTranslation();
  return (
    <section className="tech-strip">
      <div className="container">
        <p className="tech-label">{t('tech.label')}</p>
        <div className="tech-logos">
          {techStack.map((tech, i) => (
            <div key={i} className="tech-item" style={{ '--tech-color': tech.color }}>
              <span className="tech-dot" style={{ background: tech.color }}></span>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-strip {
          padding: 3rem 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(0, 0, 0, 0.3);
        }

        .tech-label {
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .tech-logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .tech-item {
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all var(--transition-base);
          cursor: default;
        }

        .tech-item:hover {
          transform: translateY(-2px);
        }

        .tech-item:hover .tech-name {
          color: var(--tech-color);
        }

        .tech-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .tech-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
          letter-spacing: -0.01em;
        }

        @media (max-width: 768px) {
          .tech-logos {
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TechStrip;
