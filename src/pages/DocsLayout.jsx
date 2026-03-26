import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import DocViewer from './DocViewer';
import { FileText, Database, Share2, Eye, Bot, Code, Bug, Workflow, GitBranch, Settings } from 'lucide-react';
import { useTranslation } from '../i18n';

const docsNavigation = [
  { path: 'overview', titleKey: 'overview', file: 'overview.md', icon: <FileText size={16} /> },
  { path: 'architecture', titleKey: 'architecture', file: '1_core_architecture.md', icon: <Share2 size={16} /> },
  { path: 'db-management', titleKey: 'db-management', file: '2_database_management.md', icon: <Database size={16} /> },
  { path: 'sql-notebooks', titleKey: 'sql-notebooks', file: '3_sql_editing_notebooks.md', icon: <FileText size={16} /> },
  { path: 'data-vis', titleKey: 'data-vis', file: '4_data_visualization.md', icon: <Eye size={16} /> },
  { path: 'ai-integration', titleKey: 'ai-integration', file: '5_ai_integration.md', icon: <Bot size={16} /> },
  { path: 'debugging', titleKey: 'debugging', file: '6_debugging_io.md', icon: <Bug size={16} /> },
  { path: 'dbt-studio', titleKey: 'dbt-studio', file: '7_dbt_studio.md', icon: <Workflow size={16} /> },
  { path: 'data-engineering', titleKey: 'data-engineering', file: '8_data_engineering.md', icon: <GitBranch size={16} /> },
  { path: 'ide-configuration', titleKey: 'ide-configuration', file: '9_ide_configuration.md', icon: <Settings size={16} /> },
];

const DocsLayout = () => {
  const { t } = useTranslation();
  return (
    <div className="docs-layout container">
      <aside className="docs-sidebar">
        <h3 className="docs-sidebar-title">{t('docs.sidebarTitle')}</h3>
        <nav className="docs-nav">
          {docsNavigation.map((nav) => (
            <NavLink
              key={nav.path}
              to={`/docs/${nav.path}`}
              className={({ isActive }) => "docs-nav-link " + (isActive ? "active" : "")}
            >
              <span className="docs-nav-icon">{nav.icon}</span>
              <span>{t(`docs.items.${nav.titleKey}`)}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="docs-content-area">
        <Routes>
          <Route path="/" element={<Navigate to="overview" replace />} />
          {docsNavigation.map((nav) => (
            <Route
              key={nav.path}
              path={nav.path}
              element={<DocViewer filename={nav.file} />}
            />
          ))}
        </Routes>
      </div>

      <style>{`
        .docs-layout {
          display: flex;
          gap: 3rem;
          min-height: calc(100vh - 68px);
          padding-top: 6rem;
          padding-bottom: 4rem;
          align-items: flex-start;
        }

        .docs-sidebar {
          flex: 0 0 240px;
          position: sticky;
          top: 84px;
          border-right: 1px solid var(--border-subtle);
          padding-right: 2rem;
        }

        .docs-sidebar-title {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          font-weight: 600;
        }

        .docs-nav {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .docs-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.88rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          font-weight: 450;
        }

        .docs-nav-icon {
          display: flex;
          align-items: center;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .docs-nav-link:hover {
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
        }

        .docs-nav-link:hover .docs-nav-icon {
          color: var(--text-secondary);
        }

        .docs-nav-link.active {
          background: rgba(0, 229, 255, 0.08);
          color: var(--accent-cyan);
          font-weight: 550;
        }

        .docs-nav-link.active .docs-nav-icon {
          color: var(--accent-cyan);
        }

        .docs-content-area {
          flex: 1;
          min-width: 0;
          padding-bottom: 4rem;
        }

        @media (max-width: 768px) {
          .docs-layout {
            flex-direction: column;
          }
          .docs-sidebar {
            flex: none;
            position: static;
            border-right: none;
            border-bottom: 1px solid var(--border-subtle);
            padding-right: 0;
            padding-bottom: 1.5rem;
            width: 100%;
          }
          .docs-nav {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 4px;
          }
          .docs-nav-link {
            padding: 6px 12px;
            font-size: 0.82rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DocsLayout;
