import React, { useState } from 'react';
import { HISTORY_MILESTONES, HistoryMilestone } from '../data/historyMilestones';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  History,
  Info,
  Lightbulb,
  ExternalLink,
  Play,
  Pause
} from 'lucide-react';

interface HistoryTimelineProps {
  onFocusMilestoneOnMap: (milestone: HistoryMilestone) => void;
  onSelectCableById?: (cableId: string) => void;
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({
  onFocusMilestoneOnMap,
  onSelectCableById
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeMilestone = HISTORY_MILESTONES[activeIndex];

  // Auto-play timer
  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HISTORY_MILESTONES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev < HISTORY_MILESTONES.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : HISTORY_MILESTONES.length - 1));
  };

  const handleSelectMilestone = (idx: number) => {
    setActiveIndex(idx);
    setIsPlaying(false);
  };

  const handleViewOnMap = () => {
    onFocusMilestoneOnMap(activeMilestone);
    if (activeMilestone.cableId && onSelectCableById) {
      onSelectCableById(activeMilestone.cableId);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <History className="w-4 h-4" />
            <span>MODO HISTORIA: DE LA GUTAPERCHA A LA NUBE DE IA</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-1">
            Cronología de las Comunicaciones Submarinas
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Recorre más de 170 años de hazañas de ingeniería, naufragios, espionaje y revoluciones ópticas.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              isPlaying
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pausar Tour' : 'Auto Tour'}</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
            <button
              onClick={handlePrev}
              className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Hito anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-slate-300 px-2 tabular-nums">
              {activeIndex + 1} / {HISTORY_MILESTONES.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Siguiente hito"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Milestone Stepper Rail */}
      <div className="mt-5 overflow-x-auto pb-3">
        <div className="flex items-center min-w-max gap-2">
          {HISTORY_MILESTONES.map((m, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMilestone(idx)}
                className={`relative px-3.5 py-2 rounded-xl text-left transition-all border shrink-0 ${
                  isActive
                    ? 'bg-cyan-950/60 border-cyan-500/80 shadow-md shadow-cyan-950/50'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-cyan-300' : 'text-slate-400'
                    }`}
                  >
                    {m.year}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </div>
                <div className="text-[11px] font-medium text-slate-200 truncate max-w-[140px] mt-0.5">
                  {m.title.split(':')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Milestone Content Stage */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Asset & Metric Box */}
        <div className="lg:col-span-5 space-y-4">
          {activeMilestone.image && (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-lg group bg-slate-950">
              <img
                src={activeMilestone.image}
                alt={activeMilestone.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 flex items-center justify-between">
                <span className="font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-900/50">
                  {activeMilestone.eraLabel}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {activeMilestone.locationFocus.regionName}
                </span>
              </div>
            </div>
          )}

          {/* Headline Metric Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                Métrica Clave del Hito
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono tracking-tight tabular-nums mt-0.5">
                {activeMilestone.headlineMetric.value}
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                {activeMilestone.headlineMetric.label}
              </div>
            </div>

            <button
              onClick={handleViewOnMap}
              className="px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Centrar y ver trazado geográfico en el mapa interactivo"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Ver en Mapa</span>
            </button>
          </div>

          {/* Curious Fact Callout */}
          <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4 text-xs text-amber-200/90 flex gap-3">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-300 block mb-1">Dato Curioso:</span>
              <p className="leading-relaxed">{activeMilestone.curiousFact}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative, Engineering Breakthroughs & Historical Anecdote */}
        <div className="lg:col-span-7 space-y-4">
          {/* Title & Subtitle */}
          <div>
            <div className="text-xs font-mono text-cyan-400 flex items-center gap-2">
              <span>HITO {activeIndex + 1} DE {HISTORY_MILESTONES.length}</span>
              <span>·</span>
              <span>AÑO {activeMilestone.year}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 mt-1 leading-snug">
              {activeMilestone.title}
            </h3>
            <p className="text-sm text-slate-300 mt-1 font-medium">
              {activeMilestone.subtitle}
            </p>
          </div>

          {/* Main Historical Narrative */}
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
            {activeMilestone.narrative}
          </p>

          {/* Breakthrough Details List */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Avances Técnicos y Logísticos:
            </h4>
            <div className="space-y-2">
              {activeMilestone.breakthroughDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/30 p-2.5 rounded-lg border border-slate-800/50"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Anecdote Spotlight */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ANÉCDOTA HISTÓRICA: {activeMilestone.anecdoteTitle}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{activeMilestone.anecdoteBody}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
