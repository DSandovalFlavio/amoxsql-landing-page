# SQL Editing & Interactive Notebooks

AmoxSQL is designed under the premise that writing code should be a frictionless and beautiful experience on the local machine. It combines the paradigms of Classic Scripting and Literate Programming.

---

## 1. The Advanced Editing Engine (`SqlEditor.jsx`)

The core of the text environment is powered by the open-source **Monaco Editor** project, the same central engineering technology that Microsoft uses to build Visual Studio Code. Instead of using simple text areas (`<textarea>`), or limited lightweight libraries, AmoxSQL inherits an embedded client-side AST compiler.

### Editor Capabilities:
*   **Lexical Analysis:** Recognizes complex reserved words of the DuckDB dialect (such as `ASOF JOIN`, `PIVOT`, `UNPIVOT`, etc.) coloring them logically according to the Theme (Light/Dark).
*   **Auto-completion & Intelligent Suggestions (IntelliSense):** As you type, the editor raises floating *overlays* prompting to complete known table names, aggregate functions, and even parametric closure of parentheses and brackets.
*   **Native Keyboard Control:** Supports multiple cursors (Alt + Click), visual search and replace with regular expression (Regex) support, Code Folding, and automated indentation of messy code.
*   **Contextual Execution:** If the user highlights a sub-block of code in a 500-line file and presses `Cmd/Ctrl + Enter`, the `SqlEditor` intercepts the combination and infers that the Backend should only execute the text String found under the cursor selection, not the entire file. This replicates imperative workflows from DataGrip and DBeaver.

---

## 2. SQL Notebooks (`.sqlnb`)

The crown jewel of AmoxSQL's rapid prototyping experience is its native support for Hybrid Notebooks. The `.sqlnb` extensions represent a local replacement for Python-based ecosystems like Jupyter Notebooks, but tuned purely for Data Analysis with SQL.

### Architecture of a `.sqlnb`
The notebook (`SqlNotebook.jsx`) and its individual children (`NotebookCell.jsx`) process a structured flow of cell list type. Internally, a notebook is saved to disk as a standardized JSON containing an Array of cell objects (`[{type: "markdown", content: "..."}, {type: "sql", content: "..."}]`).

There are two functional types of cells in the notebook:

1.  **Markdown Cells (Textual Documentation):**
    *   Support Github-Flavored Markdown rich formatting (`react-markdown`).
    *   Allow data teams to create logs, insert local images, explain complex business assumptions mathematically, or document the resulting analysis from an iteration.
2.  **SQL Cells (Data Executables):**
    *   Inject a mini Monaco Editor instance inside.
    *   They have "Isolated Execution" but "Global State". Each cell sends its script as a simple transaction to the DuckDB database and the environment encapsulates below the code the Table Results and Visual Charts local to the cell. This means you can have and compare 5 different charts corresponding to 5 different Queries in the same semantic scroll.

### Presentation Mode ("Report View")
Once the analysis concludes, the notebook often contains too much technical "noise" (intermediate queries, giant CTE blocks, or failed iterations).

The user can activate a top Switch to enable **Presentation Mode**. Under this internal reactive state:
1.  All `SqlEditor` Monaco in SQL cells collapses and disappears visually using `display: none` / conditional null re-render.
2.  Utility borders (Play buttons, Delete Cell) are marginalized or hidden.
3.  The entire frame expands to full width becoming an Uninterrupted Reading Report; Markdown dominates the introduction and dynamic charts or summary tables are displayed with corporate polish.

### Analog Generator (PDF Export)
Leveraging Presentation Mode, AmoxSQL uses routines in the `MenuBar` tied to IPC channels and HTML2Canvas libraries or the operating system's native print to "paint" or inject the static view directly to a physical `.PDF` file. This enables the creation of executive reports in seconds, encapsulating the descriptions and visualization art of local data that will never again depend on poorly framed screenshots.
