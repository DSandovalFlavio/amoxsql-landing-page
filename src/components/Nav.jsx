import React from 'react';
import { useTranslation } from '../i18n';
import { LINKS } from '../links';
import { trackEvent } from '../analytics';
import Logo from './Logo';

function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Nav() {
    const { t, lang, setLang } = useTranslation();

    const anchor = (id) => (e) => {
        e.preventDefault();
        scrollToId(id);
    };

    return (
        <nav aria-label="Principal">
            <div className="island">
                <a className="brand" href="#" onClick={anchor('top')}>
                    <Logo />
                    AmoxSQL
                </a>
                <a className="lnk" href="#capacidades" onClick={anchor('capacidades')}>{t('nav.capabilities')}</a>
                <a className="lnk" href="#privacidad" onClick={anchor('privacidad')}>{t('nav.privacy')}</a>
                <a className="lnk" href={lang === 'es' ? LINKS.docs : LINKS.docsEn} target="_blank" rel="noreferrer">{t('nav.docs')}</a>
            </div>
            <div className="island">
                <button
                    type="button"
                    className="lang-toggle"
                    onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                    aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
                >
                    {lang === 'es' ? 'EN' : 'ES'}
                </button>
                <a className="lnk" href={LINKS.github} target="_blank" rel="noreferrer">{t('nav.github')}</a>
                <a
                    className="dl-btn"
                    href="#descargar"
                    onClick={(e) => { anchor('descargar')(e); trackEvent('download_click', { location: 'nav' }); }}
                >
                    {t('nav.download')}
                </a>
            </div>
        </nav>
    );
}
