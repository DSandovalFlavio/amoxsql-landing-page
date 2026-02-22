# Advanced Debugging & Data IO Tools

Writing fast and correct queries is only half the work of a data analyst or engineer. **AmoxSQL** supports deep cycles for identifying functional problems, measuring volumetric processing time of large JOIN operations, and moving Gigabytes of information between conventional physical transactional files and in-memory binaries.

---

## 1. Advanced Diagnostic Tools (Debugging)

### CTE Debugger (Analog Sub-Query Progress)
Common Table Expressions (CTEs) that use the `WITH AS (...)` clause can grow into unmanageable "queries within queries." An error in the second inferred table can propagate and multiply erratic joins toward the end of a 100-line Query.

AmoxSQL integrates a heuristic logic parser on the Monaco Editor:
1.  Seeks to identify `WITH` keywords and isolatedly locates each logical block name in the editor using advanced Regex.
2.  Dynamically raises "Visual Markers" or interactive "Play" icons in the precise line gutters where the temporary function is declared.
3.  If one is clicked, it structurally unlinks the rest of the query below, converts the name to a variable, and executes a `SELECT * FROM Target_CTE_SubTable LIMIT 50` toward the C++ database, passing it through a virtual preprocessor.
4.  The user sees the temporalized results instantly in a Debug modal (`DebugResultModal.jsx`) without having to break and restructure their valuable Query texts manually, enabling a perimetric "Step-by-Step" (*Step-through Debugging*) cycle.

### Execution Tree Visualizer (Query Execution Plan)
Understanding which underlying nodes are responsible for the computational "bottleneck" of a giant DuckDB Query is crucial.

*   AmoxSQL injects the explanatory keyword (`EXPLAIN ANALYZE`) into your Query request secretly intercepted by the IDE.
*   Returns an intricate network of complex JSON serialization format.
*   In the `QueryPlanViewer.jsx` component, the IDE doesn't paint the usual bland terminal line. It takes the JSON and sends it to the hyper-fast topographic mathematics layout engine **Elkjs** (Eclipse Layout Kernel) asynchronously to calculate nodal XY positions.
*   Paints the code blocks as hierarchical "Cards" linked by SVG Curves, automatically painting with red alerts (`warning/red hue`) those elements with a very high "Cost Affinity" or percentage load compared to their parallel neighbors, making it extremely obvious to reveal table blockers like "Sequential Scans" vs "Index Seek."

---

## 2. Multi-Format Ingestion & Export (Input/Output Management)

For a local analysis environment to have real global production value, it must function as the universal transducer node or transformational nexus of files between incoming "ugly/dirty" information and clean packaged outgoing results.

### Massive & Intelligent Imports
Using Smart Import Modals, the IDE can absorb and transform local data sources into physical or volatile `.db` tables based on DuckDB's unmatched robustness:
*   **Single File Level:** Massive loading of `.CSV`, `.Parquet`, and `.JSON` extensions. Robust `.XLSX` (Excel Legacy) support through an import-modal bridge module with client-side parsing via hexadecimal buffers (`XLSX/SheetJS` integration), overcoming limitations other databases have for ingesting Microsoft's proprietary calculated spreadsheets.
*   **Folder Level (Mass Import):** For Data Lake temporal data ingestions, you can select a rigid Windows folder and the IDE drafts an automatic asynchronous macro over NodeJS promises that creates Tables and appends all uniform parquets inside in milliseconds using DuckDB's wildcard command (`read_parquet('folder/*.parquet')`).
*   **Incoming Metadata Cleanup (Slugify Headers):** It's very common to receive noisy corporate columns like "Historical Sales 2023!!". During the amox validation window, AmoxSQL detects such typing anomalies and offers a Toggle to purify and inject *Snake Case* safe from special characters ("`historical_sales_2023`") automatically before solidifying them in the Database.

### File Output (Session Exports)
Once the local in-memory transactional calculation is resolved:
The `ResultsTable.jsx` module allows capturing the bytes of presented JSON objects, transpiling back and serializing into CSV Strings (`react-csv` style blob object URLs), triggering a clean controlled download to the user's system with a click, avoiding expensive manual format conversions and offering data ready to be consumed by a third entity, external audit, or repackaging for final CRM systems.
