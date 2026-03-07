import React from 'react';
import { Download, ArrowRight, Monitor, Code, Shield, Heart } from 'lucide-react';
import { useTranslation } from '../i18n';
import { trackEvent } from '../analytics';

const DownloadCTA = () => {
  const { t } = useTranslation();
  return (
    <section className="cta-section section">
      <div className="cta-bg-effects">
        <div className="cta-orb cta-orb-1"></div>
        <div className="cta-orb cta-orb-2"></div>
      </div>

      <div className="container cta-content">
        <div className="animate-fade-in text-center">
          <h2 className="cta-title">
            {t('cta.title1')}{' '}
            <span className="gradient-text">{t('cta.title2')}</span>?
          </h2>
          <p className="cta-subtitle">
            {t('cta.subtitle')}
          </p>

          <div className="cta-actions">
            <a
              href="https://github.com/dsandovalflavio/amoxsql/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glowing cta-btn-main"
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
          padding: 8rem 0;
        }

        .cta-bg-effects {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .cta-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
        }

        .cta-orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 212, 155, 0.08) 0%, transparent 70%);
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
        }

        .cta-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0, 218, 255, 0.06) 0%, transparent 70%);
          bottom: -200px;
          right: 10%;
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }

        .cta-subtitle {
          font-size: 1.15rem;
          color: var(--text-muted);
          max-width: 550px;
          margin: 0 auto 2.5rem auto;
          line-height: 1.7;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .cta-btn-main {
          font-size: 1.1rem;
          padding: 1.1rem 2.5rem;
        }

        .btn-sponsor {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 1.05rem;
          padding: 1.05rem 2.2rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(219, 39, 119, 0.5);
          background: rgba(219, 39, 119, 0.1);
          color: #f472b6;
          text-decoration: none;
          font-weight: 600;
          transition: all var(--transition-base);
        }

        .btn-sponsor:hover {
          border-color: rgba(219, 39, 119, 0.6);
          background: rgba(219, 39, 119, 0.14);
          color: #f9a8d4;
          box-shadow: 0 4px 20px rgba(219, 39, 119, 0.12);
          transform: translateY(-2px);
        }

        .cta-badges {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.02);
        }

        @media (max-width: 480px) {
          .cta-badges {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default DownloadCTA;
