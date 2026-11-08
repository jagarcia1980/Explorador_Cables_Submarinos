import React, { useState } from 'react';
import { CABLE_LAYERS, CableLayer } from '../data/cableAnatomy';
import {
  Layers,
  Sparkles,
  Shield,
  Eye,
  Info,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export const CableAnatomyExplorer: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<CableLayer>(CABLE_LAYERS[0]);
  const [cableType, setCableType] = useState<'deep_sea' | 'armored_shallow'>('deep_sea');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Layers className="w-4 h-4" />
            <span>ANATOMÍA DEL CABLE: CIENCIA DE MATERIALES BAJO PRESIÓN ABISAL</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-1">
            Diseño por Capas de un Cable Submarino
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Explora las 8 capas concéntricas que protegen el vidrio óptico a 800 atmósferas de presión y 15.000 voltios.
          </p>
        </div>

        {/* Cable type toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setCableType('deep_sea')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              cableType === 'deep_sea'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Aguas Profundas (~17-21 mm)
          </button>
          <button
            onClick={() => setCableType('armored_shallow')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              cableType === 'armored_shallow'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Acorazado Costero (~50 mm)
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Diagram & Cross-Section */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-lg bg-slate-950">
            <img
              src="/src/assets/images/submarine_cable_cross_section_1793877435888.jpg"
              alt="Corte transversal de cable submarino"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-xs flex items-center justify-between">
              <span className="font-mono text-cyan-300 bg-slate-950/90 px-2.5 py-1 rounded border border-cyan-800/60 text-[11px]">
                {cableType === 'deep_sea'
                  ? 'Cable Ligero para Aguas Profundas (>1.500m)'
                  : 'Doble Armadura Pesada contra Anclas (<1.000m)'}
              </span>
            </div>
          </div>

          {/* Quick didactic note */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
            <span className="font-semibold text-slate-200 block">
              {cableType === 'deep_sea'
                ? '¿Sabías que en el fondo del mar es tan delgado como una manguera?'
                : '¿Por qué cerca de la costa es cinco veces más grueso y pesado?'}
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {cableType === 'deep_sea'
                ? 'En el abismo a 5.000 metros no hay corrientes fuertes ni barcos. El cable solo necesita aislarse eléctricamente y resistir la presión. Pesa unos 1,5 kg por metro.'
                : 'En la plataforma continental, las anclas de cargueros de 200.000 toneladas y las redes de arrastre de los barcos de pesca destrozarían un cable fino. Se agregan dos capas masivas de alambre de acero de 4 mm, pesando más de 5 a 8 kg por metro.'}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Layers List & Selected Layer Details */}
        <div className="lg:col-span-7 space-y-4">
          {/* Layer Selector Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CABLE_LAYERS.map((layer) => {
              const isSelected = selectedLayer.id === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-500 shadow-md'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      #{layer.number}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: layer.colorHex }}
                    />
                  </div>
                  <div className="text-[11px] font-medium text-slate-200 mt-1 line-clamp-1">
                    {layer.name.split(' ')[0]} {layer.name.split(' ')[1] || ''}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Layer Expanded Technical Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  Capa {selectedLayer.number} de 8
                </span>
                <h3 className="text-base md:text-lg font-bold text-slate-100 mt-0.5">
                  {selectedLayer.name}
                </h3>
              </div>
              <span
                className="w-4 h-4 rounded-full border border-slate-700 shadow-sm"
                style={{ backgroundColor: selectedLayer.colorHex }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 block text-[11px] font-mono uppercase">
                  Material de Fabricación:
                </span>
                <span className="font-semibold text-slate-200 mt-0.5 block">
                  {selectedLayer.material}
                </span>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 block text-[11px] font-mono uppercase">
                  Especificación de Resistencia:
                </span>
                <span className="font-semibold text-cyan-300 font-mono mt-0.5 block">
                  {selectedLayer.thicknessOrSpec}
                </span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px] font-mono uppercase mb-1">
                Propósito Funcional en el Fondo Oceánico:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
                {selectedLayer.purpose}
              </p>
            </div>

            {/* Fun Fact / Curiosity Callout */}
            <div className="bg-amber-950/20 border border-amber-800/40 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300 block mb-0.5">
                  Curiosidad de Ingeniería:
                </span>
                <span className="leading-relaxed">{selectedLayer.curiosity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
