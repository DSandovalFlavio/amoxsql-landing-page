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
            badge: 'Built for data people · v1.1',
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
            subtitle: 'Six integrated modules replace an entire stack of fragmented data tools.',
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
            features: 'Características',
            docs: 'Docs',
            sponsor: 'Patrocinar',
        },

        // Hero
        hero: {
            badge: 'Construido para DuckDB · v1.1',
            titleMuted1: 'El Códice Moderno',
            titleMuted2: 'para Análisis de',
            titleAccent: 'Datos Local',
            subtitle: 'Un IDE SQL local, de latencia cero, que combina el poder de DuckDB con IA offline, cuadernos interactivos y visualizaciones dinámicas. Tus datos nunca salen de tu máquina.',
            downloadBtn: 'Descargar para Windows',
            githubBtn: 'Ver en GitHub',
            statRows: 'Filas/seg',
            statOffline: 'Offline',
            statCloud: 'Deps en Nube',
        },

        // Tech Strip
        tech: {
            label: 'Impulsado por',
        },

        // Features
        features: {
            badge: 'Características',
            title1: 'Todo lo que Necesitas,',
            title2: 'Nada que No',
            subtitle: 'Seis módulos integrados reemplazan toda una pila de herramientas de datos fragmentadas.',
            items: [
                {
                    badge: 'Monaco Editor',
                    title: 'Editor SQL de Grado Industrial',
                    description: 'Impulsado por el mismo motor detrás de VS Code. IntelliSense con autocompletado para el dialecto DuckDB, edición multi-cursor, buscar y reemplazar con regex, y ejecución contextual — selecciona cualquier bloque y ejecuta solo esa selección.',
                    highlights: ['IntelliSense DuckDB', 'Edición multi-cursor', 'Ejecución parcial', 'Plegado de código'],
                },
                {
                    badge: 'Estilo Data Warehouse',
                    title: 'Inspector Profundo de Tablas',
                    description: 'Haz clic derecho en cualquier tabla para una inspección completa. Cuatro pestañas especializadas: Vista de esquema con tipos y claves, Perfil de datos con sparklines estadísticos, Vista previa paginada de datos crudos, y el DDL original.',
                    highlights: ['Análisis de esquema', 'Perfilado de datos', 'Alertas sparkline', 'Ingeniería inversa DDL'],
                },
                {
                    badge: 'Motor Recharts',
                    title: 'Visualización Dinámica de Datos',
                    description: 'Convierte cualquier consulta en gráficos interactivos al instante. Gráficos de Línea, Barra, Dispersión y Dona con agregación pivote, líneas de referencia para storytelling, formato inteligente de números y exportación PNG a 4x retina.',
                    highlights: ['6 tipos de gráfico', 'Pivote y agregación', 'Indicadores de referencia', 'Exportación PNG 4x'],
                },
                {
                    badge: 'Híbrido .sqlnb',
                    title: 'Cuadernos SQL',
                    description: 'Una experiencia tipo Jupyter para SQL. Combina documentación Markdown enriquecida con celdas SQL ejecutables. Cambia al Modo Presentación para ocultar código y mostrar un reporte limpio con gráficos, luego exporta a PDF.',
                    highlights: ['Celdas Markdown + SQL', 'Modo presentación', 'Exportar a PDF', 'Resultados por celda'],
                },
                {
                    badge: 'IA Local y Nube',
                    title: 'Asistente IA sin Alucinaciones',
                    description: 'Conecta modelos Ollama offline (Qwen, Llama) para IA 100% privada o usa Google Gemini para potencia en la nube. RAG inteligente inyecta tu esquema real en los prompts, forzando el dialecto DuckDB para prevenir errores.',
                    highlights: ['Modo 100% offline', 'RAG con esquema', 'Dialecto DuckDB forzado', 'Parseo SQL automático'],
                },
                {
                    badge: 'Paso a Paso',
                    title: 'Depurador CTE y Plan de Ejecución',
                    description: 'Haz clic en el ícono Play junto a cualquier cláusula WITH para inspeccionar resultados intermedios del CTE sin reescribir tu consulta. Visualiza el rendimiento con un árbol interactivo Elkjs que resalta cuellos de botella.',
                    highlights: ['Depuración paso a paso', 'Árbol Elkjs', 'Detección de cuellos', 'Análisis de costo'],
                },
            ],
        },

        // AI Section
        ai: {
            badge: 'AmoxSQL IA',
            title1: 'Inteligencia que',
            title2: 'Respeta tu Privacidad',
            subtitle: 'Elige entre IA local 100% offline o razonamiento en la nube. En ambos casos, tu esquema se inyecta como contexto para prevenir alucinaciones.',
            localTitle: 'Modo Local',
            localBadge: '100% Offline · Ollama',
            localDesc: 'Tus datos nunca salen de tu máquina. Conéctate a un servidor Ollama local ejecutando modelos como Qwen 2.5 Coder o Llama 3.2. Perfecto para industrias reguladas (GDPR, HIPAA).',
            localFeat1: 'Los datos nunca salen de tu máquina',
            localFeat2: 'Descarga modelos desde el IDE',
            cloudTitle: 'Modo Nube',
            cloudBadge: 'Google Gemini API',
            cloudDesc: 'Accede a los modelos Gemini de última generación de Google para razonamiento superior. Seguimiento de uso diario del tier gratuito integrado para controlar costos de API con un contador visual en el panel de Ajustes.',
            cloudFeat1: 'Razonamiento de última generación',
            cloudFeat2: 'Seguimiento de uso diario integrado',
            ragTitle: 'Motor de Contexto Inteligente (RAG)',
            ragDesc: 'AmoxSQL no solo reenvía tu texto a la IA. Escanea la topología de tu base de datos en tiempo real, inyecta esquemas de tablas, nombres de columnas y tipos en el prompt del sistema, y aplica las reglas del dialecto DuckDB — eliminando alucinaciones y produciendo SQL preciso cada vez.',
            ragStep1: 'Auto-detección de esquema',
            ragStep2: 'Inyección dinámica de prompt',
            ragStep3: 'Forzado de dialecto DuckDB',
            ragStep4: 'Parseo limpio de SQL',
        },

        // Use Cases
        useCases: {
            badge: 'Casos de Uso',
            title1: 'Diseñado para',
            title2: 'Escenarios Reales',
            subtitle: 'Desde cumplimiento corporativo estricto hasta extracción supersónica de features.',
            items: [
                {
                    title: 'Cumplimiento y Privacidad',
                    desc: 'Audita millones de filas transaccionales sin exponer datos de pacientes o corporativos a nubes de terceros. El análisis 100% offline asegura cumplimiento con GDPR e HIPAA.',
                },
                {
                    title: 'Prototipado sin Latencia',
                    desc: 'Evita el dolor de configurar servidores Postgres. Lee Parquets y CSVs locales al instante — prototipa features de ML y visualizaciones en milisegundos, no horas.',
                },
                {
                    title: 'Reportería Ejecutiva',
                    desc: 'Genera Cuadernos SQL interactivos con gráficos, tablas pivote y anotaciones narrativas. Exporta reportes PDF pixel-perfect para tus stakeholders al instante.',
                },
            ],
        },

        // Origin Story
        origin: {
            badge: 'Historia del Nombre',
            title1: 'La Historia Detrás',
            title2: 'del Nombre',
            quote: 'El nombre "Amox" proviene de la palabra náhuatl',
            quoteWord: 'Amoxtli',
            quoteEnd: ', que significa "libro" o "códice". Estos repositorios sagrados eran usados por los escribas de la antigua Mesoamérica para registrar historia, cálculos astronómicos y conocimiento.',
            desc: 'es el sucesor espiritual de esas herramientas ancestrales — un códice digital moderno diseñado para la era de los datos. El glifo luminoso representa la fusión de estructura ancestral con energía moderna: la precisión de un esquema de datos interactuando con la luz de visualizaciones claras.',
            tagline: 'Construido desde Latinoamérica para la comunidad global de desarrolladores.',
        },

        // Download CTA
        cta: {
            title1: '¿Listo para Transformar tu',
            title2: 'Flujo de Datos',
            subtitle: 'Descarga AmoxSQL y comienza a analizar datos localmente en segundos. Sin configuración en la nube. Sin cuenta necesaria. Solo SQL poderoso.',
            downloadBtn: 'Descargar AmoxSQL',
            sponsorBtn: 'Apoyar el Proyecto',
            badgeWindows: 'Windows',
            badgeSource: 'Código Disponible',
            badgeLocal: '100% Local',
        },

        // Footer
        footer: {
            tagline: 'El IDE SQL moderno, local-first para DuckDB. Construido con privacidad y rendimiento en mente.',
            tagline2: 'Desde Latinoamérica al Mundo.',
            productHeading: 'Producto',
            resourcesHeading: 'Recursos',
            legalHeading: 'Legal',
            features: 'Características',
            aiAssistant: 'Asistente IA',
            download: 'Descargar',
            documentation: 'Documentación',
            originStory: 'Historia del Nombre',
            license: 'Licencia Source Available',
            createdWith: 'Creado con',
            by: 'por',
            starOnGithub: 'Star en GitHub',
            sponsor: 'Patrocinar',
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
