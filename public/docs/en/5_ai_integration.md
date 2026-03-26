# Integrated Artificial Intelligence (AmoxSQL AI)

The hybrid integration of Large Language Models (LLMs) turns **AmoxSQL** into a truly sophisticated co-pilot development assistant. In version 1.9.9, the AI system was entirely redesigned into an **agentic architecture featuring tool-calling**, evolving from a simple SQL generator to an autonomous agent capable of executing queries, inspecting tables, generating charts, and suggesting next steps.

---

## 1. Backend Agentic Architecture (`server/ai/`)

The AI engine is organized into specialized modules inside `server/ai/`:

### System Modules
*   **`AiManager.js`** (14KB): Main orchestrator routing requests to the active provider (Ollama or Gemini), managing the tool-calling loop, and coordinating responses.
*   **`systemPrompt.js`**: Dynamic system prompt that injects DuckDB dialectal instructions, anti-hallucination rules, and the active database schema context.
*   **`tools.js`**: Definition and execution logic of the 5 available tools for the agent.
*   **`memory.js`**: Conversation memory management with a sliding window to keep context relevant.
*   **`compaction.js`**: Automatic compaction of history when exceeding model token limits, summarizing long conversations.
*   **`persistence.js`**: Persistent storage of conversations to disk (`~/.amoxsql/conversations/`).
*   **`userRules.js`**: Custom user rules injected into the prompt.

### The 5 Agent Tools (Tool-Calling)
The tool-calling system lets the AI act autonomously:

| Tool | Description | Arguments |
|-------------|-------------|------------|
| `execute_sql` | Executes an SQL query in DuckDB and returns results | `sql` (string) |
| `list_tables` | Lists all tables and views in the database | — |
| `describe_table` | Describes the structure (columns, types) of a table | `table_name` (string) |
| `display_chart` | Generates a visual chart from data | `chart_type`, `data`, `config` |
| `suggest_followups` | Suggests follow-up questions based on context | — |

The agentic cycle flow works as follows:
1.  User asks a question (e.g., *"What was the most sold product?"*).
2.  `AiManager.js` builds the prompt with RAG schema + conversation history.
3.  The model responds with one or more *tool calls*.
4.  The backend executes each tool and returns results to the model.
5.  The model analyzes the results and generates a final response with explanations.
6.  If necessary, the model can chain multiple contiguous tool calls.

---

## 2. Chat Interface (`AiSidebar.jsx` + `ai/` components)

The frontend chat interface was entirely revamped into a modern component system:

*   **`AiSidebar.jsx`**: Main lateral panel holding the chat, input bar, and conversation controls.
*   **`ChatMessage.jsx`**: Rendering of individual messages using rich Markdown formatting and professional model responses.
*   **`ToolCallBlock.jsx`**: Collapsible visual indicator for each agent tool call. Shows spinning loaders, tool icons, execution times (e.g. "228 rows (45ms)"), and expands to show input parameters.
*   **`SqlBlock.jsx`**: SQL Code block highlighting with direct execution buttons.
*   **`ChatResultsBlock.jsx`**: Embedded results table right next to chat messages.
*   **`ConversationList.jsx`**: List of saved conversations with timestamps.

---

## 3. Ollama (Local & 100% Offline Private)

The core principle for financial or healthcare entities processing regulated data establishes that metadata cannot travel over HTTP to cloud APIs.

AmoxSQL communicates asynchronously with **Ollama**, a local inference runner written in Go operating completely free and offline (`http://localhost:11434`).

### Recommended Models and Management
From the SettingsModal "AI" tab, users can:
*   View local installed models.
*   **Download new models:** directly with a streaming percentage progress bar.

Pre-configured models:
*   **Qwen 2.5 (1.5B):** ~1.4GB RAM — entry-level machines.
*   **Llama 3.2 (3B):** ~2.0GB RAM — balanced middle point.
*   **Llama 3.1 (8B):** ~4.9GB RAM — deep complex SQL queries.
*   **Gemma 2 (2B):** ~1.6GB RAM — excellent memory retention.

---

## 4. Gemini Mode (Cloud Power with Google API)

For analysts operating with laptops without strong tensor processing, AmoxSQL supports Cloud injection via the official `@google/generative-ai` library.
*   Requires API Key.
*   **Daily Usage Tracker:** AmoxSQL logs every single API request on a hidden config file (`~/.amoxsql/config.json`) tracking daily token allowance resets at midnight.

---

## 5. Smart RAG: The "Adaptive Context"

AmoxSQL exercises a specialized routing and extraction RAG technique:

1.  **Schema Semantic Collection:** When generating prompted text, AmoxSQL transverses the topology of the DB.
2.  **Controlled Dynamic Injection:** Injects table DDLs, enforcing correct column names to stop hallucinations.
3.  **Dialect Rules:** `systemPrompt.js` enforces specific DuckDB native syntax like `list_agg()`.
4.  **Auto Parsing Output:** Regex cleaning to guarantee SQL execute-ready code snippets.

---

## 6. Persistent Conversation Management

Unlike previous builds, chats are no longer lost upon reload:
*   **Disk Persistence:** JSON array of messages saved directly to disk.
*   **Smart Compaction:** Auto-summarizer of lengthy messages to not blow up context windows.
*   **Memory Window:** Sliding window retaining recent payloads intact.
