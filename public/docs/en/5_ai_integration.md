# Integrated Artificial Intelligence (AmoxSQL AI)

The hybrid integration of Large Language Models (LLMs) turns **AmoxSQL** into a truly sophisticated co-pilot development assistant. Instead of embedding a heavy, monolithic engine that penalizes IDE performance, the architecture uses a concept of intelligent delegation and routing orchestrated by **`AiManager.js`** on the backend and **`AiSidebar.jsx`** on the frontend.

---

## 1. Ollama (Local & 100% Offline Private)

The ultimate principle for financial or healthcare entities processing regulated data (like medical records or card payments) dictates that metadata cannot travel over HTTP to cloud APIs of Silicon Valley providers.

To solve this, AmoxSQL communicates asynchronously with **Ollama**, an inference server written in Go that efficiently runs heavy models (Local LLMs) under the standard local protocol `http://localhost:11434`.

### Models and Memory Specifications
The AmoxSQL team recommends (and certifies pre-configurations within the UI for) a hierarchical spectrum of "Instruct" models based on the operator's available graphics VRAM and CPU RAM:
*   **Qwen 2.5 Coder (1.5B):** The gold standard for entry-level laptops, operating with ~1.4GB of occupied RAM guaranteeing incredibly fast basic SQL.
*   **Llama 3.2 (3B):** The sweet spot between astonishing logical dexterity and manageable weight (~2.0 GB of RAM).
*   **Llama 3.1 / CodeLlama (8B+):** For specialized workstations. Demands above 5GB of RAM. Unsurpassed in solving extremely intricate SQL logic problems or creating multi-level CTEs for hierarchical queries in complex database models.

**Error Handling (Architectural Troubleshooting):**
AmoxSQL does not attempt to download Gigabytes arbitrarily without your permission. The IDE invokes Node.js; if `AiManager.js` receives an unanswered port error (`ECONNREFUSED` / `fetch failed`), it intercepts and cleanly alerts the user to open the Ollama program. If it receives a code indicating the model "does not exist", it warns the user with the required command-line instruction (e.g., `ollama pull llama3.2:3b`).

## 2. Gemini Mode (Cloud Power with Google API)

For analysts or static users (Data Scientists working on massive public data sets, for example) operating with laptops without strong tensor processing capabilities or who prefer cutting-edge LLMs on the network.

AmoxSQL supports token injection via the official ecosystem library `@google/generative-ai`.
*   The user provides their confidential Google API Key.
*   **Daily Usage Tracker:** The generative key and computational usage have limits and daily quotas from the free-tier (Flash Lite, Flash, and Pro). AmoxSQL iteratively writes to a hidden secure configuration file (`~/.amoxsql/config.json`) the exact record of each request. It resets this odometer every time the computer's daily ISO date crosses midnight, guaranteeing the user visibility and a parametric brake in their settings panel (`SettingsModal.jsx`).

---

## 3. Smart RAG: The "Adaptive Context"

AmoxSQL doesn't just act like "I pass text A, you return text B". It exercises a specialized Retrieval-Augmented Generation (RAG) routing and purification technique for the System Prompt ("System Prompt Generative Injection"):

1.  **Schema Semantics Collection:** When the user types a semantic natural language question in the chat bar (e.g., *"What was the best-selling product in December?"*), the code immediately traverses the DuckDB database topology.
2.  **Controlled Dynamic Injection:** Injects into the System Prompt the definition of keys, tables, and variables, so the AI model does not hallucinate (zero hallucinations) and includes the factual column names.
3.  **Imposed Dialectal Principles:** `AiManager.js` has hard-coded injectable clauses that "punish" typical AI errors when generating SQL.
    *   Explicitly forbids the use of foreign syntax; forces it to functionally compatible DuckDB transactional dialects (e.g., preferring native ranges or avoiding MySQL peculiarities).
    *   If Ranking-oriented demands are detected ("Top", "Best"), the prompt strictly forces it to use conditional groupers like the powerful mathematical clause `QUALIFY ROW_NUMBER() OVER (...) <= N`, preventing it from traditional grouping that often triggers unnecessary sequential scans or inefficient subqueries that would stall massive C++ engines.
4.  **Auto Parsing Outputs:** Unlike ChatGPT, the application does not transfer the "raw" chat containing long formatting passages "Sure! The answer is as follows: [Code blocks]". AmoxSQL intercepts the response, applies regular expression filters disassembling any formatting syntactic block ("```sql") and immaculately returns only the necessary computable SQL characters, to list them in a clean preview ready to be added to the IDE Editor or executed directly.
