# AmoxSQL: Overview & Presentation

## Introduction

**AmoxSQL** (version 1.1) is a modern, local, high-performance Integrated Development Environment (IDE) for data, built specifically for **DuckDB**. It is designed from its core for data engineers and analysts who require extreme speed, total privacy, and advanced exploratory analysis tools without the latency or costs associated with cloud solutions.

The project takes its name from the Nahuatl word "*Amoxtli*", meaning "book" or "codex". Just as these ancient codices were the sacred repositories of history and astronomical calculations in Mesoamerica, AmoxSQL is conceived as the modern digital codex for the data age. Its emblem, a stylized glyph with a cyan glow, symbolizes structure (the precision of a database schema) interacting with light (the transformation of raw, opaque data into clear, luminous visualizations).

AmoxSQL is not just a SQL editor; it is a complete analytical platform that integrates generative artificial intelligence, hybrid interactive notebooks, and a powerful chart rendering engine, all operating 100% natively and offline under your own machine or local server infrastructure.

---

## 🎯 Philosophy & Use Cases

The philosophy behind AmoxSQL is "Local First, Maximum Performance". This means your data never leaves your machine unless you explicitly decide so. The main motivations for using AmoxSQL are:

1.  **Strict Privacy:** Healthcare, finance, or government organizations can analyze their data locally without violating international data transfer policies (GDPR, HIPAA, etc.). All processing, from AI inference to Terabyte-scale data aggregation, occurs in local RAM at CPU/Memory speeds.
2.  **Zero-Latency Analysis:** By using DuckDB, a column-oriented analytical database designed to be embedded (in-process), the cost of serialization and data movement through HTTP requests or TCP/IP sockets disappears. AmoxSQL can scan and import tens of millions of rows in milliseconds.
3.  **Accelerated Prototyping:** With workflows like Drag & Drop integration and the dynamic chart engine, "Time-to-Insight" is reduced to fractions of the time it would take in bloated corporate BI tools.

---

## 🏗️ Tech Stack

To guarantee world-class performance, AmoxSQL relies on a hybrid stack of web technologies and system-level software:

### Backend (Data Management & Engine)
*   **Core Interpreter:** Node.js (v20+) acting as the process coordinator and asynchronous I/O manager.
*   **Logic Server:** Express.js handles intermediate routing and application controllers locally, providing efficient communication APIs with the Frontend.
*   **Analytical Engine:** DuckDB (via Native Node.js bindings through `@duckdb/node-api`). Queries interact directly with C++ memory hosted by DuckDB, avoiding bottlenecks on JavaScript's Event-Loop side.

### Frontend (User Interface & Visualization)
*   **UI Rendering:** React and Vite ensure extremely fast HTML DOM hydration and reactive management of the IDE's complex states and multi-tab workflow.
*   **Editing Engine:** Monaco Editor (the underlying engine behind Microsoft's renowned Visual Studio Code). Delivers rich IDE capabilities like DuckDB SQL syntactic auto-completion, conditional variable highlighting, and multiple cursors.
*   **Scientific Visualization:** Recharts. A D3-adapted visual composition library for React's lifecycle that facilitates dynamic interactions in high-density vector charts.
*   **Styling & Themes:** A proprietary, rigid Light/Dark Mode design system injected at the global CSS variables level, achieving a perfect theme state change with zero latency.

### Embedded Systems & Connectivity
*   **Local AI Engine:** Direct integration with the standard **Ollama** ecosystem APIs via local REST protocols.
*   **Language Models (LLMs):** Tested compatibility with Qwen 2.5, Llama 3.1, and 3.2.
*   **Cloud Integration:** Optional managed access to Google Generative AI (Gemini Flash & Pro) through the official `GoogleGenerativeAI` library.

---

## 📂 Documentation Categories

The detailed technical user manuals for AmoxSQL are divided into the following six categories. Each explains, at a granular developer and end-user level, how its subsystems work:

1.  **Core Workflow & Architecture:** Explains the project-centric philosophy, the native connection management engine, and the multi-tab system architecture with split views.
2.  **Database Management & Inspection:** Details how AmoxSQL dynamically inspects schemas, handles RAM vs Disk Persistence connections, and the strict Data Warehouse-style Table Inspector.
3.  **SQL Editing & Notebooks:** An intensive analysis of Monaco Editor capabilities, the proprietary `.sqlnb` extension design, and the presentation format for exporting interactive PDF Reports.
4.  **Dynamic Data Visualization:** A technical deep-dive into the Recharts rendering engine, persistent `.amoxvis` configurations, algorithmic axis manipulations, statistical reference indicators, and scaled exports.
5.  **Integrated Artificial Intelligence (AmoxSQL AI):** Architecture and security of the local/cloud model. Detailed review of the algorithmic construction and dynamic schema parsing for the "System Prompt", as well as asynchronous network integration for Ollama and Google Gemini.
6.  **Advanced Debugging Tools & IO:** Detailed instructions on the progressive Common Table Expressions (CTE) debugger, the visual execution plan tracing engine (`Query Execution Plan`) built on asynchronous Elkjs layout, and bulk import/export channels.

To leverage AmoxSQL to its full potential, it is recommended to read each of the sections linked to these categories in depth.
