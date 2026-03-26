# Advanced Debugging & Data IO

Writing fast and correct queries is only half the job of a data analyst or engineer. **AmoxSQL** supports deep cycles to identify functional issues, measure processing time for massive JOINs, and migrate Gigabytes of information between standard transaction physical files, binary in-memory storage, and now **Cloud Storage Services (S3 / GCS)**.

---

## 1. Advanced Debugging Tools

### CTE Debugger (Analog Progression of Subqueries)
Common Table Expressions (CTEs) that utilize the `WITH AS (...)` clause can become unmanageable "queries inside queries."

AmoxSQL integrates a heuristic logic parser over the Monaco Editor:
1.  It searches for `WITH` keywords and isolatedly locates each logical block name using advanced Regex.
2.  It dynamically raises interactive "Play" icons exactly at the gutter of the line declaring a temp function.
3.  If clicked, it structurally unbinds the rest of the query below, converts the name to a variable, and executes a `SELECT * FROM Target_CTE_SubTable LIMIT 50`.
4.  The user sees the temporalized results instantly in a Debug Modal (`DebugResultModal.jsx`) without having to manually break and restructure their valuable query strings, enabling peripheral *Step-through Debugging*.

### Visual Execution Tree (Query Execution Plan)
Understanding exactly which underlying node is responsible for the computational "bottleneck" of a giant Query in DuckDB is crucial:

*   AmoxSQL injects the explain keyword (`EXPLAIN ANALYZE`) within the query request intercepted by the IDE.
*   It returns an intricate network of complex JSON serialization formatting.
*   In the `QueryPlanViewer.jsx` component, the IDE takes the JSON and asynchronously sends it to the `Elkjs` (Eclipse Layout Kernel) layout engine to calculate XY nodal positions.
*   It paints code blocks as hierarchical "Cards" linked by SVG Curves, generating automatic red alerts on those elements with a very high "Cost Affinity" or percentage load.
*   The `QueryPlanModal.jsx` presents the visualization in a full-screen modal with zoom controls.

### Quality and Profiling Suite V2 (`DataProfiler.jsx`)
The Data Profiler (31KB+) was substantially refactored in v1.9.9. Before building aggregation models over unexplored tables, auditing column cleanliness is vital:

1.  **C++ Type and Distribution Detection:** The interface executes a massive cascade of statistical sub-queries in DuckDB that reveal counts of `Nulls`, Zeros, Negatives, Cardinality (unique items vs total), Skewness, and Kurtosis.
2.  **JS Rules and Alerts Engine:** A JavaScript statistical evaluator on the client side instantly inspects metrics, returning data quality flags or *warnings* (e.g., High Cardinality, Extreme Nulls, Constant Values).
3.  **Interactive Visualization:** The profiler injects modern *Recharts* graphics (Numerical Histograms and Top Frequency Horizontal Bars) dominating the visual hierarchy of the report.
4.  **Correlation Heatmap:** Automatic generation of a parametric correlation matrix (Pearson Coefficient) for all numeric variables on screen.

---

## 2. Multi-Format Ingestion and Exporting (Input/Output Management)

For a local analysis environment to have real global production value, it must function as a transducer node or universal transformational nexus of files.

### Massive and Smart Imports
Using Smart Import Modals, the IDE can absorb and transform local data origins:
*   **Single File Level:** Mass load `.CSV`, `.Parquet`, and `.JSON` extensions. Dedicated support for **Microsoft Excel (.XLSX and .XLS)** via `ImportExcelModal.jsx`, which loads multiple native sheets into JavaScript memory (via `xlsx` library) before asynchronously vectorizing them to DuckDB.
*   **Folder Level (Mass Import):** For temporary Data Lakes ingestions, you can select a Windows folder and the IDE drafts an asynchronous auto-macro creating Tables using DuckDB's wildcard (`read_parquet('folder/*.parquet')`).
*   **Slugify Headers:** Erase noisy names during imports via an automatic *Snake Case* injection toggle ("`historical_sales_2023`").

### Output to File (Session Exports)
The `ExportDataModal.jsx` module (15KB+) delegates from the Frontend to the DuckDB engine the express command `COPY TO 'path/output'`:
*   **Live Editor Context:** The Export system extracts the Active Code Block in real-time directly from the underlying Monaco Editor.
*   **Export Worker (`exportWorker.js`):** A dedicated Web Worker handles long exports in the background to avoid blocking the user interface.
*   **Supported Formats:** CSV, structured JSON, Columnar Parquet, and Excel (XLSX).

---

## 3. Cloud Storage

One of the most significant additions in v1.9.9 is the ability to export data directly to cloud storage services.

### AWS S3
From the "Cloud Storage" tab of `SettingsModal`, you can configure:
*   **Access Key ID and Secret Key:** AWS IAM credentials.
*   **Region:** Bucket region (e.g., `us-east-1`).
*   **Endpoint:** Custom endpoint for S3-compatible services (MinIO, DigitalOcean Spaces, etc.).
*   **Default Bucket / Connection Test.**

### Google Cloud Storage (GCS)
Similar configuration via Google Cloud service credentials (HMAC Access Keys).

### Cloud Export Flow
The `ExportDataModal` integrates the cloud destination option alongside local exports. DuckDB utilizes its native extensions (`httpfs`, `aws`) to directly write to the configured bucket, leveraging the speed of the columnar engine for massive efficient transfers.
