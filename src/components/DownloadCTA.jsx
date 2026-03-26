import React from 'react';
import { Download, ArrowRight, Monitor, Code, Shield, Heart } from 'lucide-react';
import { useTranslation } from '../i18n';
import { trackEvent } from '../analytics';

const DownloadCTA = () => {
  const { t } = useTranslation();
  return (
    <section className="cta-section section">
      <div className="container cta-content">
        <div className="cta-box animate-fade-in text-center">
          <h2 className="cta-title">
            {t('cta.title1')}{' '}
            <span className="text-primary">{t('cta.title2')}</span>?
          </h2>
          <p className="cta-subtitle">
            {t('cta.subtitle')}
          </p>

          <div className="cta-actions">
            <a
              href="https://github.com/dsandovalflavio/amoxsql/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary cta-btn-main"
              onClick={() => trackEvent('download_click', { location: 'cta' })}
            >
              <Download size={20} />
              {t('cta.downloadBtn')}
              <ArrowRight size={16} />
            </a>
            <a
              href="https://github.com/sponsors/dsandovalflavio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sponsor"
              onClick={() => trackEvent('sponsor_click', { location: 'cta' })}
            >
              <Heart size={18} />
              {t('cta.sponsorBtn')}
            </a>
          </div>

          <div className="cta-badges">
            <span className="cta-badge">
              <Monitor size={14} />
              {t('cta.badgeWindows')}
            </span>
            <span className="cta-badge">
              <Code size={14} />
              {t('cta.badgeSource')}
            </span>
            <span className="cta-badge">
              <Shield size={14} />
              {t('cta.badgeLocal')}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section {
          position: relative;
          overflow: hidden;
          padding: 4rem 0 10rem 0;
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-box {
          background: var(--surface-glass);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-xl);
          padding: 5rem 2rem;
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .cta-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          margin-bottom: 1.25rem;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .cta-subtitle {
          font-size: 1.15rem;
          color: var(--text-muted);
          max-width: 550px;
          margin: 0 auto 3.5rem auto;
          line-height: 1.7;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .cta-btn-main {
          font-size: 1.1rem;
          padding: 1.1rem 2.8rem;
        }

        .btn-sponsor {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 1.05rem;
          padding: 1.05rem 2.2rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          transition: all var(--transition-base);
        }

        .btn-sponsor:hover {
          border-color: var(--border-medium);
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .cta-badges {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        @media (max-width: 480px) {
          .cta-badges {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          .cta-box {
            padding: 3rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default DownloadCTA;
