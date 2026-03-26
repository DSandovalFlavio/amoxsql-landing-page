# Herramientas de Depuración y Entrada/Salida de Datos (Advanced Debugging & IO)

Escribir queries veloces y correctas es solo la mitad del trabajo de un analista de datos o de un ingeniero. **AmoxSQL** soporta ciclos profundos para identificar problemas funcionales, medir el tiempo de procesamiento volumétrico de grandes uniones JOIN y trasegar Gigabytes de información entre archivos transaccionales físicos convencionales, binarios in-memory, y ahora también **servicios de almacenamiento en la nube (S3 / GCS)**.

---

## 1. Herramientas Avanzadas de Diagnóstico (Debugging)

### CTE Debugger (Progreso Analógico de SubConsultas)
Las expresiones de tabla comunes ("*Common Table Expressions*" o CTEs) que utilizan la cláusula `WITH AS (...)` pueden crecer volviéndose "consultas dentro de consultas" inmanejables.

AmoxSQL integra un parser de lógica heurística sobre el Monaco Editor:
1.  Busca identificar palabras clave `WITH` y localiza asiladamente cada nombre de bloque lógico usando Regex avanzado.
2.  Levanta dinámicamente "Marcadores Visuales" o íconos "Play" interactivos en las canaletas de línea precisas donde declara la función temporal.
3.  Si se hace click en uno, desvincula estructuralmente el resto de la query de abajo, convierte el nombre a variable y ejecuta un `SELECT * FROM Target_CTE_SubTable LIMIT 50`.
4.  El usuario ve los resultados temporalizados instantáneamente en un modal de Depuración (`DebugResultModal.jsx`) sin tener que romper y reestructurar sus valiosos textos de Query manualmente, habilitando un ciclo perimetral "Paso por Paso" (*Step-through Debugging*).

### Árbol Visualizador de Ejecución (Query Execution Plan)
Entender qué nodos subyacentes son los responsables del "cuello de botella" computacional de un Query gigante en DuckDB es crucial:

*   AmoxSQL inyecta la keyword explicativa (`EXPLAIN ANALYZE`) dentro de tu solicitud de Query interceptada por el IDE.
*   Retorna una red intrincada de formato de serialización JSON complejo.
*   En el componente `QueryPlanViewer.jsx`, el IDE toma el JSON y lo envía al layout engine `Elkjs` (Eclipse Layout Kernel) asíncronamente para calcular posiciones XY nodales.
*   Pinta los bloques de código como "Tarjetas" jerárquicas vinculadas por SVG Curvas, pintando con alertas rojas automáticas aquellos elementos con una "Afinidad de Costo" o carga porcentual muy alta.
*   El `QueryPlanModal.jsx` presenta la visualización en un modal de pantalla completa con controles de zoom.

### Suite de Calidad y Perfilado V2 (`DataProfiler.jsx`)
El Data Profiler (31KB+) fue sustancialmente refactorizado en v1.9.9. Antes de construir modelos de agregación sobre tablas inexploradas, es vital auditar la pulcritud de las columnas:

1.  **Detección de Tipos y Distribución C++:** La interfaz ejecuta una cascada masiva de sub-consultas estadísticas en DuckDB que revelan los conteos de `Nulls`, Zeros, Negativos, la Cardinalidad (elementos únicos vs totales), el Skewness (Asimetría) y la Kurtosis.
2.  **Motor de Reglas y Alertas JS:** Un evaluador estadístico de JavaScript en el lado del cliente inspecciona las métricas devolviendo banderas o *warnings* de calidad de datos al instante (ej. Alta Cardinalidad, Nulos Extremos, Valores Constantes).
3.  **Visualización Interactiva:** El profiler inyecta gráficos modernos de *Recharts* (Histogramas numéricos y Barras Horizontales Top Frecuencia) para dominar la jerarquía visual del reporte.
4.  **Heatmap de Correlación:** Generación automática de una matriz paramétrica de correlación (Coeficiente de Pearson) para todas las variables numéricas en pantalla.

---

## 2. Ingesta y Exportación Multi-formato (Input/Output Management)

Para que un entorno de análisis local tenga valía de producción global real, debe funcionar como el nodo transductor o nexo transformacional universal de archivos.

### Importaciones Masivas e Inteligentes
Utilizando Modales Inteligentes de Importación, el IDE puede absorber y transformar orígenes de datos locales:
*   **A nivel de Archivo Único:** Carga masiva de extensiones `.CSV`, `.Parquet` y `.JSON`. Soporte dedicado de **Microsoft Excel (.XLSX y .XLS)** mediante `ImportExcelModal.jsx`, que carga múltiples hojas nativas en memoria JavaScript (vía librería `xlsx`) antes de vectorizarlas a la base de datos DuckDB asíncronamente.
*   **A Nivel Carpeta (Mass Import):** Para data ingestions de Data Lakes temporales, puedes seleccionar un fólder de Windows y el IDE redacta un macro automático asíncrono que crea Tablas usando el comando comodín de DuckDB (`read_parquet('folder/*.parquet')`).
*   **Limpieza de Metadato Entrante (Slugify Headers):** Durante la ventana de validación de importación, AmoxSQL detecta columnas con nombres ruidosos (ej. "Ventas Históricas 2023!!") y ofrece un Toggle para purificar e inyectar *Snake Case* limpio ("`ventas_historicas_2023`") automáticamente.

### Output en Archivo (Exportaciones de Sesión)
El módulo `ExportDataModal.jsx` (15KB+) delega desde el Frontend hacia el motor DuckDB la orden expresa de `COPY TO 'ruta/output'`:
*   **Contexto de Editor en Vivo:** El sistema de Exportación extrae en tiempo real el Bloque de Código Activo directamente desde el Editor Monaco subyacente, evitando tener que "re-ejecutar" una consulta antes de exportar.
*   **Limpieza Sintáctica Avanzada:** El conector DuckDB es purgado de "puntos y comas" finales o headers incompatibles en modo Parquet antes de emitirse el comando.
*   **Worker de Exportación (`exportWorker.js`):** Un Web Worker dedicado maneja exportaciones largas en segundo plano para evitar bloquear la interfaz de usuario.
*   **Formatos soportados:** CSV, JSON estructurado, Parquet Columnar, y Excel (XLSX).

---

## 3. Almacenamiento en la Nube (Cloud Storage)

Una de las adiciones más significativas de v1.9.9 es la capacidad de exportar datos directamente a servicios de almacenamiento en la nube.

### AWS S3
Desde la pestaña "Cloud Storage" del `SettingsModal`, se configuran:
*   **Access Key ID y Secret Key:** Credenciales IAM de AWS.
*   **Region:** Región del bucket (ej. `us-east-1`).
*   **Endpoint:** Endpoint personalizado para servicios compatibles con S3 (MinIO, DigitalOcean Spaces, etc.).
*   **Default Bucket:** Bucket por defecto para exportaciones.
*   **Test de Conexión:** Botón que verifica la conectividad con el servicio antes de intentar exportar.

### Google Cloud Storage (GCS)
Configuración similar con credenciales de servicio de Google Cloud:
*   **Access Key ID y Secret Key:** Credenciales HMAC de GCS.
*   **Default Bucket:** Bucket por defecto.
*   **Test de Conexión:** Verificación de conectividad integrada.

### Flujo de Exportación a la Nube
El `ExportDataModal` integra la opción de destino cloud junto a las exportaciones locales. DuckDB utiliza sus extensiones nativas (`httpfs`, `aws`) para escribir directamente al bucket configurado, aprovechando la velocidad del motor columnar para transferencias masivas eficientes.
