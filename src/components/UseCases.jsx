import React from 'react';
import { ShieldCheck, Activity, LineChart } from 'lucide-react';
import { useTranslation } from '../i18n';

const icons = [
  { icon: <ShieldCheck size={28} />, accent: 'green' },
  { icon: <Activity size={28} />, accent: 'cyan' },
  { icon: <LineChart size={28} />, accent: 'green' },
];

const UseCases = () => {
  const { t } = useTranslation();
  const items = t('useCases.items');
  return (
    <section className="use-cases-section section border-t" id="use-cases">
      <div className="container">
        <div className="section-header text-center animate-fade-in">
          <div className="section-badge">
            <span style={{ color: 'var(--accent-green)' }}>◈</span>
            {t('useCases.badge')}
          </div>
          <h2 className="section-title">
            {t('useCases.title1')}{' '}
            <span className="text-primary">{t('useCases.title2')}</span>
          </h2>
          <p className="section-subtitle">
            {t('useCases.subtitle')}
          </p>
        </div>

        <div className="uc-grid">
          {icons.map((uc, i) => (
            <div
              key={i}
              className={`uc-card card animate-fade-in delay-${i * 100}`}
            >
              <div className={`uc-icon-box uc-icon-${uc.accent}`}>
                {uc.icon}
              </div>
              <h3 className="uc-title">{items[i].title}</h3>
              <p className="uc-desc">{items[i].desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .uc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .uc-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .uc-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .uc-icon-green {
          background: rgba(0, 255, 135, 0.08);
          border: 1px solid rgba(0, 255, 135, 0.2);
          color: var(--accent-green);
        }

        .uc-icon-cyan {
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.2);
          color: var(--accent-cyan);
        }

        .uc-title {
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .uc-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.65;
        }

        @media (max-width: 768px) {
          .uc-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default UseCases;
