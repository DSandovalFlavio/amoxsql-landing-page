import React, { useState } from 'react';
import { Code2, Database, BarChart3, FileText, Brain, GitBranch } from 'lucide-react';
import { useTranslation } from '../i18n';

const featureConfig = [
  { id: 'editor', icon: <Code2 size={22} />, image: 'sql-to-data-viz.png', accentColor: 'cyan' },
  { id: 'inspector', icon: <Database size={22} />, image: 'table-details.png', accentColor: 'green' },
  { id: 'visualization', icon: <BarChart3 size={22} />, image: 'data-viz-storytelling.png', accentColor: 'cyan' },
  { id: 'notebooks', icon: <FileText size={22} />, image: 'sql-notebboks.png', accentColor: 'green' },
  { id: 'ai', icon: <Brain size={22} />, image: 'ollamaserttings.png', accentColor: 'cyan' },
  { id: 'debugging', icon: <GitBranch size={22} />, image: 'analize-execution-plan.png', accentColor: 'green' },
];

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const { t } = useTranslation();
  const items = t('features.items');
  const current = featureConfig[activeFeature];
  const currentText = items[activeFeature];

  return (
    <section className="features-section section" id="features">
      <div className="container">
        <div className="section-header text-center animate-fade-in">
          <div className="section-badge">
            <span style={{ color: 'var(--accent-cyan)' }}>✦</span>
            {t('features.badge')}
          </div>
          <h2 className="section-title">
            {t('features.title1')}{' '}
            <span className="text-primary">{t('features.title2')}</span>
          </h2>
          <p className="section-subtitle">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="feature-layout animate-fade-in delay-200">
          {/* Tab Navigation */}
          <div className="feature-tabs">
            {featureConfig.map((f, i) => (
              <button
                key={f.id}
                className={`feature-tab ${activeFeature === i ? 'active' : ''}`}
                onClick={() => setActiveFeature(i)}
              >
                <span className="tab-icon">{f.icon}</span>
                <span className="tab-label">{items[i].badge}</span>
              </button>
            ))}
          </div>

          {/* Feature Detail */}
          <div className="feature-detail" key={current.id}>
            <div className="feature-info">
              <div className={`feature-badge-inline accent-text-${current.accentColor}`}>
                {current.icon}
                <span>{currentText.badge}</span>
              </div>
              <h3 className="feature-name">{currentText.title}</h3>
              <p className="feature-desc">{currentText.description}</p>
              <div className="feature-highlights">
                {currentText.highlights.map((h, i) => (
                  <span key={i} className="highlight-chip">
                    <span className="chip-dot" style={{
                      background: current.accentColor === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-green)'
                    }}></span>
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="feature-preview">
              <div className="preview-frame">
                <div className="preview-titlebar">
                  <div className="preview-dots">
                    <span className="pd pd-r"></span>
                    <span className="pd pd-y"></span>
                    <span className="pd pd-g"></span>
                  </div>
                </div>
                <img
                  src={`${import.meta.env.BASE_URL}assets/${current.image}`}
                  alt={currentText.title}
                  className="preview-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .features-section {
          background: var(--bg-base);
        }

        .feature-layout {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        /* Tabs */
        .feature-tabs {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .feature-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: var(--radius-md);
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .feature-tab:hover {
          color: var(--text-secondary);
          border-color: var(--border-medium);
          background: rgba(255, 255, 255, 0.03);
        }

        .feature-tab.active {
          color: var(--accent-cyan);
          border-color: rgba(0, 229, 255, 0.4);
          background: rgba(0, 229, 255, 0.06);
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.08);
        }

        .tab-icon {
          display: flex;
          align-items: center;
        }

        .tab-label {
          white-space: nowrap;
        }

        /* Feature Detail */
        .feature-detail {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 3rem;
          align-items: center;
          animation: fadeIn 0.4s ease forwards;
        }

        .feature-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .feature-badge-inline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .feature-name {
          font-size: 1.75rem;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .feature-desc {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1rem;
        }

        .feature-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 0.5rem;
        }

        .highlight-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
        }

        .chip-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Preview */
        .feature-preview {
          width: 100%;
        }

        .preview-frame {
          background: var(--bg-elevated);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          transition: all var(--transition-slow);
        }

        .preview-frame:hover {
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.06);
          border-color: var(--border-strong);
        }

        .preview-titlebar {
          display: flex;
          align-items: center;
          padding: 10px 14px;
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid var(--border-subtle);
        }

        .preview-dots {
          display: flex;
          gap: 6px;
        }

        .pd {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .pd-r { background: #ff5f56; }
        .pd-y { background: #ffbd2e; }
        .pd-g { background: #27c93f; }

        .preview-img {
          width: 100%;
          display: block;
        }

        @media (max-width: 900px) {
          .feature-detail {
            grid-template-columns: 1fr;
          }
          .feature-info {
            order: 2;
          }
          .feature-preview {
            order: 1;
          }
          .feature-tab .tab-label {
            display: none;
          }
          .feature-tab {
            padding: 10px 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default FeatureShowcase;
