import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Github, Globe, Heart } from 'lucide-react';
import { LanguageProvider, useTranslation } from './i18n';
import './App.css';
import Home from './pages/Home';
import DocsLayout from './pages/DocsLayout';
import Footer from './components/Footer';

function ScrollObserver() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    const timeout = setTimeout(() => {
      document.querySelectorAll('.animate-fade-in').forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

function Navbar() {
  const { t, lang, setLang } = useTranslation();

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <img
            src={`${import.meta.env.BASE_URL}assets/logo.svg`}
            alt="AmoxSQL"
            width="30"
            height="30"
          />
          <span>AmoxSQL</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">{t('nav.home')}</Link>
          <a href="#features" className="nav-link" onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('features');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>{t('nav.features')}</a>
          <Link to="/docs" className="nav-link">{t('nav.docs')}</Link>

          <button
            className="lang-switcher"
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
          >
            <Globe size={15} />
            <span>{lang.toUpperCase()}</span>
          </button>

          <a
            href="https://github.com/sponsors/dsandovalflavio"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-sponsor-btn"
          >
            <Heart size={15} />
            {t('nav.sponsor')}
          </a>

          <a
            href="https://github.com/dsandovalflavio/amoxsql"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-gh-btn"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollObserver />
        <div className="app-container">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs/*" element={<DocsLayout />} />
          </Routes>

          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
}

export default App;
