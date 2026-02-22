# Integrated Artificial Intelligence (AmoxSQL AI)

The hybrid integration of Large Language Models (LLMs) turns **AmoxSQL** into a truly sophisticated co-pilot development assistant. Instead of embedding a heavy, monolithic engine that penalizes IDE performance, the architecture uses an intelligent delegation and routing concept orchestrated by **`AiManager.js`** on the backend and **`AiSidebar.jsx`** on the frontend.

---

## 1. Ollama (Local & 100% Private Offline)

The supreme principle for financial or healthcare entities that process regulated data (such as medical records or card payments) establishes that metadata cannot travel via HTTP to APIs in Silicon Valley cloud providers.

To solve this, AmoxSQL communicates asynchronously with **Ollama**, an inference server written in Go that efficiently runs heavy models (Local LLMs) under the standard local protocol `http://localhost:11434`.

### Models and Memory Specifications
The AmoxSQL team recommends (and certifies pre-configurations within the UI for) a hierarchical spectrum of "Instruct" models based on the operator's available graphics VRAM and CPU RAM:
*   **Qwen 2.5 Coder (1.5B):** The gold standard for entry-level portable machines, operating with ~1.4GB of occupied RAM guaranteeing incredibly fast basic SQL.
*   **Llama 3.2 (3B):** The bittersweet intermediate point between astonishing logical prowess and manageable weight (~2.0 GB of RAM).
*   **Llama 3.1 / CodeLlama (8B+):** For specialized workstations. Demands above 5GB of RAM. Unbeatable in resolving extremely intricate SQL logic problems or creating multi-level CTEs for hierarchical queries in complex database models.

**Error Handling (Architectural Troubleshooting):**
AmoxSQL does not attempt to download Gigabytes arbitrarily without your permission. The IDE invokes Node.js; if `AiManager.js` receives a non-responding port error (`ECONNREFUSED` / `fetch failed`), it intercepts and cleanly warns the user to open the Ollama program. If it receives a code indicating the model "doesn't exist", it warns the user with the required command-line instruction (e.g., `ollama pull llama3.2:3b`).

## 2. Gemini Mode (Cloud Power with Google API)

For analysts or static users (Data Scientists working on massive public datasets, for example), operating with laptops without strong tensor processing capabilities or who prefer cutting-edge LLMs on the network.

AmoxSQL supports token injection through the official ecosystem library `@google/generative-ai`.
*   The user provides their confidential Google key (API Key).
*   **Usage Tracker (Daily Usage Tracking):** The generative key and computational usage have daily limits and free-tier quotas (Flash Lite, Flash, and Pro). AmoxSQL iteratively writes to a hidden secure configuration file (`~/.amoxsql/config.json`) the exact record of each request. It resets this odometer each time the computer's ISO daily date crosses midnight, guaranteeing the user visibility and parametric braking in their settings panel (`SettingsModal.jsx`).

---

## 3. Smart RAG: The "Adaptive Context"

AmoxSQL doesn't just act as "pass text A, return text B". It exercises a specialized RAG (Retrieval-Augmented Generation) routing and purification technique for the System Prompt ("System Prompt Generative Injection"):

1.  **Schema Semantic Collection:** When the user writes a semantic question in natural language in the chat bar (e.g., *"What was the best-selling product in December?"*), the code traverses the DuckDB database topology immediately.
2.  **Controlled Dynamic Injection:** Injects into the System Prompt the definition of keys, tables, and variables, so the AI model doesn't hallucinate (zero hallucinations) and includes the truthful column names.
3.  **Enforced Dialectal Principles:** `AiManager.js` has hard-coded injectable clauses that "punish" typical AI errors when generating SQL.
    *   It explicitly prohibits the use of foreign syntax; forces compatible functional transactional dialects of DuckDB (e.g., prefer native ranges or avoid MySQL peculiarities).
    *   If ranking-oriented demands are detected ("Top", "Best"), the prompt strictly forces it to use conditional groupers like the powerful mathematical clause `QUALIFY ROW_NUMBER() OVER (...) <= N`, preventing the traditional grouping that often triggers unnecessary sequential scans or inefficient subqueries that would bog down massive C++ engines.
4.  **Auto Output Parsing:** Unlike ChatGPT, the application doesn't transfer the "raw" chat containing long passages "Of course!, the answer is the following: [Code Blocks]". AmoxSQL intercepts the response, applies regex filters disassembling any syntactic format block ("```sql") and immaculately returns only the necessary computable SQL characters, listing them in clean preview ready to be added to the IDE Editor or executed directly.
