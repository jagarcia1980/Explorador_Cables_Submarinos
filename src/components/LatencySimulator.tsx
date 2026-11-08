import React, { useState } from 'react';
import { SubmarineCable, SUBMARINE_CABLES } from '../data/cablesData';
import {
  calculateOpticalPropagationDelayMs,
  calculateHaversineDistanceKm,
  SPEED_OF_LIGHT_FIBER_KM_S,
  SPEED_OF_LIGHT_VACUUM_KM_S
} from '../utils/geoProjection';
import {
  Activity,
  Zap,
  Play,
  RotateCcw,
  Radio,
  ArrowRight,
  Info,
  Server,
  Layers,
  Sparkles
} from 'lucide-react';

interface LatencySimulatorProps {
  initialCable?: SubmarineCable | null;
  onSelectCable?: (cable: SubmarineCable) => void;
}

export const LatencySimulator: React.FC<LatencySimulatorProps> = ({
  initialCable,
  onSelectCable
}) => {
  const activeCables = SUBMARINE_CABLES.filter((c) => !c.isHistorical);

  const [selectedCableId, setSelectedCableId] = useState<string>(
    initialCable?.id || 'marea'
  );
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingProgress, setPingProgress] = useState<number>(0);
  const [pingResult, setPingResult] = useState<{
    oneWayMs: number;
    rttMs: number;
    repeaters: number;
    geoDelayMs: number;
    starlinkDelayMs: number;
  } | null>(null);

  const currentCable = activeCables.find((c) => c.id === selectedCableId) || activeCables[0];

  const handleSimulatePing = () => {
    setIsPinging(true);
    setPingProgress(0);

    const metrics = calculateOpticalPropagationDelayMs(currentCable.lengthKm);

    // Theoretical Geo satellite delay (~35,786 km altitude x 4 hops = ~560 ms)
    const geoDelayMs = 540 + Math.floor(currentCable.lengthKm * 0.015);
    // Theoretical LEO constellation delay (~550 km altitude + cross-links)
    const starlinkDelayMs = Number((metrics.rttMs * 0.85 + 18).toFixed(1));

    // Animate the ping progress
    const startTime = performance.now();
    const duration = 1200; // ms for visual feel

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setPingProgress(progress);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setIsPinging(false);
        setPingResult({
          oneWayMs: metrics.oneWayMs,
          rttMs: metrics.rttMs,
          repeaters: currentCable.repeatersEstimate || metrics.repeatersEstimate,
          geoDelayMs,
          starlinkDelayMs
        });
      }
    };

    requestAnimationFrame(step);
  };

  React.useEffect(() => {
    // Reset ping result when cable changes
    setPingResult(null);
    setPingProgress(0);
    if (initialCable) {
      setSelectedCableId(initialCable.id);
    }
  }, [initialCable, selectedCableId]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Activity className="w-4 h-4" />
            <span>LABORATORIO ÓPTICO: FÍSICA DE PROPAGACIÓN Y LATENCIA</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-1">
            Simulador de Ping y Velocidad de la Luz en Sílice
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Calcula el retardo físico insalvable de los fotones ($n \approx 1,468$) y compara el cable submarino con satélites.
          </p>
        </div>

        {/* Cable selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">Cable a evaluar:</label>
          <select
            value={selectedCableId}
            onChange={(e) => {
              setSelectedCableId(e.target.value);
              const found = activeCables.find((c) => c.id === e.target.value);
              if (found && onSelectCable) onSelectCable(found);
            }}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            {activeCables.map((cable) => (
              <option key={cable.id} value={cable.id}>
                {cable.name} ({cable.lengthKm.toLocaleString()} km - {cable.regionLabel})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cable Route Stage */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: currentCable.color }}
            />
            <span className="font-bold text-slate-100 text-sm">{currentCable.name}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{currentCable.regionLabel}</span>
          </div>
          <div className="font-mono text-cyan-400">
            {currentCable.lengthKm.toLocaleString()} km submarinos
          </div>
        </div>

        {/* Stations Endpoints */}
        <div className="flex items-center justify-between text-xs bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <div>
              <div className="font-bold text-slate-200">
                {currentCable.landingStations[0]?.name || 'Origen'}
              </div>
              <div className="text-[11px] text-slate-400">
                {currentCable.landingStations[0]?.city},{' '}
                {currentCable.landingStations[0]?.country}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center px-4">
            <span className="text-[10px] text-slate-500 font-mono">
              ~{currentCable.repeatersEstimate} Repetidores EDFA
            </span>
            <div className="w-24 md:w-36 h-0.5 bg-cyan-500/30 my-1 relative">
              {isPinging && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-cyan-400 rounded-full transition-all duration-75"
                  style={{ width: `${pingProgress}%` }}
                />
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              v = 204.190 km/s
            </span>
          </div>

          <div className="flex items-center gap-2 text-right">
            <div>
              <div className="font-bold text-slate-200">
                {currentCable.landingStations[currentCable.landingStations.length - 1]?.name || 'Destino'}
              </div>
              <div className="text-[11px] text-slate-400">
                {currentCable.landingStations[currentCable.landingStations.length - 1]?.city},{' '}
                {currentCable.landingStations[currentCable.landingStations.length - 1]?.country}
              </div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-400">
            Frecuencia de luz láser infrarroja: <span className="font-mono text-slate-300">1.550 nm</span> (Banda C/L)
          </div>

          <button
            onClick={handleSimulatePing}
            disabled={isPinging}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-cyan-900/30 transition-all cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
            <span>{isPinging ? `Transmitiendo fotones (${pingProgress}%)...` : 'Disparar Ping Óptico'}</span>
          </button>
        </div>
      </div>

      {/* Simulation Results Comparison */}
      {pingResult && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Resultados de Propagación Física y Comparativa de Tecnologías</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cable Submarino */}
            <div className="bg-slate-950 border-2 border-cyan-500/60 rounded-xl p-4 relative overflow-hidden">
              <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
                Cable Submarino ({currentCable.name})
              </div>
              <div className="text-3xl font-black text-slate-100 font-mono mt-1 tabular-nums">
                {pingResult.rttMs} <span className="text-base font-normal text-slate-400">ms RTT</span>
              </div>
              <div className="text-xs text-slate-300 mt-2 space-y-1">
                <div>· Un sentido: <span className="font-mono text-cyan-300">{pingResult.oneWayMs} ms</span></div>
                <div>· Repetidores EDFA: <span className="font-mono text-slate-200">{pingResult.repeaters} saltos</span></div>
                <div>· Capacidad: <span className="font-mono text-emerald-400">{currentCable.capacityTbps} Tbps</span></div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-cyan-300 font-medium">
                ✓ Máxima velocidad, nula interferencia atmosférica
              </div>
            </div>

            {/* Satélite LEO (Starlink / Kuiper) */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] font-mono text-slate-400 font-semibold uppercase">
                Satélite LEO (Órbita Baja ~550 km)
              </div>
              <div className="text-3xl font-black text-slate-300 font-mono mt-1 tabular-nums">
                ~{pingResult.starlinkDelayMs} <span className="text-base font-normal text-slate-500">ms RTT</span>
              </div>
              <div className="text-xs text-slate-400 mt-2 space-y-1">
                <div>· Luz en el vacío: <span className="font-mono text-slate-300">~300.000 km/s</span></div>
                <div>· Saltos intersatelitales láser + gateway de tierra</div>
                <div>· Capacidad de red: <span className="font-mono text-amber-400">Limitada por espectro RF</span></div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                Adecuado para zonas remotas o rurales aisladas
              </div>
            </div>

            {/* Satélite Geoestacionario GEO */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] font-mono text-red-400 font-semibold uppercase">
                Satélite GEO (Geoestacionario 35.786 km)
              </div>
              <div className="text-3xl font-black text-slate-300 font-mono mt-1 tabular-nums">
                ~{pingResult.geoDelayMs} <span className="text-base font-normal text-slate-500">ms RTT</span>
              </div>
              <div className="text-xs text-slate-400 mt-2 space-y-1">
                <div>· Trayecto orbital: <span className="font-mono text-slate-300">&gt;72.000 km</span></div>
                <div>· Retardo intolerable para voz interactiva o gaming</div>
                <div>· Afectado por tormentas y atenuación por lluvia</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-red-400 font-medium">
                ✗ Retardo masivo (~medio segundo)
              </div>
            </div>
          </div>

          {/* Didactic Physics Formula Note */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 space-y-2">
            <span className="font-semibold text-cyan-300 font-mono block">
              La Ecuación Fundamental del Retardo Óptico Submarino:
            </span>
            <p className="font-mono text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800">
              v_vidrio = c / n = 299.792 km/s / 1,4682 ≈ 204.190 km/s
              <br />
              Latencia física base = (Distancia km × 1,15 factor curvatura) / 204.190 km/s
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Incluso con computadoras infinitamente rápidas y sin congestión de paquetes, la velocidad de la luz en el vidrio impone un límite inquebrantable impuesto por las leyes de la física.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
