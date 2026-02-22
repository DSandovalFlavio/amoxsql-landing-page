import React from 'react';
import { Layers, Bot, Database, Edit3, PieChart, Bug } from 'lucide-react';

const docCategories = [
    {
        title: 'Core Workflow & Architecture',
        description: 'Learn about the project-centric workflow, multi-tab architecture, and robust DuckDB connection management that prevents "zombie" connections.',
        icon: <Layers size={24} className="accent-text-cyan" />
    },
    {
        title: 'AmoxSQL AI Integration',
        description: '100% Offline & Private Local Mode (Ollama) or Cloud Power (Gemini API). Smart Context injection directly into the Prompt System reading your schema.',
        icon: <Bot size={24} className="accent-text-green" />
    },
    {
        title: 'Database Management',
        description: 'In-Memory mode and persistent connections. Deep dive into the Data Warehouse style Table Inspector for instant statistics and DDL generation.',
        icon: <Database size={24} className="accent-text-cyan" />
    },
    {
        title: 'SQL Editing & Notebooks',
        description: 'Powered by Monaco Editor. Combine Markdown execution and rich SQL in hybrid Jupyter-style notebooks (.sqlnb) with PDF Presentation export.',
        icon: <Edit3 size={24} className="accent-text-green" />
    },
    {
        title: 'Data Visualization',
        description: 'Instant visualizations using Recharts. Persistent (.amoxvis) dynamic charts, smart group-by aggregations, and high-quality retina PNG exports.',
        icon: <PieChart size={24} className="accent-text-cyan" />
    },
    {
        title: 'Advanced Debugging Tools',
        description: 'Troubleshoot complex queries with an interactive CTE Step-Through Debugger and visually diagnose bottlenecks via the Elkjs Query Execution Plan.',
        icon: <Bug size={24} className="accent-text-green" />
    }
];

const Documentation = () => {
    return (
        <section className="docs-section container border-t" id="docs">
            <div className="docs-header animate-fade-in text-center">
                <h2 className="section-title">
                    Comprehensive <span className="gradient-text">Documentation</span>
                </h2>
                <p className="section-subtitle">
                    Six pillars covering everything from installation to AI prompt engineering in SQL.
                </p>
            </div>

            <div className="docs-grid">
                {docCategories.map((doc, idx) => (
                    <div key={idx} className={`doc-item animate-fade-in delay-${(idx % 3) * 100}`}>
                        <div className="doc-icon-box">{doc.icon}</div>
                        <div className="doc-content">
                            <h4 className="doc-title">{doc.title}</h4>
                            <p className="doc-desc text-secondary">{doc.description}</p>
                            <a href="#read-more" className="doc-link">Read Manual &rarr;</a>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .docs-section {
          padding-top: 6rem;
          padding-bottom: 6rem;
        }

        .border-t { border-top: 1px solid var(--border-subtle); }

        .docs-header {
          margin-bottom: 4rem;
        }

        .docs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .doc-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: background 0.2s ease;
        }

        .doc-item:hover {
           background: rgba(255, 255, 255, 0.05);
        }

        .doc-icon-box {
           background: rgba(0, 0, 0, 0.3);
           padding: 12px;
           border-radius: 8px;
           border: 1px solid var(--border-subtle);
        }

        .doc-title {
           font-size: 1.125rem;
           margin-bottom: 0.5rem;
           color: var(--text-primary);
        }

        .doc-desc {
           font-size: 0.9rem;
           line-height: 1.5;
           margin-bottom: 1rem;
        }

        .doc-link {
           color: var(--text-primary);
           font-size: 0.85rem;
           font-weight: 500;
           text-decoration: none;
           padding-bottom: 2px;
           border-bottom: 1px solid transparent;
           transition: all 0.2s ease;
        }

        .doc-link:hover {
           color: var(--accent-cyan);
           border-bottom-color: var(--accent-cyan);
        }
      `}</style>
        </section>
    );
};

export default Documentation;
