import React from 'react';
import { Github, Heart } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    if (pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer-main">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src={`${import.meta.env.BASE_URL}assets/logo.svg`}
                alt="AmoxSQL"
                width="28"
                height="28"
              />
              <span className="footer-logo-text accent-text-cyan">AmoxSQL</span>
            </div>
            <p className="footer-tagline">
              {t('footer.tagline')}
            </p>
            <p className="footer-tagline" style={{ marginTop: '0.5rem' }}>
              <em>{t('footer.tagline2')}</em>
            </p>
          </div>

          {/* Links */}
          <div className="footer-links-group">
            <h4 className="footer-heading">{t('footer.productHeading')}</h4>
            <a href="#features" onClick={scrollTo('features')}>{t('footer.features')}</a>
            <a href="#ai" onClick={scrollTo('ai')}>{t('footer.aiAssistant')}</a>
            <a href="https://github.com/dsandovalflavio/amoxsql/releases" target="_blank" rel="noopener noreferrer">{t('footer.download')}</a>
            <a href="https://github.com/sponsors/dsandovalflavio" target="_blank" rel="noopener noreferrer" className="footer-sponsor-link">♥ {t('footer.sponsor')}</a>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">{t('footer.resourcesHeading')}</h4>
            <Link to="/docs">{t('footer.documentation')}</Link>
            <a href="https://github.com/dsandovalflavio/amoxsql" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="#story" onClick={scrollTo('story')}>{t('footer.originStory')}</a>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">{t('footer.legalHeading')}</h4>
            <span className="footer-legal-text">{t('footer.license')}</span>
            <span className="footer-legal-text">© {new Date().getFullYear()} Flavio Sandoval</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            {t('footer.createdWith')} <Heart size={14} style={{ color: '#00e5ff', verticalAlign: 'middle' }} /> {t('footer.by')}{' '}
            <a href="https://github.com/dsandovalflavio" target="_blank" rel="noopener noreferrer" className="footer-author">
              @dsandovalflavio
            </a>
          </p>
          <a
            href="https://github.com/dsandovalflavio/amoxsql"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-gh-link"
          >
            <Github size={16} />
            {t('footer.starOnGithub')}
          </a>
        </div>
      </div>

      <style>{`
        .footer-main {
          border-top: 1px solid var(--border-subtle);
          padding: 4rem 0 2rem 0;
          background: rgba(5, 5, 5, 0.6);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
        }

        .footer-logo-text {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .footer-tagline {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .footer-links-group {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-heading {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.5rem;
        }

        .footer-links-group a {
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: color var(--transition-fast);
        }

        .footer-links-group a:hover {
          color: var(--accent-cyan);
        }

        .footer-sponsor-link {
          color: #f472b6 !important;
        }

        .footer-sponsor-link:hover {
          color: #f9a8d4 !important;
        }

        .footer-legal-text {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
        }

        .footer-copyright {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .footer-author {
          color: var(--accent-cyan);
          font-weight: 500;
          transition: opacity var(--transition-fast);
        }

        .footer-author:hover {
          opacity: 0.8;
        }

        .footer-gh-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-fast);
        }

        .footer-gh-link:hover {
          color: var(--text-primary);
          border-color: var(--border-medium);
          background: rgba(255, 255, 255, 0.03);
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
