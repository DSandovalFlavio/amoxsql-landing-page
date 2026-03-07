# AmoxSQL: Overview & Presentation

## Introduction

**AmoxSQL** (version 1.6.0) is a modern, local, and high-performance Data Integrated Development Environment (IDE), built specifically for **DuckDB**. It is designed from its core for data engineers and analysts who require extreme speed, total privacy, and advanced exploratory analysis tools without the latency or costs associated with cloud solutions.

The project takes its name from the Nahuatl word "*Amoxtli*", which means "book" or "codex". Just as these ancient codices were the sacred repositories of history and astronomical calculations in Mesoamerica, AmoxSQL is conceived as the modern digital codex for the data era. Its emblem, a stylized glyph with a cyan glow, symbolizes structure (the precision of a database schema) interacting with light (the transformation of raw and opaque data into clear and luminous visualizations).

AmoxSQL is not just a SQL editor; it is a complete analytical platform that integrates generative artificial intelligence, hybrid interactive notebooks, and a powerful chart rendering engine, all operating 100% natively and offline under the infrastructure of your own machine or local server.

---

## 🎯 Philosophy & Use Cases

The philosophy behind AmoxSQL is "Local First, Maximum Performance". This means your data never leaves your machine unless you explicitly decide so. The main motivations for using AmoxSQL are:

1.  **Strict Privacy:** Healthcare, finance, or government companies can analyze their data locally without violating international data transfer policies (GDPR, HIPAA, etc.). All processing, from Artificial Intelligence inference to aggregating Terabytes of data, occurs in local RAM at CPU/Memory speeds.
2.  **Zero-Latency Analysis:** By using DuckDB, an analytical column-oriented database designed to be embedded (in-process), the cost of serialization and data movement through HTTP requests or TCP/IP sockets disappears. AmoxSQL can scan and import tens of millions of rows in milliseconds.
3.  **Accelerated Prototyping:** With workflows like "Drag & Drop" integration and the dynamic chart engine, "Time-to-Insight" is reduced to a fraction of the time it would take in overloaded corporate BI tools.
4.  **Native Data Engineering:** Through its dedicated modules, such as *DBT Studio* and Execution Chains, it merges the modeling pipeline (local ETL) directly with the analysis of results in a single application.

---

## 🏗️ Tech Stack

To ensure world-class performance, AmoxSQL relies on a hybrid stack of web technologies and system-level software:

### Backend (Data Management & Engine)
*   **Core Interpreter:** Node.js (v20+) acting as the process coordinator and asynchronous Input/Output (I/O) manager.
*   **Logical Server:** Express.js handles intermediate routing and local application controllers, providing efficient communication APIs with the Frontend.
*   **Analytical Engine:** DuckDB (through Native Node.js bindings via `@duckdb/node-api`). Queries interact directly with the C++ memory hosted by DuckDB, avoiding bottlenecks on the JavaScript Event-Loop side.

### Frontend (User Interface & Visualization)
*   **UI Rendering:** React and Vite ensure extremely fast DOM hydration and reactive management of complex IDE states and multi-tab workflows.
*   **Editing Engine:** Monaco Editor (the underlying engine behind Microsoft's famous Visual Studio Code). Delivers rich IDE capabilities like DuckDB SQL syntax auto-completion, conditional variable highlighting, and multi-cursors.
*   **Scientific Visualization:** Recharts. A D3-based visual composition library adapted for the React lifecycle that facilitates dynamic interactions on high-density vector charts.
*   **Styling & Themes:** A custom and strict Light/Dark Mode design system injected at the global CSS variable level, achieving a perfect, latency-free theme state switch.

### Embedded Systems & Connectivity
*   **Local AI Engine:** Direct integration with the standard APIs of the **Ollama** ecosystem via local REST protocols.
*   **Language Models (LLMs):** Tested compatibility with Qwen 2.5, Llama 3.1, and 3.2.
*   **Cloud Integration:** Optional managed access to Google Generative AI (Gemini Flash & Pro) via the official `GoogleGenerativeAI` library.

---

## 📂 Documentation Categories Organization

AmoxSQL's detailed technical manuals are divided into the following nine categories. Each explains the operation of its subsystems at a granular level for developers and end users:

1.  **Core Architecture & Workflow:** Explains the project-centric philosophy, the advanced `Command Palette`, the native connection management engine, and the multi-tab system and visual persistence architecture.
2.  **Database Management & Inspection:** Details how AmoxSQL dynamically inspects schemas, explores DuckDB Extensions, and evaluates structural differences (`Schema Diff`).
3.  **SQL Editing & Notebooks:** Analysis of the highly customizable Monaco Editor capabilities, Auto-Snippets, conditional variables, search history, and `.sqlnb` extension.
4.  **Dynamic Data Visualization & IO:** Technical deep dive into the iterative rendering engine, groupings (pivots), indicators, and PNG export.
5.  **Integrated Artificial Intelligence (AmoxSQL AI):** Architecture and security of the local model via Ollama and Gemini.
6.  **Advanced Debugging Tools & IO:** Automatic Data Quality Evaluators (`QA checks`), `Step-through Debuggers` for CTEs, and the powerful multi-format bulk import I/O pipeline.
7.  **DBT Studio:** **[NEW]** Comprehensive documentation of the visual environment to orchestrate local Python models and `dbt-core` profiles without leaving the IDE.
8.  **Data Engineering:** **[NEW]** Sequential ETL processes via Execution Chains.
9.  **IDE Configuration:** **[NEW]** Guide to the unified parametric settings panel that gives visual color and shape to the software.

To leverage AmoxSQL to its fullest potential, it is highly recommended to read in-depth each of the sections linked to these categories.
