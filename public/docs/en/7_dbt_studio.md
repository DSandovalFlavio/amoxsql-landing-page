# DBT Studio

**AmoxSQL** integrates a full studio for data development using **dbt** (Data Build Tool) directly inside the IDE. The `DbtPanel.jsx` (56KB+) is one of the most extensive application components, offering 6 specialized sections covering everything from environment detection to real-time command execution.

---

## 1. Navigation Panel

DBT Studio is organized into 6 accessible tabs from a horizontal icon-based navigation bar:

| Tab | Icon | Function |
|---------|-------|---------|
| **Setup** | ✨ | Environment detection and project status |
| **Config** | ⚙️ | Visual editor for `profiles.yml` and `dbt_project.yml` summary |
| **Models** | 📄 | Dbt models generator with templates |
| **Sources** | 📁 | Source files (`schema.yml`) generator |
| **Lineage** | 🔀 | Interactive DAG lineage graph |
| **Commands** | 💻 | Command constructor and execution terminal |

---

## 2. Setup: Environment Detection

The Setup tab performs a complete validation of the development environment:

### Tool Auto-Detection
AmoxSQL automatically looks for:
*   **Python:** System installed version.
*   **dbt:** Available dbt-core version (system or Conda).
*   **Conda / Miniconda / Mamba:** Environments exploration.

Each tool displays a green checkmark/red cross state. Environment caching prevents repetitive 1-3 seconds latency scans.

### Conda Environments Management
Scanning all environments mapping:
*   Environment name.
*   Whether `dbt-duckdb` is installed there.
*   The Conda environment executes via `conda run -n <env_name>` automatically.

---

## 3. Config: Visual Profiles Editor

### `profiles.yml` Editor
Visual form providing inputs for:
*   Profile Name, Target (`dev`), DuckDB Path, Schema, and Threads.
Saving serializes correctly mapped YAML inside project directories.

---

## 4. Models: Dbt Models Generator

The visual models generator lets you create `.sql` files with professional scaffolding:

### Available Templates
Five pre-configured templates with appropriate pathing and materialization:
*   **Staging** (`models/staging/`, `view`)
*   **Intermediate** (`models/intermediate/`, `view`)
*   **Mart** (`models/marts/`, `table`)
*   **Incremental** (`models/`, `incremental`)
*   **Basic** (`models/`, `view`)

Outputs `{{ config(...) }}` block automatically creating the file and opening a new code Editor tab.

---

## 5. Sources: Source Generator

Creates `schema.yml` files mapping definition of data layers:
*   Inputs: Source Name, Schema, and interactive inputs for Tables definitions with descriptions. Outputs a structurally valid `version: 2` YAML text sequence.

---

## 6. Lineage: Interactive DAG Graph (`DbtLineageGraph.jsx`)

The Lineage tab renders an interactive dependency graph (DAG) sourced from the `manifest.json` file created by `dbt compile`.

### Layout Algorithm
Implements a **Sugiyama**-style layout (topological layered):
1.  Nodes assigned to layers via BFS trees.
2.  Left-to-right layer organizations (sources → staging → marts).
3.  Evenly distributed canvas spaces.

### Colored Noded Models
*   **source:** Green.
*   **seed:** Light blue.
*   **model:** Blue.
*   **snapshot:** Gray.

### Interactivity
*   **Smart Hover:** Dimming non-connected nodes.
*   **Tooltip Info:** Shows resource type, materialization, and descriptions.
*   **Click to Open:** Launch `.sql` file natively.
*   **Zoom / Pan.**

---

## 7. Commands: Command Builder and Executor

### Command Builder
Visual interface defining flags: Action (`run`, `test`, `build`), Select models, Exclude models, and Target flags. Preview provides string output.

### Quick Actions
Play Buttons for:
*   ▶ **Run All:** `dbt run --profiles-dir .`
*   📦 **Compile:** `dbt compile --profiles-dir .`
*   ✓ **Test:** `dbt test --profiles-dir .`
*   🔧 **Debug:** `dbt debug --profiles-dir .`

### Real-Time Terminal Execution
Server-Sent Events (SSE) pipe real-time execution directly back to the react terminal matching colors for success/errors.
