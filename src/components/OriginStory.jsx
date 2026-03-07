import React from 'react';
import { useTranslation } from '../i18n';

const OriginStory = () => {
  const { t } = useTranslation();
  return (
    <section className="origin-section section" id="story">
      <div className="container">
        <div className="origin-layout animate-fade-in">
          {/* Logo Visual */}
          <div className="origin-visual">
            <div className="origin-logo-wrapper">
              <img
                src={`${import.meta.env.BASE_URL}assets/logo2.svg`}
                alt="AmoxSQL Glyph"
                className="origin-logo"
              />
              <div className="origin-glow"></div>
            </div>
          </div>

          {/* Story Content */}
          <div className="origin-content">
            <div className="section-badge">
              <span style={{ color: 'var(--accent-amber)' }}>◆</span>
              {t('origin.badge')}
            </div>
            <h2 className="origin-title">
              {t('origin.title1')}{' '}
              <span className="gradient-text-warm">{t('origin.title2')}</span>
            </h2>
            <blockquote className="origin-quote">
              <p>
                {t('origin.quote')}{' '}
                <em className="nahuatl-word">{t('origin.quoteWord')}</em>{t('origin.quoteEnd')}
              </p>
            </blockquote>
            <p className="origin-desc">
              <strong>AmoxSQL</strong> {t('origin.desc')}
            </p>
            <p className="origin-tagline">
              <span className="origin-flag">🌎</span>
              <em>{t('origin.tagline')}</em>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .origin-section {
          background: linear-gradient(
            180deg, 
            var(--bg-base) 0%, 
            rgba(18, 12, 6, 0.15) 50%, 
            var(--bg-base) 100%
          );
        }

        .origin-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
          align-items: center;
        }

        /* Logo Visual */
        .origin-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .origin-logo-wrapper {
          position: relative;
          width: 320px;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .origin-logo {
          width: 260px;
          height: 260px;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 15px rgba(0, 218, 255, 0.15));
        }

        .origin-glow {
          position: absolute;
          inset: -60px;
          border-radius: 50%;
          background: radial-gradient(
            circle, 
            rgba(0, 218, 255, 0.08) 0%, 
            rgba(0, 85, 255, 0.03) 35%, 
            transparent 65%
          );
          animation: glowPulse 5s ease-in-out infinite;
          z-index: 0;
        }

        /* Content */
        .origin-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .origin-title {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }

        .origin-quote {
          border-left: 3px solid var(--accent-amber);
          padding: 1.25rem 1.5rem;
          background: rgba(242, 153, 74, 0.03);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin: 0.5rem 0;
        }

        .origin-quote p {
          color: var(--text-primary);
          line-height: 1.7;
          font-size: 1rem;
          margin: 0;
        }

        .nahuatl-word {
          color: var(--accent-amber);
          font-style: italic;
        }

        .origin-desc {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1rem;
        }

        .origin-tagline {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }

        .origin-flag {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .origin-layout {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .origin-content {
            align-items: center;
          }
          .origin-quote {
            text-align: left;
          }
          .origin-logo-wrapper {
            width: 180px;
            height: 180px;
          }
          .origin-logo {
            width: 130px;
            height: 130px;
          }
        }
      `}</style>
    </section>
  );
};

export default OriginStory;
