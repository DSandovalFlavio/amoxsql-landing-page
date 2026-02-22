# Core Architecture & Workflow

The main architecture of **AmoxSQL** is built on principles of modularity, strict memory management resilience at the system level, and a user experience that faithfully emulates industrial-grade Code Editors (IDEs).

Below, we exhaustively document the fundamental systems and the IDE's lifecycle.

---

## 1. Project-Centric Workflow

AmoxSQL abandons the classic idea of database management tools that demand static credentials and open ports. By running with a *Serverless* and *In-Process* database like **DuckDB**, the connection concept evolves into a workspace environment fully based on the user's file system.

### The project opening cycle:
1.  **Welcome Screen:** The initial entry point, programmed in `WelcomeScreen.jsx`. It mandatorily requests an **Absolute Path** on the operator's computer.
2.  **Validation and Scanning:** Upon receiving the path, the backend intercepts the command through Node.js native file system APIs (`fs`). The system recursively traverses the requested directory using asynchronous algorithms to identify:
    *   Existing DuckDB database files (`.duckdb`, `.db`).
    *   SQL files saved from previous sessions (`.sql`).
    *   Persistent graphical AmoxSQL configurations (`.amoxvis`).
    *   Interactive notebooks (`.sqlnb`).
3.  **Explorer Bootstrapping:** After validating the path's existence, the IDE starts, initializing its `FileExplorer` state on the left and leaving its Central Layout clean in ready mode, injecting all located file paths into React's main *Global Context* on the Frontend.

---

## 2. Robust Connection Management & Hard Reset

Under the hood, on the server, there exists a vital Node.js Singleton called **`DatabaseManager.js`**. Its primary objective is to prevent dreaded "memory leaks" or problems with binary files locked by uncontrolled closures of transactional databases, common on Windows OS.

### Interactive Database Modes
The connection modal (`DatabaseSelectionModal.jsx` interacting with `DatabaseManager.connect()`) explicitly offers three operational connection vectors to the developer:

*   **In-Memory Mode:** A completely fresh DuckDB instance that never touches the hard drive. Data is lost as soon as the process closes. Primarily used for large batch calculations and data cleaning from Parquet formats or Amazon S3 remote files, exploiting the supersonic RAM read/write capabilities of the hardware.
*   **Persistence (Read-Only Mode):** It "ATTACHes" to the designated DuckDB database assuming a `read_only=true` flag. The `DatabaseManager` blocks local modifications through security commands. This scheme allows opening multiple AmoxSQL IDEs on the same database without corruption, essential for concurrent data analysis on local networks or when other ETLs are populating the master `.db` structure.
*   **Persistence (Read/Write Mode):** The `DatabaseManager` acquires absolute control (Lock) of the file on the disk system.

### Multi-Tenant "Hard Reset" Strategy
Because Node and DuckDB C++ live in very tight co-dependencies of asynchronous I/O read promises, if the user decides to *Switch Projects* without physically restarting the application (from `MenuBar.jsx`), AmoxSQL triggers a strict chain designed in the `reinitializeSystem()` function within `DatabaseManager.js`:
1.  Kills all running promises (`.kill()`) or open connections (`connection.close()`).
2.  Unlinks from memory the main instances that are open `this.instance = null`.
3.  At the Operating System level, cleans cached persistence to ensure the file explorer and APIs stop listening (`_initSystem()`).
4.  This "Hard Reset" methodology prevents "Zombie" binary locks, something that would typically require force-closing from Windows Task Manager.

---

## 3. Multi-Tab Interface Architecture & Views (Layout Manager)

To match the flexibility and architectural/UX freedom proposed by massive systems like Eclipse, VS Code, or JetBrains, AmoxSQL implements its own partitioning and state engine using a module called `LayoutManager.jsx`. It's not simply redrawing divs; it's storing a complete document cycle and interface buffer in memory.

### Long-Lived Reactive States
When a user opens three tabs of long codes (`script_1.sql`, `notebook.sqlnb`, `sales.amoxvis`):
*   The Frontend context carries a vector of complex objects called **Tabs**.
*   Each *Tab* includes a unique `id`, a `type` (which tells `EditorPane.jsx` which React component to mount on that tab, e.g., `SqlEditor` vs `SqlNotebook`), the file path for asynchronous save writing, and a record of what the Monaco Editor on the Frontend is currently drawing in its text buffer (`docModel`).
*   This ensures the user can quickly switch context without losing where their blinking cursor was or losing results from previous executions, preserving everything instantly on RAM cache in a super-advanced *Single Page Application* model.

### Split View Controls
AmoxSQL's main window is designed in flexible sections that can be resized.
1.  **Sidebar:** Functions as a hybrid Accordion. It encompasses the File Explorer for managing base scripts and notebooks, but with a global Switch that can entirely swap it to become an Amox AI Manager (`AiSidebar.jsx`) or the pure Database Viewer and Inspector (`DatabaseExplorer.jsx`).
2.  **Bottom Panels:** Logically abstracted from execution. Once the Backend fires and completes the giant JSON response from a Query result, that data is channeled to the bottom panel, which in turn becomes a Sub-Tab Manager:
    *   Allows toggling to evaluate flat Data in the virtual grid of `ResultsTable.jsx`.
    *   Toggle to visual analyses in `DataVisualizer.jsx`.
    *   This dual Central Editing Panel + Bottom Results Panel system promotes cyclic iterativity in Query and Visualization construction, reducing validation and confirmation times and facilitating direct debugging with a view to the ground truth of data in real-time.
