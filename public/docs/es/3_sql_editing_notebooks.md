# Edición SQL y Cuadernos Interactivos (SQL Editing & Notebooks)

AmoxSQL está diseñado bajo la premisa de que escribir código debe ser una experiencia sin fricciones y hermosísima en la máquina local. Combina los paradigmas de Scripting Clásico y Programación Literaria (Literate Programming).

---

## 1. El Motor de Edición Avanzada (`SqlEditor.jsx`)

El núcleo del entorno de texto está impulsado por el proyecto de código abierto **Monaco Editor**, la misma tecnología central de ingeniería que Microsoft usa para construir Visual Studio Code. En lugar de usar áreas de texto simples (`<textarea>`), o librerías ligeras limitadas, AmoxSQL hereda un compilador AST de cliente embebido.

### Capacidades del Editor (Impulsadas por el Catálogo Híbrido v1.7.0):
*   **Análisis Léxico:** Reconoce palabras reservadas complejas del dialecto DuckDB (como `ASOF JOIN`, `PIVOT`, `UNPIVOT`, etc.) coloreándolas lógicamente acorde al Tema (Light/Dark).
*   **Inteligencia Híbrida (IntelliSense Avanzado):** A medida que se teclea, el editor levanta *overlays* flotantes pidiendo completar nombres de tablas y funciones. En v1.7.0, el editor combina un **Catálogo JSON Curado** (con más de 100 funciones categorizadas, ejemplos y descripciones) junto con una introspección en vivo (`duckdb_functions()`) garantizando que siempre tengas autocompletado exacto.
*   **Rich Hover Tooltips:** Al posicionar el cursor sobre cualquier función DuckDB, el editor despliega una tarjeta de documentación (*Tooltip Hover*) explicando usos, parámetros y mostrando *snippets* incrustados, sin necesidad de ir a la documentación web oficial.
*   **Control de Teclado Nativo:** Soporta cursores múltiples (Alt + Click), búsqueda y reemplazo visual con soporte para expresiones regulares (Regex), plegado de bloques (Code Folding) e indentación automatizada de código sucio.
*   **Ejecución Contextual:** Si el usuario resalta un sub-bloque de código en un archivo de 500 líneas y presiona `Cmd/Ctrl + Enter`, el `SqlEditor` intercepta la combinación e infiere que el Backend solo debe ejecutar el String de texto que se encuentra bajo la selección del cursor, no todo el archivo completo. Esto replica flujos imperativos de DataGrip y DBeaver.

### Personalización Premium del Editor (`SettingsModal.jsx`)
Para los profesionales que pasan 8 horas al día mirando sentencias `SELECT`, el nivel de personalización de código de AmoxSQL (introducido en v1.6.0) previene la fatiga ocular y mejora la semántica:
*   **Tipografías Industriales:** Capacidad de inyectar dinámicamente y renderizar *WebFonts* especializadas como `JetBrains Mono` o `Fira Code`.
*   **Ligaduras Tipográficas (Font Ligatures):** Transforma agrupaciones como `>=` o `!=` en símbolos matemáticos elegantes y continuos (solo aplicable sobre familias monoespaciadas Premium).
*   **Controles Geométricos:** 
    * Ocultar/Mostrar Minimapa lateral del código.
    * Ajustes numéricos exactos en Tamaño de Tabulación (Tab Size = 2 o 4 espacios).
    * Alternar el Ajuste de Línea Dinámica (*Word Wrap*).
    * Control flotante manual del tamaño general de la fuente (Font Size) con persistencia en RAM.

---

## 2. Herramientas Auxiliares de Incremento de Productividad

*   **Motor de Fragmentos (Snippets Panel):** En la barra lateral derecha, se oculta el `SnippetsPanel.jsx`. Contiene atajos inyectables (ej. un `CASE WHEN` o un bloque CTE) con una sección dedicada para que los usuarios guarden sus templates corporativos personalizados y los suelten con un clic.
*   **Interpolación y Panel de Variables:** Si necesitas correr un reporte por rangos cambiantes, el uso explícito de la sintaxis `${mi_fecha}` generará instantáneamente en el editor un formulario dinámico renderizado (`VariablesBar.jsx`) sobre la cabecera. Ingresa el valor ahí y presiona "Play", AmoxSQL transpila e hidrata los reemplazos a la base de datos sin alterar la cadena dura del código. 
*   **Historial de Consultas Persistente (`QueryHistoryPanel.jsx` / `Modal`):** El usuario no perderá el trabajo si olvida usar `Guardar`. El motor de Node asienta localmente un rastro del `TIMESTAMP` exacto y el código `STRING` de todo lo interceptado por DuckDB en sesiones pasadas, habilitando búsqueda de texto local y un sistema de "Favoritos / Bookmarks" para las consultas estrella de uso diario.

---

## 3. Cuadernos SQL (SQL Notebooks - `.sqlnb`)

La joya de la corona en la experiencia de prototipado rápido de AmoxSQL es su soporte nativo para Cuadernos Híbridos. Las extensiones `.sqlnb` representan un reemplazo local a ecosistemas basados en Python como Jupyter Notebooks, pero ajustados puramente a Análisis de Datos con SQL.

### Arquitectura de un `.sqlnb`
El cuaderno (`SqlNotebook.jsx`) y sus hijos individuales (`NotebookCell.jsx`) procesan un flujo estructurado de tipo lista de celdas. Internamente, un cuaderno se graba a disco como un JSON estandarizado que contiene un Array de objetos celda (`[{type: "markdown", content: "..."}, {type: "sql", content: "..."}]`).

Existen dos tipos funcionales de celdas en el cuaderno:

1.  **Celdas Markdown (Documentación Textual):**
    *   Soportan formato enriquecido Github-Flavored Markdown (`react-markdown`).
    *   Permiten a los equipos de data crear bitácoras, insertar imágenes locales, explicar suposiciones comerciales complejas matemáticamente, o documentar el análisis resultante de una iteración.
2.  **Celdas SQL (Ejecutables de Datos):**
    *   Inyectan una mini-instancia de Monaco Editor en su interior.
    *   Tienen "Ejecución Aislada" pero "Estado Global". Cada celda envía su script como una transacción simple a la base de DuckDB y el entorno encapsula debajo del código los Resultados en Tabla y Gráficos Visuales de forma local a la celda. Esto significa que puedes tener y comparar 5 gráficas distintas correspondientes a 5 Queries distintos en el mismo scroll semántico.

### Modo Presentación ("Report View")
Una vez el análisis concluye, el cuaderno a menudo contiene demasiado "ruido" técnico (queries intermedias, bloques de CTE gigantes, o iteraciones fallidas).

El usuario puede accionar un Switch superior para activar el **Modo Presentación**. Bajo este estado reactivo interno:
1.  Todo el `SqlEditor` Monaco en las celdas SQL colapsa y desaparece a nivel visual usando `display: none` / re-render in condicional nulo.
2.  Los bordes utilitarios (botones Play, Delete Cell) se marginan o esconden.
3.  El marco entero expande a anchos completos convirtiéndose en un Reporte de Lectura Ininterrumpido; el Markdown domina la introducción y los gráficos dinámicos o tablas de resumen quedan exhibidos con una prolijidad corporativa.

### Generador Analógico (PDF Export)
Aprovechando el Modo Presentación, AmoxSQL utiliza rutinas en el `MenuBar` atadas a los canales IPC y librerías HTML2Canvas o impresión nativa del sistema operativo para "pintar" o inyectar la vista estática directa a un archivo físico `.PDF`. Esto habilita la creación de reportes gerenciales en segundos, encapsulando las descripciones y el arte de visualización de los datos locales que no dependerán nunca más de capturas de pantalla mal encuadradas.
