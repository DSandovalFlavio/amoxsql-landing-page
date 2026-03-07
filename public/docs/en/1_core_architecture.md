# Core Architecture & Workflow

The core architecture of **AmoxSQL** is built on principles of modularity, strict resilience in memory management at the system level, and a user experience that faithfully emulates industrial-grade Code Editors (IDEs).

Below, we exhaustively document the fundamental systems and the IDE lifecycle.

---

## 1. The Central Command Palette (`CommandPalette.jsx`)

To ensure an optimized keyboard workflow (*"Keyboard-First Workflow"*), the most significant addition to AmoxSQL's global usability is the Omnipresent Launcher (globally accessible with `Ctrl+K` or `Cmd+K`).

Instead of relying on slow top-bar menus, the Palette engine instantly indexes a dynamic registry of actions. It acts as the central nervous system, delegating direct operations such as:
*   `Run Query` (`Ctrl+Enter`): Triggers asynchronous calls to the engine.
*   `Save File` (`Ctrl+S`): Serializes the editor state to the local magnetic disk without touching the UI.
*   `Navigation / Extensions`: Invokes reactive changes to the Layout Manager to mutate the left accordion or force the opening of AI intelligences with a click.

Each of these actions and shortcuts can be graphically audited using the `KeyboardShortcutsModal.jsx`, allowing the user to know all "Hotkeys" in a unified manner.

---

## 2. Project-Centric Workflow

AmoxSQL abandons the classic idea of database management tools that demand static credentials and open ports. By running a *Serverless* and *In-Process* database like **DuckDB**, the concept of a connection evolves into a concept of a working environment entirely based on the user's file system.

### The project opening cycle:
1.  **Welcome Screen:** The initial entry point, programmed in `WelcomeScreen.jsx`. It mandatorily requests an **Absolute Path** on the operator's computer.
2.  **Validation and Scanning:** Upon receiving the path, the backend intercepts the command through Node.js native file system APIs (`fs`). The system recursively traverses the requested directory using asynchronous algorithms to identify:
    *   Existing DuckDB database files (`.duckdb`, `.db`).
    *   Saved SQL files from previous sessions (`.sql`).
    *   Persistent graphical configurations of AmoxSQL (`.amoxvis`).
    *   Interactive notebooks (`.sqlnb`).
3.  **Explorer Bootstrapping:** After validating the path's existence, the IDE starts, initializing its stateful `FileExplorer` on the left and leaving its Central Layout clean in standby mode, injecting all the localized file paths into the main React *Global Context* in the Frontend.

---

## 3. Robust Connection Management & Hard Reset

Under the hood, on the server, there is a vital Node.js Singleton called **`DatabaseManager.js`**. Its main goal is to avoid dreaded "memory leaks" or locked binary files issues caused by uncontrolled hard closures of transactional databases, common on Windows OS.

### Interactive Database Modes
The connection modal (`DatabaseSelectionModal.jsx` interacting with `DatabaseManager.connect()`) explicitly offers three operational connection vectors to the developer:

*   **In-Memory Mode:** A completely fresh DuckDB instance that does not touch the hard drive. Data is lost as soon as the process is closed. Used mainly for large batch calculations and cleaning data coming from Parquet formats or remote Amazon S3 files, exploiting the supersonic RAM read/write capabilities of the Hardware.
*   **Persistence (Read-Only Mode):** It "attaches" (`ATTACH`) to the designated DuckDB database assuming a `read_only=true` flag. The `DatabaseManager` blocks local modifications via security commands. This scheme allows opening several AmoxSQL IDEs on the same database without corruption, essential for concurrent data analysis on a local network or when other ETLs are populating the master `.db` structure.
*   **Persistence (Read/Write Mode):** The `DatabaseManager` acquires absolute control (Lock) of the file on the disk system.

### "Hard Reset" Multi-Tenant Strategy
Because Node and C++ DuckDB live in very tight co-dependencies of asynchronous I/O read promises, if the user decides to *Change Project* without physically restarting the application (from `MenuBar.jsx`), AmoxSQL triggers a strict chain designed in the `reinitializeSystem()` function inside `DatabaseManager.js`:
1.  Orders to kill all running promises (`.kill()`) or open connections (`connection.close()`).
2.  Unlinks open master instances from memory `this.instance = null`.
3.  At the Operating System level, clears the cached persistence to ensure the file explorer and APIs stop listening (`_initSystem()`).
4.  This "Hard Reset" methodology prevents "Zombie" binary locks from occurring, something that would typically require a forced close from the Windows Task Manager.

---

## 4. Multi-Tab and Views Interface Architecture (Layout Manager)

To match the flexibility and architectural UX freedom proposed by massive systems like Eclipse, VS Code, or Jetbrains, AmoxSQL implements its own partition and state engine using a module called `LayoutManager.jsx`. It's not simply re-drawing divs; it's storing a complete document lifecycle and the interface buffer in memory.

### Long-Lived Reactive States
When a user opens three long code tabs (`script_1.sql`, `notebook.sqlnb`, `ventas.amoxvis`):
*   The Frontend context carries a vector of complex objects called **Tabs**.
*   Each *Tab* includes a unique `id`, a `type` (which dictates to `EditorPane.jsx` which React component to mount on that tab, for example, `SqlEditor` versus `SqlNotebook`), the file path for asynchronous write saving, and a record of what the Monaco Editor in the Frontend is currently drawing in its text buffer (`docModel`).
*   This ensures that the user can switch contexts quickly without losing where their blinking cursor was left or losing results from previous executions, preserving everything instantly over RAM cache in a super advanced *Single Page Application* model.

### Split Views Controls
AmoxSQL's main window is designed in flexible sections that can be resized.
1.  **Sidebar:** Works as a hybrid Accordion. It encompasses the File Explorer for managing base scripts and notebooks, but with a global Switch that can entirely swap it to become an Amox AI Manager (`AiSidebar.jsx`) or purely a Database Inspector and Viewer (`DatabaseExplorer.jsx`).
2.  **Bottom Panels:** Logically abstracted from execution. Once the Backend fires and completes the giant JSON response of a Query result, that data is channeled to the bottom panel, which in turn becomes a Tab Sub-Manager:
    *   Allows toggling to evaluate flat Data in the virtual grid of `ResultsTable.jsx`.
    *   Toggle to visual analysis in `DataVisualizer.jsx`.
    *   This dual Central Editing Panel + Bottom Results Panel system promotes a cyclical iterativity in Query and Visualization construction, reducing validation and confirmation times and facilitating direct debugging with a view of the source of truth of the data in real-time.

### Visual Layout Persistence
The ergonomics of the tool are ensured in the program's lifecycle. If the user drags the border of the `Split Views` making them from `250px` to `400px` to be able to read tables with very long names, or if they decide to pin a *Light Mode* or *Dark Mode* theme via unified settings, the system stores the tolerances and preferences (`LayoutWidth`, `Theme`) at the `localStorage` and Electron user profile file level so that next time AmoxSQL natively opens any project, all windows and preferences re-accommodate as they were left in milliseconds.
