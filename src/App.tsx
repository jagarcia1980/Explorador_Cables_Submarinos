import React, { useState, useRef } from 'react';
import { SUBMARINE_CABLES, SubmarineCable } from './data/cablesData';
import { HISTORY_MILESTONES, HistoryMilestone } from './data/historyMilestones';
import { OceanicMap } from './components/OceanicMap';
import { HistoryTimeline } from './components/HistoryTimeline';
import { CableInspectorModal } from './components/CableInspectorModal';
import { LatencySimulator } from './components/LatencySimulator';
import { CableAnatomyExplorer } from './components/CableAnatomyExplorer';
import { TriviaDeck } from './components/TriviaDeck';
import {
  Globe2,
  History,
  Layers,
  Activity,
  Sparkles,
  Compass,
  Building2,
  Waves,
  Search,
  ExternalLink,
  ChevronRight,
  Shield,
  Anchor
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'history' | 'anatomy' | 'simulator' | 'trivia'>('map');
  const [selectedCable, setSelectedCable] = useState<SubmarineCable | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [highlightedMilestoneCoords, setHighlightedMilestoneCoords] = useState<{
    lat: number;
    lng: number;
    zoom: number;
  } | null>(null);

  // Search & Filter state for the map
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilterRegion, setActiveFilterRegion] = useState<string>('all');
  const [activeFilterOwner, setActiveFilterOwner] = useState<string>('all');
  const [minCapacity, setMinCapacity] = useState<number>(0);

  const mapSectionRef = useRef<HTMLDivElement>(null);

  const handleSelectCable = (cable: SubmarineCable | null) => {
    setSelectedCable(cable);
    if (cable) {
      setIsInspectorOpen(true);
    }
  };

  const handleFocusMilestoneOnMap = (milestone: HistoryMilestone) => {
    setHighlightedMilestoneCoords(milestone.locationFocus);
    setActiveTab('map');
    if (milestone.cableId) {
      const found = SUBMARINE_CABLES.find((c) => c.id === milestone.cableId);
      if (found) {
        setSelectedCable(found);
      }
    }
    // Scroll smoothly to map if not already at top
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCableById = (cableId: string) => {
    const found = SUBMARINE_CABLES.find((c) => c.id === cableId);
    if (found) {
      setSelectedCable(found);
    }
  };

  const handleQuickSearchTag = (term: string) => {
    setSearchQuery(term);
    setActiveTab('map');
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract: 3 Zones (Wordmark, Nav Links, 1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single Text Element Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('map');
          }}
          className="text-lg font-bold tracking-tight text-slate-100 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <Waves className="w-5 h-5 text-cyan-400" />
          <span>¿Cómo funciona Internet?</span>
        </a>

        {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('map')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-200 pb-0.5 border-b-2 ${
              activeTab === 'map' ? 'text-cyan-400 border-cyan-400 font-semibold' : 'border-transparent'
            }`}
          >
            Mapa Interactivo
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-200 pb-0.5 border-b-2 ${
              activeTab === 'history' ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent'
            }`}
          >
            Modo Historia
          </button>
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-200 pb-0.5 border-b-2 ${
              activeTab === 'anatomy' ? 'text-cyan-400 border-cyan-400 font-semibold' : 'border-transparent'
            }`}
          >
            Anatomía del Cable
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-200 pb-0.5 border-b-2 ${
              activeTab === 'simulator' ? 'text-cyan-400 border-cyan-400 font-semibold' : 'border-transparent'
            }`}
          >
            Laboratorio Óptico
          </button>
          <button
            onClick={() => setActiveTab('trivia')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-200 pb-0.5 border-b-2 ${
              activeTab === 'trivia' ? 'text-cyan-400 border-cyan-400 font-semibold' : 'border-transparent'
            }`}
          >
            Bitácora Abisal
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveTab('history');
            }}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-md shadow-amber-950/30"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Iniciar</span> Modo Historia
          </button>
        </div>
      </header>

      {/* Hero Section & Didactic Kicker */}
      <section className="relative px-6 py-8 md:py-10 max-w-7xl mx-auto w-full border-b border-slate-900">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-cyan-400 font-medium font-mono uppercase tracking-wider">
              Infraestructura Submarina Global
            </span>
            <span aria-hidden="true">·</span>
            <span>+1.400.000 km de fibra en el fondo del mar</span>
            <span aria-hidden="true">·</span>
            <span>99% del tráfico intercontinental</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight max-w-4xl text-balance">
            La Red Oculta bajo los Océanos del Planeta
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-3xl leading-relaxed">
            Explora las autopistas de fibra óptica que descansan a 5.000 metros de profundidad uniendo continentes.
            Descubre su capacidad, consorcios propietarios y el periplo histórico de más de 170 años desde el primer telégrafo de gutapercha hasta la nube global.
          </p>
        </div>

        {/* Quick Didactic Pill-Free Filters & Search Suggestions */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="text-slate-500 font-mono">Búsquedas didácticas:</span>
          {[
            { label: 'España (Bilbao)', query: 'España' },
            { label: 'Google (Dunant, Curie, Firmina)', query: 'Google' },
            { label: 'Meta & Microsoft (MAREA)', query: 'MAREA' },
            { label: '2Africa (45.000 km)', query: '2Africa' },
            { label: 'Brasil (EllaLink / Firmina)', query: 'Brasil' },
            { label: 'Japón (FASTER / Topaz)', query: 'Japón' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickSearchTag(item.query)}
              className="hover:text-cyan-300 hover:underline underline-offset-4 transition-colors"
            >
              {item.label}
              {idx < 5 && <span className="ml-2 text-slate-700">/</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Mobile View Tab Switcher */}
        <div className="flex md:hidden overflow-x-auto gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'map' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            Mapa
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'history' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Modo Historia
          </button>
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'anatomy' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            Anatomía
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'simulator' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            Ping Lab
          </button>
          <button
            onClick={() => setActiveTab('trivia')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'trivia' ? 'bg-cyan-600 text-white' : 'text-slate-400'
            }`}
          >
            Curiosidades
          </button>
        </div>

        {/* View 1: Oceanic Interactive Map */}
        {activeTab === 'map' && (
          <div ref={mapSectionRef} className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Haz clic en cualquier cable o estación para inspeccionar su ficha técnica</span>
              </div>
              <div className="hidden sm:block font-mono text-slate-500">
                Arrastra para navegar · Rueda o botones +/- para zoom
              </div>
            </div>

            <OceanicMap
              cables={SUBMARINE_CABLES}
              selectedCable={selectedCable}
              onSelectCable={handleSelectCable}
              highlightedMilestoneCoords={highlightedMilestoneCoords}
              activeFilterRegion={activeFilterRegion}
              onFilterRegionChange={setActiveFilterRegion}
              activeFilterOwner={activeFilterOwner}
              onFilterOwnerChange={setActiveFilterOwner}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              minCapacity={minCapacity}
              onMinCapacityChange={setMinCapacity}
            />

            {/* Quick Cable Strip Showcase */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <h3 className="font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Cables Transoceánicos Destacados
                </h3>
                <span className="text-slate-500">Haz clic para enfocar</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SUBMARINE_CABLES.slice(0, 4).map((cable) => (
                  <button
                    key={cable.id}
                    onClick={() => handleSelectCable(cable)}
                    className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100 text-sm group-hover:text-cyan-300">
                        {cable.name}
                      </span>
                      <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-900/40">
                        {cable.capacityTbps} Tbps
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 truncate">
                      {cable.landingStations.map((s) => s.city).join(' ↔ ')}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">
                      {cable.lengthKm.toLocaleString()} km · {cable.rfsYear}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View 2: Modo Historia (Interactive Milestones Stepper) */}
        {activeTab === 'history' && (
          <HistoryTimeline
            onFocusMilestoneOnMap={handleFocusMilestoneOnMap}
            onSelectCableById={handleSelectCableById}
          />
        )}

        {/* View 3: Cable Anatomy Explorer */}
        {activeTab === 'anatomy' && <CableAnatomyExplorer />}

        {/* View 4: Latency & Speed of Light Simulator */}
        {activeTab === 'simulator' && (
          <LatencySimulator
            initialCable={selectedCable}
            onSelectCable={(cable) => setSelectedCable(cable)}
          />
        )}

        {/* View 5: Trivia & Anecdotes Deck */}
        {activeTab === 'trivia' && <TriviaDeck />}
      </main>

      {/* Cable Detailed Inspector Modal */}
      <CableInspectorModal
        cable={selectedCable}
        onClose={() => {
          setIsInspectorOpen(false);
          setSelectedCable(null);
        }}
        onOpenLatencySimulator={(cable) => {
          setSelectedCable(cable);
          setActiveTab('simulator');
        }}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950 py-8 px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200">AbyssalNet</span>
            <span className="text-slate-600">·</span>
            <span>Explorador Didáctico de Cables Submarinos Transoceánicos</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Fuentes: ICPC, ITU, Telegeography Submarine Cable Archive</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
