# Inteligencia Artificial Integrada (AmoxSQL AI)

La integración híbrida de Grandes Modelos de Lenguaje (LLMs) convierte a **AmoxSQL** en un asistente de desarrollo co-piloto verdaderamente sofisticado. En la versión 1.9.9, el sistema de IA fue completamente rediseñado hacia una arquitectura **agéntica con tool-calling**, pasando de ser un simple generador de SQL a un agente autónomo capaz de ejecutar consultas, inspeccionar tablas, generar gráficos y sugerir pasos siguientes.

---

## 1. Arquitectura Agéntica del Backend (`server/ai/`)

El motor de IA se organiza en módulos especializados dentro del directorio `server/ai/`:

### Módulos del Sistema
*   **`AiManager.js`** (14KB): Orquestador principal que enruta las peticiones al proveedor activo (Ollama o Gemini), gestiona el ciclo de tool-calling, y coordina las respuestas.
*   **`systemPrompt.js`**: Prompt de sistema dinámico que inyecta las instrucciones dialectales de DuckDB, reglas anti-alucinación, y contexto del esquema de base de datos activo.
*   **`tools.js`**: Definición y ejecución de las 5 herramientas (tools) disponibles para el agente.
*   **`memory.js`**: Gestión de la memoria de conversación con ventana deslizante para mantener contexto relevante.
*   **`compaction.js`**: Compactación automática del historial de mensajes cuando excede los límites del contexto del modelo, resumiendo conversaciones largas.
*   **`persistence.js`**: Almacenamiento persistente de conversaciones en disco (`~/.amoxsql/conversations/`), permitiendo retomar chats entre sesiones.
*   **`userRules.js`**: Reglas personalizadas del usuario que se inyectan en el sistema de prompts.

### Las 5 Herramientas del Agente (Tool-Calling)
El sistema de tool-calling permite al agente IA actuar autónomamente:

| Herramienta | Descripción | Argumentos |
|-------------|-------------|------------|
| `execute_sql` | Ejecuta una consulta SQL en DuckDB y retorna resultados | `sql` (string) |
| `list_tables` | Lista todas las tablas y vistas de la base de datos | — |
| `describe_table` | Describe la estructura (columnas, tipos) de una tabla | `table_name` (string) |
| `display_chart` | Genera un gráfico visual a partir de datos | `chart_type`, `data`, `config` |
| `suggest_followups` | Sugiere preguntas de seguimiento basadas en el contexto | — |

El flujo de un ciclo agéntico funciona así:
1.  El usuario hace una pregunta en lenguaje natural (ej. *"¿Cuál fue el producto más vendido?"*).
2.  `AiManager.js` construye el prompt con esquema RAG + historial de conversación.
3.  El modelo responde con una o más *tool calls*.
4.  El backend ejecuta cada herramienta y retorna los resultados al modelo.
5.  El modelo analiza los resultados y genera una respuesta final con explicaciones.
6.  Si es necesario, el modelo puede encadenar múltiples tool calls consecutivas.

---

## 2. Interfaz de Chat (`AiSidebar.jsx` + componentes `ai/`)

El frontend de IA fue completamente rediseñado con un sistema de chat moderno organizado en sub-componentes:

### Componentes de la Interfaz de Chat

*   **`AiSidebar.jsx`** (27KB): Panel lateral principal que contiene el chat, la barra de entrada de mensajes, y los controles de conversación.
*   **`ChatMessage.jsx`** (12KB): Renderizado de mensajes individuales con soporte para Markdown enriquecido, bloques de código con resaltado sintáctico, y formato profesional para respuestas del modelo.
*   **`ToolCallBlock.jsx`** (5KB): Indicador visual colapsable para cada tool call del agente. Muestra:
    *   Estado de carga (spinning loader) durante la ejecución.
    *   Icono y etiqueta descriptiva de la herramienta.
    *   Resultado resumido (ej. "228 rows (45ms)") al completar.
    *   Panel expandible con los argumentos de entrada y la salida cruda.
*   **`SqlBlock.jsx`** (3KB): Bloque de código SQL con resaltado sintáctico y botón de "Copiar" o "Ejecutar" directamente desde el chat.
*   **`ChatResultsBlock.jsx`** (9KB): Tabla de resultados embebida dentro del chat que muestra los datos retornados por `execute_sql`, con la misma calidad de renderizado que `ResultsTable.jsx`.
*   **`ConversationList.jsx`** (10KB): Lista de conversaciones guardadas con búsqueda, timestamps, y capacidad de renombrar o eliminar conversaciones pasadas.

---

## 3. Ollama (Local & 100% Offline Privado)

El principio máximo para entes financieros o de salud que procesan datos regulados establece que la metadata no puede viajar por HTTP hacia APIs en la nube.

AmoxSQL se comunica asíncronamente con **Ollama**, un servidor de inferencia escrito en Go que corre eficientemente modelos pesados (Local LLMs) bajo el protocolo local estándar `http://localhost:11434`.

### Modelos Recomendados y Gestión
Desde la pestaña "AI" del `SettingsModal`, el usuario puede:
*   **Ver modelos instalados:** Lista dinámica con nombre, tamaño y descripción.
*   **Descargar nuevos modelos:** Desde un catálogo de modelos recomendados o con entrada libre de ID de modelo.
*   **Barra de progreso en tiempo real:** Descarga con streaming de progreso porcentual.

Modelos pre-configurados:
*   **Qwen 2.5 (1.5B):** ~1.4GB RAM — ideal para máquinas de gama de entrada.
*   **Llama 3.2 (3B):** ~2.0GB RAM — punto medio equilibrado.
*   **Llama 3.1 (8B):** ~4.9GB RAM — potente para SQL y código complejos.
*   **Gemma 2 (2B):** ~1.6GB RAM — gran razonamiento para memoria limitada.

**Manejo de Errores:**
Si `AiManager.js` recibe un error de puerto no respondido (`ECONNREFUSED` / `fetch failed`), intercepta y le avisa limpiamente al usuario que abra el programa Ollama. Si recibe un código manifestando que el modelo "no existe", advierte con instrucciones precisas (ej. `ollama pull llama3.2:3b`).

---

## 4. Gemini Mode (Cloud Power con Google API)

Para analistas que operan con portátiles sin capacidades fuertes de procesamiento tensorial, AmoxSQL soporta inyección por token a través de la librería oficial `@google/generative-ai`:
*   El usuario suministra su llave confidencial de Google (API Key) en la pestaña "AI" del Settings.
*   **Tracker de Uso Diario:** AmoxSQL escribe iterativamente sobre un archivo seguro de configuración oculto (`~/.amoxsql/config.json`) el registro exacto de cada petición. Resetea el odómetro cada vez que la fecha ISO cruza la media noche.

---

## 5. RAG Inteligente: El "Contexto Adaptativo"

AmoxSQL ejerce una técnica especializada de enrutamiento y purificación RAG (*Retrieval-Augmented Generation*) para el Prompt de Sistema:

1.  **Recolección de Semántica del Esquema:** Cuando el usuario redacta una pregunta, el código recorre instantáneamente la topología de la base de DuckDB.
2.  **Inyección Dinámica Controlada:** Inyecta en el System Prompt la definición de llaves, tablas y variables, para que el modelo no alucine e incluya los nombres verídicos de columnas.
3.  **Principios Dialectales Impuestos:** `systemPrompt.js` tiene cláusulas inyectables que:
    *   Prohíben explícitamente sintaxis ajena al dialecto DuckDB.
    *   Fuerzan el uso de `QUALIFY ROW_NUMBER() OVER (...)` en vez de subconsultas ineficientes.
    *   Obligan el uso de funciones nativas de DuckDB como `list_agg()`, rangos nativos, y variables temporales.
4.  **Auto Parsing de Salidas:** La aplicación intercepta la respuesta, aplica filtros por expresiones regulares desarmando bloques sintácticos de formato (`` ```sql ```) y devuelve inmaculadamente los caracteres SQL computables listos para ejecución.

---

## 6. Gestión de Conversaciones Persistentes

A diferencia de versiones anteriores que perdían el historial de chat al cerrar la aplicación:
*   **Persistencia en Disco:** Cada conversación se guarda automáticamente como un archivo JSON en `~/.amoxsql/conversations/`.
*   **Lista de Conversaciones:** `ConversationList.jsx` muestra todas las conversaciones guardadas con timestamps y previews.
*   **Compactación Inteligente:** `compaction.js` resume automáticamente conversaciones largas cuando exceden los límites del contexto, preservando la información esencial sin perder coherencia.
*   **Memory Window:** `memory.js` implementa una ventana deslizante que mantiene los mensajes más recientes y relevantes dentro del límite de tokens del modelo.
