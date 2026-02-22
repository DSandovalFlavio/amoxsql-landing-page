# Inteligencia Artificial Integrada (AmoxSQL AI)

La integración híbrida de Grandes Modelos de Lenguaje (LLMs) convierte a **AmoxSQL** en un asistente de desarrollo co-piloto verdaderamente sofisticado. En lugar de empotrar un motor pesado y monolítico que penalice el rendimiento del IDE, la arquitectura usa un concepto de delegación y enrutamiento inteligente orquestado por **`AiManager.js`** en el backend y **`AiSidebar.jsx`** en el frontend.

---

## 1. Ollama (Local & 100% Offline Privado)

El principio máximo para entes financieros o de salud que procesan datos regulados (como historias clínicas o pagos con tarjeta) establece que la metadata no puede viajar por HTTP hacia APIs en la nube de proveedores de Silicon Valley.

Para solucionar esto, AmoxSQL se comunica asincronamente con **Ollama**, un servidor de inferencia escrito en Go que corre eficientemente modelos pesados (Local LLMs) bajo el protocolo local estándar `http://localhost:11434`.

### Modelos y Especificaciones de Memoria
El equipo de AmoxSQL recomienda (y certifica pre-configuraciones dentro de la UI para) un espectro jerárquico de modelos "Instruct" con base en la VRAM de gráficos y RAM de CPU disponibles del operador:
*   **Qwen 2.5 Coder (1.5B):** El estándar de oro para máquinas portátiles de gama de entrada, operando con ~1.4GB de RAM ocupada garantizando SQL básico increíblemente rápido.
*   **Llama 3.2 (3B):** Punto agridulce intermedio entre destreza lógica asombrosa y peso manejable (~2.0 GB de RAM).
*   **Llama 3.1 / CodeLlama (8B+):** Para estaciones de trabajo especializadas. Demanda por encima de 5GB de RAM. Insuperable en la resolución de problemas extremadamente intrincados de lógica SQL o creación de CTEs multiniveles para consultas jerárquicas en modelos de base de datos complejos.

**Manejo de Errores (Troubleshooting Arquitectónico):** 
AmoxSQL no intenta descargar Gigabytes arbitrariamente sin tu permiso. El IDE invoca a Node.js; si `AiManager.js` recibe un error de puerto no respondido (`ECONNREFUSED` / `fetch failed`), intercepta y le avisa limpiamente al usuario que abra el programa Ollama. Si recibe un código manifestando que el modelo "no existe", advierte al usuario con la instrucción de línea de comandos requerida (ej. `ollama pull llama3.2:3b`).

## 2. Gemini Mode (Cloud Power con Google API)

Para analistas o usuarios estáticos (Data Scientists trabajando en data set pública masiva, por ejemplo), que operan con portátiles sin capacidades fuertes de procesamiento tensorial o que prefieren los LLMs de vanguardia en la red.

AmoxSQL soporta inyección por token a través de la librería oficial de ecosistema `@google/generative-ai`.
*   El usuario suministra su llave confidencial de Google (API Key).
*   **Tracker de Uso (Usage Tracking diario):** La llave generativa y el uso computacional tienen límites y cuotas diarias del free-tier (Flash Lite, Flash y Pro). AmoxSQL escribe iterativamente sobre un archivo seguro de configuración oculto (`~/.amoxsql/config.json`) el registro exacto de cada petición. Resetea este odómetro cada vez que la fecha ISO diaria de la computadora cruza la media noche, garantizando al usuario la visibilidad y el freno paramétrico en su panel de configuraciones (`SettingsModal.jsx`).

---

## 3. RAG Inteligente: El "Contexto Adaptativo"

AmoxSQL no solo actúa "paso el texto A te devuelvo el texto B". Ejerce una técnica especializada de enrutamiento y purificación RAG (Retrieval-Augmented Generation) para el Prompt del Sistema ("System Prompt Generative Injection"):

1.  **Recolección de Semántica del Esquema:** Cuando el usuario redacta una pregunta semántica en lenguaje natural en la barra del chat (ej. *"¿Cuál fue el producto más vendido en diciembre?"*), el código recorre la topología de la base de DuckDB de inmediato. 
2.  **Inyección Dinámica Controlada:** Inyecta en el Prompt System la definición de llaves, tablas y variables, para que el modelo IA no alucine (alucinations zero) e incluya los nombres verídicos de columnas.
3.  **Principios Dialectales Impuestos:** `AiManager.js` tiene cláusulas en duro inyectables que "castigan" los errores típicos de la IA generando SQL. 
    *   Le prohíbe explícitamente el uso de sintaxis ajena; le obliga a dialectos transaccionales compatibles funcionales de DuckDB (ej. preferir rangos nativos o evitar peculiaridades de MySQL).
    *   Si se detectan demandas orientadas a Ranking ("Top","Mejor"), el promt lo fuerza estrictamente a usar agrupadores condicionales como la cláusula poderosa matemática `QUALIFY ROW_NUMBER() OVER (...) <= N`, previniéndolo del tradicional agrupamiento que a menudo desencadena escaneos secuenciales innecesarios o subconsultas ineficientes que trabarían motores masivos C++.
4.  **Auto Parsing de Salidas:** A diferencia de ChatGPT, la aplicación no transfiere el chat "crudo" que contiene largos pasajes "¡Claro!, la respuesta es la siguiente: [Bloques de código]". AmoxSQL intercepta la respuesta, aplica filtros por expresiones regulares desarmando cualquier bloque sintáctico de formato ("```sql") y devuelve inmaculadamente únicamente los caracteres computables SQL necesarios, para listarlos en pre-visualización limpia listos para añadir al Editor IDE o ser ejecutados directamente.
