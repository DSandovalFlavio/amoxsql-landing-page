<img src="./assets/logo.svg" alt="AmoxSQL Logo" width="300" height="300" align="center"/> 

# AmoxSQL (v1.9.9)

> **The Modern Codex for Local Data Analysis.**
>
> *A high-performance, local-first IDE, built from Latin America for the global developer community.*


[![Built for DuckDB](https://img.shields.io/badge/Built%20for-DuckDB-fff000?logo=duckdb&logoColor=black)](https://duckdb.org/)
[![License: Source Available](https://img.shields.io/badge/License-Source%20Available-blue)](./LICENSE)
[![Maintainer](https://img.shields.io/badge/maintainer-@dsandovalflavio-blue)](https://github.com/dsandovalflavio)

**AmoxSQL** is a professional and high-performance local data IDE built specifically for [DuckDB](https://duckdb.org/). Designed for data analysts and engineers who need speed, privacy, and advanced tools without the overhead of the cloud.

---

## 📜 The Story Behind the Name

Data is the modern form of recorded knowledge. Our project's identity is rooted in this timeless concept from ancient Mesoamerica.

The name **"Amox"** derives from the Nahuatl word ***Amoxtli***, meaning "book" or "codex". These sacred repositories were used by scribes to record history, astronomical calculations, and knowledge.

**AmoxSQL** is the spiritual successor to those ancient tools — a modern digital codex designed for the data age.

### The Emblem

The luminous glyph representing AmoxSQL symbolizes the fusion of ancient structure and modern energy.

* **The Structure:** The stylized 'A' evokes the architectural precision of an ancient glyph or a structured data schema.
* **The Light:** The electric cyan glow cuts through the IDE's dark environment, representing the tool's core promise: **to transform raw, opaque data into clear, luminous visualizations.**

---

## 🚀 Core Features

AmoxSQL is designed for speed, privacy, and a superior developer experience.

### 🎨 Linear UI Design System
* **8 Color Themes:** Obsidian, Onyx, Carbon, Graphite, Nord Dark (darks) + Ivory, Mist, Light (lights).
* **13 Accent Colors:** 7 vibrant (Cyan, Aqua, Sky, Azure, Blue, Cobalt, Linear Blue) + 6 sober (Sage, Amber, Rose, Lavender, Steel, Copper).
* **Flexible Layout:** Horizontal (default) or Vertical for ultrawide monitors.
* **Card-Based Layout:** Floating interface with subtle borders and elevated surfaces.

### 🧠 Core Architecture and Workflow
* **Project-Centric Flow**: Organize your work in project folders. The IDE auto-detects `.duckdb` or `.db` files when opening a project.
* **Multi-Tab Architecture**: Work on multiple queries and notebooks simultaneously.
* **Split View**: Compare code side-by-side or view results next to your editor.
* **Robust Connection Management**: "Hard Reset" strategy for clean switches between projects.
* **Popout Results**: Detach results to independent windows for multi-monitor environments.

### 🤖 AmoxSQL AI (Local and Cloud Agentic Intelligence)
*   **Agentic System with Tool-Calling**: The AI assistant autonomously executes tools (SQL, list tables, describe schemas, generate charts, suggest next steps).
*   **100% Offline and Private (Local)**: Powered by **Ollama** (Qwen 2.5, Llama 3.2, Gemma 2). Your data never leaves your machine.
*   **Cloud Power (Gemini Mode)**: Seamlessly switch to the Google Gemini API with daily usage tracking.
*   **Integrated Model Management**: Download new Ollama models directly from the IDE with real-time progress.
*   **Persistent Conversations**: Chat history saved between sessions with automatic compaction.
*   **Natural Language to SQL**: Ask questions like *"Show me the top 5 products by sales in 2023"* and get accurate DuckDB SQL.
*   **Smart RAG Context**: The AI automatically understands your database schema.

### 💾 Database Management and Inspection
*   **Flexible Connection Modes**: In-Memory, Read-Only, or Read/Write.
*   **Data Warehouse-style Table Inspector**: Schema, Data Profile, Preview (200 paginated rows), DDL.
*   **Interactive ER Diagrams**: Automatic SVG visualization of tables and relationships with drag, zoom, and DDL generation.
*   **Intuitive Drag & Drop**: Drag tables or columns from the sidebar directly into the SQL editor.
*   **Enhanced Results Table**: Global search, column sorting, native data types, free resizing.
*   **Save to Database**: Materialize results as `TABLE` or `VIEW` directly.

### 🏗️ DBT Studio and Data Engineering
*   **Full dbt Integration**: Develop natively with **dbt + DuckDB**.
*   **Environment Detection**: Automatically detects Python, dbt, Conda, and Mamba.
*   **Auto-Generators**: Visual editors for dbt models, sources (`schema.yml`), and profiles (`profiles.yml`).
*   **Lineage Graph (Data Lineage)**: Interactive DAG visualization of dependencies between dbt models.
*   **Command Builder**: Execute `dbt run`, `dbt test`, `dbt compile` with real-time terminal output.
*   **Execution Chains**: Deterministic sequences of `.sql` files for local ETL pipelines.

### 📝 SQL Editing and Notebooks
* **Powerful SQL Editor**: Powered by **Monaco Editor** with a curated DuckDB function catalog + live introspection.
* **SQL Notebooks (`.sqlnb`)**: Jupyter-like experience for SQL with Markdown and SQL cells in a *card-based floating* design.
    *   **Presentation Mode**: Hides code and shows only Markdown, charts, and tables.
    *   **PDF Export**: Exports notebooks as professional PDF reports.
* **Snippets and Variables**: Built-in DuckDB snippets and parameter interpolation (`${variable_name}`).
* **Query History**: Persistent timeline of executed queries with bookmarks.
* **Premium Customization**: 6 typographies, minimap, word wrap, line numbers, adjustable font size.

### 📊 Data Visualization and IO
* **Modular Chart Engine**: Refactored architecture with dedicated configuration panels.
    * Types: Line, Bar (H/V), Scatter, Donut, Area, **Combo (Bar+Line)**, **Funnel**, **Heatmap**.
* **Persistent Configurations (`.amoxvis`)**: Save visualization designs as files in your workspace.
* **Advanced Controls**: Pivot & Aggregation, logarithmic scales, reference lines/areas, KPI headlines.
* **Numeric Formatting**: Compact (1.2K), Millions (1.2M), Currency, Percentage.
* **High-Quality Export**: PNG up to 4x scale.

### 🐛 Advanced Debugging Tools
*   **CTE Debugger**: Interactive step-through for Common Table Expressions.
*   **Execution Plan**: Hierarchical tree visualization with bottleneck detection.
*   **Data Profiler V2**: Automated EDA with histograms, distributions, quality alerts, and correlation heatmap.
*   **Multi-format Import/Export**: CSV, Parquet, JSON, Excel (XLSX).
*   **Cloud Storage**: Direct export to AWS S3 and Google Cloud Storage.

---

## 🛠️ Tech Stack

* **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Monaco Editor](https://microsoft.github.io/monaco-editor/), [Recharts](https://recharts.org/).
* **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/).
* **Database Engine**: [DuckDB](https://duckdb.org/) (via high-performance Node.js bindings).
* **AI**: [Ollama](https://ollama.ai/) (local), [Google Gemini](https://ai.google.dev/) (cloud).

---

## ⬇️ Installation and Download

### 🎉 v1.9.9 — Public Release

This software is available **free and open** to the entire community.
Download the pre-built installer for Windows directly from GitHub Releases:

👉 **[Download AmoxSQL v1.9.9](https://github.com/dsandovalflavio/amoxsql/releases)**

> **Note:** Initial beta releases include the pre-built installer for free.
> Moving forward, continuous pre-built installers will be available exclusively for [GitHub Sponsors](https://github.com/sponsors/dsandovalflavio).

### 🛠️ Build from Source (Always Free)

1. Clone the repository.
2. Ensure you have **Node.js 20+** and C++ build tools installed (for DuckDB bindings).
3. Run `npm install` and `npm run dist`.

> *Self-compiled versions do not include auto-updates or signed binaries.*

---

## ❤️ Sponsor & Support

AmoxSQL is built and maintained by a solo developer from Latin America.
If you find this tool useful, consider sponsoring the project to keep it alive and growing.

**Sponsors get:**
- 🔓 Access to a **private repository** with pre-built installers
- ⚡ **Early access** to new features
- 🗳️ **Priority** for feature requests and bug fixes
- 💬 Direct communication channel with the developer

👉 **[Become a GitHub Sponsor](https://github.com/sponsors/dsandovalflavio)**

---

## ⚖️ License

This project is source-available under the **AmoxSQL Community License**.

You may view, modify, and compile the source code for personal or educational use.
**Commercial redistribution and SaaS use are strictly prohibited.**

See the [LICENSE](./LICENSE) file for full terms.

### ®️ Trademark Notice
The name "AmoxSQL" and the AmoxSQL logo are trademarks of Flavio Sandoval.

---

<p align="center">
  Built with 💙 by <a href="https://github.com/dsandovalflavio"><strong>@dsandovalflavio</strong></a>.
  <br>
  <em>From Latin America to the World.</em>
</p>
