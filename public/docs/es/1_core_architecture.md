# Arquitectura Central y Flujo de Trabajo (Core Architecture)

La arquitectura principal de **AmoxSQL** está construida sobre principios de modularidad, resiliencia estricta en el manejo de memoria a nivel de sistema, y una experiencia de usuario que emula fielmente a los Editores de Código (IDEs) de grado industrial. 

A continuación, documentamos de forma exhaustiva los sistemas fundamentales y el ciclo de vida del IDE.

---

## 1. La Paleta de Comandos Central (`CommandPalette.jsx`)

Para garantizar un flujo de trabajo optimizado para teclado (*"Keyboard-First Workflow"*), la adición más trascendental en la usabilidad global de AmoxSQL es el Lanzador Omnipresente (accesible globalmente con `Ctrl+K` o `Cmd+K`). 

A diferencia de depender de menús lentos de barra superior, el motor de la Paleta indexa instantáneamente un registro dinámico de acciones. Actúa como el sistema nervioso central, delegando operaciones directas como:
*   `Run Query` (`Ctrl+Enter`): Dispara llamadas asíncronas hacia el motor.
*   `Save File` (`Ctrl+S`): Serializa el estado del editor en disco magnético local sin tocar la UI.
*   `Navigation / Extensions`: Invoca cambios reactivos sobre el Layout Manager para mutar el acordeón de la izquierda o forzar apertura de inteligencias IA con un click.

Cada una de estas acciones y accesos directos puede auditarse de manera gráfica mediante el `KeyboardShortcutsModal.jsx`, permitiendo al usuario conocer todos los "Hotkeys" de forma unificada.

---

## 2. Diseño Centrado en Proyectos (Project-Centric Workflow)

AmoxSQL abandona la idea clásica de las herramientas de gestión de bases de datos que exigen credenciales estáticas y puertos abiertos. Al funcionar con una base de datos *Serverless* e *In-Process* como **DuckDB**, el concepto de conexión evoluciona a un concepto de entorno de trabajo basado completamente en el sistema de archivos del usuario.

### El ciclo de apertura de proyecto:
1.  **Welcome Screen (Pantalla de Bienvenida):** El punto de entrada inicial, programado en `WelcomeScreen.jsx`. Solicita de forma obligatoria una **Ruta Absoluta (Absolute Path)** en la computadora del operador.
2.  **Validación y Escaneo (Scanning):** Al recibir la ruta, el backend intercepta el comando a través de APIs del sistema de archivos nativo de Node.js (`fs`). El sistema recorre recursivamente el directorio solicitado usando algoritmos asíncronos para identificar:
    *   Archivos de bases de datos de DuckDB existentes (`.duckdb`, `.db`).
    *   Archivos SQL guardados de sesiones previas (`.sql`).
    *   Configuraciones persistentes gráficas de AmoxSQL (`.amoxvis`).
    *   Cuadernos interactivos (`.sqlnb`).
3.  **Bootstrapping del Explorador:** Tras validar la existencia de la ruta, el IDE arranca, inicializando de estado su `FileExplorer` a la izquierda y dejando limpio su Layout Central en modo preparado, inyectando todas las rutas de archivos localizados al *Global Context* principal de React en el Frontend.

---

## 3. Gestión Robusta de Conexiones (Connection Management & Hard Reset)

Bajo el capó, en el servidor, existe un Singleton en Node.js vital llamado **`DatabaseManager.js`**. Su objetivo principal es evitar las temidas "fugas de memoria" o los problemas de archivos binarios bloqueados por cierres no controlados de bases de datos transaccionales, común en Windows OS.

### Modos de Base de Datos Interactivos
El modal de conexión (`DatabaseSelectionModal.jsx` interactuando con `DatabaseManager.connect()`) ofrece tres vectores operacionales de conexión de forma explícita al desarrollador:

*   **In-Memory Mode (Modo en Memoria RAM):** Instancia de DuckDB completamente fresca que no toca el disco duro. Se pierden los datos tan pronto como el proceso se cierre. Utilizado principalmente para cálculos en lotes grandes y limpiezas de datos que provienen de formato Parquet o archivos remotos de Amazon S3, explotando las capacidades supersónicas de lectura/escritura en RAM del Hardware.
*   **Persistencia (Read-Only Mode):** Se "adjunta" (`ATTACH`) a la base de datos de DuckDB designada asumiendo un flag `read_only=true`. El `DatabaseManager` bloquea modificaciones locales mediante comandos de seguridad. Este esquema permite abrir varios IDEs de AmoxSQL sobre la misma base de datos sin corrupción, esencial para análisis de datos concurrentes en red local o cuando hay otros ETLs poblando la estructura maestra de `.db`.
*   **Persistencia (Read/Write Mode):** El `DatabaseManager` adquiere el control absoluto (Lock) del archivo en el sistema de disco. 

### Estrategia Multi-Tenant de "Hard Reset"
Debido a que Node y DuckDB C++ viven en una co-dependencias muy apretadas de promesas asíncronas de I/O de lectura asíncrona, si el usuario decide *Cambiar de Proyecto* sin reiniciar físicamente la aplicación (desde el `MenuBar.jsx`), AmoxSQL dispara una cadena estricta diseñada en la función `reinitializeSystem()` dentro del `DatabaseManager.js`:
1.  Manda matar todas las promesas corriendo (`.kill()`) o conexiones abiertas (`connection.close()`).
2.  Desvincula de memoria las instancias principales que estén abiertas `this.instance = null`.
3.  A nivel Sistema Operativo, limpia la persistencia cacheada para asegurar que el explorador de archivos y las APIs dejen de escuchar (`_initSystem()`).
4.  Esta metodología de "Hard Reset" previene que ocurran bloqueos binarios "Zombie", algo que típicamente requeriría cerrar a la fuerza desde el Gestor de Tareas de Windows.

---

## 4. Arquitectura de Interfaz Multi-Pestaña y Vistas (Layout Manager)

Para igualar la flexibilidad y la libertad arquitectónica y UX que proponen sistemas masivos como Eclipse, VS Code o Jetbrains, AmoxSQL implementa su propio motor de partición y estado usando un módulo denominado `LayoutManager.jsx`. No es simplemente re-dibujar divs; es almacenar un ciclo completo del documento y el buffer de la interfaz en memoria.

### Estados Reactivos de Larga Vida
Cuando un usuario abre tres pestañas de códigos largos (`script_1.sql`, `notebook.sqlnb`, `ventas.amoxvis`):
*   El contexto del Frontend lleva un vector de objetos complejos denominados **Tabs**.
*   Cada *Tab* incluye un `id` único, un `type` (que le dicta a `EditorPane.jsx` qué componente React montar sobre esa pestaña, por ejemplo, `SqlEditor` frente a `SqlNotebook`), la ruta de archivo para escritura asíncrona de guardado, y un registro de lo que el Editor Monaco en el Frontend está dibujando actualmente en su búffer textual (`docModel`).
*   Esto asegura que el usuario pueda cambiar de contexto rápidamente sin perder dónde se quedó su cursor centelleante o perder resultados de previas ejecuciones, preservándolo todo instantáneamente sobre caché RAM en un modelo *Single Page Application* súper avanzado.

### Controles de Vista Dividida (Split Views)
La ventana principal de AmoxSQL está diseñada en secciones flexibles que pueden ser redimensionadas. 
1.  **Barra Lateral (Sidebar):** Funciona como un Accordion híbrido. Engloba el File Explorer para gestionar scripts de base y libretas, pero con un Switch global que puede intercambiarlo enteramente para convertirse en un Gestor de IA de Amox (`AiSidebar.jsx`) o el Visor e Inspector puro de Bases de Datos (`DatabaseExplorer.jsx`).
2.  **Paneles Inferiores (The Bottom Panel):** Abstraído lógicamente de la ejecución. Una vez que el Backend dispara y completa la respuesta JSON gigante del resultado de un Query, dicha data es canalizada al panel inferior, que a su vez se convierte en un Sub-Administrador de pestañas:
    *   Permite alternar para evaluar la Data plana en la grilla virtual de `ResultsTable.jsx`.
    *   Alternar a los análisis visuales en `DataVisualizer.jsx`.
    *   Este sistema dual Panel Central de Edición + Panel Inferior de Resultados promueve una iteratividad cíclica en la construcción del Query y Visualización, reduciendo los tiempos en validación y confirmación y facilitando la depuración directa con vista a la fuente de la verdad de los datos en tiempo real.

### Persistencia Visual del Layout
La ergonomía de la herramienta está asegurada en el ciclo de vida del programa. Si el usuario arrastra la frontera de los `Split Views` haciéndolos de `250px` a `400px` para poder leer tablas con nombres larguísimos, o si decide anclar un tema *Light Mode* o *Dark Mode* vía configuraciones unificadas, el sistema almacena las tolerancias y preferencias (`LayoutWidth`, `Theme`) a nivel de `localStorage` y en archivos de perfil del usuario de Electron para que, la próxima vez que AmoxSQL abra cualquier proyecto de manera nativa, todas las ventanas y preferencias se re-acomoden como se dejaron en milisegundos.
