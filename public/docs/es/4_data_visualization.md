# Visualización Dinámica de Datos (Data Visualization)

**AmoxSQL** trasciende la naturaleza de texto plano de los IDEs SQL tradicionales al incrustar un motor gráfico modular y reactivo. En la versión 1.9.9, el antiguo componente monolítico `DataVisualizer.jsx` fue completamente refactorizado en una arquitectura modular organizada en el directorio `DataVisualizer/`, con paneles dedicados, renderizadores especializados, overlays y utilidades independientes.

---

## 1. Arquitectura Modular del Visualizador

### Estructura del Directorio `DataVisualizer/`
```
DataVisualizer/
├── DataVisualizer.jsx      # Componente orquestador principal (25KB)
├── constants.js            # Paletas de colores, configuraciones por defecto
├── index.js                # Exportación del módulo
├── useChartState.js        # Hook de estado centralizado del gráfico
├── panels/                 # Paneles de configuración lateral
│   ├── AxisPanel.jsx       # Configuración de ejes X/Y, escalas, títulos
│   ├── ChartTypeSelector.jsx # Selector visual de tipo de gráfico
│   ├── DataPanel.jsx       # Mapeo de columnas, agrupaciones, pivots
│   ├── DetailPanel.jsx     # Colores, estilos de línea, opacidad, bordes
│   ├── ThemePanel.jsx      # Paletas cromáticas prediseñadas
│   ├── AnnotationsPanel.jsx # Líneas/áreas de referencia, títulos
│   └── shared.jsx          # Componentes UI reutilizables de los paneles
├── renderers/
│   └── ChartRenderer.jsx   # Motor de renderizado SVG (870 líneas)
├── overlays/
│   └── HeadlineOverlay.jsx # KPI headlines tipo dashboard
└── utils/
    ├── dataProcessing.js   # Pivots, agrupaciones, agregaciones JS
    ├── exportChart.js      # Exportación a PNG de alta resolución
    └── numberFormat.js     # Formateo numérico (Compact, Currency, %)
```

### Hook de Estado (`useChartState.js`)
Todo el estado del gráfico se centraliza en un hook personalizado `useChartState` que administra:
*   Tipo de gráfico seleccionado y sus sub-opciones.
*   Mapeo de columnas a ejes (X, Y, Series).
*   Configuraciones de agrupación y agregación.
*   Personalización visual (colores, estilos, márgenes).
*   Líneas y áreas de referencia.
*   Formato numérico de ejes y tooltips.

---

## 2. Tipos de Gráficos Soportados

El `ChartTypeSelector.jsx` ofrece un menú visual con iconos que muta el estado principal de React iterando a través de componentes especializados del `ChartRenderer.jsx`:

1.  **BarChart (Vertical y Horizontal):** Configurable para mostrar Barras Lado a Lado, Apiladas (Stacked Bars), o Apiladas al 100% (100% Stacked).
2.  **LineChart & AreaChart:** Preferido para series temporales. Soporta áreas apiladas y modos como `step` o `monotone`.
3.  **PieChart / Donut:** Diagramas de sectores paramétricos.
4.  **ScatterChart & BubbleChart:** Identificación de outliers, distribuciones X vs Y, y una tercera dimensión de tamaño en burbujas.
5.  **Combo (Bar + Line):** Visualización combinada con doble eje Y, ideal para comparar métricas de diferentes escalas (ej. ventas en barras + margen porcentual en línea).
6.  **Funnel (Embudo):** Para análisis de conversión en marketing y embudos de ventas multi-etapa.
7.  **Heatmap (Mapa de Calor):** Intensidad de color sobre una cuadrícula bidimensional, perfecto para correlaciones y análisis de patrones temporales.

---

## 3. Paneles de Configuración

### Panel de Datos (`DataPanel.jsx`)
*   **Mapeo de Columnas:** Selección visual de qué columnas del resultado asignar a cada eje.
*   **Pivot & Agrupación Dinámica:** Si se habilita el toggle "Agrupar Eje X", la interfaz agrupa las llaves del estado `xAxisKey`. El usuario selecciona un algoritmo matemático dinámico: `Sum`, `Average`, `Min`, o `Max`.
*   **Contracción Temporal:** Para datos de naturaleza temporal (Time-Series Dates), existe un menú que "Pivota" la serie de tiempo para contraer los datos por Día, Mes o Año sin volver a consultar DuckDB.

### Panel de Ejes (`AxisPanel.jsx`)
*   **Títulos Personalizados:** Texto libre para los títulos de eje X e Y.
*   **Escala Logarítmica:** Toggle para escala logarítmica en el eje Y.
*   **Límites Dinámicos:** Control manual de valores mínimos y máximos para los ejes.
*   **Rotación de Etiquetas:** Ángulos de 0° a 90° para etiquetas largas en el eje X.

### Panel de Detalle (`DetailPanel.jsx`)
*   **Colores por Serie:** Selector de color individual para cada serie de datos.
*   **Estilos de Línea:** Sólida, punteada, discontinua.
*   **Opacidad:** Control deslizante de transparencia para áreas y barras.
*   **Márgenes y Espaciado:** Ajustes finos de espaciado entre elementos del gráfico.

### Panel de Temas (`ThemePanel.jsx`)
*   **Paletas Cromáticas Prediseñadas:** Colecciones curadas de colores armónicos que se aplican automáticamente a todas las series del gráfico.
*   **Personalización Individual:** Capacidad de sobrescribir colores individuales después de aplicar una paleta.

### Panel de Anotaciones (`AnnotationsPanel.jsx`)
*   **Líneas de Referencia:** Líneas horizontales o verticales con etiquetas personalizadas (ej. "Meta de Ventas Q4" en Y = 10,000).
*   **Áreas de Referencia:** Regiones sombreadas con opacidad configurable para resaltar períodos específicos (ej. colorear el mes de Diciembre para "Promociones de Fin de Año").
*   **Títulos y Subtítulos:** Texto superpuesto sobre el gráfico para contexto narrativo.

---

## 4. Overlay de Indicadores Clave (`HeadlineOverlay.jsx`)

Para escenarios de dashboard, el overlay de *Headline* permite superponer indicadores KPI de gran formato sobre el gráfico, mostrando el valor más reciente o un cálculo agregado con formato numérico profesional, emulando las tarjetas resumen de herramientas como Tableau o Looker.

---

## 5. Persistencia y Exportación

### Formato `*.amoxvis`
Construir una gráfica perfecta — con ejes etiquetados, colores personalizados, rotaciones, márgenes ajustados y leyendas — toma tiempo. El estado gigante de personalización JSON se vuelca mediante el API del explorador hacia un archivo `.amoxvis` dentro la carpeta del proyecto. Estos archivos viajan directo con el versionamiento de código en Git junto a los archivos `*.sql`.

### Exportación a PNG de Ultra-Resolución (`utils/exportChart.js`)
Utilizando la técnica de `html2canvas` inyectada junto a multiplicadores de densidad de pixel (Device Pixel Ratio paramétrico), el explorador clona imperativamente el Nodo SVG renderizado en memoria, lo amplía digitalmente (hasta un modificador 4x de escala para retina), desactiva bordes del IDE e imprime el gráfico inmaculado en PNG listo para integrar en presentaciones directivas.

### Formato Numérico Inteligente (`utils/numberFormat.js`)
El usuario puede cambiar la representación en sus ejes (Y y Tooltips):
*   **Raw (Crudo):** Literal de JavaScript `(1000000)`.
*   **Compact:** Escala dinámica al estándar `(1M, 1.5K)`.
*   **Currency (Moneda):** Prefijo de dólar o moneda parametrizada.
*   **Porcentaje:** Intercepta Tooltips decimales multiplicando base cien.
