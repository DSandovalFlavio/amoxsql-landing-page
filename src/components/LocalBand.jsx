import React from 'react';
import { useTranslation } from '../i18n';

export default function LocalBand() {
    const { t } = useTranslation();
    return (
        <div className="local-band animate-fade-in" id="privacidad">
            <h2>{t('local.title1')}<br /><b className="hl">{t('local.titleAccent')}</b></h2>
            <p className="sec-sub">{t('local.subtitle')}</p>
        </div>
    );
}
