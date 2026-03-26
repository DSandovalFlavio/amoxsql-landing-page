import React from 'react';
import { Wifi, WifiOff, Shield, Zap, Bot, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n';

const AiSection = () => {
  const { t } = useTranslation();
  return (
    <section className="ai-section section" id="ai">
      <div className="container">
        <div className="section-header text-center animate-fade-in">
          <div className="section-badge">
            <Bot size={14} style={{ color: 'var(--accent-green)' }} />
            {t('ai.badge')}
          </div>
          <h2 className="section-title">
            {t('ai.title1')}{' '}
            <span className="text-primary">{t('ai.title2')}</span>
          </h2>
          <p className="section-subtitle">
            {t('ai.subtitle')}
          </p>
        </div>

        <div className="ai-grid animate-fade-in delay-200">
          {/* Local Card */}
          <div className="ai-card ai-card-local">
            <div className="ai-card-header">
              <div className="ai-mode-icon ai-icon-local">
                <WifiOff size={24} />
              </div>
              <div>
                <h3 className="ai-card-title">{t('ai.localTitle')}</h3>
                <p className="ai-card-badge">{t('ai.localBadge')}</p>
              </div>
            </div>
            <p className="ai-card-desc">
              {t('ai.localDesc')}
            </p>
            <div className="ai-models">
              <div className="ai-model">
                <span className="model-name font-mono">Qwen 2.5 (1.5B)</span>
                <span className="model-ram">~1.4 GB RAM</span>
              </div>
              <div className="ai-model">
                <span className="model-name font-mono">Llama 3.2 (3B)</span>
                <span className="model-ram">~2.0 GB RAM</span>
              </div>
              <div className="ai-model">
                <span className="model-name font-mono">Llama 3.1 (8B)</span>
                <span className="model-ram">~5.0 GB RAM</span>
              </div>
            </div>
            <div className="ai-feature-list">
              <div className="ai-feat"><Shield size={14} className="accent-green" /> {t('ai.localFeat1')}</div>
              <div className="ai-feat"><Zap size={14} className="accent-green" /> {t('ai.localFeat2')}</div>
            </div>
          </div>

          {/* Cloud Card */}
          <div className="ai-card ai-card-cloud">
            <div className="ai-card-header">
              <div className="ai-mode-icon ai-icon-cloud">
                <Wifi size={24} />
              </div>
              <div>
                <h3 className="ai-card-title">{t('ai.cloudTitle')}</h3>
                <p className="ai-card-badge">{t('ai.cloudBadge')}</p>
              </div>
            </div>
            <p className="ai-card-desc">
              {t('ai.cloudDesc')}
            </p>
            <div className="ai-models">
              <div className="ai-model">
                <span className="model-name font-mono">Gemini Flash Lite</span>
                <span className="model-ram">Free tier</span>
              </div>
              <div className="ai-model">
                <span className="model-name font-mono">Gemini Flash</span>
                <span className="model-ram">Free tier</span>
              </div>
              <div className="ai-model">
                <span className="model-name font-mono">Gemini Pro</span>
                <span className="model-ram">Free tier</span>
              </div>
            </div>
            <div className="ai-feature-list">
              <div className="ai-feat"><Sparkles size={14} className="accent-cyan" /> {t('ai.cloudFeat1')}</div>
              <div className="ai-feat"><Zap size={14} className="accent-cyan" /> {t('ai.cloudFeat2')}</div>
            </div>
          </div>
        </div>

        {/* RAG Section */}
        <div className="rag-section animate-fade-in delay-300">
          <div className="rag-card glass-panel">
            <h3 className="rag-title">
              <Sparkles size={20} className="accent-cyan" />
              {t('ai.ragTitle')}
            </h3>
            <p className="rag-desc">
              {t('ai.ragDesc')}
            </p>
            <div className="rag-steps">
              <div className="rag-step">
                <span className="step-num font-mono">01</span>
                <span className="step-text">{t('ai.ragStep1')}</span>
              </div>
              <div className="rag-step">
                <span className="step-num font-mono">02</span>
                <span className="step-text">{t('ai.ragStep2')}</span>
              </div>
              <div className="rag-step">
                <span className="step-num font-mono">03</span>
                <span className="step-text">{t('ai.ragStep3')}</span>
              </div>
              <div className="rag-step">
                <span className="step-num font-mono">04</span>
                <span className="step-text">{t('ai.ragStep4')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ai-section {
          background: linear-gradient(180deg, var(--bg-base) 0%, rgba(10, 15, 20, 0.25) 50%, var(--bg-base) 100%);
        }

        .ai-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        .ai-card {
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          background: var(--surface-card);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: all var(--transition-base);
        }

        .ai-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
        }

        .ai-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ai-mode-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ai-icon-local {
          background: rgba(0, 212, 155, 0.08);
          border: 1px solid rgba(0, 212, 155, 0.16);
          color: var(--accent-green);
        }

        .ai-icon-cloud {
          background: rgba(0, 218, 255, 0.08);
          border: 1px solid rgba(0, 218, 255, 0.16);
          color: var(--accent-cyan);
        }

        .ai-card-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin: 0;
        }

        .ai-card-badge {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
          margin: 0;
        }

        .ai-card-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.65;
        }

        .ai-models {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ai-model {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
        }

        .model-name {
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .model-ram {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .ai-feature-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: auto;
        }

        .ai-feat {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        /* RAG */
        .rag-section {
          margin-top: 1.5rem;
        }

        .rag-card {
          padding: 3rem;
        }

        .rag-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.35rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .rag-desc {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          max-width: 800px;
        }

        .rag-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .rag-step {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 1rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
        }

        .step-num {
          font-size: 0.9rem;
          color: var(--accent-cyan);
          font-weight: 700;
        }

        .step-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .ai-grid {
            grid-template-columns: 1fr;
          }
          .rag-steps {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .rag-steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default AiSection;
