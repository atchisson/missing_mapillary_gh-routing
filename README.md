# Street-level Photo Coverage Routing

**Proof of Concept** — An interactive web application for route planning with GraphHopper, built to favour streets not yet covered by street-level photos. Routes can be calculated with a routing penalty applied to already-covered segments, encouraging the discovery of new streets. Currently uses Panoramax as the coverage data provider, with the goal of supporting multiple imagery sources.

---

## Getting Started

Serve the project with any static file server, e.g. Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## Configuration

### GraphHopper API

The application reads the GraphHopper URL from a `.env` file in the project root.

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Set your GraphHopper instance URL:
   ```
   GRAPHHOPPER_URL=http://127.0.0.1:8989
   ```

3. Restart the web server.

If no `.env` is found the application falls back to the default public instance (`https://ghroute.vizsim.de`).

> **Note:** The `.env` file is served as a static file and is therefore readable by the client. For production use, embed environment variables at build time.

### GraphHopper fork requirements

Photo-coverage avoidance requires a custom GraphHopper fork that exposes the `photo_coverage` and `photo_coverage_only360` encoded values per road segment. The fork is available at [atchisson/graphhopper](https://github.com/atchisson/graphhopper).

Standard profiles (`car`, `foot`) also work without the fork but without photo-coverage avoidance.

---

## Features

### Routing
- **Multi-profile routing**: Bicycle (`bike_customizable`), Car (`car_customizable`), Walking (`foot`) — selectable from the routing panel
- **Photo coverage avoidance**: Apply a custom-model penalty to road segments already covered by street-level imagery, encouraging routes through uncovered streets
  - **Standard photos** (`photo_coverage`): penalises segments with any photo coverage
  - **360° photos** (`photo_coverage_only360`): penalises only segments with equirectangular/360° coverage
  - **Strength slider**: continuous exponential scale from weak (multiplier ≈ 0.5) to strong (multiplier ≈ 0.01)
- **Waypoints**: add intermediate stops with drag-and-drop reordering and automatic order optimisation
- **Interactive route planning**: click on the map or use the address search to set start, end, and waypoints

### Map visualisation
- **Photo coverage overlay**: two colour-coded layers driven by the avoidance checkboxes
  - Orange (`#f97316`) — standard flat photo sequences
  - Dark orange (`#c2410c`) — 360° (equirectangular) sequences
  - Layers appear automatically when the corresponding avoidance checkbox is ticked
- **Elevation profile**: interactive canvas-based elevation profile with hover, distance markers, and surface / road-class overlay
- **Basemaps**: OpenStreetMap raster and ESRI Satellite, with automatic light/dark mode
- **Terrain & hillshade**: Mapterhorn DEM data (optional toggles)
- **Router coverage rectangle**: a subtle dashed polygon shows the geographic area supported by the active GraphHopper instance on first load

### General
- **Permalink**: full state saved in the URL (map position, route points, profile, elevation type)
- **GPX export**: download the calculated route as a `.gpx` file
- **Multilingual UI**: English, French, German — auto-detected from the browser, switchable at runtime

---

## Technical Details

### Framework & Libraries
- **MapLibre GL JS** (v5.14.0) — map rendering
- **GraphHopper Routing API** — route calculation via [custom fork](https://github.com/atchisson/graphhopper)
- **Photon** (`photon.komoot.io`) — address geocoding

### Data Sources

| Source | Purpose |
|---|---|
| [ghroute.vizsim.de](https://ghroute.vizsim.de) | GraphHopper routing API |
| OpenStreetMap | Base map raster tiles |
| ESRI World Imagery | Satellite basemap |
| [Panoramax](https://panoramax.xyz) | Street-level photo coverage vector tiles |
| [Mapterhorn](https://mapterhorn.com) | Terrain and hillshade DEM |

---

## Project Structure

```
missing_mapillary_gh-routing/
├── index.html                        # Main HTML
├── main.js                           # Entry point & map initialisation
├── style.css                         # Application stylesheet
├── style_light-dark.json             # MapLibre style (light/dark raster base)
├── .env.example                      # GraphHopper URL template
├── js/
│   ├── config/
│   │   └── envConfig.js              # Reads .env at runtime
│   ├── i18n/
│   │   ├── i18n.js                   # Translation engine (dot-notation keys)
│   │   ├── en.json
│   │   ├── fr.json
│   │   └── de.json
│   ├── routing/
│   │   ├── routing.js                # API calls, route parsing
│   │   ├── routingUI.js              # UI handlers (inputs, buttons, checkboxes)
│   │   ├── routeState.js             # Centralised state (profile, points, custom model)
│   │   ├── routeRecalculator.js      # Debounced route recalculation
│   │   ├── routeVisualization.js     # Route colours & segment rendering
│   │   ├── routeInfoFormatter.js     # Distance / time formatting
│   │   ├── colorSchemes.js           # Colour maps (surface, road class, coverage)
│   │   ├── customModel.js            # GraphHopper custom model builder
│   │   ├── gpxExport.js              # GPX export
│   │   ├── waypointOptimizer.js      # Nearest-neighbour waypoint ordering
│   │   ├── markers/
│   │   │   ├── markerFactory.js      # Start / end / waypoint markers
│   │   │   └── waypointContextMenu.js
│   │   ├── waypoints/
│   │   │   ├── waypointList.js       # Drag-and-drop waypoint list UI
│   │   │   └── waypointManager.js    # Waypoint CRUD
│   │   ├── coordinates/
│   │   │   └── coordinateTooltips.js
│   │   └── heightgraph/              # Elevation profile (canvas-based)
│   │       ├── heightgraph.js
│   │       ├── heightgraphCanvas.js
│   │       ├── heightgraphConfig.js
│   │       ├── heightgraphDrawing.js
│   │       ├── heightgraphInteractivity.js
│   │       ├── heightgraphStats.js
│   │       └── heightgraphUtils.js
│   ├── mapdata/
│   │   ├── sources.js                # Map source definitions (OSM, satellite, coverage tiles, terrain…)
│   │   └── basicLayers.js            # Layer setup (basemaps, hillshade, coverage sequences)
│   ├── ui/
│   │   ├── setupBaseLayerControls.js # Basemap switcher + post-style-change layer restore
│   │   ├── panelPositioning.js       # Fires panelPositioningComplete for heightgraph redraws
│   │   ├── toggleHandlers.js         # Terrain, hillshade, dark-mode toggles
│   │   ├── contextMenu.js            # Right-click map menu
│   │   ├── contextMenuBase.js
│   │   ├── mapThemeSwitcher.js
│   │   └── mapThemeInitializer.js
│   └── utils/
│       ├── permalink.js              # URL state (read/write)
│       ├── geocoder.js               # Photon geocoding
│       └── constants.js              # App-wide constants & layer IDs
└── thumbs/                           # Basemap thumbnail images
```

---

## Photo Coverage Avoidance — How It Works

When a checkbox is ticked, two things happen simultaneously:

1. **Map layer**: the corresponding coverage vector tile layer becomes visible on the map, showing which streets are already photographed (orange = standard, dark orange = 360°).

2. **Routing penalty**: a `custom_model.priority` rule is injected into the GraphHopper POST request:

   ```json
   { "if": "photo_coverage",        "multiply_by": 0.07 }  // standard coverage
   { "if": "photo_coverage_only360", "multiply_by": 0.035 } // 360° only
   ```

   The multiplier is controlled by the strength slider using an exponential curve:
   `multiplier = base × 0.02^(strength/100)` — so the middle position (50) gives approximately a 7× penalty, and the maximum gives roughly 50×.

Both rules can be combined. When both are active, segments with 360° coverage are doubly penalised (both rules apply).

---

## Usage

Live demo: [https://vizsim.github.io/missing_mapillary_gh-routing/](https://vizsim.github.io/missing_mapillary_gh-routing/)

---

## License

License will be added soon.

---

## Credits

- **MapLibre GL JS** — open-source map rendering
- **GraphHopper** — routing engine
- **OpenStreetMap** — community map data
- **Panoramax** — open street-level photo platform ([panoramax.xyz](https://panoramax.xyz))
- **Mapterhorn** — terrain and hillshade DEM ([mapterhorn.com](https://mapterhorn.com))
- **Photon / Komoot** — geocoding API
