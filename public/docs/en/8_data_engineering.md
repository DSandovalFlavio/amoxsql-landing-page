# Data Engineering

**AmoxSQL** goes beyond ad-hoc exploratory analysis by providing dedicated tools for local data engineering. These tools allow you to define sequential ETL pipelines, visualize database architectures, and grasp model dependencies — all without leaving the IDE.

---

## 1. Execution Chains (`ExecutionChainModal.jsx`)

Execution Chains are AmoxSQL's answer to the need of executing multiple SQL scripts in a deterministic order, simulating local ETL pipelines.

### Concept
In data engineering scenarios, it's frequent to need to run an ordered sequence of scripts:
```
01_clean.sql → 02_transform.sql → 03_aggregate.sql → 04_load.sql
```

The `ExecutionChainModal` allows defining and executing these sequences visually.

### Features
*   **File Selector:** Dropdown menu with all `.sql` files in the current project.
*   **Ordered List:** Files are added to a visual numbered chain with status indicators.
*   **Reordering / Deletion:** Easily drag or delete steps manually.

### Sequential Execution
Upon clicking "Run Chain":
1.  Each `.sql` file is sequentially read from the disk.
2.  Content is sent to the DuckDB engine as a transaction.
3.  Every step shows its state in real time:
    *   ⏳ **Pending:** Empty circle, waiting its turn.
    *   🔄 **Running:** Animated loading spinner.
    *   ✅ **Success:** Green checkmark with execution time in milliseconds.
    *   ❌ **Error:** Red alert with detailed error message.
4.  **The chain stops at the first error**, preventing propagation of corrupted data.

---

## 2. Entity-Relationship Diagrams (`ErDiagram.jsx`)

The ER Diagrams visualizer automatically generates an interactive visual map of all active tables and database relationships. A cornerstone tool for architectural documentation.

### Automatic Schema Generation
When opening the module, an API hit (`/api/db/er-schema`) gathers data:
1.  Queries `information_schema` returning `VIEWS` & `TABLES`.
2.  Extracts types and nulls.
3.  Builds PKs and FKs topologies.

### Interactive SVG Rendering
*   **Header:** Differentiated color (highlighted if selected), table name with icon, column count.
*   **Body:** Full column list with golden keys (🔑 PK), links (🔗 FK), monospace typographies, and data types mapped perfectly.
*   **Shadows:** Elevated depth UI representations.

### FK Edges and Interactivity
*   Foreign ties are rendered using Bezier SVG directional curves (with arrows).
*   **Drag & Drop:** Fully movable tables.
*   **Smart Hover:** Isolated opacity fading for non-connected neighbors.
*   **Auto-Layout:** Square root scaling distribution logic.

### DDL Generation and Export
A floating panel presents:
*   Name and type constraints.
*   **"Copy DDL" button:** Maps a complete `CREATE TABLE` mapping types and null requirements instantly copying it to your clipboard.
*   **"Open in Editor" button:** Generates an editor code preview instantly.

---

## 3. Data Lineage

The lineage visualization integrates fully inside **DBT Studio** (under the "Lineage" tab). The `DbtLineageGraph.jsx` DAG isolates relations mapping horizontal layered logic covering Sources → Staging → Intermediate → Marts sequentially.

Documentation continues structurally within the `7_dbt_studio.md` document.
