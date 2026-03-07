import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
    en: {
        // Navbar
        nav: {
            home: 'Home',
            features: 'Features',
            docs: 'Docs',
            sponsor: 'Sponsor',
        },

        // Hero
        hero: {
            badge: 'Built for data people · v1.6.0',
            titleMuted1: 'The Modern Codex',
            titleMuted2: 'for Local',
            titleAccent: 'Data Analysis',
            subtitle: 'A local-first, zero-latency SQL IDE that combines the power of DuckDB with offline AI, interactive notebooks, and dynamic visualizations. Your data never leaves your machine.',
            downloadBtn: 'Download for Windows',
            githubBtn: 'View on GitHub',
            statRows: 'Rows/sec',
            statOffline: 'Offline',
            statCloud: 'Cloud Deps',
        },

        // Tech Strip
        tech: {
            label: 'Powered by',
        },

        // Features
        features: {
            badge: 'Core Features',
            title1: 'Everything You Need,',
            title2: "Nothing You Don't",
            subtitle: 'Integrated modules replace an entire stack of fragmented data tools.',
            items: [
                {
                    badge: 'Monaco Editor',
                    title: 'Industrial-Grade SQL Editor',
                    description: 'Powered by the same engine behind VS Code. Get rich IntelliSense auto-completion for DuckDB dialect, multi-cursor editing, regex search & replace, and contextual execution — highlight any block and run only that selection.',
                    highlights: ['DuckDB IntelliSense', 'Multi-cursor editing', 'Partial execution', 'Code folding'],
                },
                {
                    badge: 'Data Warehouse-Style',
                    title: 'Deep Table Inspector',
                    description: 'Right-click any table for a full-screen deep dive. Four specialized tabs: Schema view with types and keys, Data Profile with statistical sparklines, paginated Preview of raw data, and the original DDL statement.',
                    highlights: ['Schema analysis', 'Data profiling', 'Sparkline quality alerts', 'DDL reverse-engineering'],
                },
                {
                    badge: 'Recharts Engine',
                    title: 'Dynamic Data Visualization',
                    description: 'Turn any query into interactive charts instantly. Line, Bar, Scatter, and Donut charts with pivot aggregation, reference lines for storytelling, smart number formatting, and 4x retina PNG export.',
                    highlights: ['6 chart types', 'Pivot & aggregation', 'Reference indicators', '4x PNG export'],
                },
                {
                    badge: 'Hybrid .sqlnb',
                    title: 'SQL Notebooks',
                    description: 'A Jupyter-like experience for SQL. Combine rich Markdown documentation with executable SQL cells. Switch to Presentation Mode to hide code and display a clean report with charts, then export to PDF.',
                    highlights: ['Markdown + SQL cells', 'Presentation mode', 'PDF export', 'Per-cell results'],
                },
                {
                    badge: 'Local & Cloud AI',
                    title: 'Zero-Hallucination AI Assistant',
                    description: 'Connect offline Ollama models (Qwen, Llama) for 100% private AI or use Google Gemini for cloud power. Smart RAG injects your real schema into prompts, enforcing DuckDB dialect to prevent AI mistakes.',
                    highlights: ['100% offline mode', 'Schema-aware RAG', 'DuckDB dialect enforced', 'Auto SQL parsing'],
                },
                {
                    badge: 'Step-Through',
                    title: 'CTE Debugger & Execution Plan',
                    description: 'Click the Play icon next to any WITH clause to inspect intermediate CTE results without rewriting your query. Visualize query performance with an interactive Elkjs-powered execution plan tree that highlights bottlenecks.',
                    highlights: ['CTE step-through', 'Elkjs plan tree', 'Bottleneck detection', 'Cost analysis'],
                },
                {
                    badge: 'DBT & Flow',
                    title: 'DBT Studio & Execution Chains',
                    description: 'Visually orchestrate local Python models and dbt-core profiles without leaving the IDE. Build sequential ETL processes via Execution Chains for native data engineering workflows.',
                    highlights: ['DBT Core Integration', 'Visual orchestration', 'Execution chains', 'Local ETL pipelines'],
                },
            ],
        },

        // AI Section
        ai: {
            badge: 'AmoxSQL AI',
            title1: 'Intelligence That',
            title2: 'Respects Your Privacy',
            subtitle: 'Choose between 100% offline local AI or cloud-powered reasoning. Either way, your schema is injected as context to prevent hallucinations.',
            localTitle: 'Local Mode',
            localBadge: '100% Offline · Ollama',
            localDesc: 'Your data never leaves your machine. Connect to a local Ollama server running models like Qwen 2.5 Coder or Llama 3.2. Perfect for regulated industries (GDPR, HIPAA).',
            localFeat1: 'Data never leaves your machine',
            localFeat2: 'Download models from within the IDE',
            cloudTitle: 'Cloud Mode',
            cloudBadge: 'Google Gemini API',
            cloudDesc: "Access Google's state-of-the-art Gemini models for superior reasoning. Built-in daily free-tier usage tracking keeps you in control of your API costs with a visual counter in the Settings panel.",
            cloudFeat1: 'State-of-the-art reasoning',
            cloudFeat2: 'Daily usage tracking built-in',
            ragTitle: 'Smart Context Engine (RAG)',
            ragDesc: "AmoxSQL doesn't just forward your text to AI. It scans your database topology in real-time, injects table schemas, column names, and types into the system prompt, and enforces DuckDB dialect rules — eliminating hallucinations and producing accurate SQL every time.",
            ragStep1: 'Schema auto-detection',
            ragStep2: 'Dynamic prompt injection',
            ragStep3: 'DuckDB dialect enforcement',
            ragStep4: 'Clean SQL output parsing',
        },

        // Use Cases
        useCases: {
            badge: 'Use Cases',
            title1: 'Built for',
            title2: 'Real Scenarios',
            subtitle: 'From strict corporate compliance to supersonic feature extraction.',
            items: [
                {
                    title: 'Privacy-First Compliance',
                    desc: 'Audit millions of transactional rows without exposing patient or corporate data to third-party clouds. 100% offline analysis ensures GDPR and HIPAA compliance.',
                },
                {
                    title: 'Zero-Latency Prototyping',
                    desc: 'Skip the pain of setting up Postgres servers. Read local Parquets and CSVs instantly — prototype ML features and visualizations in milliseconds, not hours.',
                },
                {
                    title: 'Executive Reporting',
                    desc: 'Generate interactive SQL Notebooks with charts, pivot tables, and storytelling annotations. Export pixel-perfect PDF reports for your stakeholders on the fly.',
                },
            ],
        },

        // Origin Story
        origin: {
            badge: 'Origin Story',
            title1: 'The Story Behind',
            title2: 'the Name',
            quote: 'The name "Amox" derives from the Nahuatl word',
            quoteWord: 'Amoxtli',
            quoteEnd: ', meaning "book" or "codex". These sacred repositories were used by ancient Mesoamerican scribes to record history, astronomical calculations, and knowledge.',
            desc: 'is the spiritual successor to those ancient tools — a modern, digital codex designed for the data age. The glowing glyph represents the fusion of ancient structure with modern energy: the precision of a data schema interacting with the light of clear visualizations.',
            tagline: 'Built from Latin America for the global developer community.',
        },

        // Download CTA
        cta: {
            title1: 'Ready to Transform Your',
            title2: 'Data Workflow',
            subtitle: 'Download AmoxSQL and start analyzing data locally in seconds. No cloud setup. No account needed. Just powerful SQL.',
            downloadBtn: 'Download AmoxSQL',
            sponsorBtn: 'Support the Project',
            badgeWindows: 'Windows',
            badgeSource: 'Source Available',
            badgeLocal: '100% Local',
        },

        // Footer
        footer: {
            tagline: 'The modern, local-first SQL IDE for DuckDB. Built with privacy and performance in mind.',
            tagline2: 'From Latin America to the World.',
            productHeading: 'Product',
            resourcesHeading: 'Resources',
            legalHeading: 'Legal',
            features: 'Features',
            aiAssistant: 'AI Assistant',
            download: 'Download',
            documentation: 'Documentation',
            originStory: 'Origin Story',
            license: 'Source Available License',
            createdWith: 'Created with',
            by: 'by',
            starOnGithub: 'Star on GitHub',
            sponsor: 'Sponsor',
        },

        // Docs
        docs: {
            sidebarTitle: 'Documentation',
            items: {
                overview: 'Overview',
                architecture: 'Core Architecture',
                'db-management': 'Database Management',
                'sql-notebooks': 'SQL Notebooks',
                'data-vis': 'Data Visualization',
                'ai-integration': 'AI Integration',
                debugging: 'Debugging & IO',
            },
        },
    },

    es: {
        // Navbar
        nav: {
            home: 'Inicio',
            features: 'Features',
            docs: 'Docs',
            sponsor: 'Sponsor',
        },

        // Hero
        hero: {
            badge: 'Construido para DuckDB · v1.6.0',
            titleMuted1: 'El Códice Moderno',
            titleMuted2: 'para',
            titleAccent: 'Local Data Analysis',
            subtitle: 'Un IDE SQL de latencia cero que combina el poder transaccional de DuckDB con IA offline, notebooks interactivos y data visualizations. Tus datasets nunca salen de tu máquina.',
            downloadBtn: 'Descargar para Windows',
            githubBtn: 'Ver en GitHub',
            statRows: 'Filas/seg',
            statOffline: 'Offline',
            statCloud: 'Cloud Deps',
        },

        // Tech Strip
        tech: {
            label: 'Impulsado por',
        },

        // Features
        features: {
            badge: 'Core Features',
            title1: 'Todo lo que Necesitas,',
            title2: 'Nada Extra',
            subtitle: 'Módulos integrados que reemplazan a todo un stack fragmentado de data tools.',
            items: [
                {
                    badge: 'Monaco Editor',
                    title: 'Editor SQL de Grado Industrial',
                    description: 'Impulsado por el mismo motor detrás de VS Code. IntelliSense con autocompletado para el dialecto DuckDB, edición multi-cursor, buscar y reemplazar con regex, y ejecución contextual — selecciona cualquier bloque y corre solo ese query.',
                    highlights: ['DuckDB IntelliSense', 'Multi-cursors', 'Partial Execution', 'Code folding'],
                },
                {
                    badge: 'Formato Data Warehouse',
                    title: 'Deep Table Inspector',
                    description: 'Haz clic derecho en cualquier tabla para un deep-dive visual. Cuatro pestañas especializadas: Vista del Schema con data types y foreign keys, Data Profile con quality sparklines, paginación de raw data, y el DDL statement original.',
                    highlights: ['Análisis de schema', 'Data profiling', 'Alertas de dataset', 'Ingeniería inversa DDL'],
                },
                {
                    badge: 'Motor Recharts',
                    title: 'Visualización Dinámica de Datos',
                    description: 'Convierte cualquier query en gráficos interactivos al instante. Line, Bar, Scatter y Donut charts con pivot aggregation, reference lines para data storytelling, smart number formatting y exportación PNG a 4x retina.',
                    highlights: ['6 tipos de gráficos', 'Pivot y agregación', 'Storytelling indicators', 'Exportación PNG 4x'],
                },
                {
                    badge: 'Híbrido .sqlnb',
                    title: 'SQL Notebooks',
                    description: 'Una experiencia tipo Jupyter pensada para el Data Analyst. Combina documentación en Markdown con celdas ejecutables de SQL. Cambia al Presentation Mode para simplificar la vista en un reporte nítido con dashboards locales, listo para exportación a PDF.',
                    highlights: ['Markdown + SQL cells', 'Presentation mode', 'Exportar a PDF', 'Dashboards locales'],
                },
                {
                    badge: 'IA Local y Cloud',
                    title: 'AI Assistant Libre de Alucinaciones',
                    description: 'Conecta modelos Ollama offline (Qwen, Llama) para IA 100% privada o usa Google Gemini en la nube. Un robusto motor RAG inyecta tu verdadero schema en los prompts, exigiendo dialecto DuckDB para prevenir errores de parsing.',
                    highlights: ['Modo 100% offline', 'Schema-aware RAG', 'Forced DuckDB dialect', 'Auto-parsing SQL'],
                },
                {
                    badge: 'Paso a Paso',
                    title: 'CTE Debugger y Query Plan',
                    description: 'Haz clic en el ícono de Play junto a tu cláusula WITH para inspeccionar step-by-step los resultados temporales del CTE sin retrabajar queries. Visualiza tu performance con un árbol Elkjs del Execution Plan que localiza e identifica tus bottlenecks.',
                    highlights: ['Step-through Debugging', 'Elkjs Query Plan', 'Detección de bottlenecks', 'Cost analysis'],
                },
                {
                    badge: 'DBT & Flow',
                    title: 'DBT Studio y Execution Chains',
                    description: 'Orquesta visualmente modelos locales de Python y perfiles dbt-core sin abandonar tu ambiente. Construye pipelines ordenados de extracción lógica y ETLs vía Execution Chains, apuntando a flujos óptimos de data engineering.',
                    highlights: ['Integración DBT Core', 'Visual orchestration', 'Execution chains', 'Local ETL pipelines'],
                },
            ],
        },

        // AI Section
        ai: {
            badge: 'AmoxSQL AI',
            title1: 'Inteligencia que',
            title2: 'Respeta tu Privacidad',
            subtitle: 'Elige entre un Local LLM 100% offline o razonamiento veloz Cloud. En cualquier vía, el topology-schema de tu database se inyecta por sistema garantizando precisión quirúrgica y previniendo alucinaciones de código.',
            localTitle: 'Local Mode',
            localBadge: '100% Offline · Ollama',
            localDesc: 'Tus datasets confidenciales y atributos PII nunca escapan de tu equipo lógico. Enlázalo con tu Ollama host interno que procesa modelos geniales como Qwen 2.5 Coder o Llama 3.2. Genial para compliance de alta barrera (GDPR, HIPAA).',
            localFeat1: 'Datos offline 100% salvos',
            localFeat2: 'Descarga modelos desde el IDE',
            cloudTitle: 'Cloud Mode',
            cloudBadge: 'Google Gemini API',
            cloudDesc: 'Apalanca tu analítica sobre la destreza lógica asombrosa que disponen de base los modelos Gemini. Un counter local visual en tu panel de Settings te da total Daily Usage tracking del free-tier para ahorrarte costosos gastos de API.',
            cloudFeat1: 'Razonamiento LLM avanzado',
            cloudFeat2: 'Daily usage tracking integrado',
            ragTitle: 'Smart Context Engine (RAG)',
            ragDesc: 'Amox no es un bot pasivo que empuja tu input "crudo" hacia ChatGPT. Identifica activamente el schema en tiempo real, inyecta catalog de tables y column types para guiar el system prompt evitando subconsultas ineficientes que saturen tu engine.',
            ragStep1: 'Auto-detección del schema',
            ragStep2: 'Dynamic prompt payload',
            ragStep3: 'Enforced DuckDB logic filter',
            ragStep4: 'Sanitized SQL format parsing',
        },

        // Use Cases
        useCases: {
            badge: 'Business Cases',
            title1: 'Diseñado para',
            title2: 'Data Workflows Reales',
            subtitle: 'Desde estricto Data Governance riguroso hasta exploración veloz de ML features.',
            items: [
                {
                    title: 'Data Privacy & Compliance',
                    desc: 'Analiza billones de bytes transaccionales y datos PII sensitivos localmente, esquivando riesgos directos de filtraciones corporativas o vulnerabilidad cloud en servidores externos. 100% compliance ready.',
                },
                {
                    title: 'Zero-Latency Prototyping',
                    desc: 'Rompe barreras levantando conectividad a DuckDB In-Process olvidando dependencias Dev-Ops estrictas de Postgres o Redshift remotos. Ingesta datasets crudos Parquet/CSV con carga veloz de microsegundos reales.',
                },
                {
                    title: 'Executive Reporting',
                    desc: 'Acelera y empodera el análisis ejecutivo presentando respuestas en tu SQL Notebook mezclado con librerias vectoriales D3. Exporta impresiones de alto valor on-the-fly para C-levels con PDF dashboards listos en 5 segundos.',
                },
            ],
        },

        // Origin Story
        origin: {
            badge: 'Origin Story',
            title1: 'La Historia Detrás',
            title2: 'del Códice',
            quote: 'El nombre "Amox" se deriva del vocablo náhuatl',
            quoteWord: 'Amoxtli',
            quoteEnd: ', que engloba por completo la concepción semántica de "libro" o "códice". Estos repositorios servían en la Mesoamérica histórica a modo de plataforma perdurable para registrar sabiduría cósmica intachable y observaciones abstractas.',
            desc: 'nace como una carta de amor técnica emulando dicha mística posicionado como el nuevo Códice Digital que exige verdaderamente tu tiempo de la era Data. El resplandor cian del isotipo alude a la severa rigidez estructural del "Database Schema" chocando con brillantes insights iterativos explayados y moldeables.',
            tagline: 'Desarrollado en América Latina y diseñado localmente para nutrir la comunidad internacional de datos.',
        },

        // Download CTA
        cta: {
            title1: '¿Listo para Acelerar tu',
            title2: 'Data Workflow?',
            subtitle: 'Evade burocracia pesada de infraestructuras, descarga velozmente el instalador y re-conquista visualmente tus analíticas hoy. Nada de cuentas sign-ups remotas; unicamente SQL funcional puro.',
            downloadBtn: 'Descargar AmoxSQL',
            sponsorBtn: 'Apoyar el Proyecto',
            badgeWindows: 'Windows nativo',
            badgeSource: 'Source Available',
            badgeLocal: '100% Local',
        },

        // Footer
        footer: {
            tagline: 'IDE nativo ultra optimizado en React de escritorio diseñado especialmente para dominar y escalar el motor estelar de consultas analiticas base-columnares abierto DuckDB. Filosofía central: Absoluto performance local asíncrono y data privacy impenetrable de offline mode.',
            tagline2: 'Ingeniería Latina y lógica open source exportada a desarrolladores data science global.',
            productHeading: 'Producto',
            resourcesHeading: 'Archivos Data',
            legalHeading: 'Aspecto Legal',
            features: 'Core Features',
            aiAssistant: 'AI Agent & RAG',
            download: 'Instalador Desktop',
            documentation: 'Reference Docs',
            originStory: 'Historia del Nombre',
            license: 'Licenciamiento Source Available',
            createdWith: 'Elaborado bajo café por',
            by: '',
            starOnGithub: 'Danos Star de apoyo en GitHub',
            sponsor: 'GitHub Sponsor Program',
        },

        // Docs
        docs: {
            sidebarTitle: 'Documentación',
            items: {
                overview: 'Visión General',
                architecture: 'Arquitectura Central',
                'db-management': 'Gestión de Base de Datos',
                'sql-notebooks': 'Cuadernos SQL',
                'data-vis': 'Visualización de Datos',
                'ai-integration': 'Integración IA',
                debugging: 'Depuración y E/S',
            },
        },
    },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem('amoxsql-lang') || 'en';
        } catch {
            return 'en';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('amoxsql-lang', lang);
        } catch { }
    }, [lang]);

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[lang];
        for (const k of keys) {
            value = value?.[k];
        }
        return value ?? key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
}
