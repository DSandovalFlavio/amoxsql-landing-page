import React, { useState } from 'react';

const screenshots = [
  { id: 1, title: 'Recharts Data Visualizer', url: './assets/data-viz-storytelling.png' },
  { id: 2, title: 'Zero Latency Table Viewer', url: './assets/sql-table-viewer.png' },
  { id: 3, title: 'ELKJS Query Execution Plan', url: './assets/analize-execution-plan.png' }
];

const Showcase = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="showcase-section container">
      <div className="text-center animate-fade-in mb-xl">
        <h2 className="section-title">
          A Coder's <span className="gradient-text">Dream Interface</span>
        </h2>
        <p className="section-subtitle">
          Built with Monaco Editor and React, AmoxSQL provides an industrial-grade UX right on your desktop.
        </p>
      </div>

      <div className="showcase-tabs animate-fade-in delay-100">
        {screenshots.map((shot, index) => (
          <button
            key={shot.id}
            className={`tab-btn ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {shot.title}
          </button>
        ))}
      </div>

      <div className="showcase-frame animate-fade-in delay-200 glass-panel">
        {/* Fake window buttons */}
        <div className="mac-buttons">
          <span className="mac-close"></span>
          <span className="mac-min"></span>
          <span className="mac-max"></span>
        </div>
        <img
          src={screenshots[activeTab].url}
          alt={screenshots[activeTab].title}
          className="showcase-img"
          loading="lazy"
        />
      </div>

      <style>{`
        .showcase-section {
          padding-top: 6rem;
          padding-bottom: 6rem;
        }

        .showcase-tabs {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tab-btn:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.05);
        }

        .tab-btn.active {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.05);
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.1);
        }

        .showcase-frame {
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.8);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .mac-buttons {
          display: flex;
          gap: 8px;
          padding: 0 0.5rem 1rem 0.5rem;
        }

        .mac-buttons span {
          width: 12px; height: 12px;
          border-radius: 50%;
          display: inline-block;
        }

        .mac-close { background: #ff5f56; }
        .mac-min { background: #ffbd2e; }
        .mac-max { background: #27c93f; }

        .showcase-img {
          width: 100%;
          height: auto;
          border-radius: 6px;
          display: block;
          transition: opacity 0.3s ease;
        }

        .mb-xl {
          margin-bottom: 4rem;
        }
      `}</style>
    </section>
  );
};

export default Showcase;
