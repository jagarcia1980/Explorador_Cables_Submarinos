import React, { useState } from 'react';
import { TRIVIA_ITEMS, TriviaItem } from '../data/triviaFacts';
import {
  Sparkles,
  Zap,
  ShieldAlert,
  Anchor,
  Radio,
  Eye,
  Cpu,
  Waves,
  ChevronRight,
  BookOpen,
  X
} from 'lucide-react';

export const TriviaDeck: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeStory, setActiveStory] = useState<TriviaItem | null>(null);

  const categories = [
    { id: 'all', label: 'Todas las Curiosidades' },
    { id: 'myth_busting', label: 'Mitos vs Realidad' },
    { id: 'engineering', label: 'Ingeniería Naval & Alta Tensión' },
    { id: 'espionage', label: 'Guerra Fría & Espionaje' },
    { id: 'physics', label: 'Física de la Luz' },
    { id: 'anecdote', label: 'Historia y Materiales' }
  ];

  const filteredItems = TRIVIA_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4 text-red-400" />;
      case 'Anchor':
        return <Anchor className="w-4 h-4 text-cyan-400" />;
      case 'Radio':
        return <Radio className="w-4 h-4 text-emerald-400" />;
      case 'Eye':
        return <Eye className="w-4 h-4 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-blue-400" />;
      case 'Waves':
      default:
        return <Waves className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>ANÉCDOTAS, MITOS Y DATOS CURIOSOS</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-1">
            Secretos Ocultos en el Fondo del Océano
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Descubre por qué internet no va por satélite, la verdad sobre los tiburones y el espionaje de submarinos nucleares.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              selectedCategory === cat.id
                ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveStory(item)}
            className="group cursor-pointer bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  {item.categoryLabel}
                </span>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  {getIcon(item.iconName)}
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                {item.shortSnippet}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-300 font-medium">
              <span>Leer historia completa</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Story Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  {getIcon(activeStory.iconName)}
                </span>
                <div>
                  <div className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">
                    {activeStory.categoryLabel}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">{activeStory.title}</h3>
                </div>
              </div>

              <button
                onClick={() => setActiveStory(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {activeStory.image && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-md">
                  <img
                    src={activeStory.image}
                    alt={activeStory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* Full text with formatted paragraphs */}
              <div className="text-xs md:text-sm text-slate-300 space-y-3 leading-relaxed whitespace-pre-line bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                {activeStory.fullStory}
              </div>

              {/* Takeaway Box */}
              <div className="bg-cyan-950/30 border border-cyan-800/50 p-4 rounded-xl flex items-start gap-3 text-xs text-cyan-200">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-cyan-300 block mb-0.5">Conclusión Clave:</span>
                  <span>{activeStory.takeaway}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex justify-end">
              <button
                onClick={() => setActiveStory(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
