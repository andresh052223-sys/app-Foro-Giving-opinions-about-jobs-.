import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, Volume2 } from 'lucide-react';
import { QuestionModule, QUESTION_MODULES } from '../data/forumData';
import { speakText } from '../utils/speech';

interface GrammarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeModuleId: 1 | 2 | 3 | 4;
  onSelectModule: (id: 1 | 2 | 3 | 4) => void;
}

export const GrammarDrawer: React.FC<GrammarDrawerProps> = ({
  isOpen,
  onClose,
  activeModuleId,
  onSelectModule,
}) => {
  const [activeTab, setActiveTab] = useState<'grammar' | 'vocab' | 'tips' | 'template'>('grammar');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  if (!isOpen) return null;

  const currentModule = QUESTION_MODULES.find((m) => m.id === activeModuleId) || QUESTION_MODULES[0];

  const handleCopyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  const sampleForumPost = `Hello instructor and classmates,

This is my contribution to the forum "Giving opinions about jobs" (GA3-240202501-AA1-EV03):

--- PART 1: MY ANSWERS TO THE THREE FORUM QUESTIONS ---

1. How can you be environmentally friendly at work?
I help protect the environment by saving water, turning off unnecessary lights, and recycling paper every day.

2. What kind of incentives could a green company offer to its employees?
A green company can offer rewards, extra free time, and other benefits to employees who protect the environment.

3. In what other ways could businesses involve their employees in environmental issues?
Businesses can involve employees in environmental projects, such as planting trees, recycling paper, and reducing waste at work.

--- PART 2: REPLYING TO A CLASSMATE'S POST (MODULE 4) ---

Hello Carlos,
Good idea! I agree with your opinion because small actions can help protect the environment.
We can also save electricity by turning off computers at the end of the day.
What other actions can we take at work?

Thank you for reading my post!
Best regards,
[Your Name]`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex justify-center items-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-900 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Grammar & Vocabulary · {currentModule.badgeTitle}: {currentModule.shortTitle}
              </h3>
              <p className="text-xs text-slate-600">
                Guía didáctica y estructuras lingüísticas para aprendices A1-A2
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header Module Switcher */}
        <div className="px-6 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <span className="text-xs font-bold text-slate-500 mr-2 uppercase shrink-0">Módulo:</span>
            {QUESTION_MODULES.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  m.id === currentModule.id
                    ? 'bg-sky-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {m.id === 4 ? 'M4: Replying' : `Q${m.number}: ${m.shortTitle}`}
              </button>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('grammar')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'grammar' ? 'bg-white text-sky-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gramática
            </button>
            <button
              onClick={() => setActiveTab('vocab')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'vocab' ? 'bg-white text-sky-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vocabulario
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'tips' ? 'bg-white text-sky-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tips Foro SENA
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'template' ? 'bg-white text-sky-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Plantilla Completa
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* 1. GRAMMAR TAB */}
          {activeTab === 'grammar' && (
            <div className="space-y-6">
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
                <span className="text-xs font-bold text-sky-900 uppercase tracking-wide">
                  Pregunta de enfoque:
                </span>
                <p className="text-base font-bold text-sky-950 mt-1">"{currentModule.questionEn}"</p>
                <p className="text-sm text-sky-800 italic mt-0.5">"{currentModule.questionEs}"</p>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {currentModule.grammarTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-base font-bold text-slate-900">
                        {topic.title}
                      </h4>
                      <code className="text-xs font-mono bg-slate-100 text-sky-900 px-2 py-0.5 rounded font-semibold">
                        {topic.ruleFormula}
                      </code>
                    </div>

                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {topic.explanationEs}
                    </p>

                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 space-y-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Ejemplos de clase:
                      </span>
                      {topic.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="flex items-center justify-between text-xs sm:text-sm">
                          <div>
                            <span className="font-semibold text-slate-900">{ex.en}</span>
                            <span className="text-slate-600 ml-2">({ex.es})</span>
                          </div>
                          <button
                            onClick={() => speakText(ex.en)}
                            className="p-1 text-slate-500 hover:text-sky-900"
                            title="Escuchar audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. VOCABULARY TAB */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Términos y expresiones esenciales para enriquecer las respuestas de este módulo:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentModule.keyVocabulary.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border border-slate-200 rounded-xl hover:border-sky-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <h4 className="text-lg font-bold text-slate-950 mt-1.5">{item.english}</h4>
                        <p className="text-sm text-slate-600 italic font-medium">{item.spanish}</p>
                      </div>
                      <button
                        onClick={() => speakText(item.english)}
                        className="p-1.5 text-slate-500 hover:text-sky-900 bg-slate-100 rounded-lg"
                        title="Escuchar"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">Ejemplo: </span>
                      "{item.example}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SENA TIPS TAB */}
          {activeTab === 'tips' && (
            <div className="space-y-5">
              <div className="p-5 bg-sky-50 border border-sky-200 rounded-xl space-y-2">
                <h4 className="text-base font-bold text-sky-950">
                  Instrucciones de la Evidencia GA3-240202501-AA1-EV03
                </h4>
                <p className="text-xs sm:text-sm text-sky-900 leading-relaxed">
                  Para aprobar la evidencia en la plataforma SENA, cada aprendiz debe publicar sus respuestas a las 3 preguntas orientadoras Y realizar al menos una réplica respetuosa y fundamentada a la publicación de un compañero.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="text-sm font-bold text-slate-900">Recomendaciones pedagógicas para este módulo:</h5>
                {currentModule.tipsForStudents.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-sky-900 text-white rounded-xl text-xs sm:text-sm text-center">
                <div className="font-black text-sm uppercase tracking-wider text-sky-200 mb-1">
                  RESPECT · AGREE · ADD AN IDEA · ASK A QUESTION
                </div>
                <p className="text-sky-100">
                  No escribas solo "I agree". Añade una idea propia o una pregunta para que tu participación sea evaluada con el máximo nivel de logro.
                </p>
              </div>
            </div>
          )}

          {/* 4. TEMPLATE TAB */}
          {activeTab === 'template' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Plantilla completa para el Foro SENA (Preguntas 1 a 3 + Réplica a compañero)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Copia y adapta este modelo completo para tu participación formativa
                  </p>
                </div>
                <button
                  onClick={() => handleCopyTemplate(sampleForumPost)}
                  className="flex items-center gap-2 px-4 py-2 bg-sky-900 text-white font-bold text-xs rounded-xl hover:bg-sky-950 transition-colors shadow-xs"
                >
                  {copiedTemplate ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>¡Copiado al portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Plantilla</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-sky-500 selection:text-white">
                {sampleForumPost}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900 transition-colors"
          >
            Cerrar Guía
          </button>
        </div>
      </div>
    </div>
  );
};
