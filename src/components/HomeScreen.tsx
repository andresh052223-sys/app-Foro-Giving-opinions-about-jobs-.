import React from 'react';
import { ArrowRight, Play, BookOpen, Monitor, Keyboard, CheckCircle2, MessageSquare, Sparkles, Layers } from 'lucide-react';
import { QUESTION_MODULES, QuestionModule } from '../data/forumData';

interface HomeScreenProps {
  onStartPresentation: () => void;
  onOpenModuleOverview: (moduleId: 1 | 2 | 3 | 4) => void;
  onOpenGrammarOverview: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartPresentation,
  onOpenModuleOverview,
  onOpenGrammarOverview,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-6 md:p-12 lg:p-16">
      {/* Top Header / Bar */}
      <header className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs md:text-sm font-semibold tracking-wider text-sky-800 uppercase">
            PROGRAMA DE FORMACIÓN SENA · BILINGÜISMO EFL
          </span>
          <p className="text-sm text-slate-600 mt-0.5">
            Herramienta didáctica de proyección para el instructor
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGrammarOverview}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-sky-700" />
            <span>Guía de Gramática & Vocabulario</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto w-full my-auto py-8 md:py-12">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          <div className="inline-block px-3 py-1 bg-sky-100 text-sky-900 text-xs md:text-sm font-semibold rounded-md mb-4 tracking-wide">
            EVIDENCIA GA3-240202501-AA1-EV03
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
            GIVING OPINIONS ABOUT JOBS
          </h1>

          <div className="mt-5 space-y-2">
            <p className="text-2xl md:text-3xl font-medium text-sky-900">
              Learn how to express your ideas in English.
            </p>
            <p className="text-xl md:text-2xl text-slate-600 font-normal">
              Aprende a expresar tus ideas en inglés.
            </p>
          </div>

          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Metodología progresiva acumulativa: 4 módulos temáticos, 12 ejemplos independientes y 120 diapositivas en total.
            Observa cómo una frase básica en inglés (nivel A1) se transforma paso a paso en una respuesta completa (nivel A2).
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartPresentation}
              className="inline-flex items-center gap-3 px-8 py-4 bg-sky-900 text-white hover:bg-sky-950 font-bold text-lg md:text-xl rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-98"
            >
              <Play className="w-6 h-6 fill-white" />
              <span>START PRESENTATION</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>

        {/* 4 Main Modules Cards Grid (With 3 Examples and 30 Slides per card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {QUESTION_MODULES.map((module: QuestionModule) => {
            const isModule4 = module.id === 4;
            return (
              <div
                key={module.id}
                onClick={() => onOpenModuleOverview(module.id)}
                className={`group relative bg-white border rounded-2xl p-6 hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer text-left ${
                  isModule4
                    ? 'border-sky-300 ring-2 ring-sky-100 hover:border-sky-600'
                    : 'border-slate-200 hover:border-sky-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md">
                      Módulo {module.number}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                      <span className="font-bold text-slate-900">3 Ejemplos</span>
                      <span>·</span>
                      <span className="font-bold text-sky-900">30 Slides</span>
                    </div>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-900 transition-colors mb-2 leading-snug">
                    {module.id === 4 ? (
                      <>4. REPLYING TO A CLASSMATE'S FORUM POST</>
                    ) : (
                      <>{module.number}. {module.shortTitle.toUpperCase()}</>
                    )}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {module.description}
                  </p>

                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      "{module.questionEn}"
                    </p>
                    <p className="text-[11px] text-slate-500 italic">
                      "{module.questionEs}"
                    </p>
                  </div>

                  {/* 3 Examples Pill summary */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-600">
                    <div className="font-bold text-slate-700">3 Ejemplos incluidos:</div>
                    {module.examples.map((ex) => (
                      <div key={ex.id} className="truncate text-slate-600">
                        • <span className="font-medium text-slate-800">Ex {ex.exampleNumber}:</span> {ex.titleEn}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sky-800 group-hover:text-sky-950 font-semibold text-sm">
                  <span>Ver los 3 Ejemplos</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Banner */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 max-w-5xl mx-auto shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-left">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">120 Diapositivas</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  4 módulos × 3 ejemplos × 10 diapositivas acumulativas independientes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Reinicio Limpio</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Al pasar de un ejemplo a otro, la acumulación se reinicia desde el nivel 1.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Monitor className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Proyección en Aula</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Letras gigantes con audio de pronunciación nativa y traducciones en español.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Keyboard className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Control por Teclado</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Usa [→] [←] o teclas [1] [2] [3] [4] para exponer fluidamente sin tocar el ratón.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
        <p>
          Servicio Nacional de Aprendizaje SENA · Guía de Aprendizaje 3 · Competencia de Inglés A1-A2
        </p>
        <p className="text-slate-600">
          Usa las teclas <kbd className="px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-mono text-[11px]">1</kbd> <kbd className="px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-mono text-[11px]">2</kbd> <kbd className="px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-mono text-[11px]">3</kbd> <kbd className="px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-mono text-[11px]">4</kbd> para navegar
        </p>
      </footer>
    </div>
  );
};
