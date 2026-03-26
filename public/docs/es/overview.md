# AmoxSQL: Overview & Presentación

## Introducción

**AmoxSQL** (versión 1.9.9) es un Entorno de Desarrollo Integrado (IDE) de datos moderno, local y de alto rendimiento, construido específicamente para **DuckDB**. Está diseñado desde su núcleo para ingenieros de datos y analistas que requieren velocidad extrema, privacidad total y herramientas avanzadas de análisis exploratorio sin la latencia ni los costos asociados a las soluciones en la nube.

El proyecto toma su nombre de la palabra náhuatl "*Amoxtli*", que significa "libro" o "códice". De la misma manera en que estos códices antiguos eran los depositarios sagrados de la historia y los cálculos astronómicos en Mesoamérica, AmoxSQL se concibe como el códice digital moderno para la era de los datos. Su emblema, un glifo estilizado con un resplandor cian, simboliza la estructura (la precisión de un esquema de base de datos) interactuando con la luz (la transformación de datos crudos y opacos en visualizaciones claras y luminosas).

AmoxSQL no es solo un editor SQL; es una plataforma analítica completa que integra inteligencia artificial generativa agéntica, cuadernos interactivos híbridos, un motor de renderizado de gráficos modular y potente, un estudio completo de DBT, y herramientas de modelado visual como Diagramas ER y grafos de linaje de datos — todo ello operando de forma 100% nativa y desconectada bajo la infraestructura de tu propia máquina o servidor local.

---

## 🎯 Filosofía y Casos de Uso

La filosofía detrás de AmoxSQL es "**Lo Local Primero, Rendimiento Máximo**". Esto significa que tus datos nunca salen de tu máquina a menos que tú lo decidas explícitamente. Las principales motivaciones para usar AmoxSQL son:

1.  **Privacidad Estricta:** Las empresas de salud, finanzas o gubernamentales pueden analizar sus datos localmente sin violar políticas de transferencia de datos internacionales (GDPR, HIPAA, etc.). Todo el procesamiento, desde la inferencia de Inteligencia Artificial hasta la agregación de Terabytes de datos, ocurre en memoria RAM local a velocidades de CPU/Memoria.
2.  **Zero-Latency Analysis (Análisis sin latencia):** Al utilizar DuckDB, una base de datos analítica orientada a columnas diseñada para ser incrustada (in-process), el costo de la serialización y el movimiento de datos a través de peticiones HTTP o sockets TCP/IP desaparece. AmoxSQL puede escanear e importar decenas de millones de filas en milisegundos.
3.  **Prototipado Acelerado:** Con flujos como la integración "Drag & Drop" (Arrastrar y soltar) y el motor dinámico de gráficos, el "Time-to-Insight" se reduce a fracciones del tiempo que tomaría en herramientas de BI corporativas sobrecargadas.
4.  **Ingeniería de Datos Nativa:** A través de sus módulos dedicados, como *DBT Studio*, las *Cadenas de Ejecución (Execution Chains)*, los *Diagramas ER* y los grafos de *Data Lineage*, fusiona el pipeline de modelado (ETL local) directo con el análisis de los resultados en una sola aplicación.

---

## 🏗️ Pila Tecnológica (Tech Stack)

Para garantizar un rendimiento de clase mundial, AmoxSQL se apoya en una pila híbrida de tecnologías web y software a nivel de sistema:

### Backend (Gestión de Datos y Motor)
*   **Intérprete Core:** Node.js (v20+) actuando como el coordinador de procesos y gestión de Entrada/Salida (I/O) asíncrona.
*   **Servidor Lógico:** Express.js maneja el enrutamiento intermedio y los controladores de la aplicación de forma local, proveyendo APIs de comunicación eficientes con el Frontend.
*   **Motor Analítico:** DuckDB (a través de *bindings* Nativos de Node.js via `@duckdb/node-api`). Las consultas interactúan directamente con la memoria C++ alojada por DuckDB, evitando cuellos de botella del lado del Event-Loop de JavaScript.

### Frontend (Interfaz de Usuario y Visualización)
*   **Renderizado UI:** React y Vite garantizan una hidratación extremadamente veloz del HTML DOM y una gestión reactiva de los estados complejos del IDE y el flujo de trabajo multi-tab.
*   **Sistema de Diseño Linear UI:** Un sistema de diseño inspirado en Linear, con tokens de diseño, variables CSS globales, y un catálogo de 8 temas de color y 13 acentos personalizables. La interfaz utiliza un enfoque de *card-based floating layout* con bordes sutiles y superficies elevadas.
*   **Motor de Edición:** Monaco Editor (el motor subyacente detrás del célebre Visual Studio Code de Microsoft). Entrega capacidades ricas de IDE como autocompletado sintáctico de DuckDB SQL con un catálogo curado de funciones, resaltado de variables condicionales y cursores múltiples.
*   **Visualización Científica:** Recharts, modularizado en una arquitectura de paneles (`DataVisualizer/`) con renderizadores, overlays, y utilidades dedicadas. Soporta 8 tipos de gráficos incluyendo Combo, Funnel y Heatmap.

### Sistemas Embebidos, IA y Conectividad
*   **Motor IA Agéntico Local:** Integración directa con las APIs estándar del ecosistema **Ollama** vía protocolos REST locales, con un sistema de *tool-calling* que permite ejecutar SQL, listar tablas, describir esquemas y generar gráficos automáticamente.
*   **Modelos de Lenguaje (LLMs):** Compatibilidad testada con Qwen 2.5, Qwen 3, Llama 3.1/3.2 y Gemma 2.
*   **Integración Nube IA:** Acceso opcional administrado de Google Generative AI (Gemini Flash & Pro) a través de la librería oficial `GoogleGenerativeAI` con tracking de uso diario.
*   **Almacenamiento Cloud:** Configuración y exportación directa hacia AWS S3 y Google Cloud Storage desde el panel unificado de ajustes.

---

## 📂 Organización de las Categorías de Documentación

Los manuales de uso técnico detallados de AmoxSQL están divididos en las siguientes nueve categorías. Cada una explica, de manera granular a nivel de desarrollador y usuario final, el funcionamiento de sus subsistemas:

1.  **Arquitectura Central y Flujo de Trabajo (Core Architecture):** Explica la filosofía centrada en proyectos, el gestor avanzado de comandos (`Command Palette`), el motor de gestión de conexiones nativas, la arquitectura del sistema multi-tab, el sistema de diseño Linear UI con 8 temas y 13 acentos, y la persistencia visual.
2.  **Gestor y Explorador de Base de Datos (Database Management):** Detalla cómo AmoxSQL inspecciona esquemas dinámicamente, explora las Extensiones de DuckDB, evalúa diferencias entre estructuras (`Schema Diff`), y visualiza relaciones entidad-relación (`ER Diagrams`).
3.  **Cuadernos y Edición SQL (SQL Editing & Notebooks):** Análisis de las capacidades del Monaco Editor hiper-personalizable con catálogo curado de funciones DuckDB, fragmentos automáticos (Snippets), variables condicionales, historial de búsquedas, y la extensión `.sqlnb` con su rediseño de celdas flotantes y barra de herramientas.
4.  **Visualización de Datos Dinámica (Data Visualization):** Inmersión técnica en la arquitectura modular del motor de renderizado (`DataVisualizer/`), con paneles de configuración, tipos avanzados de gráficos (incluyendo Combo, Funnel, Heatmap), overlays de indicadores clave y exportación a PNG.
5.  **Inteligencia Artificial Integrada (AmoxSQL AI):** Arquitectura y seguridad del modelo local vía Ollama y Gemini, con el nuevo sistema agéntico de *tool-calling*, gestión de conversaciones persistentes, y componentes de chat especializados.
6.  **Herramientas Avanzadas y Depuración (Advanced Debugging & IO):** Evaluadores de Calidad de Datos automáticos y Data Profiler V2 interactivo, depuradores de CTEs, importación/exportación multi-formato incluyendo Cloud Storage (S3/GCS).
7.  **Estudio DBT (DBT Studio):** Documentación integral del ambiente visual para orquestar modelos locales de Python y perfiles de `dbt-core`, con 6 secciones dedicadas: Setup, Config, Models, Sources, Lineage y Commands.
8.  **Ingeniería de Datos (Data Engineering):** Procesos secuenciales de ETL vía las Cadenas de Ejecución (Execution Chains), Diagramas ER interactivos, y visualización de linaje de datos (Data Lineage).
9.  **Configuración del IDE (IDE Configuration):** Guía completa del panel unificado de ajustes paramétricos con 5 pestañas: Apariencia (8 temas, 13 acentos, layout), Editor (tipografía, catálogo de funciones), IA (Ollama/Gemini), Almacenamiento Cloud (S3/GCS), y Acerca de.

Para aprovechar AmoxSQL en su mayor potencial, se recomienda leer a profundidad cada una de las secciones vinculadas a estas categorías.
