import React, { useState } from 'react';
import { Volume2, CheckCircle2, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { REPLY_CATEGORIES, ReplyCategory } from '../data/forumData';
import { speakText } from '../utils/speech';

interface DifferentWaysToReplyProps {
  onBackToSlides: () => void;
}

export const DifferentWaysToReply: React.FC<DifferentWaysToReplyProps> = ({ onBackToSlides }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(REPLY_CATEGORIES[0].id);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const activeCategory = REPLY_CATEGORIES.find((c) => c.id === selectedCategoryId) || REPLY_CATEGORIES[0];

  const handleSpeak = (text: string, index: number) => {
    setSpeakingIndex(index);
    speakText(text, () => setSpeakingIndex(null));
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md">
              MODULE 4 · INTERACTIVE GUIDE
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-slate-500">
              5 Categorías de Respuesta
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-1">
            DIFFERENT WAYS TO REPLY
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-0.5">
            Diferentes maneras de responder a un compañero en el foro según tu propósito comunicativo.
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

      {/* Category Tabs (Large, clean, unboxed, functional) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 my-6">
        {REPLY_CATEGORIES.map((cat: ReplyCategory) => {
          const isActive = cat.id === activeCategory.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`p-3 sm:p-4 rounded-xl text-left transition-all border ${
                isActive
                  ? 'bg-sky-900 text-white border-sky-900 shadow-md ring-2 ring-sky-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="text-[11px] font-bold uppercase opacity-80">
                0{cat.number}. {cat.titleEs}
              </div>
              <div className="text-sm sm:text-base font-extrabold mt-1 truncate">
                {cat.titleEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* Category Stage with Giant Letters */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-black tracking-widest uppercase text-sky-800">
              Categoría {activeCategory.number} de 5
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {activeCategory.titleEn} — <span className="text-slate-600 font-normal">{activeCategory.titleEs}</span>
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {activeCategory.descriptionEs}
            </p>
          </div>
        </div>

        {/* 4 Large Examples Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 pt-2">
          {activeCategory.items.map((item, idx) => {
            const isSpeaking = speakingIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-sky-300 hover:bg-white transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
                    <span className="text-xs font-bold text-sky-900 bg-sky-100/80 px-2.5 py-0.5 rounded-md">
                      Ejemplo 0{idx + 1}
                    </span>
                    <button
                      onClick={() => handleSpeak(item.english, idx)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isSpeaking
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                      title="Escuchar pronunciación"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-sky-800" />
                      <span>{isSpeaking ? 'Listening...' : 'Listen'}</span>
                    </button>
                  </div>

                  {/* English phrase in very large letters */}
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 leading-snug tracking-tight">
                    "{item.english}"
                  </h4>

                  {/* Spanish translation in clear soft tone */}
                  <p className="text-lg sm:text-xl md:text-2xl text-slate-600 font-medium italic mt-3">
                    "{item.spanish}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Classroom Pedagogical Golden Rule */}
      <div className="mt-8 p-6 bg-sky-900 text-white rounded-2xl text-center space-y-2 shadow-md">
        <div className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-sky-200">
          REGLA DE ORO DIDÁCTICA PARA EL FORO
        </div>
        <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide">
          RESPECT · AGREE · ADD AN IDEA · ASK A QUESTION
        </div>
        <p className="text-xs sm:text-sm text-sky-100 max-w-2xl mx-auto opacity-90">
          Respeta. Expresa acuerdo. Añade una idea. Haz una pregunta. No te limites a decir "I agree".
        </p>
      </div>
    </div>
  );
};
