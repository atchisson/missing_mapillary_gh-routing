> Also available in: [Deutsch](README.de.md)

# Missing Mapillary GraphHopper Routing

**Proof of Concept** - An interactive web application for route planning with GraphHopper integration, specifically optimized for identifying and planning routes along streets without Mapillary coverage. The application visualizes Mapillary coverage data and helps identify gaps in street-level imagery.

---

## Features

- **Mapillary Coverage Routing**: Route planning focused on Mapillary coverage - identify streets without street-level imagery
- **Color-coded Route Visualization**: Routes displayed based on Mapillary coverage, surface type, and road class - instantly see which segments lack Mapillary coverage
- **Missing Streets Layer**: Visualization of streets without Mapillary coverage (data from OSM Verkehrswende) as a context layer
- **Interactive Route Planning**: Set start and end points by clicking on the map or via geocoding
- **Multi-Profile Routing**: Support for various transport modes (car, bicycle, etc.)
- **Elevation Profile**: Interactive canvas-based elevation profile with hover functionality and encoded values overlay
- **Context Layers**: Cycling infrastructure (OpenStreetMap, FixMyCity) and Mapillary Missing Streets with toggle functionality
- **Permalink**: Full state saved in the URL (map position, route, profile, layers)
- **GPX Export**: Export calculated routes as GPX files for navigation or further analysis

---

## Technical Details

### Framework & Libraries
- **MapLibre GL JS** (v5.6.0): Map visualization
- **GraphHopper Routing API**: Route calculation based on a custom fork [vizsim/graphhopper:bikelanes_ec](https://github.com/vizsim/graphhopper/tree/bikelanes_ec)
- **Photon Geocoder**: Address search and geocoding

### Data Sources
- **GraphHopper API**: Route calculation (server instance: [ghroute.vizsim.de](https://ghroute.vizsim.de))
- **OpenStreetMap**: Base map data
- **OSM Verkehrswende**: Mapillary Missing Streets data - [osm-verkehrswende.org](https://www.osm-verkehrswende.org)
- **FixMyCity** / **tilda-geo.de**: Vector tiles for cycling infrastructure - [tilda-geo.de](https://tilda-geo.de)
- **Mapterhorn**: Terrain and hillshade DEM data - [mapterhorn.com](https://mapterhorn.com)
- **Sonny's Terrain Models**: Elevation models (CC BY 4.0) - [sonny.4lima.de](https://sonny.4lima.de)

---

## Project Structure

```
missing_mapillary_gh-routing/
├── index.html                    # Main HTML file
├── main.js                       # Main initialization
├── style.css                     # Stylesheet
├── style.json                    # MapLibre style configuration
├── logo.svg                      # Logo
├── js/
│   ├── config/                   # Configuration
│   │   ├── config.js             # Local configuration (not versioned)
│   │   └── config.public.js      # Public configuration
│   ├── routing/                   # Routing modules
│   │   ├── routing.js            # Main routing logic & API calls
│   │   ├── routingUI.js          # UI event handler setup
│   │   ├── routeState.js         # State management
│   │   ├── routeRecalculator.js  # Central route recalculations
│   │   ├── routeVisualization.js # Route colors & hover
│   │   ├── routeInfoFormatter.js # Route info formatting
│   │   ├── colorSchemes.js       # Color schemes
│   │   ├── customModel.js        # Custom routing model
│   │   ├── gpxExport.js          # GPX export
│   │   ├── waypointOptimizer.js  # Waypoint optimization
│   │   ├── markers/              # Marker management
│   │   │   ├── markerFactory.js  # Marker creation (start, end, waypoints)
│   │   │   └── waypointContextMenu.js # Waypoint context menu
│   │   ├── waypoints/            # Waypoint management
│   │   │   ├── waypointList.js   # Waypoint list UI (drag & drop)
│   │   │   └── waypointManager.js # Waypoint CRUD operations
│   │   ├── coordinates/          # Coordinate management
│   │   │   └── coordinateTooltips.js # Tooltip management
│   │   └── heightgraph/          # Elevation profile modules
│   │       ├── heightgraph.js
│   │       ├── heightgraphCanvas.js
│   │       ├── heightgraphConfig.js
│   │       ├── heightgraphDrawing.js
│   │       ├── heightgraphInteractivity.js
│   │       ├── heightgraphStats.js
│   │       └── heightgraphUtils.js
│   ├── mapdata/                  # Map data sources & layers
│   │   ├── sources.js            # Data source definitions
│   │   ├── basicLayers.js        # Base layers
│   │   ├── bikeLanesLayers.js    # Cycling infrastructure layers
│   │   └── missingStreetsLayers.js # Mapillary Missing Streets layer
│   ├── ui/                       # UI components
│   │   ├── setupBaseLayerControls.js # Basemap controls
│   │   ├── panelPositioning.js   # Panel positioning
│   │   ├── toggleHandlers.js     # Toggle handlers (layers, theme, etc.)
│   │   ├── contextMenu.js        # Main context menu
│   │   ├── contextMenuBase.js    # Context menu base utility
│   │   ├── mapThemeSwitcher.js   # Map theme switching
│   │   └── mapThemeInitializer.js # Map theme initialization
│   └── utils/                    # Utilities
│       ├── permalink.js          # Permalink functionality
│       ├── geocoder.js           # Geocoding
│       └── constants.js          # Constants
└── thumbs/                       # Basemap thumbnails
```

---

## Usage

The application can be opened directly in the browser: [https://vizsim.github.io/missing_mapillary_gh-routing/](https://vizsim.github.io/missing_mapillary_gh-routing/)

The application uses a dedicated GraphHopper instance available at [ghroute.vizsim.de](https://ghroute.vizsim.de).

---

## License

License will be added soon.

---

## Credits

- **MapLibre GL JS**: Open-source map library
- **GraphHopper**: Route calculation
- **OpenStreetMap**: Community-driven map data
- **Mapillary**: Street-level photos and coverage data
- **OSM Verkehrswende**: Mapillary Missing Streets data - [osm-verkehrswende.org](https://www.osm-verkehrswende.org)
- **FixMyCity** / **tilda-geo.de**: Vector tiles for cycling infrastructure - [tilda-geo.de](https://tilda-geo.de)
- **Mapterhorn**: Terrain and hillshade DEM data - [mapterhorn.com](https://mapterhorn.com)
- **Sonny's Terrain Models**: Elevation models (CC BY 4.0) - [sonny.4lima.de](https://sonny.4lima.de)
