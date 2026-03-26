# IDE Configuration

**AmoxSQL** centralizes all IDE configurations in a unified panel accessible from the menu bar or via keyboard shortcuts. The `SettingsModal.jsx` (99KB+) is the most extensive component of the application, organized into **5 tabs** covering everything from visual appearance to cloud service integrations.

---

## 1. Tab: Appearance

### Color Theme Selector
8 complete color themes presented as interactive visual cards. Each card shows a miniature preview of the theme with the sidebar, editor, and a sample code snippet:

#### Dark Themes (5)
| Theme | Sidebar BG | Editor BG | Description |
|------|---------------|--------------|-------------|
| **Obsidian** | `#0e0f11` | `#141518` | The deepest and darkest |
| **Onyx** | `#101113` | `#1a1c20` | Black with subtle bluish hints |
| **Carbon** | `#121315` | `#1c1f24` | Dark bluish-gray, balanced |
| **Graphite** | `#141618` | `#222529` | Dark warm gray |
| **Nord Dark** | `#151920` | `#222833` | Inspired by the Polar Night palette |

#### Light Themes (3)
| Theme | Sidebar BG | Editor BG | Description |
|------|---------------|--------------|-------------|
| **Ivory** | `#f3ede4` | `#faf6ef` | Warm like antique paper |
| **Mist** | `#e8ecf2` | `#f2f4f8` | Cold like morning fog |
| **Light** | `#f2f3f5` | `#ffffff` | Clean and bright, classic white |

The selected theme applies instantly to all IDE components via global CSS variables, without perceptible latency.

### Accent Color Selector
13 accent colors organized into two palettes:

#### Vibrant Palette (7 colors)
| ID | Color | Hex | Description |
|----|-------|-----|-------------|
| `cyan` | 🟦 | `#00FFFF` | Default — Electric Cyan |
| `amox-2` | 🟦 | `#00F5FF` | Aqua |
| `amox-4` | 🟦 | `#00DAFF` | Sky |
| `amox-6` | 🟦 | `#0090FF` | Azure |
| `amox-8` | 🟦 | `#0090FF` | Blue |
| `amox-10` | 🟦 | `#0068FF` | Cobalt |
| `linear` | 🟪 | `#5E6AD2` | Linear Blue |

#### Sober Palette (6 colors)
| ID | Color | Hex | Description |
|----|-------|-----|-------------|
| `sage` | 🟢 | `#7dab8a` | Sage green |
| `amber` | 🟡 | `#d4a853` | Golden amber |
| `rose` | 🔴 | `#c97878` | Soft rose |
| `lavender` | 🟣 | `#a88ec4` | Lavender |
| `steel` | ⚪ | `#8a9bb0` | Bluish steel |
| `copper` | 🟠 | `#c4956a` | Warm copper |

The selected accent controls `--accent-color-user` and propagates to buttons, active borders, selection indicators, spinners, and badges throughout the IDE.

### Editor Layout Selector
Two visual layouts represented with previews:
*   **Horizontal (default):** Editor on top, results below — ideal for standard monitors.
*   **Vertical:** Editor on the left, results on the right — optimized for ultrawide monitors.

---

## 2. Tab: Editor

### Typography
*   **Font Family (6 options):** JetBrains Mono, Fira Code, Cascadia Code, Consolas, Monaco, Source Code Pro. Each font is injected dynamically via WebFonts.
*   **Font Size:** Slider from 10px to 24px with visible numeric value.
*   **Tab Size:** Toggle between 2 and 4 spaces.

### Editor Visualization
*   **Minimap:** Toggle to show/hide the miniature code preview on the right edge.
*   **Word Wrap:** Toggle to wrap lines exceeding the editor's width.
*   **Line Numbers:** Toggle to show/hide line numbers in the gutter.

### Results Panel
*   **Results Font Size:** Independent slider from 11px to 16px for the results table.
*   **Default View:** Selector between Table, Chart, or Profile as the initial view when executing a query.

### Editor Intelligence (DuckDB Function Catalog)
Informative panel showing the DuckDB functions catalog status:
*   **Coverage Bar:** Visual indicator of the percentage of functions with rich documentation.
*   **Counter:** `N / M functions` documented.
*   **"Refresh Cache" Button:** Regenerates the catalog cache by merging curated documentation with live introspection from `duckdb_functions()`.
*   **Function List:** Expandable panel showing functions with basic auto-generated documentation.

---

## 3. Tab: AI Assistant

### Provider Selector
Dropdown menu with two options:
*   **Ollama (Local Engine):** 100% offline local AI engine.
*   **Google Gemini (Cloud):** Cloud AI engine requiring an API Key.

### Ollama Configuration
When Ollama is selected:
*   **Default Model:** Selector among locally installed models.
*   **Installed Models:** List with name, size, and date of available models.
*   **Recommended Models:** Catalog of 4 pre-configured models (Qwen 2.5, Llama 3.2, Llama 3.1, Gemma 2) with required RAM info and description.
*   **Model Download:** Free input field and button to download any Ollama model with a real-time progress bar (SSE streaming).

### Gemini Configuration
When Gemini is selected:
*   **API Key:** Secure input field for the Google AI key.
*   **Daily Usage Tracker:** Informative panel showing current consumption per model (Flash Lite, Flash, Pro) and used tokens. Resets daily at midnight.

---

## 4. Tab: Cloud Storage

### AWS S3
Configuration form with fields for:
*   **Access Key ID:** AWS IAM Credential.
*   **Secret Key:** AWS Secret Key.
*   **Region:** Bucket region (e.g., `us-east-1`, `eu-west-1`).
*   **Endpoint:** Custom endpoint for S3-compatible services (MinIO, DigitalOcean Spaces, Cloudflare R2).
*   **Default Bucket:** Default bucket for exports.
*   **Test Connection:** Button to verify connectivity and return a success or error message.

### Google Cloud Storage (GCS)
Configuration form with fields for:
*   **Access Key ID:** GCS HMAC Credential.
*   **Secret Key:** HMAC secret key.
*   **Default Bucket:** Default bucket for exports.
*   **Test Connection:** Integrated connectivity verification.

---

## 5. Tab: About AmoxSQL

Informative panel displaying:
*   **AmoxSQL Version:** v1.9.9.
*   **DuckDB Version:** Dynamically fetched via `SELECT version()`.
*   **External Links:**
    *   Project GitHub (opens in system browser via `electronAPI.openExternal`).
    *   Official website.
    *   Sponsorship page.
*   **Credits and Acknowledgements:** Recognition to base technologies (DuckDB, Monaco Editor, Recharts, React, Node.js).

---

## Global Configuration Persistence

All IDE configurations are persisted on two levels:
1.  **`localStorage`:** Theme, accent, layout, editor preferences — loaded instantly upon startup.
2.  **Configuration File (`~/.amoxsql/config.json`):** API keys, AI provider, default model, Cloud Storage configs, and Gemini usage tracking.

Appearance changes (theme, accent, layout) apply immediately without needing to save. AI and Cloud Storage configurations require clicking "Save Settings" to persist.
