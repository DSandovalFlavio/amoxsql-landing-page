import React from 'react';
import { useTranslation } from '../i18n';
import { useRelease } from '../useRelease';
import { LINKS } from '../links';
import { trackEvent } from '../analytics';

export default function Downloads() {
    const { t, lang } = useTranslation();
    const { version, exeUrl, dmgUrl } = useRelease();
    const installGuide = lang === 'es' ? LINKS.install : LINKS.installEn;

    return (
        <section id="descargar" className="animate-fade-in">
            <div className="wrap">
                <div className="sec-head">
                    <div className="kicker">{t('downloads.kicker')}</div>
                    <h2>{t('downloads.title')}</h2>
                    <p className="sec-sub">{t('downloads.subtitle')}</p>
                </div>
                <div className="dl-row">
                    <article className="dlc">
                        <span className="os">{t('downloads.windowsOs')}</span>
                        <h3>{t('downloads.windowsName')} {version}</h3>
                        <p>{t('downloads.windowsDetail')} · ~111 MB</p>
                        <a
                            className="btn btn-primary"
                            href={exeUrl}
                            onClick={() => trackEvent('download_click', { location: 'downloads', os: 'windows' })}
                        >
                            {t('downloads.windowsBtn')}
                        </a>
                    </article>
                    <article className="dlc">
                        <span className="os">{t('downloads.macOs')}</span>
                        <h3>AmoxSQL {version}<span className="beta">{t('downloads.beta')}</span></h3>
                        <p>{t('downloads.macDetail')} <code>xattr -cr /Applications/AmoxSQL.app</code></p>
                        <a
                            className="btn btn-ghost"
                            href={dmgUrl}
                            onClick={() => trackEvent('download_click', { location: 'downloads', os: 'mac' })}
                        >
                            {t('downloads.macBtn')}
                        </a>
                    </article>
                </div>
                <p className="dl-note">
                    {t('downloads.sourceNote')}{' '}
                    <a href={installGuide} target="_blank" rel="noreferrer">{t('downloads.sourceLink')}</a>
                </p>
            </div>
        </section>
    );
}
