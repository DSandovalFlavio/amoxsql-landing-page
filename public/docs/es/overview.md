# AmoxSQL: Overview & Presentación

## Introducción

**AmoxSQL** (versión 1.1) es un Entorno de Desarrollo Integrado (IDE) de datos moderno, local y de alto rendimiento, construido específicamente para **DuckDB**. Está diseñado desde su núcleo para ingenieros de datos y analistas que requieren velocidad extrema, privacidad total y herramientas avanzadas de análisis exploratorio sin la latencia ni los costos asociados a las soluciones en la nube.

El proyecto toma su nombre de la palabra náhuatl "*Amoxtli*", que significa "libro" o "códice". De la misma manera en que estos códices antiguos eran los depositarios sagrados de la historia y los cálculos astronómicos en Mesoamérica, AmoxSQL se concibe como el códice digital moderno para la era de los datos. Su emblema, un glifo estilizado con un resplandor cian, simboliza la estructura (la precisión de un esquema de base de datos) interactuando con la luz (la transformación de datos crudos y opacos en visualizaciones claras y luminosas).

AmoxSQL no es solo un editor SQL; es una plataforma analítica completa que integra inteligencia artificial generativa, cuadernos interactivos híbridos y un motor de renderizado de gráficos potente, todo ello operando de forma 100% nativa y desconectada bajo la infraestructura de tu propia máquina o servidor local.

---

## 🎯 Filosofía y Casos de Uso

La filosofía detrás de AmoxSQL es "Lo Local Primero, Rendimiento Máximo". Esto significa que tus datos nunca salen de tu máquina a menos que tú lo decidas explícitamente. Las principales motivaciones para usar AmoxSQL son:

1.  **Privacidad Estricta:** Las empresas de salud, finanzas o gubernamentales pueden analizar sus datos localmente sin violar políticas de transferencia de datos internacionales (GDPR, HIPAA, etc.). Todo el procesamiento, desde la inferencia de Inteligencia Artificial hasta la agregación de Terabytes de datos, ocurre en memoria RAM local a velocidades de CPU/Memoria.
2.  **Zero-Latency Analysis (Análisis sin latencia):** Al utilizar DuckDB, una base de datos analítica orientada a columnas diseñada para ser incrustada (in-process), el costo de la serialización y el movimiento de datos a través de peticiones HTTP o sockets TCP/IP desaparece. AmoxSQL puede escanear e importar decenas de millones de filas en milisegundos.
3.  **Prototipado Acelerado:** Con flujos como la integración "Drag & Drop" (Arrastrar y soltar) y el motor dinámico de gráficos, el "Time-to-Insight" se reduce a fracciones del tiempo que tomaría en herramientas de BI corporativas sobrecargadas.

---

## 🏗️ Pila Tecnológica (Tech Stack)

Para garantizar un rendimiento de clase mundial, AmoxSQL se apoya en una pila híbrida de tecnologías web y software a nivel de sistema:

### Backend (Gestión de Datos y Motor)
*   **Intérprete Core:** Node.js (v20+) actuando como el coordinador de procesos y gestión de Entrada/Salida (I/O) asíncrona.
*   **Servidor Lógico:** Express.js maneja el enrutamiento intermedio y los controladores de la aplicación de forma local, proveyendo APIs de comunicación eficientes con el Frontend.
*   **Motor Analítico:** DuckDB (a través de *bindings* Nativos de Node.js via `@duckdb/node-api`). Las consultas interactúan directamente con la memoria C++ alojada por DuckDB, evitando cuellos de botella del lado del Event-Loop de JavaScript.

### Frontend (Interfaz de Usuario y Visualización)
*   **Renderizado UI:** React y Vite garantizan una hidratación extremadamente veloz del HTML DOM y una gestión reactiva de los estados complejos del IDE y el flujo de trabajo multi-tab.
*   **Motor de Edición:** Monaco Editor (el motor subyacente detrás del célebre Visual Studio Code de Microsoft). Entrega capacidades ricas de IDE como autocompletado sintáctico de DuckDB SQL, resaltado de variables condicionales y cursores múltiples.
*   **Visualización Científica:** Recharts. Una librería de composición visual D3 adaptada para el ciclo de vida de React que facilita interacciones dinámicas en gráficos vectoriales de alta densidad.
*   **Estilizado y Temas:** Un sistema de diseño propio y rígido de Light/Dark Mode inyectado a nivel de variables de CSS globales, logrando un cambio de estado de tema perfecto sin latencia.

### Sistemas Embebidos y Conectividad
*   **Motor IA Local:** Integración directa con las APIs estándar del ecosistema **Ollama** vía protocolos REST locales.
*   **Modelos de Lenguaje (LLMs):** Compatibilidad testada con Qwen 2.5, Llama 3.1 y 3.2.
*   **Integración Nube:** Acceso opcional administrado de Google Generative AI (Gemini Flash & Pro) a través de la librería oficial `GoogleGenerativeAI`.

---

## 📂 Organización de las Categorías de Documentación

Los manuales de uso técnico detallados de AmoxSQL están divididos en las siguientes seis categorías. Cada una explica, de manera granular a nivel de desarrollador y usuario final, el funcionamiento de sus subsistemas:

1.  **Arquitectura Central y Flujo de Trabajo (Core Workflow & Architecture):** Explica la filosofía centrada en proyectos, el motor de gestión de conexiones nativas y la arquitectura del sistema multi-tab y vistas divididas.
2.  **Gestor y Explorador de Base de Datos (Database Management & Inspection):** Detalla cómo AmoxSQL inspecciona esquemas dinámicamente, maneja las conexiones RAM vs Persistencia de Disco, y detalla el funcionamiento estricto del Inspector de Tablas similar a Data Warehouse.
3.  **Cuadernos y Edición SQL (SQL Editing & Notebooks):** Un análisis intensivo de las capacidades del Monaco Editor, el diseño de la extensión propietaria `.sqlnb` y el formato de presentación para exportar Reportes PDF interactivos.
4.  **Visualización de Datos Dinámica (Data Visualization & IO):** Una inmersión técnica en el motor de renderizado de Recharts, las configuraciones persistentes `.amoxvis`, manipulaciones de ejes algorítmicas, indicadores estadísticos de referencia y exportación escalada.
5.  **Inteligencia Artificial Integrada (AmoxSQL AI):** Arquitectura y seguridad del modelo local/nube. Se revisa a detalle la construcción algorítmica y el parsing de esquemas dinámicos para el "System Prompt", así como la integración asíncrona de red para Ollama y Gemini de Google.
6.  **Herramientas Avanzadas y Depuración (Advanced Debugging Tools & IO):** Instrucciones minuciosas sobre el depurador progresivo de *Common Table Expressions* (CTE), el motor de trazado de ejecución de planes visual (`Query Execution Plan`) construido sobre el layout asíncrono Elkjs, y los canales de importación/exportación masivos.

Para aprovechar AmoxSQL en su mayor potencial, se recomienda leer a profundidad cada una de las secciones vinculados a estas categorías.
