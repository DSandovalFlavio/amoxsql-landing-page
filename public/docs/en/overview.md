# AmoxSQL: Overview & Presentation

## Introduction

**AmoxSQL** (version 1.9.9) is a modern, local, and high-performance Integrated Development Environment (IDE) specifically built for **DuckDB**. It is designed from its core for data engineers and analysts who require extreme speed, total privacy, and advanced exploratory analysis tools without the latency and costs associated with cloud solutions.

The project takes its name from the Nahuatl word "*Amoxtli*", which means "book" or "codex". Just as these ancient codices were the sacred repositories of history and astronomical calculations in Mesoamerica, AmoxSQL is conceived as the modern digital codex for the data age. Its emblem, a stylized glyph with a cyan glow, symbolizes structure (the precision of a database schema) interacting with light (the transformation of raw, opaque data into clear, luminous visualizations).

AmoxSQL is not just an SQL editor; it is a complete analytical platform that integrates agentic generative AI, interactive hybrid notebooks, a modular and powerful chart rendering engine, a complete DBT studio, and visual modeling tools such as ER Diagrams and data lineage graphs — all operating 100% natively and offline running on your own machine or local server.

---

## 🎯 Philosophy and Use Cases

The philosophy behind AmoxSQL is "**Local First, Maximum Performance**". This means your data never leaves your machine unless you explicitly decide to. The main motivations to use AmoxSQL are:

1. **Strict Privacy:** Healthcare, financial, or government entities can analyze their data locally without violating international data transfer policies (GDPR, HIPAA, etc.). All processing, from AI inference to aggregating Terabytes of data, occurs in local RAM at CPU/Memory speeds.
2. **Zero-Latency Analysis:** By using DuckDB, a columnar analytical database designed to be embedded (in-process), the cost of serialization and moving data through HTTP requests or TCP/IP sockets disappears. AmoxSQL can scan and import tens of millions of rows in milliseconds.
3. **Accelerated Prototyping:** With flows like Drag & Drop integration and the dynamic charting engine, "Time-to-Insight" is reduced to a fraction of the time it would take in overloaded corporate BI tools.
4. **Native Data Engineering:** Through dedicated modules like *DBT Studio*, *Execution Chains*, *ER Diagrams*, and *Data Lineage* graphs, it merges the modeling pipeline (local ETL) directly with the analysis of the results in a single application.

---

## 🏗️ Technology Stack

To guarantee world-class performance, AmoxSQL relies on a hybrid stack of web technologies and system-level software:

### Backend (Data Management and Engine)
* **Core Interpreter:** Node.js (v20+) acting as the process coordinator and asynchronous I/O manager.
* **Logic Server:** Express.js handles intermediate routing and application controllers locally, providing efficient communication APIs with the Frontend.
* **Analytical Engine:** DuckDB (via Native Node.js bindings using `@duckdb/node-api`). Queries interact directly with the C++ memory hosted by DuckDB, avoiding bottlenecks on the JavaScript Event-Loop side.

### Frontend (User Interface and Visualization)
* **UI Rendering:** React and Vite ensure extremely fast HTML DOM hydration and reactive management of the complex IDE states and multi-tab workflow.
* **Linear UI Design System:** A design system inspired by Linear, featuring design tokens, global CSS variables, and a catalog of 8 color themes and 13 customizable accents. The interface uses a *card-based floating layout* approach with subtle borders and elevated surfaces.
* **Editing Engine:** Monaco Editor (the underlying engine behind Microsoft's famous Visual Studio Code). It delivers rich IDE capabilities like DuckDB SQL syntax auto-completion with a curated function catalog, conditional variable highlighting, and multiple cursors.
* **Scientific Visualization:** Recharts, modularized in a panels architecture (`DataVisualizer/`) with renderers, overlays, and dedicated utilities. Supports 8 chart types including Combo, Funnel, and Heatmap.

### Embedded Systems, AI, and Connectivity
* **Local Agentic AI Engine:** Direct integration with standard APIs in the **Ollama** ecosystem via local REST protocols, featuring a *tool-calling* system that can automatically execute SQL, list tables, describe schemas, and generate charts.
* **Large Language Models (LLMs):** Tested compatibility with Qwen 2.5, Llama 3.1/3.2, and Gemma 2.
* **Cloud AI Integration:** Optional managed access to Google Generative AI (Gemini Flash & Pro) through the official `GoogleGenerativeAI` library with daily usage tracking.
* **Cloud Storage:** Native configuration and direct export to AWS S3 and Google Cloud Storage from the unified settings panel.

---

## 📂 Organization of Documentation Categories

The detailed technical user manuals for AmoxSQL are divided into the following nine categories. Each explains the inner workings of its subsystems granularly at both the developer and end-user levels:

1. **Core Architecture and Workflow:** Explains the project-centric philosophy, advanced Command Palette, native connection manager, multi-tab system architecture, Linear UI design system with 8 themes and 13 accents, and visual persistence.
2. **Database Management & Explorer:** Details how AmoxSQL dynamically inspects schemas, explores DuckDB Extensions, evaluates structural differences (`Schema Diff`), and visualizes entity-relationship structures (`ER Diagrams`).
3. **SQL Editing & Notebooks:** Technical analysis of the hyper-customizable Monaco Editor with a curated DuckDB functions catalog, automatic Snippets, conditional variables, query history, and the `.sqlnb` extension with its redesigned floating cells and toolbar.
4. **Dynamic Data Visualization:** Deep dive into the modular rendering engine architecture (`DataVisualizer/`), with configuration panels, advanced chart types (including Combo, Funnel, Heatmap), KPI overlays, and PNG export.
5. **Integrated AI (AmoxSQL AI):** Architecture and security of the local model via Ollama and Gemini, showcasing the new agentic *tool-calling* system, persistent conversation management, and specialized chat components.
6. **Advanced Debugging & IO:** Automated Data Quality Evaluators and interactive Data Profiler V2, CTE debuggers, multi-format import/export including Cloud Storage (S3/GCS).
7. **DBT Studio:** Comprehensive documentation of the visual environment to orchestrate local Python models and `dbt-core` profiles, with 6 dedicated sections: Setup, Config, Models, Sources, Lineage, and Commands.
8. **Data Engineering:** Sequential ETL processes via Execution Chains, interactive ER Diagrams, and Data Lineage visualization.
9. **IDE Configuration:** Complete guide to the unified parametric settings panel with 5 tabs: Appearance (8 themes, 13 accents, layout), Editor (typography, function catalog), AI (Ollama/Gemini), Cloud Storage (S3/GCS), and About.

To harness AmoxSQL to its fullest potential, it is recommended to read thoroughly through each section linked in these categories.
