# Herramientas de Depuración y Entrada/Salida de Datos (Advanced Debugging & IO)

Escribir queries veloces y correctas es solo la mitad del trabajo de un analista de datos o de un ingeniero. **AmoxSQL** soporta ciclos profundos para identificar problemas funcionales, medir el tiempo de procesamiento volumétrico de grandes uniones JOIN y trasegar Gigabytes de información entre archivos transaccionales físicos convencionales y binarios in-memory. 

---

## 1. Herramientas Avanzadas de Diagnóstico (Debugging)

### CTE Debugger (Progreso Analógico de SubConsultas)
Las expresiones de tabla comunes ("*Common Table Expressions*" o CTEs) que utilizan la cláusula `WITH AS (...)` pueden crecer volviéndose "consultas dentro de consultas" inmanejables. Un error en la segunda tabla inferida puede arrastrarse y multiplicar uniones erráticas hacia el final de un Query de 100 líneas.

AmoxSQL integra un parser de lógica heurística sobre el Monaco Editor:
1.  Busca identificar palabras clave `WITH` y localiza asiladamente cada nombre de bloque lógico en el editor usando Regex avanzado.
2.  Levanta dinámicamente "Marcadores Visuales" o íconos "Play" interactivos en las canaletas de línea precisas donde declara la función temporal.
3.  Si se hace click en uno, desvincula estructuralmente el resto de la query de abajo, convierte el nombre a variable y ejecuta un `SELECT * FROM Target_CTE_SubTable LIMIT 50` hacia la base en C++ pasándolo por un preprocesador virtual.
4.  El usuario ve los resultados temporalizados instantáneamente en un modal de Depuración (`DebugResultModal.jsx`) sin tener que romper y reestructura sus valiosos textos de Query manualmente, habilitando un ciclo perimetral "Paso por Paso" (*Step-through Debugging*).

### Árbol Visualizador de Ejecución (Query Execution Plan)
Entender qué nodos subyacentes son los responsables del "cuello de botella" computacional de un Query gigante en DuckDB es crucial.

*   AmoxSQL inyecta la keyword explicativa (`EXPLAIN ANALYZE`) dentro de tu solicitud de Query interceptada secretamente por el IDE.
*   Retorna una red intrincada de formato de serialización JSON complejo.
*   En el componente `QueryPlanViewer.jsx`, el IDE no pinta la sosa línea de terminal habitual. Toma el JSON y lo envía al layout engine hiper-rápido de matemáticas topográficas **Elkjs** (Eclipse Layout Kernel) asincrónicamente para calcular posiciones XY nodales. 
*   Pinta los bloques de código como "Tarjetas" jerárquicas vinculadas por SVG Curvas, pintando con alertas rojas (`warning/red hue`) automáticas aquellos elementos con una "Afinidad de Costo" o carga porcentual muy alta comparado con sus vecinos paralelos, lo que resulta sumamente obvio revelar bloqueantes de tabla como escaneos "Sequential Scans" vs "Index Seek".

---

## 2. Ingesta y Exportación Multi-formato (Input/Output Management)

Para que un entorno de análisis local tenga valía de producción global real, debe funcionar como el nodo transductor o nexo transformacional universal de archivos entre la información "fea/sucia" entrante y los resultados empaquetados limpios salientes.

### Importaciones Masivas e Inteligentes
Utilizando Modales Inteligentes de Importación, el IDE puede absorber y transformar orígenes de datos locales hacia las tablas físicas o volátiles `.db` y en base a la robustez inigualable de DuckDB:
*   **A nivel de Archivo Único:** Carga masiva de extensiones `.CSV`, `.Parquet` y `.JSON`. Soporte robusto de `.XLSX` (Excel ExcelSheets Legacy) mediante un módulo de puente import-modal con parseo en el cliente vía buffers hexadecimales (`XLSX/SheetJS` integration), superando las limitantes que otras bases tienen para ingerir hojas calculadas propietarias de Microsoft.
*   **A Nivel Carpeta (Mass Import):** Para data ingestions de Data Lakes temporales, puedes seleccionar un fólder rígido de Windows y el IDE redacta un macro automático asíncrono sobre promesas NodeJS que crea Tablas y anexa todos los parquets uniformados dentro en milisegundos usando el comando comodín de DuckDB (`read_parquet('folder/*.parquet')`).
*   **Limpieza de Metadato Entrante (Slugify Headers):** Es muy común recibir columnas corporativas ruidosas "Ventas Históricas 2023!!". Durante la ventana de validación de amox, AmoxSQL detecta tales anomalías de tipado y ofrece un Toggle para purificar e inyectar *Snake Case* a salvo de caracteres especiales ("`ventas_historicas_2023`") automáticamente antes de solidificarlas en Base de Datos.

### Output en Archivo (Exportaciones de Sesión)
Una vez resuelto el cálculo transaccional local in-memory:
El módulo de `ResultsTable.jsx` permite capturar los bytes de objetos JSON presentados, transpilar de regreso y serializar en Strings CSV (`react-csv` style blob object URLs), desatando una descarga limpia controlada hacia el sistema del usuario con click, evadiendo conversiones costosas manuales de formato y ofreciendo los datos listos para consumir por una tercera entidad, auditoría externa, o re-empaquetado para sistemas CRM finales.
