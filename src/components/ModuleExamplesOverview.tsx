import React from 'react';
import { ArrowLeft, ArrowRight, Play, Layers, CheckCircle, BookOpen } from 'lucide-react';
import { QuestionModule, ModuleExample } from '../data/forumData';

interface ModuleExamplesOverviewProps {
  module: QuestionModule;
  onSelectExample: (exampleId: 1 | 2 | 3) => void;
  onBackToHome: () => void;
  onOpenGrammar: () => void;
}

export const ModuleExamplesOverview: React.FC<ModuleExamplesOverviewProps> = ({
  module,
  onSelectExample,
  onBackToHome,
  onOpenGrammar,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-6 md:p-12 lg:p-16">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Menú Principal</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGrammar}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sky-900 bg-sky-50 border border-sky-200 rounded-xl hover:bg-sky-100 transition-colors shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Gramática & Vocabulario</span>
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-6xl mx-auto w-full my-auto py-8">
        {/* Module Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 bg-sky-100 text-sky-900 text-xs md:text-sm font-semibold rounded-md mb-3 tracking-wide">
            {module.badgeTitle} · 3 EJEMPLOS INDEPENDIENTES · 30 DIAPOSITIVAS
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {module.shortTitle.toUpperCase()}
          </h1>

          <div className="mt-4 space-y-1.5 p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <p className="text-xl md:text-2xl font-bold text-sky-950">
              "{module.questionEn}"
            </p>
            <p className="text-base md:text-lg text-slate-600 italic">
              "{module.questionEs}"
            </p>
          </div>

          <p className="mt-4 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            {module.description} Selecciona un ejemplo específico o comienza la secuencia completa desde el Ejemplo 1.
          </p>

          <div className="mt-6">
            <button
              onClick={() => onSelectExample(1)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-sky-900 text-white hover:bg-sky-950 font-bold text-lg rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-98"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>COMENZAR DESDE EXAMPLE 1</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Example Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {module.examples.map((ex: ModuleExample) => {
            return (
              <div
                key={ex.id}
                onClick={() => onSelectExample(ex.id)}
                className="group relative bg-white border-2 border-slate-200 hover:border-sky-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all cursor-pointer text-left"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <span className="text-xs font-black uppercase tracking-wider text-sky-900 bg-sky-50 px-2.5 py-1 rounded-md">
                      EXAMPLE {ex.exampleNumber} OF 3
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      10 Diapositivas
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-950 transition-colors">
                    {ex.titleEn}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium italic mt-1">
                    {ex.titleEs}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-800">Enfoque: </span>
                    {ex.coreIdea}
                  </div>

                  {/* Preview first & last level */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100 text-xs">
                    <div>
                      <span className="font-bold text-slate-700">Nivel 1: </span>
                      <span className="italic text-slate-900">"{ex.levels[0].english}"</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Nivel 10: </span>
                      <span className="italic text-slate-900 line-clamp-1">"{ex.levels[9].english}"</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sky-900 group-hover:text-sky-950 font-bold text-sm">
                  <span>Abrir Ejemplo {ex.exampleNumber}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
        Cada ejemplo cuenta con 10 diapositivas acumulativas independientes. Al cambiar de ejemplo, la acumulación se reinicia desde el nivel 1.
      </footer>
    </div>
  );
};
