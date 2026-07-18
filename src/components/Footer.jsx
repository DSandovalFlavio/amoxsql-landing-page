import React from 'react';
import { useTranslation } from '../i18n';
import { LINKS } from '../links';

export default function Footer() {
    const { t, lang } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <>
            <div className="engine-strip">
                {t('engine')} <code>DuckDB</code> <code>Electron</code> <code>React</code> <code>Ollama</code>
            </div>
            <footer>
                <div>
                    © {year} Flavio Sandoval · {t('footer.license')} · <span className="hl">{t('footer.amoxtli')}</span>{t('footer.amoxtliNote')}
                </div>
                <div className="links">
                    <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
                    <a href={lang === 'es' ? LINKS.docs : LINKS.docsEn} target="_blank" rel="noreferrer">{t('footer.docs')}</a>
                    <a href={LINKS.changelog} target="_blank" rel="noreferrer">{t('footer.changelog')}</a>
                    <a href={LINKS.sponsor} target="_blank" rel="noreferrer">{t('footer.sponsor')}</a>
                </div>
            </footer>
        </>
    );
}
