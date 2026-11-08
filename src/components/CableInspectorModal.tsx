import React from 'react';
import { SubmarineCable } from '../data/cablesData';
import {
  X,
  Radio,
  Building2,
  Cpu,
  Waves,
  Zap,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';

interface CableInspectorModalProps {
  cable: SubmarineCable | null;
  onClose: () => void;
  onOpenLatencySimulator?: (cable: SubmarineCable) => void;
}

export const CableInspectorModal: React.FC<CableInspectorModalProps> = ({
  cable,
  onClose,
  onOpenLatencySimulator
}) => {
  if (!cable) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0"
              style={{ backgroundColor: cable.color }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-100">{cable.name}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {cable.rfsYear}
                </span>
                {cable.isHistorical && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    Histórico
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {cable.regionLabel} · {cable.lengthKm.toLocaleString()} km de longitud submarina
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Cerrar ficha técnica"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Summary description */}
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
            {cable.summary}
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-mono uppercase">Capacidad Diseño</div>
              <div className="text-lg font-bold text-cyan-400 font-mono mt-1 tabular-nums">
                {cable.isHistorical ? 'Telegrafía' : `${cable.capacityTbps} Tbps`}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {cable.fiberPairs > 0 ? `${cable.fiberPairs} pares de fibra` : 'Conductor metálico'}
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-mono uppercase">Profundidad Máx.</div>
              <div className="text-lg font-bold text-slate-200 font-mono mt-1 tabular-nums">
                {cable.maxDepthMeters.toLocaleString()} m
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Fondo oceánico abisal</div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-mono uppercase">Repetidores Ópticos</div>
              <div className="text-lg font-bold text-purple-400 font-mono mt-1 tabular-nums">
                ~{cable.repeatersEstimate}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Amplificadores EDFA</div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] text-slate-400 font-mono uppercase">Tensión Alimentación</div>
              <div className="text-lg font-bold text-amber-400 font-mono mt-1 tabular-nums">
                {cable.voltageFeedDC}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Retorno por agua de mar</div>
            </div>
          </div>

          {/* Owners and Consortium breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Compañías y Consorcio Propietario</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {cable.ownerList.map((owner, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-950 border border-slate-800 text-slate-200"
                >
                  {owner}
                </span>
              ))}
            </div>
          </div>

          {/* Technology Details */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Arquitectura y Tecnología Óptica</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {cable.technology}
            </p>
          </div>

          {/* Didactic Highlights */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Datos Clave y Relevancia Didáctica</span>
            </h4>
            <div className="space-y-2">
              {cable.didacticHighlights.map((fact, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{fact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Landing Stations List */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Estaciones de Amarre ({cable.landingStations.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cable.landingStations.map((station, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-lg flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-200">{station.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {station.city}, {station.country}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 tabular-nums">
                    {station.lat.toFixed(1)}°, {station.lng.toFixed(1)}°
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {cable.isHistorical
              ? 'Cable retirado / de interés histórico'
              : 'En servicio activo continuo'}
          </div>

          <div className="flex items-center gap-2">
            {onOpenLatencySimulator && !cable.isHistorical && (
              <button
                onClick={() => {
                  onClose();
                  onOpenLatencySimulator(cable);
                }}
                className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Simular Ping Óptico</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
