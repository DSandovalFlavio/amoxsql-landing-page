# Estudio DBT (DBT Studio)

**AmoxSQL** integra un estudio completo para el desarrollo con **dbt** (Data Build Tool) directamente dentro del IDE. El `DbtPanel.jsx` (56KB+) es uno de los componentes más extensos de la aplicación, ofreciendo 6 secciones especializadas que cubren desde la detección del entorno hasta la ejecución de comandos con salida en tiempo real.

---

## 1. Panel de Navegación

El DBT Studio se organiza en 6 pestañas accesibles desde una barra de navegación horizontal con iconos:

| Pestaña | Icono | Función |
|---------|-------|---------|
| **Setup** | ✨ | Detección de entorno y estado del proyecto |
| **Config** | ⚙️ | Editor visual de `profiles.yml` y resumen de `dbt_project.yml` |
| **Models** | 📄 | Generador de modelos dbt con templates |
| **Sources** | 📁 | Generador de archivos de fuentes (`schema.yml`) |
| **Lineage** | 🔀 | Grafo de linaje DAG interactivo |
| **Commands** | 💻 | Constructor de comandos y terminal de ejecución |

---

## 2. Setup: Detección de Entorno

La pestaña Setup realiza una validación completa del entorno de desarrollo:

### Detección Automática de Herramientas
AmoxSQL detecta automáticamente la presencia de:
*   **Python:** Versión instalada en el sistema.
*   **dbt:** Versión de dbt-core disponible (sistema o ambiente Conda).
*   **Conda / Miniconda:** Gestor de ambientes con exploración de environments.
*   **Mamba:** Alternativa rápida a Conda, si está disponible.

Cada herramienta se muestra con un indicador visual de estado (punto verde ✅ o rojo ❌) y su versión exacta.

### Caché de Entorno
Para evitar la latencia de detección repetida (~1-3 segundos por herramienta CLI), el estado del entorno se cachea en `localStorage` con un TTL de 1 hora. El usuario puede forzar una re-detección con el botón de refresh.

### Gestión de Ambientes Conda
Si Conda está instalado, AmoxSQL escanea todos los ambientes disponibles y muestra:
*   Nombre del ambiente.
*   Si dbt-duckdb está instalado en ese ambiente (con indicador `✓ dbt`).
*   Versión exacta de dbt dentro del ambiente seleccionado.

El ambiente Conda seleccionado se utiliza automáticamente al ejecutar comandos dbt (prefijando con `conda run -n <env_name>`).

### Estado del Proyecto
Detecta automáticamente si existe un proyecto dbt en el directorio actual:
*   **Si existe:** Muestra nombre del proyecto, versión, perfil asociado, y rutas de modelos.
*   **Si no existe:** Ofrece un formulario de inicialización para crear un nuevo proyecto dbt con `dbt init`.

---

## 3. Config: Editor Visual de Perfiles

Una vez detectado un proyecto dbt, la pestaña Config permite editar visualmente los archivos de configuración:

### Editor de `profiles.yml`
Formulario visual con campos para:
*   **Profile Name:** Nombre del perfil de conexión.
*   **Target:** Nombre del target (típicamente `dev`).
*   **DuckDB Path:** Ruta al archivo `.duckdb` de destino.
*   **Schema:** Esquema de base de datos (típicamente `main`).
*   **Threads:** Número de hilos de ejecución paralela (1-16).

Al hacer clic en "Save Profile", el formulario serializa los valores a formato YAML válido y los escribe en `profiles.yml` dentro del directorio del proyecto.

### Resumen de `dbt_project.yml`
Vista de solo lectura que muestra la configuración actual del proyecto:
*   Nombre, versión, perfil asociado.
*   Rutas de modelos configuradas.

---

## 4. Models: Generador de Modelos dbt

El generador visual de modelos permite crear archivos `.sql` de dbt con scaffolding profesional:

### Templates Disponibles
Cinco templates pre-configurados con rutas y materialización apropiadas:

| Template | Ruta por defecto | Materialización |
|----------|------------------|-----------------|
| **Staging** | `models/staging/` | `view` |
| **Intermediate** | `models/intermediate/` | `view` |
| **Mart** | `models/marts/` | `table` |
| **Incremental** | `models/` | `incremental` |
| **Basic** | `models/` | `view` |

### Campos del Formulario
*   **Template:** Selector visual con botones toggle.
*   **Model Name:** Nombre del modelo (ej. `stg_orders`).
*   **Path:** Ruta de destino (auto-actualizada según template).
*   **Materialization:** Tipo de materialización (sobrescribible).
*   **Schema:** Esquema de destino (opcional).
*   **Description:** Descripción del modelo para documentación.

Al crear un modelo, el archivo `.sql` generado incluye un bloque de configuración `{{ config(...) }}` con las opciones seleccionadas y un cuerpo de ejemplo listo para editar. El archivo se abre automáticamente en una nueva pestaña del editor.

---

## 5. Sources: Generador de Fuentes

El generador de sources crea archivos `schema.yml` con la definición de fuentes de datos:

### Campos del Formulario
*   **Source Name:** Nombre de la fuente (ej. `raw_sales`).
*   **Schema:** Esquema de base de datos de la fuente.
*   **Tables:** Lista dinámica de tablas con nombre y descripción. Se pueden añadir y eliminar tablas con botones interactivos.

Al crear una fuente, se genera un archivo YAML válido con la estructura estándar de dbt (`version: 2`, `sources:`, `tables:`, etc.) y se muestra una vista previa del contenido generado.

---

## 6. Lineage: Grafo DAG Interactivo (`DbtLineageGraph.jsx`)

La pestaña Lineage renderiza un grafo de dependencias (DAG) interactivo a partir del archivo `manifest.json` generado por `dbt compile`:

### Algoritmo de Layout
Implementa un layout estilo **Sugiyama** (topológico por capas):
1.  Los nodos se asignan a capas basándose en sus dependencias (BFS desde raíces).
2.  Las capas se organizan de izquierda a derecha (fuentes → staging → marts).
3.  Los nodos dentro de cada capa se distribuyen verticalmente con espaciado uniforme.

### Tipos de Nodos con Colores
Cada tipo de recurso dbt tiene colores diferenciados:

| Tipo | Color | Descripción |
|------|-------|-------------|
| **source** | Verde | Tablas fuente externas |
| **seed** | Azul claro | Archivos CSV de semilla |
| **model** | Azul | Modelos transformados |
| **snapshot** | Gris | Capturas históricas |
| **test** | Gris (filtrado) | Tests (ocultos por defecto) |

### Interactividad
*   **Hover Inteligente:** Al pasar el cursor sobre un nodo, los nodos no conectados se atenúan y las aristas relacionadas se resaltan.
*   **Tooltip de Información:** Panel flotante que muestra nombre, tipo de recurso, materialización, esquema, descripción y ruta del archivo.
*   **Click para Abrir:** Hacer clic en un nodo abre el archivo fuente correspondiente en una nueva pestaña del editor.
*   **Zoom y Pan:** Controles de zoom-in/zoom-out y navegación libre sobre el lienzo SVG.
*   **Leyenda Visual:** Leyenda de colores por tipo de recurso en la esquina superior derecha.

---

## 7. Commands: Constructor y Ejecutor de Comandos

### Constructor de Comandos
Interfaz visual que ensambla comandos dbt válidos:
*   **Acción:** Selector de acción (`run`, `test`, `compile`, `build`, `debug`, `docs generate`).
*   **Select:** Filtro de selección de modelos (ej. `+stg_orders+`).
*   **Exclude:** Filtro de exclusión de modelos.
*   **Full Refresh:** Toggle para `--full-refresh` (solo en `run` y `build`).
*   **Target:** Selector de target (ej. `dev`, `prod`).
*   **Comando Generado:** Vista previa del comando ensamblado con botón de copiar.

### Quick Actions (Acciones Rápidas)
Cuatro botones de acceso directo para los comandos más frecuentes:
*   ▶ **Run All:** `dbt run --profiles-dir .`
*   📦 **Compile:** `dbt compile --profiles-dir .`
*   ✓ **Test:** `dbt test --profiles-dir .`
*   🔧 **Debug:** `dbt debug --profiles-dir .`

### Terminal de Ejecución en Tiempo Real
Al ejecutar un comando:
*   La salida del proceso se transmite en tiempo real mediante Server-Sent Events (SSE).
*   Cada línea de salida se muestra con formato de terminal.
*   El código de salida se indica visualmente (verde para éxito, rojo para error).
*   Si hay un ambiente Conda seleccionado, se prefija automáticamente con `conda run -n <env>`.
