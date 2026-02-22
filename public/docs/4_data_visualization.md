# Visualización Dinámica de Datos (Data Visualization)

**AmoxSQL** trasciende la naturaleza de texto plano de los IDEs SQL tradicionales al incrustar un motor gráfico iterativo y reactivo llamado **`DataVisualizer.jsx`**. Este módulo supermasivo (el archivo más grande de la arquitectura Frontend) provee la funcionalidad que usualmente se encuentra en herramientas de Business Intelligence completas.

---

## 1. Integración de Motor Gráfico (Recharts)

En lugar de utilizar Canvas desnudo o D3 crudo complejo, AmoxSQL envuelve la librería **Recharts**. Recharts permite la composición declarativa en React, lo que significa que a medida que los datos o las configuraciones (como el tamaño de ventana o el color del tema) cambian, los elementos SVG se transicionan fluidamente gracias al motor de reconciliación algorítmico de React.

### Tipos Soportados
El menú de opciones muta el estado principal de React iterando a través de componentes especializados:
1.  **BarChart (Vertical y Horizontal):** Configurable para mostrar Barras Apiladas (Stacked Bars) o Lado a Lado.
2.  **LineChart & AreaChart:** Preferido para series de tiempo. Soporta modo escalonado (`step`), monocubos (`monotone`) o lineales rígidos.
3.  **PieChart / Donut:** Diagramas de sectores paramétricos.
4.  **ScatterChart:** Crucial para identificar outliers o la distribución de agrupaciones de datos X contra Y.

## 2. Pivot & Agrupación Numérica Dinámica

A menudo, la consulta generada por DuckDB puede ser un `SELECT *` de decenas de miles de logs granulares. El usuario no necesita regresar al código SQL y teclear un largo bloque `GROUP BY` y funciones matemáticas complejas para verlo en gráfico.

El *Visualizer* de AmoxSQL posee un motor JS de agregación:
*   Si se habilita el toggle "Agrupar Eje X", la interfaz agrupa las llaves del estado `xAxisKey`.
*   El usuario puede seleccionar un algoritmo matemático dinámico desde la UI: `Sum`, `Average`, `Min`, o `Max`.
*   Para datos de naturaleza temporal (Time-Series Dates), existe un menú especial interactivo que "Pivota" la serie de tiempo para contraer los datos por Día, Mes o Año sin que toque de nuevo a la base de DuckDB, facilitando la identificación de anomalías mensuales al vuelo.

## 3. Indicadores de Referencia (Storytelling)

Para un verdadero modelado "Storytelling", los analistas necesitan anotar visualmente dónde ocurrieron sucesos críticos en la vida de los datos empresariales. 

*   **Líneas de Referencia (Reference Lines):** Integradas matemáticamente. Un operador puede dibujar una línea roja en `Y = 10,000` rotulada "Meta de Ventas Q4" para demostrar de un vistazo si se superó una expectativa de negocio.
*   **Áreas de Referencia (Reference Areas):** Permite iluminar el fondo (background fill con opacidad configurable) de un espacio temporal en la gráfica, como colorear el mes de "Diciembre" entero de color tenue para indicar "Promociones de Fin de Año".

## 4. Persistencia Numérica y Estética

### Formato Numérico Inteligente
El usuario puede cambiar la representación en sus ejes (Y y Tooltips):
*   **Raw (Crudo):** Literal de Javascript `(1000000)`.
*   **Compact:** Escala dinámica al estándar americano `(1M, 1.5K)`.
*   **Currency (Moneda):** Pone el prefijo de dólar o moneda parametrizada.
*   **Porcentaje:** Intercepta Tooltips decimales multiplicando base cien.

### Formato `*.amoxvis`
Construir una gráfica perfecta—con ejes etiquetados, colores personalizados desde su selector de paletas, rotaciones a 45 grados para encabezados largos, márgenes ajustados y leyendas—toma tiempo. 

Para prevenir la pérdida de este trabajo, el estado gigante de personalización JSON en la memoria del Componente Visualizador se vuelca mediante el API del explorador hacia un archivo `.amoxvis` dentro la carpeta del proyecto. Estos archivos viajan directo con el versionamiento de código en Git junto a los archivos `*.sql`. 

### Exportación a PNG de Ultra-Resolución
Utilizando la técnica de `html2canvas` inyectada junto a multiplicadores de densidad de pixel (Device Pixel Ratio paramétrico), el explorador no hace un mero "Screenshot" de la pantalla sucia, sino que clona imperativamente el Nodo SVG renderizado en memoria, lo amplía digitalmente (hasta un modificador 4x de escala para retina), desactiva bordes del IDE e imprime el gráfico inmaculado en PNG listo para integrar en presentaciones directivas o diapositivas institucionales.
