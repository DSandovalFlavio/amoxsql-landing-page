# Database Management & Explorer

The heart of data interaction in **AmoxSQL** is the `DatabaseExplorer`, a tool designed to map DuckDB databases dynamically and offer ultra-fast metadata inspections, inspired by Cloud consoles like Google Data Warehouse.

---

## 1. The Explorer Panel (`DatabaseExplorer.jsx`)

Located iteratively in the sidebar, the Database Explorer is the topographic map of your active connection. It updates by invoking native or in-memory calls to `DatabaseManager.js` to iterate over the system catalog (`information_schema`).

### Visual Hierarchy
The explorer organizes the database in a classic hierarchy:
1.  **Connection Name (Local Alias):** Usually the path or the "In-Memory" indicator.
2.  **Schemas:** DuckDB typically uses a `main` schema, but AmoxSQL supports multi-schema infrastructures.
3.  **Tables & Views:** Listed alphabetically. Each element comes with two embedded quick interaction icons:
    *   **Drag & Drop:** Users can drag the table name directly onto the `SqlEditor` canvas. The React frontend intercepts the "OnDrop" event and dynamically transpiles the identifier to a safe SQL format (e.g. `"main"."my_sales"`). Tables can also be expanded to drag specific columns.
    *   **Quick Preview (Magnifying Glass):** Presents a super lightweight modal window that executes a `SELECT * FROM table LIMIT 50`. It is useful for quickly validating data shape without affecting the main editing session.
4. **Extension Explorer (`ExtensionExplorer.jsx`):** Embedded as a sub-module accessible in the navigation, it is a visual store (simulated *Marketplace*) that lists remote packages and connectors (`spatial`, `httpfs`, `aws`). A single click triggers the `INSTALL x; LOAD x;` script to endow DuckDB with powers like geospatial parsing, without ever leaving the React UI.

## 2. The Deep Inspector (`TableDetailsModal.jsx`)

When a data engineer needs to truly understand a table's structure and distribution before making massive JOINs, a double-click (or "Details..." context menu) on a table in the explorer opens the AmoxSQL fullscreen Inspector.

This interface abstracts highly complex metadata queries into four specialized tabs:

### Tab A: Schema
Performs an internal query (`PRAGMA table_info('table_name')`) to display a clean grid with:
*   Name and Data Type (DuckDB Logical Types).
*   Nullability Status (`NOT NULL`).
*   Primary/Foreign Key Indicators.

### Tab B: Data Profile (Statistical Profiling)
This is one of AmoxSQL's highest-value features. It uses DuckDB's optimized `SUMMARIZE table_name` command to asynchronously generate a table radiograph based on all its data.
For each column, the interface renders card-type components showing:
*   **Basic Distribution:** `Min`, `Max`, Mathematical Average (`Avg`).
*   **Quality Sparklines:** Small visual bars that visually warn if there is a dangerous percentage of `NULL` values or display the Cardinality (number of unique values), crucial for making indexing or subsequent grouping decisions.

### Tab C: Preview (Data Grid)
Unlike the quick "Magnifying Glass", this tab handles an asynchronous pagination engine over the entire table. It allows horizontal and vertical scroll across thousands of records (typically paginated at *Limit 200/Offset X*), to observe the entire body of the uninterrupted dataset.

### Tab D: DDL (Data Definition Language)
Accesses the internal metadata system table to reverse-engineer and display the original `CREATE TABLE (...)` instruction. This allows textual copying of the schema design in plain text for repository versioning or migration scripts.

---

## 3. Computational Schema Diff (`SchemaDiffModal.jsx`)

In scenarios where a data engineer constantly refactors DBT models, the question arises: *"What columns did I add or delete in this iteration compared to the previous one?"*
AmoxSQL introduces a powerful structural schema comparison:
*   Two tables ("Source" vs "Target") are selected.
*   The React State maps the asynchronous result in parallel, crossing sets of both metadata via inverse `Full Outer Join`.
*   Paints **Additions (`+ column`)** in green, **Deletions (`- target`)** in bright red, and **Type Changes (e.g. `VARCHAR -> INT`)** in warning orange.

---

## 4. Global Search and Results Table (`ResultsTable.jsx`)

Once a script is executed and data returns from the backend in structured JSON format, it is ingested by the `ResultsTable`.

*   **Robust Rendering:** By avoiding repetitive DOM (virtual-scrolling supports in massive lists), AmoxSQL can inject tens of thousands of cells derived from a giant `SELECT *` without freezing or collapsing the main React/Electron thread.
*   **Native Data Typing:** (Added in v1.7.0) The backend safely intercepts the Node iterator object (Reader) to extract the actual data-types (`VARCHAR`, `DECIMAL(3,2)`, `INTEGER`) and automatically renders them in the interface as semi-transparent subtitles under each column.
*   **Free Column Resizing:** Results grid headers now have invisible "handles" on their right edges allowing users to arbitrarily expand or collapse cells to read gigantic JSONs or visually truncate useless texts.
*   **In-Memory Search:** Has a global search bar. If a user has 10,000 results on the client-side, searching for a word instantly filters across the entire matrix without re-sending the query to DuckDB, operating purely on `Array.filter` over optimized JavaScript arrays.
*   **Cyclical Sorting:** Column headers are interactive, enabling ascending, descending sorts or returning to the natural state extracted from the source, acting as a secondary manipulator to `ORDER BY`.

## 5. The Functional Concept "Save To Database" (`SaveToDbModal.jsx`)

Upon executing a complex Query (e.g. `SELECT * FROM a JOIN b JOIN c GROUP BY date`), if the matrix is satisfactory, the user can convert any loaded query in Editor into a new Physical Table (CTAS - *Create Table as Select*) or materialize the result into a Virtual View (*Create View*).
This is especially productive when exporting to CSV is not desired, but rather an urgent need to encapsulate the resulting set for analytical reuse within another Query in the environment's perennial DuckDB itself.
