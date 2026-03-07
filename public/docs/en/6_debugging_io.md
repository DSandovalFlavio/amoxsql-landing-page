# Advanced Debugging & IO Tools

Writing fast and correct queries is only half the job of a data analyst or engineer. **AmoxSQL** supports deep cycles to identify functional problems, measure the volumetric processing time of large JOINs, and move Gigabytes of information between conventional physical transactional files and in-memory binaries.

---

## 1. Advanced Diagnostic Tools (Debugging)

### CTE Debugger (Analog SubQuery Progress)
Common Table Expressions (CTEs) that use the `WITH AS (...)` clause can grow into unmanageable "queries within queries". An error in the second inferred table can drag on and multiply erratic joins towards the end of a 100-line Query.

AmoxSQL integrates a heuristic logic parser over the Monaco Editor:
1.  Seeks to identify `WITH` keywords and isolatedly locates each logical block name in the editor using advanced Regex.
2.  Dynamically pops up "Visual Markers" or interactive "Play" icons in the precise line gutters where the temporary function is declared.
3.  If one is clicked, it structurally uncouples the rest of the query below, converts the name to a variable, and executes a `SELECT * FROM Target_CTE_SubTable LIMIT 50` towards the C++ base passing it through a virtual preprocessor.
4.  The user sees the timed results instantly in a Debug modal (`DebugResultModal.jsx`) without having to break and manually restructure their valuable Query texts, enabling a perimeter "Step-by-Step" cycle (*Step-through Debugging*).

### Query Execution Plan Visualizer Tree
Understanding which underlying nodes are responsible for the computational "bottleneck" of a giant Query in DuckDB is crucial.

*   AmoxSQL injects the explanatory keyword (`EXPLAIN ANALYZE`) within your Query request secretly intercepted by the IDE.
*   Returns an intricate network of complex JSON serialization format.
*   In the `QueryPlanViewer.jsx` component, the IDE does not paint the usual dull terminal line. It takes the JSON and sends it to the hyper-fast topographic math layout engine **Elkjs** (Eclipse Layout Kernel) asynchronously to calculate nodal XY positions.
*   Paints code blocks as hierarchical "Cards" linked by SVG Curves, automatically painting with red alerts (`warning/red hue`) those elements with a "Cost Affinity" or very high percentage load compared to their parallel neighbors, which makes it extremely obvious to reveal table blockers like "Sequential Scans" vs "Index Seek".

### Quality and Profiling Suite (`DataQualityModal.jsx`, `DataProfiler.jsx`)
Before building aggregation models on unexplored tables, it is vital to audit column cleanliness. AmoxSQL's new automatic evaluator orchestrates this without writing code:
1.  **Type and Distribution Detection:** The interface executes a cascade of background mathematical statistical sub-queries that reveals to the engineer `Nulls` counts, Cardinality (unique vs total elements), and Min/Max baselines.
2.  **Automated Report of Nulls, Duplicates, and Outliers:** Through the `DataQualityModal`, users press a button that inspects each dataset column looking for aggressive standard deviations (quantile math), silent type inconsistencies, and repeated records, delivering a qualified visual report to approve or reject ingested data sources.

---

## 2. Multi-format Ingestion and Export (Input/Output Management)

For a local analysis environment to have real global production value, it must function as the transducer node or universal transformational nexus of files between incoming "ugly/dirty" information and outgoing clean packaged results.

### Smart Mass Imports
Using Smart Import Modals, the IDE can absorb and transform local data sources towards `.db` volatile or physical tables and based on DuckDB's unmatched robustness:
*   **Single File Level:** Bulk loading of `.CSV`, `.Parquet`, and `.JSON` extensions. Strict and dedicated support for **Microsoft Excel (.XLSX and .XLS)** via a specialized bridge module (`ImportExcelModal.jsx`), which loads multiple native sheets into JavaScript memory (via `xlsx` libraries) before asynchronously vectorizing them to the DuckDB database; overcoming the limitations other monolithic databases have to ingest native corporate spreadsheets.
*   **Folder Level (Mass Import):** For temporal Data Lakes ingestions, you can select a rigid Windows folder and the IDE drafts an asynchronous automatic macro over NodeJS promises that creates Tables and appends all uniform parquets inside within milliseconds using the DuckDB wildcard command (`read_parquet('folder/*.parquet')`).
*   **Incoming Metadata Cleaning (Slugify Headers):** It is very common to receive noisy corporate columns "Historical Sales 2023!!". During the import validation window, AmoxSQL detects such typing anomalies and offers a Toggle to automatically purify and inject clean safe *Snake Case* without special characters ("`historical_sales_2023`") before solidifying them in the Database.

### File Output (Session Exports)
Once the local in-memory transactional calculation is resolved:
The native `ExportDataModal.jsx` module allows capturing the executed Query domains and delegating from the Frontend to the DuckDB (Server) engine the express order of `COPY TO 'path/output'`.
This system supports clean and high-performance download in the following native analytical export formats: **CSV (Comma Separated)**, **Structured JSON**, **Columnar Parquet** for Big Data, and surprisingly now allows transcribing giant sets back to **Excel (XLSX)**, offering data ready to be consumed by accounting auditing entities or third-party software layers requiring traditional spreadsheets.
