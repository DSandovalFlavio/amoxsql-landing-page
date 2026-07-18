import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
    es: {
        nav: {
            capabilities: 'Capacidades',
            privacy: 'Privacidad',
            docs: 'Docs',
            github: 'GitHub',
            download: 'Descargar',
        },
        hero: {
            pill: 'Windows + macOS',
            title1: 'Tu estudio de datos completo,',
            titleAccent: 'en una sola app.',
            subtitle: 'SQL, notebooks, visualización, reportes y IA — sobre DuckDB, sin nube, en tu escritorio.',
            ctaDownload: 'Descargar gratis',
            ctaCapabilities: 'Ver capacidades',
            meta: 'Windows · macOS (beta) · compilar desde fuente es siempre gratis',
            screenshotAlt: 'El IDE de AmoxSQL: explorador de esquema, editor SQL y tabla de resultados',
        },
        bento: {
            kicker: 'Todo el flujo, sin salir',
            title: 'De la consulta al reporte final',
            subtitle: 'Ocho herramientas integradas sobre un único motor. Lo que antes eran cinco apps, aquí es una.',
            cards: {
                storyFlow: {
                    title: 'Story Flow',
                    desc: 'Tipos de gráfico en un flujo de 6 etapas: anotaciones, KPIs, énfasis y narrativa. Los datos cuentan su historia.',
                },
                dataFlow: {
                    title: 'Data Flow',
                    desc: 'Nodos para construir pipelines visuales (DAG) con ejecución por pasos y enriquecimiento con IA.',
                },
                ai: {
                    title: 'IA agéntica',
                    desc: 'Asistente + Deep Dive que explora tu base por sí solo. Local con Ollama o con tu proveedor de nube.',
                },
                editor: {
                    title: 'Editor SQL',
                    desc: 'Monaco con autocompletado que entiende tu esquema real — incluidas columnas de CTEs — y depuración de CTEs.',
                },
                notebooks: {
                    title: 'SQL Notebooks',
                    desc: 'Análisis narrados con celdas reactivas; export a HTML, Word y PDF.',
                },
                reportFlow: {
                    title: 'Report Flow',
                    desc: 'Presentaciones con gráficos refrescables; export a PowerPoint editable.',
                },
                dbt: {
                    title: 'DBT Studio',
                    desc: 'Modelos, sources, comandos y grafo de linaje con dbt + DuckDB.',
                },
                profiler: {
                    title: 'Perfilado & Plan',
                    desc: 'EDA con storytelling y EXPLAIN ANALYZE con pistas de optimización.',
                },
            },
        },
        local: {
            title1: 'Tus datos nunca salen de tu máquina.',
            titleAccent: 'Ni siquiera para pensar.',
            subtitle: 'El motor es DuckDB local. La IA puede ser Ollama local. La nube es opcional, nunca obligatoria.',
        },
        downloads: {
            kicker: 'Descargar',
            title: 'Instálalo hoy',
            subtitle: 'Instaladores pre-construidos en GitHub Releases · compilar desde fuente es siempre gratis.',
            windowsOs: 'Windows 10 / 11 · x64',
            windowsName: 'AmoxSQL Setup',
            windowsDetail: 'Instalador NSIS',
            windowsBtn: 'Descargar .exe',
            macOs: 'macOS · Apple Silicon',
            macDetail: 'M1–M4 · primer arranque:',
            macBtn: 'Descargar .dmg',
            beta: 'beta',
            sourceNote: '¿Prefieres el código?',
            sourceLink: 'Compila desde fuente en dos comandos →',
        },
        engine: 'Impulsado por',
        footer: {
            license: 'AmoxSQL Community License',
            amoxtli: 'Amoxtli',
            amoxtliNote: ', códice en náhuatl',
            docs: 'Documentación',
            changelog: 'Changelog',
            sponsor: 'Sponsor',
        },
    },

    en: {
        nav: {
            capabilities: 'Capabilities',
            privacy: 'Privacy',
            docs: 'Docs',
            github: 'GitHub',
            download: 'Download',
        },
        hero: {
            pill: 'Windows + macOS',
            title1: 'Your complete data studio,',
            titleAccent: 'in a single app.',
            subtitle: 'SQL, notebooks, visualization, reports and AI — on DuckDB, no cloud, on your desktop.',
            ctaDownload: 'Download free',
            ctaCapabilities: 'See capabilities',
            meta: 'Windows · macOS (beta) · building from source is always free',
            screenshotAlt: 'The AmoxSQL IDE: schema explorer, SQL editor and results table',
        },
        bento: {
            kicker: 'The whole workflow, in one place',
            title: 'From query to final report',
            subtitle: 'Eight integrated tools on a single engine. What used to be five apps is one here.',
            cards: {
                storyFlow: {
                    title: 'Story Flow',
                    desc: 'Chart types in a 6-stage flow: annotations, KPIs, emphasis and narrative. Your data tells its story.',
                },
                dataFlow: {
                    title: 'Data Flow',
                    desc: 'Node types to build visual pipelines (DAG) with step execution and AI enrichment.',
                },
                ai: {
                    title: 'Agentic AI',
                    desc: 'Assistant + Deep Dive that explores your database on its own. Local with Ollama or with your cloud provider.',
                },
                editor: {
                    title: 'SQL editor',
                    desc: 'Monaco with autocomplete that understands your real schema — including CTE columns — plus CTE debugging.',
                },
                notebooks: {
                    title: 'SQL Notebooks',
                    desc: 'Narrated analyses with reactive cells; export to HTML, Word and PDF.',
                },
                reportFlow: {
                    title: 'Report Flow',
                    desc: 'Presentations with refreshable charts; export to editable PowerPoint.',
                },
                dbt: {
                    title: 'DBT Studio',
                    desc: 'Models, sources, commands and a lineage graph with dbt + DuckDB.',
                },
                profiler: {
                    title: 'Profiling & Plan',
                    desc: 'Storytelling EDA and EXPLAIN ANALYZE with optimization hints.',
                },
            },
        },
        local: {
            title1: 'Your data never leaves your machine.',
            titleAccent: 'Not even to think.',
            subtitle: 'The engine is local DuckDB. The AI can be local Ollama. The cloud is optional, never required.',
        },
        downloads: {
            kicker: 'Download',
            title: 'Install it today',
            subtitle: 'Pre-built installers on GitHub Releases · building from source is always free.',
            windowsOs: 'Windows 10 / 11 · x64',
            windowsName: 'AmoxSQL Setup',
            windowsDetail: 'NSIS installer',
            windowsBtn: 'Download .exe',
            macOs: 'macOS · Apple Silicon',
            macDetail: 'M1–M4 · first launch:',
            macBtn: 'Download .dmg',
            beta: 'beta',
            sourceNote: 'Prefer the code?',
            sourceLink: 'Build from source in two commands →',
        },
        engine: 'Powered by',
        footer: {
            license: 'AmoxSQL Community License',
            amoxtli: 'Amoxtli',
            amoxtliNote: ', codex in Nahuatl',
            docs: 'Documentation',
            changelog: 'Changelog',
            sponsor: 'Sponsor',
        },
    },
};

const LanguageContext = createContext(null);

function detectLang() {
    try {
        const saved = localStorage.getItem('amoxsql-landing-lang');
        if (saved === 'es' || saved === 'en') return saved;
    } catch { /* localStorage no disponible */ }
    const nav = (typeof navigator !== 'undefined' && navigator.language) || 'en';
    return nav.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(detectLang);

    useEffect(() => {
        document.documentElement.lang = lang;
        try { localStorage.setItem('amoxsql-landing-lang', lang); } catch { /* noop */ }
    }, [lang]);

    const setLang = (next) => setLangState(next === 'es' ? 'es' : 'en');

    // t('hero.title1') → valor (string u objeto) siguiendo la ruta con puntos
    const t = (path) => path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), translations[lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components -- provider y hook conviven a propósito
export function useTranslation() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
    return ctx;
}
