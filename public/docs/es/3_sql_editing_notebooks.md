# Edición SQL y Cuadernos Interactivos (SQL Editing & Notebooks)

AmoxSQL está diseñado bajo la premisa de que escribir código debe ser una experiencia sin fricciones y hermosísima en la máquina local. Combina los paradigmas de Scripting Clásico y Programación Literaria (Literate Programming).

---

## 1. El Motor de Edición Avanzada (`SqlEditor.jsx`)

El núcleo del entorno de texto está impulsado por el proyecto de código abierto **Monaco Editor**, la misma tecnología central de ingeniería que Microsoft usa para construir Visual Studio Code. En lugar de usar áreas de texto simples (`<textarea>`), o librerías ligeras limitadas, AmoxSQL hereda un compilador AST de cliente embebido.

### Capacidades del Editor:
*   **Análisis Léxico:** Reconoce palabras reservadas complejas del dialecto DuckDB (como `ASOF JOIN`, `PIVOT`, `UNPIVOT`, etc.) coloreándolas lógicamente acorde al Tema (Light/Dark).
*   **Autocompletado y Sugerencias Intelectuales (IntelliSense):** A medida que se teclea, el editor levanta *overlays* flotantes pidiendo completar nombres de tablas conocidas, funciones agregadas, e incluso el cierre paramétrico de paréntesis y llaves.
*   **Control de Teclado Nativo:** Soporta cursores múltiples (Alt + Click), búsqueda y reemplazo visual con soporte para expresiones regulares (Regex), plegado de bloques (Code Folding) e indentación automatizada de código sucio.
*   **Ejecución Contextual:** Si el usuario resalta un sub-bloque de código en un archivo de 500 líneas y presiona `Cmd/Ctrl + Enter`, el `SqlEditor` intercepta la combinación e infiere que el Backend solo debe ejecutar el String de texto que se encuentra bajo la selección del cursor, no todo el archivo completo. Esto replica flujos imperativos de DataGrip y DBeaver.

---

## 2. Cuadernos SQL (SQL Notebooks - `.sqlnb`)

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
