# Dynamic Data Visualization

**AmoxSQL** transcends the plain-text nature of traditional SQL IDEs by embedding a modular and reactive charting engine. In version 1.9.9, the old monolithic `DataVisualizer.jsx` component was completely refactored into a modular architecture organized in the `DataVisualizer/` directory, with dedicated panels, specialized renderers, overlays, and independent utilities.

---

## 1. Modular Architecture of the Visualizer

### `DataVisualizer/` Directory Structure
```
DataVisualizer/
├── DataVisualizer.jsx      # Main orchestrator component (25KB)
├── constants.js            # Color palettes, default configs
├── index.js                # Module export
├── useChartState.js        # Centralized chart state hook
├── panels/                 # Side configuration panels
│   ├── AxisPanel.jsx       # X/Y axis config, scales, titles
│   ├── ChartTypeSelector.jsx # Visual chart type selector
│   ├── DataPanel.jsx       # Column mapping, groupings, pivots
│   ├── DetailPanel.jsx     # Colors, line styles, opacity, borders
│   ├── ThemePanel.jsx      # Pre-designed color palettes
│   ├── AnnotationsPanel.jsx # Reference lines/areas, titles
│   └── shared.jsx          # Reusable UI components
├── renderers/
│   └── ChartRenderer.jsx   # SVG rendering engine (870 lines)
├── overlays/
│   └── HeadlineOverlay.jsx # Dashboard-type KPI headlines
└── utils/
    ├── dataProcessing.js   # JS pivots, groupings, aggregations
    ├── exportChart.js      # High-res PNG export
    └── numberFormat.js     # Number formatting (Compact, Currency, %)
```

### State Hook (`useChartState.js`)
All chart state is centralized in a custom `useChartState` hook that manages:
*   Selected chart type.
*   Mapping of columns to axes.
*   Grouping and aggregation configurations.
*   Visual customizations (colors, styles, margins).
*   Reference lines and areas.
*   Numerical formatting.

---

## 2. Supported Chart Types

1.  **BarChart (Vertical and Horizontal):** Configurable for Side-by-Side, Stacked Bars, or 100% Stacked.
2.  **LineChart & AreaChart:** Preferred for time-series. Supports stacked areas and step/monotone modes.
3.  **PieChart / Donut:** Parametric sector diagrams.
4.  **ScatterChart & BubbleChart:** Identifies outliers, X vs Y distributions, and size dimension via bubbles.
5.  **Combo (Bar + Line):** Combined visualization with dual Y-axis, ideal for comparing metrics of different scales.
6.  **Funnel:** For marketing conversion analysis and multi-stage sales funnels.
7.  **Heatmap:** Color intensity over a two-dimensional grid, perfect for correlations.

---

## 3. Configuration Panels

### Data Panel (`DataPanel.jsx`)
*   **Column Mapping:** Visual selection of columns to map.
*   **Dynamic Pivot & Grouping:** Groups keys and aggregates them using functions like `Sum`, `Average`, `Min`, or `Max` directly in JS without querying DuckDB again.
*   **Time Contraction:** Contracts time series by Day, Month, or Year.

### Axis Panel (`AxisPanel.jsx`)
*   **Custom Titles:** Free text for X and Y axes.
*   **Logarithmic Scale:** Toggle for logarithmic Y-axis.
*   **Dynamic Limits:** Manual limit controls.
*   **Label Rotation:** Ranges from 0° to 90°.

### Detail Panel (`DetailPanel.jsx`)
*   **Colors per Series:** Selector per individual data series.
*   **Line Styles:** Solid, dotted, dashed.
*   **Opacity:** Transparency sliders.
*   **Margins and Spacing:** Fine margin adjustments.

### Theme Panel (`ThemePanel.jsx`)
*   **Pre-designed Palettes:** Curated collections of harmonic colors.
*   **Individual Customization:** Overwrite specific colors.

### Annotations Panel (`AnnotationsPanel.jsx`)
*   **Reference Lines:** Horizontal or vertical bounds labeled (e.g., "Q4 Sales Goal").
*   **Reference Areas:** Shaded regions with configurable opacity.
*   **Titles and Subtitles:** Narratives overlaid on charts.

---

## 4. Key Indicators Overlay (`HeadlineOverlay.jsx`)

For dashboard scenarios, the *Headline* overlay superimposes large KPI format indicators on top of the chart, showing recent values or aggregated calculations.

---

## 5. Persistence and Exporting

### `*.amoxvis` Format
Building a perfect chart takes time. The giant customization JSON state is dumped via the explorer API to a `.amoxvis` file inside the project folder. This rides along with version code in Git alongside `.sql` scripts.

### Ultra-Resolution PNG Export (`utils/exportChart.js`)
It clones the SVG node in memory, enlarges it digitally (up to a 4x Retina scale modifier), and prints an immaculate PNG ready for executive slides.

### Smart Numeric Formatting (`utils/numberFormat.js`)
*   **Raw:** Literal JS values.
*   **Compact:** Dynamic scaling (e.g. `1M`, `1.5K`).
*   **Currency:** Dollar or parametric prefix.
*   **Percentage:** Multiplies by 100.
