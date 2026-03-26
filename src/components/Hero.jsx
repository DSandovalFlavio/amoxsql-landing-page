import React from 'react';
import { Download, Github, ChevronRight } from 'lucide-react';
import { useTranslation } from '../i18n';
import { trackEvent } from '../analytics';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="hero-section">
      <div className="hero-bg-effects">
        <div className="hero-gradient-orb hero-orb-1"></div>
        <div className="hero-gradient-orb hero-orb-2"></div>
        <div className="hero-grid-pattern"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-text animate-fade-in">
          <div className="hero-badge section-badge">
            <span className="badge-dot"></span>
            {t('hero.badge')}
          </div>

          <h1 className="hero-title">
            <span className="hero-title-muted">{t('hero.titleMuted1')}</span>
            <br />
            <span className="hero-title-muted">{t('hero.titleMuted2')}</span>{' '}
            <span className="hero-title-accent">{t('hero.titleAccent')}</span>
          </h1>

          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>

          <div className="hero-actions">
            <a
              href="https://github.com/dsandovalflavio/amoxsql/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => trackEvent('download_click', { location: 'hero' })}
            >
              <Download size={18} />
              {t('hero.downloadBtn')}
            </a>
            <a
              href="https://github.com/dsandovalflavio/amoxsql"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              onClick={() => trackEvent('github_click', { location: 'hero' })}
            >
              <Github size={18} />
              {t('hero.githubBtn')}
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value accent-text-cyan">∞</span>
              <span className="stat-label">{t('hero.statRows')}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value accent-text-green">100%</span>
              <span className="stat-label">{t('hero.statOffline')}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value accent-text-cyan">0</span>
              <span className="stat-label">{t('hero.statCloud')}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-fade-in delay-200">
          <div className="hero-screenshot-frame">
            <div className="frame-titlebar">
              <div className="frame-dots">
                <span className="dot dot-close"></span>
                <span className="dot dot-min"></span>
                <span className="dot dot-max"></span>
              </div>
              <span className="frame-title font-mono">AmoxSQL — main.sql</span>
              <div style={{ width: 60 }}></div>
            </div>
            <img
              src={`${import.meta.env.BASE_URL}assets/02_main_ide.png`}
              alt="AmoxSQL IDE v1.9.9 interface"
              className="hero-screenshot"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 90px;
          padding-bottom: 4rem;
        }

        .hero-bg-effects {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hero-gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.2;
        }

        .hero-orb-1 {
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(0, 218, 255, 0.15) 0%, transparent 60%);
          top: -300px;
          right: -150px;
        }

        .hero-orb-2 {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(0, 212, 155, 0.12) 0%, transparent 60%);
          bottom: -250px;
          left: -150px;
        }

        .hero-grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 4rem;
        }

        .hero-text {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
          margin-bottom: 2rem;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-green);
          box-shadow: 0 0 10px var(--glow-green);
          animation: glowPulse 2s ease-in-out infinite;
        }

        .hero-title {
          font-size: clamp(2.75rem, 6.5vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.08;
          margin-bottom: 1.75rem;
        }

        .hero-title-muted {
          color: var(--text-secondary);
        }

        .hero-title-accent {
          color: var(--text-primary);
          position: relative;
        }

        .hero-title-accent::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-cyan), var(--accent-green));
          border-radius: 2px;
          opacity: 0.45;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 600px;
          margin-bottom: 2.5rem;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          font-family: var(--font-mono);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .stat-divider {
          width: 1px;
          height: 32px;
          background: var(--border-subtle);
        }

        /* IDE Screenshot Frame */
        .hero-visual {
          width: 100%;
          max-width: 1000px;
          perspective: 1000px;
        }

        .hero-screenshot-frame {
          background: var(--bg-elevated);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-medium);
          overflow: hidden;
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(0, 218, 255, 0.04);
        }

        .frame-titlebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid var(--border-subtle);
        }

        .frame-dots {
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot-close { background: #ff5f56; }
        .dot-min { background: #ffbd2e; }
        .dot-max { background: #27c93f; }

        .frame-title {
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        .hero-screenshot {
          width: 100%;
          display: block;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 80px;
          }
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }
          .hero-stats {
            gap: 1rem;
          }
          .stat-value {
            font-size: 1.2rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
