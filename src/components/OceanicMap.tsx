import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import { SubmarineCable, LandingStation } from '../data/cablesData';
import {
  Search,
  Globe2,
  Building2,
  X,
  Compass,
  MapPin,
  Maximize2,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface OceanicMapProps {
  cables: SubmarineCable[];
  selectedCable: SubmarineCable | null;
  onSelectCable: (cable: SubmarineCable | null) => void;
  highlightedMilestoneCoords?: { lat: number; lng: number; zoom: number } | null;
  activeFilterRegion: string;
  onFilterRegionChange: (region: string) => void;
  activeFilterOwner: string;
  onFilterOwnerChange: (owner: string) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  minCapacity: number;
  onMinCapacityChange: (cap: number) => void;
}

// OpenStreetMap visual themes (All use official free OpenStreetMap tiles, zero API keys needed)
const OSM_THEMES = {
  dark: {
    id: 'dark',
    name: 'OpenStreetMap Océano Oscuro (Filtro Táctico)',
    className: 'theme-osm-dark'
  },
  standard: {
    id: 'standard',
    name: 'OpenStreetMap Estándar (Color Natural)',
    className: 'theme-osm-standard'
  },
  contrast: {
    id: 'contrast',
    name: 'OpenStreetMap Alto Contraste Abisal',
    className: 'theme-osm-contrast'
  }
};

type OsmThemeKey = keyof typeof OSM_THEMES;

export const OceanicMap: React.FC<OceanicMapProps> = ({
  cables,
  selectedCable,
  onSelectCable,
  highlightedMilestoneCoords,
  activeFilterRegion,
  onFilterRegionChange,
  activeFilterOwner,
  onFilterOwnerChange,
  searchQuery,
  onSearchQueryChange,
  minCapacity,
  onMinCapacityChange
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.FeatureGroup | null>(null);

  const [activeThemeKey, setActiveThemeKey] = useState<OsmThemeKey>('dark');
  const [showLandingStations, setShowLandingStations] = useState<boolean>(true);

  // Filter cables
  const filteredCables = useMemo(() => {
    return cables.filter((cable) => {
      // Region filter
      if (activeFilterRegion !== 'all' && cable.region !== activeFilterRegion) {
        return false;
      }

      // Owner filter
      if (activeFilterOwner !== 'all') {
        if (activeFilterOwner === 'hyperscalers' && cable.ownerCategory !== 'hyperscalers') return false;
        if (activeFilterOwner === 'consortium' && cable.ownerCategory !== 'consortium') return false;
        if (activeFilterOwner === 'historical' && !cable.isHistorical) return false;
      }

      // Capacity filter
      if (!cable.isHistorical && cable.capacityTbps < minCapacity) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = cable.name.toLowerCase().includes(query);
        const matchesOwner = cable.ownerList.some((o) => o.toLowerCase().includes(query));
        const matchesStation = cable.landingStations.some(
          (s) => s.city.toLowerCase().includes(query) || s.country.toLowerCase().includes(query)
        );
        const matchesRegion = cable.regionLabel.toLowerCase().includes(query);

        if (!matchesName && !matchesOwner && !matchesStation && !matchesRegion) {
          return false;
        }
      }

      return true;
    });
  }, [cables, activeFilterRegion, activeFilterOwner, minCapacity, searchQuery]);

  // 1. Initialize Leaflet Map with OpenStreetMap (Same as user's working pattern)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // World view centered over Atlantic by default
      const map = L.map(mapContainerRef.current, {
        center: [25, -25],
        zoom: 2.2,
        minZoom: 1.5,
        maxZoom: 19,
        zoomControl: false,
        attributionControl: true,
        worldCopyJump: true
      });

      // Official Free OpenStreetMap TileLayer (Zero API keys required)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Group for cable polylines and landing stations
      const featureGroup = L.featureGroup().addTo(map);
      layersGroupRef.current = featureGroup;

      mapInstanceRef.current = map;

      // Ensure tiles render immediately after mounting
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 3. Render Cable Polylines and Landing Stations on the Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = layersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    filteredCables.forEach((cable) => {
      const isSelected = selectedCable?.id === cable.id;
      const isHist = cable.isHistorical;
      const color = cable.color || '#38bdf8';

      // Splitting routes that cross the Pacific Antimeridian (e.g. lng +140 to -120)
      const segments: L.LatLngExpression[][] = [];
      let currentSegment: L.LatLngExpression[] = [];

      for (let i = 0; i < cable.route.length; i++) {
        const pt = cable.route[i];
        if (i > 0) {
          const prev = cable.route[i - 1];
          // If jump is greater than 180 degrees longitude, break segment
          if (Math.abs(pt[1] - prev[1]) > 180) {
            if (currentSegment.length > 0) segments.push(currentSegment);
            currentSegment = [];
          }
        }
        currentSegment.push([pt[0], pt[1]]);
      }
      if (currentSegment.length > 0) segments.push(currentSegment);

      // Underglow for selected or hovered cable
      if (isSelected) {
        segments.forEach((seg) => {
          const glowLine = L.polyline(seg, {
            color: color,
            weight: 10,
            opacity: 0.35,
            lineCap: 'round',
            lineJoin: 'round'
          });
          group.addLayer(glowLine);
        });
      }

      // Main Cable Polyline
      segments.forEach((seg) => {
        const polyline = L.polyline(seg, {
          color: color,
          weight: isSelected ? 4.5 : isHist ? 2.5 : 3.0,
          opacity: isSelected ? 1.0 : isHist ? 0.75 : 0.85,
          dashArray: isHist ? '8, 8' : isSelected ? '12, 12' : undefined,
          className: isSelected ? 'animated-cable-flow' : undefined,
          lineCap: 'round',
          lineJoin: 'round'
        });

        // Hover popup & click handler
        polyline.on('click', () => {
          onSelectCable(cable);
        });

        // Rich didactic popup
        const popupContent = `
          <div class="text-xs font-sans">
            <div class="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-700">
              <span class="font-bold text-slate-100 text-sm">${cable.name}</span>
              <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold">${cable.rfsYear}</span>
            </div>
            <div class="mt-2 text-slate-300 text-[11px] space-y-1">
              <div><strong class="text-slate-400">Región:</strong> ${cable.regionLabel}</div>
              <div><strong class="text-slate-400">Longitud:</strong> ${cable.lengthKm.toLocaleString()} km</div>
              <div><strong class="text-slate-400">Capacidad:</strong> ${cable.isHistorical ? 'Telegrafía' : `${cable.capacityTbps} Tbps`}</div>
              <div><strong class="text-slate-400">Propietarios:</strong> ${cable.ownerList.slice(0, 2).join(', ')}${cable.ownerList.length > 2 ? '...' : ''}</div>
            </div>
            <div class="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-cyan-400 font-medium">
              Haz clic para abrir ficha técnica y anatomía
            </div>
          </div>
        `;

        polyline.bindPopup(popupContent, {
          closeButton: true,
          autoPan: true
        });

        group.addLayer(polyline);
      });

      // Landing Stations Markers
      if (showLandingStations) {
        cable.landingStations.forEach((station) => {
          const isSelectedCableStation = isSelected;

          const markerHtml = `
            <div class="relative flex items-center justify-center cursor-pointer group">
              ${
                isSelectedCableStation
                  ? `<div class="absolute w-6 h-6 rounded-full border border-cyan-400 station-pulse-ring" style="border-color: ${color}"></div>`
                  : ''
              }
              <div class="w-3 h-3 rounded-full border border-slate-950 shadow-md transition-transform group-hover:scale-125" style="background-color: ${
                isSelectedCableStation ? '#ffffff' : color
              }"></div>
            </div>
          `;

          const stationIcon = L.divIcon({
            html: markerHtml,
            className: 'custom-station-icon',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });

          const marker = L.marker([station.lat, station.lng], { icon: stationIcon });

          marker.bindTooltip(
            `<strong>${station.name}</strong><br/><span style="color:#94a3b8">${station.city}, ${station.country} (${cable.name})</span>`,
            {
              direction: 'top',
              offset: [0, -10],
              className: 'station-tooltip'
            }
          );

          marker.on('click', () => {
            onSelectCable(cable);
          });

          group.addLayer(marker);
        });
      }
    });
  }, [filteredCables, selectedCable, showLandingStations, onSelectCable]);

  // 4. Milestone Focus (Smooth Camera Flight)
  useEffect(() => {
    if (!mapInstanceRef.current || !highlightedMilestoneCoords) return;

    mapInstanceRef.current.flyTo(
      [highlightedMilestoneCoords.lat, highlightedMilestoneCoords.lng],
      highlightedMilestoneCoords.zoom || 3.5,
      {
        duration: 1.8,
        easeLinearity: 0.25
      }
    );
  }, [highlightedMilestoneCoords]);

  // Zoom handlers
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetView = () => {
    mapInstanceRef.current?.flyTo([25, -20], 2.2, { duration: 1.2 });
  };

  return (
    <div className="relative w-full h-[620px] lg:h-[720px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col select-none">
      {/* Top Search, Map Style & Filter Bar */}
      <div className="z-20 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Buscar por cable, país (ej. España, Japón) o empresa..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-950/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchQueryChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              title="Borrar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Theme & Layer Selectors */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Base Map OpenStreetMap Theme Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={activeThemeKey}
              onChange={(e) => setActiveThemeKey(e.target.value as OsmThemeKey)}
              aria-label="Estilo visual OpenStreetMap"
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              {Object.entries(OSM_THEMES).map(([key, item]) => (
                <option key={key} value={key} className="bg-slate-900 text-slate-200">
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region selector */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={activeFilterRegion}
              onChange={(e) => onFilterRegionChange(e.target.value)}
              aria-label="Filtrar por región oceánica"
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">Todos los Océanos</option>
              <option value="transatlantic" className="bg-slate-900">Transatlántico</option>
              <option value="transpacific" className="bg-slate-900">Transpacífico</option>
              <option value="pan_american" className="bg-slate-900">Panamericano</option>
              <option value="mediterranean_redsea" className="bg-slate-900">Eurasia & Mar Rojo</option>
              <option value="circumnav" className="bg-slate-900">Circunnavegación África</option>
              <option value="historical" className="bg-slate-900">Rutas Históricas</option>
            </select>
          </div>

          {/* Owner selector */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800">
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={activeFilterOwner}
              onChange={(e) => onFilterOwnerChange(e.target.value)}
              aria-label="Filtrar por propietario o consorcio"
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">Todos los Propietarios</option>
              <option value="hyperscalers" className="bg-slate-900">Big Tech (Google, Meta, MS)</option>
              <option value="consortium" className="bg-slate-900">Consorcios Telecom</option>
              <option value="historical" className="bg-slate-900">Pioneros Históricos</option>
            </select>
          </div>

          {/* Capacity Slider */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
            <span className="text-[11px] text-slate-400">Capacidad:</span>
            <input
              type="range"
              min="0"
              max="200"
              step="25"
              value={minCapacity}
              onChange={(e) => onMinCapacityChange(Number(e.target.value))}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              title={`Mostrar cables con al menos ${minCapacity} Tbps`}
            />
            <span className="font-mono text-[11px] text-cyan-300 tabular-nums">
              {minCapacity > 0 ? `≥${minCapacity}Tbps` : 'Todos'}
            </span>
          </div>

          {/* Landing Stations Toggle */}
          <button
            onClick={() => setShowLandingStations(!showLandingStations)}
            className={`px-2 py-1 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
              showLandingStations
                ? 'bg-cyan-950/60 border-cyan-800/80 text-cyan-300'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Mostrar u ocultar balizas de estaciones de amarre costeras"
          >
            <MapPin className="w-3 h-3" />
            <span className="hidden md:inline">Estaciones</span>
          </button>
        </div>
      </div>

      {/* Leaflet Real OpenStreetMap Container with Tactical Ocean Theme */}
      <div className={`relative flex-1 w-full h-full overflow-hidden ${OSM_THEMES[activeThemeKey].className}`}>
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Selected Cable Quick Floating Badge */}
        {selectedCable && (
          <div className="absolute top-4 left-4 z-20 pointer-events-auto bg-slate-900/95 border border-cyan-500/50 p-3.5 rounded-xl shadow-2xl backdrop-blur-md max-w-sm animate-in fade-in duration-200">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: selectedCable.color }}
                />
                <span className="font-bold text-slate-100 text-sm">{selectedCable.name}</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                {selectedCable.rfsYear}
              </span>
            </div>

            <div className="mt-1 text-xs text-slate-300">
              {selectedCable.regionLabel} · {selectedCable.lengthKm.toLocaleString()} km
            </div>

            <div className="mt-1 text-xs text-slate-400">
              <span className="text-slate-500">Capacidad: </span>
              {selectedCable.isHistorical ? 'Histórico' : `${selectedCable.capacityTbps} Tbps`}
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                {selectedCable.ownerList.join(', ')}
              </div>
              <button
                onClick={() => onSelectCable(selectedCable)}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Ver Ficha
              </button>
            </div>
          </div>
        )}

        {/* Floating Map Zoom and Navigation Controls */}
        <div className="absolute right-4 bottom-4 z-20 flex flex-col items-center gap-1.5 bg-slate-900/95 p-1.5 rounded-xl border border-slate-800 shadow-2xl backdrop-blur-md">
          <button
            onClick={handleZoomIn}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Acercar mapa (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Alejar mapa (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-4 h-px bg-slate-800 my-0.5" />
          <button
            onClick={handleResetView}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Restablecer vista centrada"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Map Information Tag */}
        <div className="absolute left-4 bottom-4 z-20 hidden md:flex items-center gap-2 bg-slate-950/85 px-3 py-1.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 backdrop-blur-sm">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            {OSM_THEMES[activeThemeKey].name} · {filteredCables.length} cables transoceánicos
          </span>
        </div>
      </div>
    </div>
  );
};
