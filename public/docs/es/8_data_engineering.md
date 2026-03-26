# Ingeniería de Datos (Data Engineering)

**AmoxSQL** va más allá del análisis exploratorio ad-hoc al proporcionar herramientas dedicadas para la ingeniería de datos local. Estas herramientas permiten definir pipelines ETL secuenciales, visualizar la arquitectura de la base de datos, y comprender las dependencias entre modelos — todo sin salir del IDE.

---

## 1. Cadenas de Ejecución (`ExecutionChainModal.jsx`)

Las Cadenas de Ejecución son la respuesta de AmoxSQL a la necesidad de ejecutar múltiples scripts SQL en un orden determinístico, simulando pipelines ETL locales.

### Concepto
En escenarios de ingeniería de datos, es frecuente necesitar ejecutar una secuencia ordenada de scripts:
```
01_clean.sql → 02_transform.sql → 03_aggregate.sql → 04_load.sql
```

La `ExecutionChainModal` permite definir y ejecutar estas secuencias visualmente.

### Funcionalidades
*   **Selector de Archivos:** Menú desplegable con todos los archivos `.sql` del proyecto actual.
*   **Lista Ordenada:** Los archivos se añaden a una cadena visual numerada con indicadores de estado.
*   **Reordenamiento:** Los pasos pueden reordenarse arrastrando o con botones de movimiento.
*   **Eliminación:** Cada paso puede ser eliminado individualmente de la cadena.

### Ejecución Secuencial
Al presionar "Run Chain":
1.  Cada archivo `.sql` se lee del disco secuencialmente.
2.  El contenido se envía al motor DuckDB como una transacción.
3.  Cada paso muestra su estado en tiempo real:
    *   ⏳ **Pending:** Circulo vacío, esperando su turno.
    *   🔄 **Running:** Spinner de carga animado.
    *   ✅ **Success:** Check verde con tiempo de ejecución en milisegundos.
    *   ❌ **Error:** Alerta roja con mensaje de error detallado.
4.  **La cadena se detiene en el primer error**, evitando la propagación de datos corruptos a pasos posteriores.
5.  Al completar todos los pasos exitosamente, se muestra un resumen de "All N steps completed successfully!".

### Panel de Error
Si un paso falla, se muestra un panel colapsable con:
*   El mensaje de error completo de DuckDB en fuente monoespaciada.
*   El nombre del archivo que causó la falla.
*   El tiempo que transcurrió antes del error.

---

## 2. Diagramas Entidad-Relación (`ErDiagram.jsx`)

El visualizador de ER Diagrams genera automáticamente un mapa visual interactivo de todas las tablas y relaciones de la base de datos activa. Esta herramienta es fundamental para la documentación y comprensión de arquitecturas de datos.

### Generación Automática del Esquema
Al abrir el componente, se realiza una petición al endpoint `/api/db/er-schema` que:
1.  Consulta `information_schema` para obtener todas las tablas y vistas.
2.  Extrae las columnas con sus tipos de dato y nulabilidad.
3.  Identifica llaves primarias y foráneas.
4.  Retorna un JSON estructurado con la topología completa.

### Renderizado SVG Interactivo
Cada tabla se renderiza como una tarjeta SVG con:
*   **Cabecera:** Color diferenciado (destacado para tablas seleccionadas), nombre de la tabla con icono (📋 TABLE / 👁 VIEW), y conteo de columnas.
*   **Cuerpo:** Listado completo de columnas con iconos de llave (🔑 PK, 🔗 FK), nombres en fuente monoespaciada, y tipos de dato alineados a la derecha.
*   **Sombras:** Sombra sutil para efecto de elevación.

### Aristas de Relación (FK Edges)
Las relaciones foráneas se dibujan como curvas Bézier SVG que conectan columnas FK con sus tablas referenciadas:
*   Flechas direccionales (marcadores SVG) indican la dirección de la relación.
*   Las aristas se resaltan al hacer hover sobre tablas conectadas.
*   Las aristas no relacionadas se atenúan para reducir el ruido visual.

### Interactividad Completa
*   **Drag & Drop:** Cada tabla puede arrastrarse libremente para reorganizar el diagrama.
*   **Zoom:** Controles de zoom-in/zoom-out + scroll del mouse.
*   **Pan:** Arrastre del fondo para navegar el lienzo.
*   **Hover Inteligente:** Al pasar sobre una tabla, solo las tablas y relaciones directamente conectadas permanecen visibles.
*   **Selección:** Click en una tabla para seleccionarla y ver su información detallada.
*   **Auto-Layout:** Distribución automática en cuadrícula al cargar, calculada según la raíz cuadrada del número de tablas.

### Generación y exportación de DDL
Al seleccionar una tabla, un panel flotante en la esquina inferior izquierda muestra:
*   Nombre y tipo de la tabla (TABLE/VIEW).
*   Conteo de columnas, PKs y FKs.
*   Botón **"Copy DDL":** Genera y copia al portapapeles la instrucción `CREATE TABLE` completa con todas las columnas, tipos, restricciones NOT NULL, PKs y FKs.
*   Botón **"Open in Editor":** Crea una nueva pestaña en el editor con el DDL generado.

---

## 3. Linaje de Datos (Data Lineage)

La visualización de linaje se integra dentro del **DBT Studio** (pestaña "Lineage") mediante el componente `DbtLineageGraph.jsx`. Este grafo DAG (Directed Acyclic Graph) muestra las dependencias entre modelos dbt:

*   **Fuentes → Staging → Intermediate → Marts** se representan como capas horizontales.
*   Los nodos se colorean por tipo de recurso (source, seed, model, snapshot).
*   Las aristas muestran el flujo de datos entre modelos.
*   El hover resalta las dependencias directas de cada nodo.
*   Clic en un nodo abre el archivo `.sql` correspondiente en el editor.

La documentación completa del grafo de linaje se encuentra en el documento **7_dbt_studio.md**, sección "Lineage".
