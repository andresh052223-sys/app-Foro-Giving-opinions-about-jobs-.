import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  RotateCcw,
  BookOpen,
  Volume2,
  Maximize,
  Minimize,
  ArrowRight,
  ArrowLeft,
  Check,
  Info,
  Layers,
  MessageSquare,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { QuestionModule, ModuleExample, ForumLevel, QUESTION_MODULES } from '../data/forumData';
import { speakText, stopSpeaking } from '../utils/speech';
import { DifferentWaysToReply } from './DifferentWaysToReply';
import { BuildYourReply } from './BuildYourReply';

interface SlideViewerProps {
  currentModule: QuestionModule;
  currentExampleId: 1 | 2 | 3;
  currentSlide: number; // 1 to 10
  onSlideChange: (slide: number) => void;
  onExampleChange: (exampleId: 1 | 2 | 3) => void;
  onSelectModule: (moduleId: 1 | 2 | 3 | 4) => void;
  onHomeRequest: () => void;
  onOpenGrammar: () => void;
}

export type FontSizeScale = 'standard' | 'large' | 'giant';
export type Module4SubView = 'slides' | 'ways_to_reply' | 'build_reply';

export const SlideViewer: React.FC<SlideViewerProps> = ({
  currentModule,
  currentExampleId,
  currentSlide,
  onSlideChange,
  onExampleChange,
  onSelectModule,
  onHomeRequest,
  onOpenGrammar,
}) => {
  const [fontScale, setFontScale] = useState<FontSizeScale>('large');
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [m4SubView, setM4SubView] = useState<Module4SubView>('slides');

  // Find active example safely
  const currentExample: ModuleExample =
    currentModule.examples.find((ex) => ex.id === currentExampleId) || currentModule.examples[0];

  // Reference for scrolling to the newest revealed sentence
  const latestItemRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll smoothly to newest revealed sentence whenever currentSlide changes
  useEffect(() => {
    if (latestItemRef.current && scrollContainerRef.current && m4SubView === 'slides') {
      latestItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentSlide, currentExampleId, m4SubView]);

  // Reset subview when module changes
  useEffect(() => {
    setM4SubView('slides');
  }, [currentModule.id]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Stop any active audio speech when changing slide or example
  useEffect(() => {
    stopSpeaking();
    setSpeakingIndex(null);
  }, [currentSlide, currentExampleId, currentModule.id, m4SubView]);

  const handleSpeak = (text: string, index: number) => {
    setSpeakingIndex(index);
    speakText(text, () => {
      setSpeakingIndex(null);
    });
  };

  // Step next slide (accumulative inside current example)
  const handleNext = () => {
    if (currentSlide < 10) {
      onSlideChange(currentSlide + 1);
    } else if (currentExampleId < 3) {
      // Advance to next example in this module, resetting to slide 1
      onExampleChange((currentExampleId + 1) as 1 | 2 | 3);
    } else if (currentModule.id < 4) {
      // Advance to next module at Example 1, slide 1
      onSelectModule((currentModule.id + 1) as 1 | 2 | 3 | 4);
    }
  };

  // Step prev slide
  const handlePrev = () => {
    if (currentSlide > 1) {
      onSlideChange(currentSlide - 1);
    } else if (currentExampleId > 1) {
      // Go to previous example at slide 10
      onExampleChange((currentExampleId - 1) as 1 | 2 | 3);
      onSlideChange(10);
    }
  };

  // Restart current example at slide 1
  const handleRestartExample = () => {
    onSlideChange(1);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Restart entire module at Example 1, slide 1
  const handleRestartModule = () => {
    onExampleChange(1);
    onSlideChange(1);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Next example explicitly
  const handleNextExample = () => {
    if (currentExampleId < 3) {
      onExampleChange((currentExampleId + 1) as 1 | 2 | 3);
    }
  };

  // Prev example explicitly
  const handlePrevExample = () => {
    if (currentExampleId > 1) {
      onExampleChange((currentExampleId - 1) as 1 | 2 | 3);
    }
  };

  // Visible levels: ONLY levels of currentExample from 0 up to currentSlide (strictly resets on new example!)
  const visibleLevels: ForumLevel[] = currentExample.levels.slice(0, currentSlide);

  // Dynamic class mappings for projector readability
  const englishTextClasses = {
    standard: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
    large: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug',
    giant: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight',
  }[fontScale];

  const spanishTextClasses = {
    standard: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed',
    large: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed',
    giant: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-relaxed',
  }[fontScale];

  // Example progress: currentSlide / 10
  const exampleProgressPercent = (currentSlide / 10) * 100;
  // Module overall progress: ((currentExampleId - 1) * 10 + currentSlide) / 30
  const moduleOverallSlide = (currentExampleId - 1) * 10 + currentSlide;
  const moduleProgressPercent = (moduleOverallSlide / 30) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-sky-200 selection:text-sky-950">
      {/* 1. TOP BAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-3 sm:px-8 py-3 flex items-center justify-between gap-3 shadow-xs">
        {/* Zone 1: Home button & Evidence brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onHomeRequest}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors text-sm font-semibold border border-slate-200"
            title="Regresar al Menú Principal (Escape)"
          >
            <Home className="w-4 h-4 text-sky-800" />
            <span className="hidden sm:inline">HOME</span>
          </button>

          <div className="hidden xl:block border-l border-slate-200 pl-3">
            <span className="text-xs font-semibold text-sky-900 tracking-wider">
              GA3-240202501-AA1-EV03
            </span>
            <span className="text-xs text-slate-500 ml-2">
              · 4 Módulos · 12 Ejemplos · 120 Diapositivas
            </span>
          </div>
        </div>

        {/* Zone 2: Module Switcher Tabs (M1, M2, M3, M4) */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
          {QUESTION_MODULES.map((mod) => {
            const isActive = mod.id === currentModule.id;
            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-sky-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={`Abrir Módulo ${mod.number} (Tecla ${mod.number})`}
              >
                <span>M{mod.number}</span>
                <span className="hidden lg:inline font-normal opacity-90 truncate max-w-[120px]">
                  {mod.shortTitle}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Tools & Teacher Affordances */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Grammar & Vocabulary modal toggle */}
          <button
            onClick={onOpenGrammar}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
            title="Ver explicaciones gramaticales y vocabulario"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Grammar & Vocab</span>
          </button>

          {/* Font scale adjustment */}
          <div className="hidden md:flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
            <button
              onClick={() => setFontScale('standard')}
              className={`px-2 py-1 text-xs font-bold rounded ${
                fontScale === 'standard' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tamaño Estándar"
            >
              A
            </button>
            <button
              onClick={() => setFontScale('large')}
              className={`px-2 py-1 text-xs font-bold rounded ${
                fontScale === 'large' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tamaño Grande (Recomendado para aula)"
            >
              A+
            </button>
            <button
              onClick={() => setFontScale('giant')}
              className={`px-2 py-1 text-xs font-bold rounded ${
                fontScale === 'giant' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tamaño Gigante (Proyector a larga distancia)"
            >
              A++
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa (Proyector)'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 2. THREE SELECTABLE EXAMPLE TABS FOR THE CURRENT MODULE */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar">
          <span className="text-xs font-bold text-slate-500 uppercase mr-1 shrink-0">
            M{currentModule.number} Ejemplos:
          </span>
          {currentModule.examples.map((ex: ModuleExample) => {
            const isExActive = ex.id === currentExampleId;
            return (
              <button
                key={ex.id}
                onClick={() => onExampleChange(ex.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                  isExActive
                    ? 'bg-sky-900 text-white border-sky-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
                title={`Ir a Ejemplo ${ex.exampleNumber}: ${ex.titleEn}`}
              >
                <span>EXAMPLE {ex.exampleNumber}</span>
                <span className="hidden md:inline font-normal opacity-90 truncate max-w-[160px]">
                  · {ex.titleEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick jump between examples */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevExample}
            disabled={currentExampleId <= 1}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border flex items-center gap-1 ${
              currentExampleId <= 1
                ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Ir al Ejemplo Anterior"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PREV EXAMPLE</span>
          </button>

          <button
            onClick={handleNextExample}
            disabled={currentExampleId >= 3}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border flex items-center gap-1 ${
              currentExampleId >= 3
                ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Ir al Siguiente Ejemplo"
          >
            <span className="hidden sm:inline">NEXT EXAMPLE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Module 4 Extra Sub-Navigation Bar (Slides vs Different Ways to Reply vs Build Your Reply) */}
      {currentModule.id === 4 && (
        <div className="bg-sky-950 text-white px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-bold text-sky-300 uppercase">
            ACTIVIDADES DIDÁCTICAS MÓDULO 4:
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setM4SubView('slides')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                m4SubView === 'slides'
                  ? 'bg-white text-sky-950 shadow-xs'
                  : 'text-sky-200 hover:text-white hover:bg-sky-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Diapositivas Acumulativas</span>
            </button>

            <button
              onClick={() => setM4SubView('ways_to_reply')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                m4SubView === 'ways_to_reply'
                  ? 'bg-white text-sky-950 shadow-xs'
                  : 'text-sky-200 hover:text-white hover:bg-sky-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Different Ways to Reply</span>
            </button>

            <button
              onClick={() => setM4SubView('build_reply')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                m4SubView === 'build_reply'
                  ? 'bg-white text-sky-950 shadow-xs'
                  : 'text-sky-200 hover:text-white hover:bg-sky-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Build Your Reply</span>
            </button>
          </div>
        </div>
      )}

      {/* Render Subview if selected on Module 4 */}
      {currentModule.id === 4 && m4SubView === 'ways_to_reply' && (
        <main className="flex-1 overflow-y-auto">
          <DifferentWaysToReply onBackToSlides={() => setM4SubView('slides')} />
        </main>
      )}

      {currentModule.id === 4 && m4SubView === 'build_reply' && (
        <main className="flex-1 overflow-y-auto">
          <BuildYourReply onBackToSlides={() => setM4SubView('slides')} />
        </main>
      )}

      {/* Regular Cumulative Presentation (when on m4SubView === 'slides' or Modules 1-3) */}
      {(currentModule.id !== 4 || m4SubView === 'slides') && (
        <>
          {/* Dual Progress Bars: Example progress & Module overall progress */}
          <div className="w-full bg-slate-200 h-1.5 overflow-hidden flex">
            <div
              className="bg-sky-800 h-full transition-all duration-300 ease-out"
              style={{ width: `${exampleProgressPercent}%` }}
              title={`Avance de este ejemplo: ${currentSlide}/10`}
            />
          </div>

          {/* 3. QUESTION & EXAMPLE BANNER */}
          <section className="bg-white border-b border-slate-200 px-6 sm:px-12 py-4 shadow-xs">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                {/* DISCRETE INDICATOR AS REQUESTED */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold tracking-wider text-sky-900 uppercase">
                  <span>MODULE {currentModule.number}</span>
                  <span className="text-slate-300">—</span>
                  <span className="text-sky-800 bg-sky-50 px-2 py-0.5 rounded">EXAMPLE {currentExample.exampleNumber} OF 3</span>
                  <span className="text-slate-300">—</span>
                  <span className="text-slate-700">SLIDE {currentSlide} OF 10</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500 font-semibold normal-case">
                    (Módulo: {moduleOverallSlide}/30 diapositivas)
                  </span>
                </div>

                <div className="pt-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">
                    {currentExample.titleEn} — <span className="text-slate-600 font-medium italic text-lg sm:text-xl md:text-2xl">{currentExample.titleEs}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Pregunta: "{currentModule.questionEn}"
                  </p>
                </div>
              </div>

              {/* Current level summary badge */}
              <div className="shrink-0 flex items-center gap-3">
                <div className="bg-sky-50 border border-sky-200 px-4 py-2 rounded-xl text-right">
                  <div className="text-[11px] font-bold tracking-wider text-sky-800 uppercase">
                    Nivel del Ejemplo {currentExample.exampleNumber}
                  </div>
                  <div className="text-2xl font-black text-sky-950 tabular-nums">
                    {currentSlide} <span className="text-sm font-normal text-slate-500">/ 10</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. CUMULATIVE RESPONSES STAGE (Resets clean on each example!) */}
          <main
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-14 lg:px-20 py-8 md:py-12 max-w-7xl mx-auto w-full"
          >
            <div className="space-y-6 md:space-y-10">
              {visibleLevels.map((lvl: ForumLevel, index: number) => {
                const isLatest = lvl.level === currentSlide;
                const isSpeaking = speakingIndex === index;

                return (
                  <div
                    key={lvl.level}
                    ref={isLatest ? latestItemRef : null}
                    className={`transition-all duration-300 rounded-2xl p-6 sm:p-8 md:p-10 ${
                      isLatest
                        ? 'bg-white border-2 border-sky-800 shadow-lg ring-4 ring-sky-100/70'
                        : 'bg-white/80 border border-slate-200/90 hover:border-slate-300'
                    }`}
                  >
                    {/* Level indicator & audio action */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg font-black text-sm sm:text-base tabular-nums ${
                            isLatest
                              ? 'bg-sky-900 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {lvl.level}
                        </span>
                        <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-600">
                          NIVEL {lvl.level}
                          {isLatest && (
                            <span className="ml-2 px-2 py-0.5 bg-sky-100 text-sky-900 rounded font-semibold text-xs lowercase">
                              (actual)
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeak(lvl.english, index)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                            isSpeaking
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                          }`}
                          title="Escuchar pronunciación en inglés (Audio)"
                        >
                          <Volume2 className="w-4 h-4 text-sky-800" />
                          <span className="hidden sm:inline">
                            {isSpeaking ? 'Listening...' : 'Listen'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* English Sentence (GIANT FONT) */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <p className={`text-slate-950 tracking-tight ${englishTextClasses}`}>
                          {lvl.english}
                        </p>
                      </div>

                      {/* Spanish Translation */}
                      <div className="pt-2">
                        <p className={`text-slate-600 italic ${spanishTextClasses}`}>
                          {lvl.spanish}
                        </p>
                      </div>
                    </div>

                    {/* Didactic focus hint */}
                    {lvl.grammarFocus && (
                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs sm:text-sm text-sky-900 font-medium">
                        <Info className="w-4 h-4 text-sky-700 shrink-0" />
                        <span>{lvl.grammarFocus}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Ending of Example 10: Clear transitions */}
            {currentSlide === 10 && (
              <div className="mt-10 p-6 sm:p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-4 shadow-xs">
                <div className="inline-flex items-center gap-2 text-emerald-900 font-bold text-lg">
                  <Check className="w-5 h-5 text-emerald-700" />
                  <span>
                    Secuencia del Ejemplo {currentExample.exampleNumber} Completada (10 Diapositivas)
                  </span>
                </div>
                <p className="text-sm text-emerald-800 max-w-xl mx-auto">
                  Los aprendices pueden comparar ahora las 10 etapas del {currentExample.titleEn}.
                  Al avanzar al siguiente ejemplo, la pantalla se reiniciará mostrando únicamente la primera frase.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  {currentExampleId < 3 ? (
                    <button
                      onClick={handleNextExample}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white font-extrabold text-sm rounded-xl hover:bg-emerald-900 transition-colors shadow-xs"
                    >
                      <span>Avanzar a Ejemplo {currentExampleId + 1} (Slide 1)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : currentModule.id < 4 ? (
                    <button
                      onClick={() => onSelectModule((currentModule.id + 1) as 1 | 2 | 3 | 4)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-sky-900 text-white font-extrabold text-sm rounded-xl hover:bg-sky-950 transition-colors shadow-xs"
                    >
                      <span>Avanzar a Módulo {currentModule.id + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="space-y-3 w-full">
                      {/* Golden Rule banner on Module 4 finishing */}
                      <div className="p-6 bg-sky-900 text-white rounded-2xl space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-sky-200">
                          REGLA FORMATIVA SENA PARA EL FORO
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-black">
                          RESPECT. AGREE. ADD AN IDEA. ASK A QUESTION.
                        </h4>
                        <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto">
                          Respeta. Expresa acuerdo. Añade una idea. Haz una pregunta.
                          El objetivo es responder de manera crítico-reflexiva y no simplemente escribir “I agree”.
                        </p>
                      </div>

                      <button
                        onClick={onHomeRequest}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-extrabold text-sm rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
                      >
                        <Home className="w-4 h-4" />
                        <span>FINALIZAR PRESENTACIÓN / HOME</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>

          {/* 5. BOTTOM NAVIGATION CONTROLS */}
          <footer className="bg-white border-t border-slate-200 px-4 sm:px-8 py-4 sticky bottom-0 z-20 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left: Previous button, Restart Example, Restart Module */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                <button
                  onClick={handlePrev}
                  disabled={currentSlide <= 1 && currentExampleId <= 1}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl transition-all ${
                    currentSlide <= 1 && currentExampleId <= 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-100 hover:border-slate-400 shadow-xs active:scale-98'
                  }`}
                  title="Retroceder a la diapositiva anterior (Flecha Izquierda)"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>PREVIOUS</span>
                </button>

                <button
                  onClick={handleRestartExample}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                  title="Reiniciar este ejemplo desde la diapositiva 1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">RESTART EXAMPLE</span>
                </button>

                <button
                  onClick={handleRestartModule}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                  title="Reiniciar este módulo desde el Ejemplo 1, diapositiva 1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">RESTART MODULE</span>
                </button>
              </div>

              {/* Center: Slide indicator & interactive quick jump dots */}
              <div className="flex flex-col items-center gap-1">
                <div className="text-xs sm:text-sm font-bold text-slate-700 tracking-wider">
                  M{currentModule.number} · EXAMPLE {currentExample.exampleNumber} OF 3 — SLIDE {currentSlide} OF 10
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => {
                    const isCurrent = lvl === currentSlide;
                    const isRevealed = lvl <= currentSlide;
                    return (
                      <button
                        key={lvl}
                        onClick={() => onSlideChange(lvl)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 text-xs font-bold rounded-lg transition-all flex items-center justify-center tabular-nums ${
                          isCurrent
                            ? 'bg-sky-900 text-white scale-110 shadow-xs'
                            : isRevealed
                            ? 'bg-sky-100 text-sky-900 hover:bg-sky-200'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                        title={`Saltar a Nivel ${lvl} del Ejemplo ${currentExample.exampleNumber}`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Next / Next Example / Next Module */}
              <div className="w-full md:w-auto flex justify-end">
                {currentSlide < 10 ? (
                  <button
                    onClick={handleNext}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-sky-900 text-white font-extrabold text-sm sm:text-base rounded-xl hover:bg-sky-950 shadow-md hover:shadow-lg transition-all transform active:scale-98"
                    title="Avanzar a la siguiente diapositiva (Flecha Derecha o Barra Espaciadora)"
                  >
                    <span>NEXT</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : currentExampleId < 3 ? (
                  <button
                    onClick={handleNextExample}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-800 text-white font-extrabold text-sm sm:text-base rounded-xl hover:bg-emerald-900 shadow-md hover:shadow-lg transition-all transform active:scale-98"
                    title="Avanzar al siguiente ejemplo de este módulo"
                  >
                    <span>NEXT EXAMPLE ({currentExampleId + 1}/3)</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : currentModule.id < 4 ? (
                  <button
                    onClick={() => onSelectModule((currentModule.id + 1) as 1 | 2 | 3 | 4)}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-sky-900 text-white font-extrabold text-sm sm:text-base rounded-xl hover:bg-sky-950 shadow-md transition-all"
                    title="Pasar al siguiente módulo"
                  >
                    <span>NEXT MODULE (M{currentModule.id + 1})</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={onHomeRequest}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-extrabold text-sm sm:text-base rounded-xl hover:bg-slate-800 shadow-md transition-all"
                    title="Volver al Menú Principal"
                  >
                    <Home className="w-5 h-5" />
                    <span>FINALIZAR / HOME</span>
                  </button>
                )}
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};
