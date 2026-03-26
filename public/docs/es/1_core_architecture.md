# Arquitectura Central y Flujo de Trabajo (Core Architecture)

La arquitectura principal de **AmoxSQL** (v1.9.9) está construida sobre principios de modularidad, resiliencia estricta en el manejo de memoria a nivel de sistema, y una experiencia de usuario que emula fielmente a los Editores de Código (IDEs) de grado industrial con un sistema de diseño inspirado en **Linear**.

A continuación, documentamos de forma exhaustiva los sistemas fundamentales y el ciclo de vida del IDE.

---

## 1. Sistema de Diseño Linear UI

En la versión 1.9.9, AmoxSQL adopta un sistema de diseño completo inspirado en **Linear**, con tokens de diseño, migración a clases CSS, y una auditoría integral de todos los componentes. Este rediseño abarca:

### Tokens de Diseño y Variables CSS
Todo el sistema visual se controla mediante variables CSS globales definidas en `index.css` (156KB+), organizadas en capas semánticas:
*   **Superficies:** `--surface-base`, `--surface-raised`, `--surface-overlay`, `--surface-elevated` — Definen la jerarquía visual de profundidad.
*   **Texto:** `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-muted`, `--text-active` — Escala de prominencia tipográfica.
*   **Bordes:** `--border-subtle`, `--border-default`, `--border-strong`, `--border-hover` — Para separadores y contenedores.
*   **Acentos:** `--accent-primary`, `--accent-secondary`, `--accent-muted`, `--accent-color-user` — Color de acento dinámico seleccionado por el usuario.
*   **Feedback:** Variables dedicadas para estados de éxito, error, advertencia e información.

### 8 Temas de Color
El IDE ofrece 8 temas de color completos, seleccionables desde el `SettingsModal.jsx`:

| Tema | Tipo | Descripción |
|------|------|-------------|
| **Obsidian** | Oscuro | El más profundo y oscuro, fondo casi negro |
| **Onyx** | Oscuro | Negro con matices azulados sutiles |
| **Carbon** | Oscuro | Gris azulado oscuro, balanceado |
| **Graphite** | Oscuro | Gris cálido oscuro |
| **Nord Dark** | Oscuro | Inspirado en la paleta polar nórdica |
| **Ivory** | Claro | Cálido como papel antiguo |
| **Mist** | Claro | Frío como niebla matutina |
| **Light** | Claro | Limpio y brillante, blanco clásico |

### 13 Colores de Acento
Organizados en dos paletas:
*   **Vibrante (7):** Cyan (default), Aqua, Sky, Azure, Blue, Cobalt, Linear Blue.
*   **Sobrio (6):** Sage, Amber, Rose, Lavender, Steel, Copper.

El acento seleccionado se inyecta dinámicamente en todo el IDE a través de `--accent-color-user`, afectando botones, bordes activos, indicadores de selección y badges.

### Layout de Editor: Horizontal / Vertical
El usuario puede alternar entre dos disposiciones del editor desde las configuraciones:
*   **Horizontal (default):** Editor arriba, resultados abajo — ideal para monitores estándar.
*   **Vertical:** Editor a la izquierda, resultados a la derecha — optimizado para monitores ultrawide.

---

## 2. La Paleta de Comandos Central (`CommandPalette.jsx`)

Para garantizar un flujo de trabajo optimizado para teclado (*"Keyboard-First Workflow"*), el Lanzador Omnipresente (accesible globalmente con `Ctrl+K` o `Cmd+K`) es el sistema nervioso central del IDE.

A diferencia de depender de menús lentos de barra superior, el motor de la Paleta indexa instantáneamente un registro dinámico de acciones:
*   `Run Query` (`Ctrl+Enter`): Dispara llamadas asíncronas hacia el motor.
*   `Save File` (`Ctrl+S`): Serializa el estado del editor en disco magnético local sin tocar la UI.
*   `Navigation / Extensions`: Invoca cambios reactivos sobre el Layout Manager para mutar el acordeón de la izquierda o forzar apertura de inteligencias IA con un click.

Cada una de estas acciones y accesos directos puede auditarse de manera gráfica mediante el `KeyboardShortcutsModal.jsx`, permitiendo al usuario conocer todos los "Hotkeys" de forma unificada.

---

## 3. Diseño Centrado en Proyectos (Project-Centric Workflow)

AmoxSQL abandona la idea clásica de las herramientas de gestión de bases de datos que exigen credenciales estáticas y puertos abiertos. Al funcionar con una base de datos *Serverless* e *In-Process* como **DuckDB**, el concepto de conexión evoluciona a un concepto de entorno de trabajo basado completamente en el sistema de archivos del usuario.

### El ciclo de apertura de proyecto:
1.  **Welcome Screen (Pantalla de Bienvenida):** El punto de entrada inicial, programado en `WelcomeScreen.jsx`. Solicita de forma obligatoria una **Ruta Absoluta (Absolute Path)** en la computadora del operador. Incluye una lista de proyectos recientes para acceso rápido.
2.  **Validación y Escaneo (Scanning):** Al recibir la ruta, el backend intercepta el comando a través de APIs del sistema de archivos nativo de Node.js (`fs`). El sistema recorre recursivamente el directorio solicitado usando algoritmos asíncronos para identificar:
    *   Archivos de bases de datos de DuckDB existentes (`.duckdb`, `.db`).
    *   Archivos SQL guardados de sesiones previas (`.sql`).
    *   Configuraciones persistentes gráficas de AmoxSQL (`.amoxvis`).
    *   Cuadernos interactivos (`.sqlnb`).
3.  **Bootstrapping del Explorador:** Tras validar la existencia de la ruta, el IDE arranca, inicializando de estado su `FileExplorer` a la izquierda y dejando limpio su Layout Central en modo preparado, inyectando todas las rutas de archivos localizados al *Global Context* principal de React en el Frontend.

---

## 4. Gestión Robusta de Conexiones (Connection Management & Hard Reset)

Bajo el capó, en el servidor, existe un Singleton en Node.js vital llamado **`DatabaseManager.js`**. Su objetivo principal es evitar las temidas "fugas de memoria" o los problemas de archivos binarios bloqueados por cierres no controlados de bases de datos transaccionales, común en Windows OS.

### Modos de Base de Datos Interactivos
El modal de conexión (`DatabaseSelectionModal.jsx` interactuando con `DatabaseManager.connect()`) ofrece tres vectores operacionales de conexión de forma explícita al desarrollador:

*   **In-Memory Mode (Modo en Memoria RAM):** Instancia de DuckDB completamente fresca que no toca el disco duro. Se pierden los datos tan pronto como el proceso se cierre. Utilizado principalmente para cálculos en lotes grandes y limpiezas de datos que provienen de formato Parquet o archivos remotos de Amazon S3.
*   **Persistencia (Read-Only Mode):** Se "adjunta" (`ATTACH`) a la base de datos de DuckDB designada asumiendo un flag `read_only=true`. El `DatabaseManager` bloquea modificaciones locales mediante comandos de seguridad. Este esquema permite abrir varios IDEs de AmoxSQL sobre la misma base de datos sin corrupción.
*   **Persistencia (Read/Write Mode):** El `DatabaseManager` adquiere el control absoluto (Lock) del archivo en el sistema de disco.

### Estrategia Multi-Tenant de "Hard Reset"
Si el usuario decide *Cambiar de Proyecto* sin reiniciar físicamente la aplicación (desde el `MenuBar.jsx`), AmoxSQL dispara una cadena estricta diseñada en la función `reinitializeSystem()` dentro del `DatabaseManager.js`:
1.  Manda matar todas las promesas corriendo (`.kill()`) o conexiones abiertas (`connection.close()`).
2.  Desvincula de memoria las instancias principales que estén abiertas `this.instance = null`.
3.  A nivel Sistema Operativo, limpia la persistencia cacheada para asegurar que el explorador de archivos y las APIs dejen de escuchar (`_initSystem()`).
4.  Esta metodología de "Hard Reset" previene que ocurran bloqueos binarios "Zombie", algo que típicamente requeriría cerrar a la fuerza desde el Gestor de Tareas de Windows.

---

## 5. Arquitectura de Interfaz Multi-Pestaña y Vistas (Layout Manager)

AmoxSQL implementa su propio motor de partición y estado usando un módulo denominado `LayoutManager.jsx` (30KB+). No es simplemente re-dibujar divs; es almacenar un ciclo completo del documento y el buffer de la interfaz en memoria, con una interfaz de *card-based floating layout*.

### Estados Reactivos de Larga Vida
Cuando un usuario abre tres pestañas de códigos largos (`script_1.sql`, `notebook.sqlnb`, `ventas.amoxvis`):
*   El contexto del Frontend lleva un vector de objetos complejos denominados **Tabs**.
*   Cada *Tab* incluye un `id` único, un `type` (que le dicta a `EditorPane.jsx` qué componente React montar sobre esa pestaña, por ejemplo, `SqlEditor` frente a `SqlNotebook`, o `ErDiagram` frente a `DbtPanel`), la ruta de archivo para escritura asíncrona de guardado, y un registro de lo que el Editor Monaco en el Frontend está dibujando actualmente en su búffer textual (`docModel`).
*   El `TabBar.jsx` rediseñado muestra las pestañas con iconos diferenciados por tipo de archivo y estados visuales según el tema activo.

### Controles de Vista Dividida (Split Views)
La ventana principal de AmoxSQL está diseñada en secciones flexibles que pueden ser redimensionadas:
1.  **Barra de Título Personalizada (`WindowTitleBar.jsx`):** Barra de título nativa de Electron que muestra el nombre del proyecto activo con controles de minimizar, maximizar y cerrar integrados.
2.  **Barra Lateral (Sidebar):** Funciona como un Accordion híbrido. Engloba el File Explorer para gestionar scripts de base y libretas, pero con un Switch global que puede intercambiarlo enteramente para convertirse en un Gestor de IA de Amox (`AiSidebar.jsx`), el Visor e Inspector puro de Bases de Datos (`DatabaseExplorer.jsx`), o el panel completo de **DBT Studio** (`DbtPanel.jsx`).
3.  **Paneles Inferiores (The Bottom Panel):** Una vez que el Backend dispara y completa la respuesta JSON gigante del resultado de un Query, dicha data es canalizada al panel inferior, que a su vez se convierte en un Sub-Administrador de pestañas:
    *   Permite alternar para evaluar la Data plana en la grilla virtual de `ResultsTable.jsx`.
    *   Alternar a los análisis visuales en `DataVisualizer`.
    *   Inspeccionar el perfil estadístico en `DataProfiler.jsx`.
4.  **Resultados Emergentes (`PopoutResultsPage.jsx`):** Los resultados de una consulta pueden "desprenderse" a una ventana independiente de Electron, permitiendo comparar datos en dos monitores o mantener un dashboard visible mientras se edita código.

### Persistencia Visual del Layout
La ergonomía de la herramienta está asegurada en el ciclo de vida del programa. Si el usuario arrastra la frontera de los `Split Views`, selecciona un tema, elige un acento, o ajusta cualquier preferencia, el sistema almacena las tolerancias y preferencias (`LayoutWidth`, `Theme`, `AccentColor`, `EditorLayout`) a nivel de `localStorage` y en archivos de perfil del usuario de Electron para que, la próxima vez que AmoxSQL abra cualquier proyecto de manera nativa, todas las ventanas y preferencias se re-acomoden como se dejaron en milisegundos.

---

## 6. Barra de Estado (`StatusBar.jsx`)

En la parte inferior del IDE, una barra de estado compacta muestra información contextual en tiempo real:
*   **Estado de Conexión:** Indicador visual del modo de conexión activo (In-Memory, Read-Only, Read/Write).
*   **Información del Proyecto:** Ruta del proyecto activo y nombre de la base de datos conectada vía `ProjectInfo.jsx`.
*   **Notificaciones Toast (`ToastProvider.jsx`):** Sistema global de notificaciones no intrusivas que informan sobre operaciones exitosas, errores, y estados transitorios con animaciones suaves y auto-dismissal.
