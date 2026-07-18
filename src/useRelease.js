import { useEffect, useState } from 'react';
import { LINKS, FALLBACK_VERSION } from './links';

const fallback = {
    version: FALLBACK_VERSION,
    exeUrl: LINKS.releasesLatest,
    dmgUrl: LINKS.releasesLatest,
};

// Promesa cacheada a nivel de módulo: un solo fetch por visita aunque
// varios componentes usen el hook.
let releasePromise = null;

function fetchRelease() {
    if (!releasePromise) {
        releasePromise = fetch(LINKS.releasesApi)
            .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
            .then((data) => {
                const assets = data.assets || [];
                const exe = assets.find((a) => a.name.endsWith('.exe'));
                const dmg = assets.find((a) => a.name.endsWith('.dmg'));
                return {
                    version: (data.tag_name || `v${FALLBACK_VERSION}`).replace(/^v/, ''),
                    exeUrl: exe ? exe.browser_download_url : LINKS.releasesLatest,
                    dmgUrl: dmg ? dmg.browser_download_url : LINKS.releasesLatest,
                };
            })
            .catch(() => fallback);
    }
    return releasePromise;
}

/**
 * Última release de AmoxSQL (versión + links directos a .exe/.dmg).
 * Devuelve el fallback estático hasta que la API de GitHub responda.
 */
export function useRelease() {
    const [release, setRelease] = useState(fallback);

    useEffect(() => {
        let alive = true;
        fetchRelease().then((r) => { if (alive) setRelease(r); });
        return () => { alive = false; };
    }, []);

    return release;
}
