# Core Architecture and Workflow

The core architecture of **AmoxSQL** (v1.9.9) is built on principles of modularity, strict memory management at the system level, and a user experience that faithfully emulates industrial-grade IDEs with a design system inspired by **Linear**.

Below, we comprehensively document the fundamental systems and the IDE's lifecycle.

---

## 1. Linear UI Design System

In version 1.9.9, AmoxSQL adopts a complete design system inspired by **Linear**, with design tokens, CSS class migration, and a comprehensive audit of all components. This redesign includes:

### Design Tokens and CSS Variables
The entire visual system is controlled by global CSS variables defined in `index.css` (156KB+), organized into semantic layers:
*   **Surfaces:** `--surface-base`, `--surface-raised`, `--surface-overlay`, `--surface-elevated` — Define the visual hierarchy of depth.
*   **Text:** `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-muted`, `--text-active` — Scale of typographic prominence.
*   **Borders:** `--border-subtle`, `--border-default`, `--border-strong`, `--border-hover` — For separators and containers.
*   **Accents:** `--accent-primary`, `--accent-secondary`, `--accent-muted`, `--accent-color-user` — Dynamic accent color selected by the user.
*   **Feedback:** Dedicated variables for success, error, warning, and information states.

### 8 Color Themes
The IDE offers 8 complete color themes, selectable from the `SettingsModal.jsx`:

| Theme | Type | Description |
|------|------|-------------|
| **Obsidian** | Dark | The deepest and darkest, almost black background |
| **Onyx** | Dark | Black with subtle bluish hints |
| **Carbon** | Dark | Dark bluish-gray, balanced |
| **Graphite** | Dark | Dark warm gray |
| **Nord Dark** | Dark | Inspired by the Nordic Polar palette |
| **Ivory** | Light | Warm like antique paper |
| **Mist** | Light | Cold like morning fog |
| **Light** | Light | Clean and bright, classic white |

### 13 Accent Colors
Organized into two palettes:
*   **Vibrant (7):** Cyan (default), Aqua, Sky, Azure, Blue, Cobalt, Linear Blue.
*   **Sober (6):** Sage, Amber, Rose, Lavender, Steel, Copper.

The selected accent is randomly injected throughout the IDE via `--accent-color-user`, affecting buttons, active borders, selection indicators, and badges.

### Editor Layout: Horizontal / Vertical
The user can toggle between two editor layouts from the settings:
*   **Horizontal (default):** Editor on top, results below — ideal for standard monitors.
*   **Vertical:** Editor on left, results on right — optimized for ultrawide monitors.

---

## 2. The Central Command Palette (`CommandPalette.jsx`)

To guarantee a "Keyboard-First Workflow", the Omnipresent Launcher (accessible globally with `Ctrl+K` or `Cmd+K`) is the IDE's central nervous system.

Unlike relying on slow top-bar menus, the Palette engine indexes a dynamic registry of actions instantly:
*   `Run Query` (`Ctrl+Enter`): Triggers async calls to the engine.
*   `Save File` (`Ctrl+S`): Serializes the editor state to the local magnetic disk without touching the UI.
*   `Navigation / Extensions`: Invokes reactive changes to the Layout Manager to mutate the left accordion or force the opening of AI intelligences with one click.

Each of these actions and shortcuts can be audited graphically via `KeyboardShortcutsModal.jsx`, giving the user a unified view of all shortcuts.

---

## 3. Project-Centric Design

AmoxSQL abandons the classic idea of database tools that require static credentials and open ports. Operating with a Serverless and In-Process database like DuckDB, the concept of connection evolves to a workspace concept based entirely on the user's filesystem.

### Project Opening Cycle:
1.  **Welcome Screen:** The initial entry point, programmed in `WelcomeScreen.jsx`. It mandatorily requests an **Absolute Path** on the operator's computer. It includes a list of recent projects for quick access.
2.  **Validation and Scanning:** Upon receiving the path, the backend intercepts the command via Python/Node native filesystem APIs (`fs`). The system recursively crawls the requested directory to identify:
    *   Existing DuckDB database files (`.duckdb`, `.db`).
    *   Saved SQL scripts from previous sessions (`.sql`).
    *   AmoxSQL visual persistent configurations (`.amoxvis`).
    *   Interactive notebooks (`.sqlnb`).
3.  **Bootstrapping the Explorer:** After validating the path, the IDE boots, state-initializing its `FileExplorer` on the left and preparing its Central Layout, injecting all located file paths into the main React Global Context in the Frontend.

---

## 4. Robust Connection Management (Hard Reset)

Under the hood, on the server, there is a vital Node.js Singleton called **`DatabaseManager.js`**. Its main goal is to avoid dreaded memory leaks or binary files locked by uncontrolled shutdowns of transactional databases.

### Interactive Database Modes
The connection modal offers three operational connection vectors:
*   **In-Memory Mode:** Completely fresh DuckDB instance that doesn't touch the hard drive. Data is lost as soon as the process closes.
*   **Read-Only Mode:** Attaches (`ATTACH`) to the designated DuckDB database assuming a `read_only=true` flag. This allows opening multiple AmoxSQL IDEs on the same database without corruption.
*   **Read/Write Mode:** `DatabaseManager` acquires absolute lock control of the file on the disk system.

### Multi-Tenant "Hard Reset" Strategy
If the user decides to *Change Project* without physically restarting the app, AmoxSQL triggers a strictly designed chain (`reinitializeSystem()`) in `DatabaseManager.js`:
1.  Kills all running promises or open connections (`connection.close()`).
2.  Unbinds memory of main open instances `this.instance = null`.
3.  OS-level persistence is cleared to ensure file explorers and APIs stop listening.

---

## 5. Multi-Tab Architecture and Split Views (Layout Manager)

AmoxSQL implements its own partition and state engine using `LayoutManager.jsx` (30KB+). It stores a complete document cycle and interface buffer in memory with a *card-based floating layout*.

### Long-Lived Reactive States
When a user opens three long code tabs (`script_1.sql`, `notebook.sqlnb`, `ventas.amoxvis`):
*   The Frontend context carries a vector of complex objects called **Tabs**.
*   Each *Tab* includes a unique id, a `type` that dictates what React component to mount on that tab, the file path for async writing, and a registry of the underlying Monaco text buffer (`docModel`).
*   The redesigned `TabBar.jsx` shows tabs with distinct file icons and visual states according to the active theme.

### Split Views Controls
The main AmoxSQL window is designed in flexible resizable sections:
1.  **Custom Title Bar (`WindowTitleBar.jsx`):** Native Electron title bar showing active project and controls.
2.  **Sidebar:** A hybrid Accordion holding the File Explorer, which can globally swap to the AI Manager (`AiSidebar.jsx`), Database Explorer (`DatabaseExplorer.jsx`), or DBT Studio (`DbtPanel.jsx`).
3.  **The Bottom Panel:** Once JSON results array returns, the data goes here and converts to a Sub-Tab manager:
    *   Virtual Grid `ResultsTable.jsx`.
    *   Visual analyses in `DataVisualizer`.
    *   Statistical profile in `DataProfiler.jsx`.
4.  **Popout Results (`PopoutResultsPage.jsx`):** Query results can be detached to an independent Electron window.

### Visual Layout Persistence
The exact tolerances (LayoutWidth, Theme, AccentColor, EditorLayout) are dumped to Electron settings JSON/localStorage per profile so the workflow picks up exactly where left off.

---

## 6. Status Bar (`StatusBar.jsx`)

A compact status bar showing:
*   **Connection State:** Visual indicator of active connection mode (In-Memory, Read-Only, R/W).
*   **Project Info:** Active project path and DB connected via `ProjectInfo.jsx`.
*   **Toast Notifications (`ToastProvider.jsx`):** Unintrusive global notification system with soft animations.
