# SQL Editing & Notebooks

AmoxSQL is designed under the premise that writing code should be a frictionless and beautiful experience on the local machine. It combines the paradigms of Classic Scripting and Literate Programming.

---

## 1. The Advanced Editing Engine (`SqlEditor.jsx`)

The core of the text environment is powered by the open-source **Monaco Editor** project, the same core engineering technology Microsoft uses to build Visual Studio Code. Instead of using simple text areas (`<textarea>`), or limited lightweight libraries, AmoxSQL inherits an embedded client AST compiler.

### Editor Capabilities (Powered by the Hybrid Catalog v1.7.0):
*   **Lexical Analysis:** Recognizes complex reserved words from the DuckDB dialect (like `ASOF JOIN`, `PIVOT`, `UNPIVOT`, etc.) logically coloring them according to the Theme (Light/Dark).
*   **Hybrid Intelligence (Advanced IntelliSense):** As you type, the editor pops up floating *overlays* asking to complete table and function names. In v1.7.0, the editor combines a **Curated JSON Catalog** (with over 100 categorized functions, examples, and descriptions) along with live introspection (`duckdb_functions()`) guaranteeing you always have exact auto-completion.
*   **Rich Hover Tooltips:** By resting the cursor over any DuckDB function, the editor displays a documentation card (*Tooltip Hover*) explaining uses, parameters, and showing embedded *snippets*, without needing to go to the official web documentation.
*   **Native Keyboard Control:** Supports multi-cursors (Alt + Click), visual search and replace with regular expression (Regex) support, block folding (Code Folding), and automated indentation of messy code.
*   **Contextual Execution:** If the user highlights a code sub-block in a 500-line file and presses `Cmd/Ctrl + Enter`, the `SqlEditor` intercepts the combination and infers that the Backend should only execute the text String found under the cursor selection, not the entire file. This replicates imperative workflows from DataGrip and DBeaver.

### Premium Editor Customization (`SettingsModal.jsx`)
For professionals who spend 8 hours a day looking at `SELECT` statements, AmoxSQL's code customization level (introduced in v1.6.0) prevents eye strain and improves semantics:
*   **Industrial Typography:** Ability to dynamically inject and render specialized *WebFonts* like `JetBrains Mono` or `Fira Code`.
*   **Font Ligatures:** Transforms clusters like `>=` or `!=` into elegant and continuous mathematical symbols (only applicable on Premium monospace families).
*   **Geometric Controls:**
    * Hide/Show Side code minimap.
    * Exact numeric adjustments on Tab Size (Tab Size = 2 or 4 spaces).
    * Toggle Dynamic Word Wrap.
    * Manual floating control of the overall Font Size with RAM persistence.

---

## 2. Auxiliary Productivity Enhancement Tools

*   **Snippets Engine (Snippets Panel):** Hidden in the right sidebar is the `SnippetsPanel.jsx`. It contains injectable shortcuts (e.g., a `CASE WHEN` or a CTE block) with a dedicated section for users to save their custom corporate templates and drop them with a click.
*   **Interpolation and Variables Panel:** If you need to run a report across changing ranges, explicitly using the syntax `${my_date}` will instantly generate a dynamically rendered form (`VariablesBar.jsx`) above the header in the editor. Enter the value there and press "Play", AmoxSQL transpiles and hydrates the replacements to the database without altering the hard code string.
*   **Persistent Query History (`QueryHistoryPanel.jsx` / `Modal`):** The user won't lose work if they forget to 'Save'. The Node engine locally logs an exact `TIMESTAMP` trace and the `STRING` code of everything intercepted by DuckDB in past sessions, enabling local text search and a "Favorites / Bookmarks" system for daily-use star queries.

---

## 3. SQL Notebooks (`.sqlnb`)

The crown jewel in AmoxSQL's rapid prototyping experience is its native support for Hybrid Notebooks. The `.sqlnb` extensions represent a local replacement for Python-oriented ecosystems like Jupyter Notebooks, but purely tuned for Data Analysis with SQL.

### Architecture of a `.sqlnb`
The notebook (`SqlNotebook.jsx`) and its individual children (`NotebookCell.jsx`) process a structured stream of a list of cells. Internally, a notebook is written to disk as a standardized JSON containing an Array of cell objects (`[{type: "markdown", content: "..."}, {type: "sql", content: "..."}]`).

There are two functional cell types in the notebook:

1.  **Markdown Cells (Textual Documentation):**
    *   Support rich Github-Flavored Markdown formatting (`react-markdown`).
    *   Allow data teams to create logs, insert local images, mathematically explain complex business assumptions, or document the analysis resulting from an iteration.
2.  **SQL Cells (Data Executables):**
    *   Inject a mini-instance of Monaco Editor inside them.
    *   Have "Isolated Execution" but "Global State". Each cell sends its script as a simple transaction to the DuckDB base, and the environment encapsulates the Resulting Table and Visual Charts locally below the code. This means you can have and compare 5 different charts corresponding to 5 different Queries in the same semantic scroll.

### Presentation Mode ("Report View")
Once the analysis concludes, the notebook often contains too much technical "noise" (intermediate queries, giant CTE blocks, or failed iterations).

The user can toggle a top Switch to activate the **Presentation Mode**. Under this internal reactive state:
1.  All the Monaco `SqlEditor` in the SQL cells collapses and disappears visually using `display: none` / conditional null re-rendering.
2.  Utility borders (Play buttons, Delete Cell) become marginalized or hidden.
3.  The entire frame expands to full width, becoming an Uninterrupted Reading Report; Markdown dominates the introduction, and dynamic charts or summary tables are displayed with corporate neatness.

### Analog Generator (PDF Export)
Leveraging the Presentation Mode, AmoxSQL uses `MenuBar` routines bound to IPC channels and HTML2Canvas libraries or native OS printing to "paint" or inject the static view directly into a physical `.PDF` file. This enables the creation of managerial reports in seconds, encapsulating the descriptions and visualization art of the local data that will never again depend on poorly framed screenshots.
