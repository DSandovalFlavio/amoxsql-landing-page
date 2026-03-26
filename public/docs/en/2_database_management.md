# Database Management & Explorer

The heart of data interaction in **AmoxSQL** is the `DatabaseExplorer`, a tool designed to dynamically map DuckDB databases and offer ultra-fast metadata inspections, inspired by Cloud consoles like Google Data Warehouse.

---

## 1. Explorer Panel (`DatabaseExplorer.jsx`)

Iteratively located in the sidebar, the Database Explorer is the topographic map of your active connection. It updates by invoking native calls to `DatabaseManager.js` to iterate over the system catalog (`information_schema`).

### Visual Hierarchy
The explorer organizes the database in a classic hierarchy:
1.  **Connection Name (Local Alias):** Usually the path or the "In-Memory" indicator.
2.  **Schemas:** DuckDB typically uses a `main` schema, but AmoxSQL supports multi-schema architectures.
3.  **Tables and Views:** Listed alphabetically. Each element comes with fast interaction embedded icons:
    *   **Drag & Drop:** Users can drag the table name directly onto the `SqlEditor` canvas. The React frontend intercepts the "OnDrop" event and compiles the identifier into a safe SQL format (e.g., `"main"."my_sales"`). You can also expand tables and drag specific columns.
    *   **Quick Preview (Magnifying Glass):** Presents a super light modal window executing `SELECT * FROM table LIMIT 50`.
    *   **Delete:** Safe deletion via `DeleteConfirmModal.jsx`.
4.  **Extension Explorer (`ExtensionExplorer.jsx`):** A visual app-store listing available DuckDB packets like `spatial`, `httpfs`, `aws`. One click runs `INSTALL x; LOAD x;`.

---

## 2. Deep Inspector (`TableDetailsModal.jsx`)

When a data engineer truly needs to understand the structure and distribution of a table before doing massive JOINs, right-click or *"Details..."* context menu opens the AmoxSQL full-screen Inspector.

This abstracts highly complex metadata queries into four specialized tabs:

### Tab A: Schema
Runs an internal pragmas query (`PRAGMA table_info('table_name')`) to display a clean grid:
*   Name and DuckDB Logical Types.
*   Nullability Status (`NOT NULL`).
*   Primary/Foreign Key indicators.

### Tab B: Data Profile (Statistical Profiling V2)
A major asset: uses DuckDB's optimized `SUMMARIZE table_name` to create an async X-ray of the table.
For each column, the UI renders card components showing:
*   **Basic Distribution:** Min, Max, Avg.
*   **Quality Sparklines:** Visual alert bars that warn if there is a dangerous percentage of `NULL` values, and shows Cardinality (unique values vs total).

### Tab C: Preview (Data Grid)
Unlike the quick "Magnifying Glass", this tab manages an async pagination engine over the complete table, navigating thousands of rows (typically Limit 200/Offset X).

### Tab D: DDL (Data Definition Language)
Reverse-engineers the metadata system to show the original `CREATE TABLE (...)`.

---

## 3. Entity-Relationship Diagrams (`ErDiagram.jsx`)

A powerful addition in v1.9.9 is the interactive ER Diagram visualizer. This component automatically generates a visual map of all tables and relationships:

### Main Features
*   **Interactive SVG Rendering:** Each table is drawn with its name, type, and full catalog of columns + data types aligned to the right.
*   **Primary/Foreign Keys:** PK columns have a golden key icon (🔑); FK columns have a blue link (🔗).
*   **FK Edges:** SVG Bezier curves visually link referenced tables with arrows. Not-connected ones become dimmed when hovering over a specific table.
*   **Drag & Drop:** Freely arrange tables across the canvas.
*   **Zoom and Pan:** Controls to zoom-in/out and free scroll.
*   **DDL Generater:** Selecting a table lets the user copy its complete `CREATE TABLE` definition.
*   **Grid Auto-Layout:** Tables are positioned on an optimized grid load.

---

## 4. Computational Schema Diff (`SchemaDiffModal.jsx`)

*"What columns did I add or delete in this model vs the previous version in DBT?"*
AmoxSQL introduces a potent structural schema diff visualizer:
*   Select two tables ("Source" vs "Target").
*   React State maps the parallel async results joining the metadata.
*   Highlights green for **Additions (`+ column`)**, bright red for **Deletions (`- target`)**, and orange for **Type Changes (e.g., `VARCHAR -> INT`)**.

---

## 5. Global Search and Results Table (`ResultsTable.jsx`)

Once a script returns its JSON array, it's ingested by the `ResultsTable` (27KB+).

*   **Robust Rendering:** No UI freezing when injecting tens of thousands of cells.
*   **Native Typing:** Displays subtitled data-types (`VARCHAR`, `DECIMAL(3,2)`) below headers.
*   **Free Resizing:** Invisible handle to expand/collapse column width sizes.
*   **In-Memory Search:** Filtering 10,000 clients loaded in RAM works instantly via `Array.filter` without doing an active query to DuckDB.
*   **Cyclic Sorts:** Reorder ascending or descending directly on the client side.
*   **Popout Results:** Through `PopoutResultsPage.jsx`, results can detach to their own independent Electron window.

---

## 6. Functional "Save To Database" (`SaveToDbModal.jsx`)

If the user wants to materialize complex computed matrix responses, they can convert the grid into a Physical Table (CTAS) or a Virtual View instantly. This is great for encapsulating data outputs back into the persistence without ever exporting to CSV.
