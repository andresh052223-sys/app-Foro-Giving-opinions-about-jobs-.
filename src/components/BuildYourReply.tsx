import React, { useState } from 'react';
import { Volume2, ArrowLeft, ArrowRight, RotateCcw, Check, Sparkles, MessageSquare, Plus } from 'lucide-react';
import { BUILD_REPLY_SCENARIOS, BuildReplyScenario } from '../data/forumData';
import { speakText } from '../utils/speech';

interface BuildYourReplyProps {
  onBackToSlides: () => void;
}

export const BuildYourReply: React.FC<BuildYourReplyProps> = ({ onBackToSlides }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1); // 1 = Comment, 2 = Suggested, 3 = Longer
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const scenario: BuildReplyScenario = BUILD_REPLY_SCENARIOS[selectedScenarioIndex];

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    speakText(text, () => setIsSpeaking(false));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else if (selectedScenarioIndex < BUILD_REPLY_SCENARIOS.length - 1) {
      setSelectedScenarioIndex((prev) => prev + 1);
      setCurrentStep(1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    } else if (selectedScenarioIndex > 0) {
      setSelectedScenarioIndex((prev) => prev - 1);
      setCurrentStep(3);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md">
              MODULE 4 · INTERACTIVE ACTIVITY
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-slate-500">
              Paso a Paso Didáctico
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
            BUILD YOUR REPLY
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-0.5">
            Observa cómo transformar el comentario de un compañero en una respuesta progresiva y argumentada.
          </p>
        </div>

        <button
          onClick={onBackToSlides}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white font-bold text-sm rounded-xl hover:bg-slate-900 transition-colors shadow-xs shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a las 10 Diapositivas</span>
        </button>
      </div>

      {/* Scenario Selector & Step Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
        {/* Scenario buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase mr-1">Casos:</span>
          {BUILD_REPLY_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioIndex(idx);
                setCurrentStep(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all border ${
                selectedScenarioIndex === idx
                  ? 'bg-sky-900 text-white border-sky-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              Ejemplo {sc.id}
            </button>
          ))}
        </div>

        {/* Step dots (1, 2, 3) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase mr-1">Progreso:</span>
          <button
            onClick={() => setCurrentStep(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentStep >= 1 ? 'bg-sky-900 text-white' : 'bg-slate-200 text-slate-600'
            }`}
          >
            1. Comentario
          </button>
          <span className="text-slate-300">→</span>
          <button
            onClick={() => setCurrentStep(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentStep >= 2 ? 'bg-sky-900 text-white' : 'bg-slate-200 text-slate-600'
            }`}
          >
            2. Respuesta Sugerida
          </button>
          <span className="text-slate-300">→</span>
          <button
            onClick={() => setCurrentStep(3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentStep >= 3 ? 'bg-sky-900 text-white' : 'bg-slate-200 text-slate-600'
            }`}
          >
            3. Respuesta Completa
          </button>
        </div>
      </div>

      {/* Main Interactive Stage with Giant Letters */}
      <div className="space-y-6">
        {/* ELEMENT 1: A classmate's comment (Always visible) */}
        <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-200 text-slate-800 font-black text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-600">
                A CLASSMATE’S COMMENT — COMENTARIO DE UN COMPAÑERO
              </span>
            </div>
            <button
              onClick={() => handleSpeak(scenario.classmateComment)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-sky-800" />
              <span>Listen</span>
            </button>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-snug">
            “{scenario.classmateComment}”
          </h3>
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-600 italic font-medium mt-2">
            “{scenario.classmateCommentEs}”
          </p>
        </div>

        {/* ELEMENT 2: A suggested reply (Revealed at step 2 & 3) */}
        {currentStep >= 2 ? (
          <div className="bg-white border-2 border-sky-400 rounded-3xl p-6 sm:p-10 shadow-md animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-sky-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sky-200 text-sky-900 font-black text-xs flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-sky-900">
                  A SUGGESTED REPLY — RESPUESTA SUGERIDA (NIVEL BÁSICO)
                </span>
              </div>
              <button
                onClick={() => handleSpeak(scenario.suggestedReply)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-lg text-xs font-semibold transition-colors border border-sky-200"
              >
                <Volume2 className="w-3.5 h-3.5 text-sky-800" />
                <span>Listen</span>
              </button>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-sky-950 tracking-tight leading-snug">
              “{scenario.suggestedReply}”
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-600 italic font-medium mt-2">
              “{scenario.suggestedReplyEs}”
            </p>
          </div>
        ) : (
          <div
            onClick={() => setCurrentStep(2)}
            className="border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
          >
            <span className="text-sm font-extrabold text-slate-500 group-hover:text-sky-900 flex items-center justify-center gap-2">
              <Plus className="w-5 h-5 text-sky-700" />
              <span>Haz clic o presiona NEXT STEP para revelar el Paso 2: Respuesta Sugerida</span>
            </span>
          </div>
        )}

        {/* ELEMENT 3: A longer reply (Revealed at step 3) */}
        {currentStep >= 3 ? (
          <div className="bg-white border-2 border-emerald-600 rounded-3xl p-6 sm:p-10 shadow-lg ring-4 ring-emerald-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-black text-xs flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900">
                  A LONGER REPLY — RESPUESTA MÁS DESARROLLADA (CRÍTICO-REFLEXIVA)
                </span>
              </div>
              <button
                onClick={() => handleSpeak(scenario.longerReply)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 rounded-lg text-xs font-semibold transition-colors border border-emerald-200"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-800" />
                <span>Listen</span>
              </button>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-snug">
              “{scenario.longerReply}”
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl text-emerald-800 italic font-medium mt-3">
              “{scenario.longerReplyEs}”
            </p>

            <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center gap-2 text-xs sm:text-sm text-emerald-900 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Clave de aprendizaje: {scenario.focusPoint}</span>
            </div>
          </div>
        ) : currentStep === 2 && (
          <div
            onClick={() => setCurrentStep(3)}
            className="border-2 border-dashed border-emerald-300 rounded-3xl p-8 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors cursor-pointer group"
          >
            <span className="text-sm font-extrabold text-emerald-700 group-hover:text-emerald-900 flex items-center justify-center gap-2">
              <Plus className="w-5 h-5 text-emerald-600" />
              <span>Haz clic o presiona NEXT STEP para revelar el Paso 3: Respuesta Más Desarrollada</span>
            </span>
          </div>
        )}
      </div>

      {/* Stepper Navigation Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1 && selectedScenarioIndex === 0}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all ${
              currentStep === 1 && selectedScenarioIndex === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PREVIOUS STEP</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESTART CASE</span>
          </button>
        </div>

        <div className="text-xs sm:text-sm font-bold text-slate-700 tracking-wider">
          CASO {scenario.id} DE 3 · PASO {currentStep} DE 3
        </div>

        <button
          onClick={handleNextStep}
          className="flex items-center gap-2 px-7 py-3 bg-sky-900 text-white font-extrabold text-sm rounded-xl hover:bg-sky-950 shadow-md transition-all active:scale-98"
        >
          <span>
            {currentStep < 3
              ? `NEXT STEP (${currentStep + 1}/3)`
              : selectedScenarioIndex < BUILD_REPLY_SCENARIOS.length - 1
              ? `SIGUIENTE CASO (${selectedScenarioIndex + 2}/3)`
              : 'FINALIZAR ACTIVIDAD'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Final Pedagogical Note */}
      <div className="mt-6 text-center text-xs text-slate-500">
        Recordar: El objetivo de esta actividad es enseñar a los aprendices a fundamentar con 'because' o 'and', en lugar de simplemente responder “I agree”.
      </div>
    </div>
  );
};
