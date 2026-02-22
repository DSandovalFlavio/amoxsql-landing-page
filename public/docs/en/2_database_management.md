# Database Management & Explorer

The heart of data interaction in **AmoxSQL** is the `DatabaseExplorer`, a tool designed to dynamically map DuckDB databases and offer ultra-fast metadata inspections, inspired by Cloud consoles like Google Data Warehouse.

---

## 1. The Explorer Panel (`DatabaseExplorer.jsx`)

Located iteratively in the sidebar, the Database Explorer is the topographic map of your active connection. It updates by invoking native or in-memory calls to `DatabaseManager.js` to iterate over the system catalog (`information_schema`).

### Visual Hierarchy
The explorer organizes the database in a classic hierarchy:
1.  **Connection Name (Local Alias):** Usually the path or the "In-Memory" indicator.
2.  **Schemas:** DuckDB typically uses a `main` schema, but AmoxSQL supports multi-schema infrastructures.
3.  **Tables and Views:** Listed alphabetically. Each element comes with two embedded quick interaction icons:
    *   **Drag & Drop:** Users can drag the table name directly onto the `SqlEditor` canvas. The React frontend intercepts the "OnDrop" event and dynamically transpiles the identifier to a safe SQL format (e.g., `"main"."my_sales"`). Tables can also be expanded to drag specific columns.
    *   **Quick Preview (Magnifier):** Presents a super-lightweight modal window that executes a `SELECT * FROM table LIMIT 50`. Useful for quickly validating data shape without affecting the main editing session.

## 2. The Deep Inspector (`TableDetailsModal.jsx`)

When a data engineer needs to truly understand the structure and distribution of a table before doing massive JOINs, a double-click (or context menu *"Details..."*) on a table in the explorer opens AmoxSQL's full-screen Inspector.

This interface abstracts highly complex metadata queries into four specialized tabs:

### Tab A: Schema
Performs an internal query (`PRAGMA table_info('table_name')`) to display a clean grid with:
*   Column Name and Data Type (DuckDB Logical Types).
*   Nullability status (`NOT NULL`).
*   Primary/Foreign Key indicators.

### Tab B: Data Profile (Statistical Profiling)
This is one of AmoxSQL's highest-value features. It uses DuckDB's optimized `SUMMARIZE table_name` command to create an asynchronous X-ray of the table based on the entirety of its data.
For each column, the interface renders card-type components showing:
*   **Basic Distribution:** `Min`, `Max`, Mathematical Average (`Avg`).
*   **Quality Sparklines:** Small visual bars that visually warn if there's a dangerous percentage of `NULL` values or display the Cardinality (count of unique values), crucial for making decisions about indexing or subsequent groupings.

### Tab C: Preview (Data Grid)
Unlike the quick "Magnifier", this tab handles an asynchronous pagination engine over the complete table. It allows vertical and horizontal scrolling through thousands of records (typically paginated at *Limit 200/Offset X*), to observe the entire dataset body uninterrupted.

### Tab D: DDL (Data Definition Language)
Accesses the internal metadata system table to reverse-engineer and display the original `CREATE TABLE (...)` statement. This allows textually copying the schema design in plain text for versioning in repositories or migration scripts.

---

## 3. Global Search & Results Table (`ResultsTable.jsx`)

Once a script is executed and data returns from the backend in structured JSON format, it is ingested by the `ResultsTable`.

*   **Robust Rendering:** By not using repetitive DOM (virtual-scrolling support in massive lists), AmoxSQL can inject tens of thousands of cells from a giant `SELECT *` without freezing or collapsing React/Electron's main thread.
*   **In-Memory Search:** It has a global search bar. If a user has 10,000 results on the client side, searching for a word instantly filters over the entire matrix without re-sending the query to DuckDB, working purely on `Array.filter` over optimized JavaScript arrays.
*   **Cyclic Sorting:** Column headers are interactive, allowing ascending, descending, or returning to the natural state extracted from the source, acting as a secondary manipulator to `ORDER BY`.
