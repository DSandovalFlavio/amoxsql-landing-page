# Configuración del IDE (IDE Configuration)

**AmoxSQL** centraliza todas las configuraciones del IDE en un panel unificado accesible desde la barra de menú o mediante atajos de teclado. El `SettingsModal.jsx` (99KB+) es el componente más extenso de la aplicación, organizado en **5 pestañas** que cubren desde la apariencia visual hasta la integración con servicios en la nube.

---

## 1. Pestaña: Apariencia (Appearance)

### Selector de Tema de Color
8 temas de color completos presentados como tarjetas visuales interactivas. Cada tarjeta muestra una vista previa miniatura del tema con la barra lateral, el editor y un fragmento de código de ejemplo:

#### Temas Oscuros (5)
| Tema | Fondo Sidebar | Fondo Editor | Descripción |
|------|---------------|--------------|-------------|
| **Obsidian** | `#0e0f11` | `#141518` | El más profundo y oscuro |
| **Onyx** | `#101113` | `#1a1c20` | Negro con matices azulados |
| **Carbon** | `#121315` | `#1c1f24` | Gris azulado oscuro |
| **Graphite** | `#141618` | `#222529` | Gris cálido oscuro |
| **Nord Dark** | `#151920` | `#222833` | Inspirado en la paleta Polar Night |

#### Temas Claros (3)
| Tema | Fondo Sidebar | Fondo Editor | Descripción |
|------|---------------|--------------|-------------|
| **Ivory** | `#f3ede4` | `#faf6ef` | Cálido como papel antiguo |
| **Mist** | `#e8ecf2` | `#f2f4f8` | Frío como niebla |
| **Light** | `#f2f3f5` | `#ffffff` | Limpio y brillante |

El tema seleccionado se aplica instantáneamente a todos los componentes del IDE a través de variables CSS globales, sin latencia perceptible.

### Selector de Color de Acento
13 colores de acento organizados en dos paletas:

#### Paleta Vibrante (7 colores)
| ID | Color | Hex | Descripción |
|----|-------|-----|-------------|
| `cyan` | 🟦 | `#00FFFF` | Default — Cian eléctrico |
| `amox-2` | 🟦 | `#00F5FF` | Aqua |
| `amox-4` | 🟦 | `#00DAFF` | Sky |
| `amox-6` | 🟦 | `#0090FF` | Azure |
| `amox-8` | 🟦 | `#0090FF` | Blue |
| `amox-10` | 🟦 | `#0068FF` | Cobalt |
| `linear` | 🟪 | `#5E6AD2` | Linear Blue |

#### Paleta Sobria (6 colores)
| ID | Color | Hex | Descripción |
|----|-------|-----|-------------|
| `sage` | 🟢 | `#7dab8a` | Verde salvia |
| `amber` | 🟡 | `#d4a853` | Ámbar dorado |
| `rose` | 🔴 | `#c97878` | Rosa suave |
| `lavender` | 🟣 | `#a88ec4` | Lavanda |
| `steel` | ⚪ | `#8a9bb0` | Acero azulado |
| `copper` | 🟠 | `#c4956a` | Cobre cálido |

El acento seleccionado controla `--accent-color-user` y se propaga a botones, bordes activos, indicadores de selección, spinners, y badges en todo el IDE.

### Selector de Layout del Editor
Dos disposiciones visuales representadas con vistas previas:
*   **Horizontal (default):** Editor arriba, resultados abajo — ideal para monitores estándar.
*   **Vertical:** Editor a la izquierda, resultados a la derecha — optimizado para monitores ultrawide.

---

## 2. Pestaña: Editor

### Tipografía
*   **Familia de Fuente (6 opciones):** JetBrains Mono, Fira Code, Cascadia Code, Consolas, Monaco, Source Code Pro. Cada fuente se inyecta dinámicamente vía WebFonts.
*   **Tamaño de Fuente:** Control deslizante de 10px a 24px con valor numérico visible.
*   **Tamaño de Tabulación:** Toggle entre 2 y 4 espacios.

### Visualización del Editor
*   **Minimapa:** Toggle para mostrar/ocultar la vista previa miniatura del código en el borde derecho.
*   **Ajuste de Línea (Word Wrap):** Toggle para envolver líneas que excedan el ancho del editor.
*   **Números de Línea:** Toggle para mostrar/ocultar los números de línea en la canaleta.

### Panel de Resultados
*   **Tamaño de Fuente de Resultados:** Control deslizante independiente de 11px a 16px para la tabla de resultados.
*   **Vista por Defecto:** Selector entre Table, Chart, o Profile como vista inicial al ejecutar una consulta.

### Inteligencia del Editor (DuckDB Function Catalog)
Panel informativo que muestra el estado del catálogo de funciones DuckDB:
*   **Barra de Cobertura:** Indicador visual del porcentaje de funciones con documentación rica.
*   **Contador:** `N / M functions` documentadas.
*   **Botón "Refresh Cache":** Regenera el caché del catálogo fusionando documentación curada con introspección en vivo de `duckdb_functions()`.
*   **Lista de Funciones:** Panel expandible que muestra las funciones con documentación auto-generada básica.

---

## 3. Pestaña: AI Assistant

### Selector de Proveedor
Menú desplegable con dos opciones:
*   **Ollama (Local Engine):** Motor de IA local 100% offline.
*   **Google Gemini (Cloud):** Motor de IA en la nube con API Key.

### Configuración de Ollama
Cuando Ollama está seleccionado:
*   **Modelo por Defecto:** Selector entre modelos instalados localmente.
*   **Modelos Instalados:** Lista con nombre, tamaño y fecha de los modelos disponibles.
*   **Modelos Recomendados:** Catálogo de 4 modelos pre-configurados (Qwen 2.5, Llama 3.2, Llama 3.1, Gemma 2) con información de RAM requerida y descripción de cada uno.
*   **Descarga de Modelos:** Campo de entrada libre y botón para descargar cualquier modelo de Ollama con barra de progreso en tiempo real (streaming SSE).

### Configuración de Gemini
Cuando Gemini está seleccionado:
*   **API Key:** Campo de entrada seguro para la llave de Google AI.
*   **Tracker de Uso Diario:** Panel informativo que muestra el consumo actual por modelo (Flash Lite, Flash, Pro) y tokens utilizados. Se resetea diariamente a la medianoche.

---

## 4. Pestaña: Cloud Storage

### AWS S3
Formulario de configuración con campos para:
*   **Access Key ID:** Credencial IAM de AWS.
*   **Secret Key:** Clave secreta de AWS.
*   **Region:** Región del bucket (ej. `us-east-1`, `eu-west-1`).
*   **Endpoint:** Endpoint personalizado para servicios compatibles con S3 (MinIO, DigitalOcean Spaces, Cloudflare R2).
*   **Default Bucket:** Bucket por defecto para exportaciones.
*   **Test Connection:** Botón que verifica la conectividad y retorna un mensaje de éxito o error.

### Google Cloud Storage (GCS)
Formulario de configuración con campos para:
*   **Access Key ID:** Credencial HMAC de GCS.
*   **Secret Key:** Clave secreta HMAC.
*   **Default Bucket:** Bucket por defecto para exportaciones.
*   **Test Connection:** Verificación de conectividad integrada.

---

## 5. Pestaña: About AmoxSQL

Panel informativo que muestra:
*   **Versión de AmoxSQL:** v1.9.9.
*   **Versión de DuckDB:** Obtenida dinámicamente mediante `SELECT version()`.
*   **Enlaces Externos:**
    *   GitHub del proyecto (abre en navegador del sistema vía `electronAPI.openExternal`).
    *   Sitio web oficial.
    *   Página de sponsorship/patrocinio.
*   **Créditos y Agradecimientos:** Reconocimiento a las tecnologías base (DuckDB, Monaco Editor, Recharts, React, Node.js).

---

## Persistencia Global de Configuraciones

Todas las configuraciones del IDE se persisten en dos niveles:
1.  **`localStorage`:** Tema, acento, layout, preferencias del editor — se cargan instantáneamente al arrancar.
2.  **Archivo de Configuración (`~/.amoxsql/config.json`):** API keys, proveedor de IA, modelo por defecto, configuraciones de Cloud Storage, y tracking de uso de Gemini.

Los cambios de apariencia (tema, acento, layout) se aplican inmediatamente sin necesidad de guardar. Las configuraciones de IA y Cloud Storage requieren presionar "Save Settings" para persistir.
