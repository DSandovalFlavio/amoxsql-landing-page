import React from 'react';
import { useTranslation } from '../i18n';
import { useRelease } from '../useRelease';
import { trackEvent } from '../analytics';

export default function Hero() {
    const { t } = useTranslation();
    const { version } = useRelease();

    const goDownloads = (e) => {
        e.preventDefault();
        const el = document.getElementById('descargar');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        trackEvent('download_click', { location: 'hero' });
    };

    const goCapabilities = (e) => {
        e.preventDefault();
        const el = document.getElementById('capacidades');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <header id="top">
            <div className="streaks" aria-hidden="true"></div>
            <div className="wrap hero-grid">
                <div className="hero-copy">
                    <span className="ver-pill"><i></i>v{version} · {t('hero.pill')}</span>
                    <h1>{t('hero.title1')} <span className="hl">{t('hero.titleAccent')}</span></h1>
                    <p className="hero-sub">{t('hero.subtitle')}</p>
                    <div className="hero-ctas">
                        <a className="btn btn-primary" href="#descargar" onClick={goDownloads}>{t('hero.ctaDownload')}</a>
                        <a className="btn btn-ghost" href="#capacidades" onClick={goCapabilities}>{t('hero.ctaCapabilities')}</a>
                    </div>
                    <div className="hero-meta">{t('hero.meta')}</div>
                </div>

                <div className="rig">
                    <div className="ghost" aria-hidden="true">Amox</div>
                    <div className="geo geo-disc" aria-hidden="true"></div>
                    <div className="geo geo-ring" aria-hidden="true"></div>
                    <div className="geo geo-dots" aria-hidden="true"></div>
                    <span className="geo geo-plus p1" aria-hidden="true">+</span>
                    <span className="geo geo-plus p2" aria-hidden="true">+</span>

                    <div className="mbp">
                        <div className="mbp-screen">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/02_main_ide.png`}
                                alt={t('hero.screenshotAlt')}
                                width="1920"
                                height="1080"
                                fetchPriority="high"
                            />
                        </div>
                        <div className="mbp-base"></div>
                    </div>
                </div>
            </div>
        </header>
    );
}
