# Gestor y Explorador de Bases de Datos (Database Management)

El corazón de la interacción de datos en **AmoxSQL** es el `DatabaseExplorer`, una herramienta diseñada para mapear bases de datos DuckDB de manera dinámica y ofrecer inspecciones de metadatos ultra rápidas, inspiradas en consolas Cloud como Google Data Warehouse.

---

## 1. El Panel Explorador (`DatabaseExplorer.jsx`)

Ubicado iterativamente en la barra lateral, el Explorador de Bases de Datos es el mapa topográfico de tu conexión activa. Se actualiza invocando llamadas nativas o en memoria a `DatabaseManager.js` para iterar sobre el catálogo del sistema (`information_schema`).

### Jerarquía Visual
El explorador organiza la base de datos en una jerarquía clásica:
1.  **Connection Name (Alias local):** Usualmente la ruta o el indicativo "In-Memory".
2.  **Esquemas (Schemas):** DuckDB utiliza tipicamente un esquema `main`, pero AmoxSQL soporta infraestructuras multi-esquema.
3.  **Tablas y Vistas:** Se listan alfabéticamente. Cada elemento viene acompañado de dos íconos de interacción rápida incrustados:
    *   **Drag & Drop (Arrastrar y Soltar):** Los usuarios pueden arrastrar el nombre de la tabla directamente al lienzo del `SqlEditor`. El frontend de React intercepta el evento "OnDrop" y transpila dinámicamente el identificador a un formato SQL seguro (ej. `"main"."mis_ventas"`). También se pueden expandir las tablas y arrastrar columnas específicas.
    *   **Quick Preview (Lupa):** Presenta una ventana modal súper ligera que ejecuta un `SELECT * FROM tabla LIMIT 50`. Es útil para validar rápidamente la forma de los datos sin afectar la sesión de edición principal.

## 2. El Inspector Profundo (`TableDetailsModal.jsx`)

Cuando un ingeniero de datos necesita comprender verdaderamente la estructura y distribución de una tabla antes de hacer JOINs masivos, un doble clic (o menú contextual *"Details..."*) sobre una tabla en el explorador abre el Inpector a pantalla completa de AmoxSQL.

Esta interfaz abstrae consultas altamente complejas de metadatos en cuatro pestañas especializadas:

### Pestaña A: Schema (Esquema)
Realiza un query interno (`PRAGMA table_info('table_name')`) para mostrar una cuadrícula limpia con:
*   Nombre y Tipo de Dato (Logical Types de DuckDB).
*   Estado de Nulabilidad (`NOT NULL`).
*   Indicadores de Llaves Primarias/Foráneas.

### Pestaña B: Data Profile (Perfilado Estadístico)
Esta es una de las características de mayor valor de AmoxSQL. Utiliza el comando optimizado de DuckDB `SUMMARIZE table_name` para crear una radiografía asíncrona de la tabla en base a la totalidad de sus datos. 
Para cada columna, la interfaz renderiza componentes tipo tarjeta que muestran:
*   **Distribución Básica:** `Min`, `Max`, Promedio matemático (`Avg`).
*   **Alerteos de Calidad (Quality Sparklines):** Pequeñas barras visuales que advierten visualmente si hay un porcentaje peligroso de valores `NULL` o arroja la Cardinalidad (cantidad de valores únicos), crucial para tomar decisiones sobre indexación o agrupaciones posteriores.

### Pestaña C: Preview (Grid de Datos)
A diferencia de la "Lupa" rápida, esta pestaña maneja un motor de paginación asíncrono sobre la tabla completa. Permite el desplazamiento (scroll) vertical y horizontal a través de miles de registros (paginados típicamente a *Limit 200/Offset X*), para observar el cuerpo entero del dataset ininterrumpido.

### Pestaña D: DDL (Data Definition Language)
Accede a la tabla interna del sistema de metadatos para reverse-ingeniar y mostrar la instrucción original de `CREATE TABLE (...)`. Esto permite copiar textualmente el diseño del esquema en texto plano para versionamiento en repositorios o scripts de migración.

---

## 3. Buscador Global y Tabla de Resultados (`ResultsTable.jsx`)

Una vez que un script es ejecutado y los datos retornan del backend en formato JSON estructurado, son ingeridos por el `ResultsTable`.

*   **Renderizado Robusto:** Al no usar DOM repetitivo (soportes tipo virtual-scrolling en listas masivas), AmoxSQL puede inyectar decenas de miles de celdas procedentes de un `SELECT *` gigante sin congelar o colapsar el hilo principal de React/Electron.
*   **Buscador en Memoria:** Posee una barra de búsqueda global. Si un usuario tiene 10,000 resultados en el lado del cliente, buscar una palabra filtra instantáneamente sobre toda la matriz sin re-enviar la consulta a DuckDB, funcionando puramente en `Array.filter` sobre arreglos de JavaScript optimizados.
*   **Ordenamientos Cíclicos:** Los encabezados de las columnas son interactivos, permitiendo ordenar ascendente, descendente o retornar al estado natural extraído del origen, actuando como un manipulador secundario al `ORDER BY`.
