# SQL Editing & Notebooks

AmoxSQL is designed on the premise that writing code must be a frictionless and beautiful experience on the local machine. It combines the paradigms of Classic Scripting and Literate Programming, with a complete interface redesign based on a *card-based floating layout*.

---

## 1. Advanced Editing Engine (`SqlEditor.jsx`)

The core of the text environment (57KB+) is powered by the open-source **Monaco Editor** project, the same central engineering technology Microsoft uses to build Visual Studio Code. Instead of using simple text areas (`<textarea>`) or limited lightweight libraries, AmoxSQL inherits an embedded client AST compiler.

### Editor Capabilities (v1.9.9):
*   **Lexical Analysis:** Recognizes complex reserved words of the DuckDB dialect (like `ASOF JOIN`, `PIVOT`, `UNPIVOT`, etc.) logically coloring them according to the active Theme (8 themes available).
*   **Hybrid DuckDB Functions Catalog:** The editor combines a **Curated JSON Catalog** (`duckdb-functions-docs.json` with 100+ functions) with **live introspection** (`duckdb_functions()`) guaranteeing exact auto-completion.
*   **Rich Hover Tooltips:** When positioning the cursor over any DuckDB function, the editor deploys a documentation card explaining uses, parameters, and showing embedded *snippets*.
*   **Native Keyboard Control:** Supports multiple cursors (Alt + Click), visual search and replace with regex, Code Folding, and automated indentation.
*   **Contextual Execution:** If the user highlights a code sub-block in a 500-line file and presses `Cmd/Ctrl + Enter`, the `SqlEditor` intercepts the combination and infers that the Backend should only execute the text String under the cursor selection.

### Premium Editor Customization (`SettingsModal.jsx` → Editor)
For professionals who spend 8 hours a day looking at `SELECT` statements, the "Editor" tab prevents eye fatigue:
*   **Industrial Typography (6 families):** JetBrains Mono, Fira Code, Cascadia Code, Consolas, Monaco, Source Code Pro.
*   **Font Ligatures:** Transforms clusters like `>=` or `!=` into elegant continuous mathematical symbols.
*   **View Controls:**
    * Toggle Minimap.
    * Toggle Word Wrap.
    * Toggle Line Numbers.
    * Numeric adjustments for Tab Size (2 or 4 spaces).
    * Sliders for global Font Size (10px-24px) handling visual persistence.
*   **Results Panel:**
    * Independent font size for results (11px-16px).
    * Customizable default view: Table, Chart, or Profile.

---

## 2. Auxiliary Productivity Tools

*   **Snippets Engine (`SnippetsPanel.jsx`):** In the sidebar, contains injectable shortcuts (e.g., a `CASE WHEN` or a CTE block) with a dedicated section for users to save custom corporate templates.
*   **Interpolation and Variables Panel (`VariablesBar.jsx`):** Allows explicit use of `${my_date}` syntax to instantly generate a dynamic form rendered over the header to run repetitive reports across ranges.
*   **Persistent Query History (`QueryHistoryPanel.jsx` / `QueryHistoryModal.jsx`):** The Node engine locally records the exact `TIMESTAMP` and the SQL `STRING` code of everything intercepted by DuckDB in past sessions, enabling local text search and a "Bookmarks" system.

---

## 3. SQL Notebooks (`.sqlnb`)

The crown jewel in AmoxSQL's rapid prototyping experience is its native support for Hybrid Notebooks. The `.sqlnb` extensions represent a local replacement to Python-based ecosystems like Jupyter Notebooks, but adjusted purely for SQL Data Analysis.

### Architecture of a `.sqlnb`
The notebook (`SqlNotebook.jsx` — 25KB+) and its individual children (`NotebookCell.jsx` — 23KB+) process a structured flow of cell objects with a *card-based floating layout*. Internally, a notebook saves to disk as a standardized JSON containing an Array of cell objects.

### Cell Redesign (v1.9.9)
Notebook cells have been completely redesigned with a *CSS class-based* approach:
*   **Floating Cells (Card-Based):** Each cell is presented as an independent card with subtle borders.
*   **Redesigned Toolbar:** Each cell has a contextual toolbar with execution controls.
*   **Debounced Content Updates:** Edits in cells use *debouncing* to prevent excessive disk writes.

### Cell Types

1.  **Markdown Cells (Textual Documentation):**
    *   Supports Github-Flavored Markdown formatting (`react-markdown`).
    *   Allows data teams to create logs, insert local images, and document logic.
2.  **SQL Cells (Data Executables):**
    *   Injects a mini-instance of Monaco Editor inside.
    *   Has "Isolated Execution" but "Global State". Each cell sends its script as a transaction to DuckDB and encapsules Table Results and Visual Charts locally to the cell.

### Presentation Mode ("Report View")
Once analysis concludes, the user can actuate a Switch to activate **Presentation Mode**:
1.  All code editors collapse and disappear.
2.  Buttons and margins are hidden.
3.  The entire frame expands to a clean, uninterrupted Reading Report with Markdown dominating the introductions and dynamic charts exposed corporately.

### Analog Generator (PDF Export)
Leveraging Presentation Mode, AmoxSQL uses HTML2Canvas or OS native formatting to "paint" the static view directly to a physical `.PDF` file. This enables creating management reports in seconds.
