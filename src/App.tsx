import React, { useState, useEffect, useCallback } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ModuleExamplesOverview } from './components/ModuleExamplesOverview';
import { SlideViewer } from './components/SlideViewer';
import { GrammarDrawer } from './components/GrammarDrawer';
import { ExitConfirmModal } from './components/ExitConfirmModal';
import { QUESTION_MODULES, QuestionModule } from './data/forumData';

export default function App() {
  const [view, setView] = useState<'home' | 'module_overview' | 'presenting'>('home');
  const [currentModuleId, setCurrentModuleId] = useState<1 | 2 | 3 | 4>(1);
  const [currentExampleId, setCurrentExampleId] = useState<1 | 2 | 3>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isGrammarOpen, setIsGrammarOpen] = useState<boolean>(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState<boolean>(false);

  const activeModule: QuestionModule =
    QUESTION_MODULES.find((m) => m.id === currentModuleId) || QUESTION_MODULES[0];

  // Start from Module 1, Example 1, Slide 1
  const handleStartPresentation = useCallback(() => {
    setCurrentModuleId(1);
    setCurrentExampleId(1);
    setCurrentSlide(1);
    setView('presenting');
  }, []);

  // Open secondary screen with 3 examples of selected module
  const handleOpenModuleOverview = useCallback((moduleId: 1 | 2 | 3 | 4) => {
    setCurrentModuleId(moduleId);
    setCurrentExampleId(1);
    setCurrentSlide(1);
    setView('module_overview');
  }, []);

  // Launch specific example inside presenting view (strictly resets slide to 1)
  const handleSelectExample = useCallback((exampleId: 1 | 2 | 3) => {
    setCurrentExampleId(exampleId);
    setCurrentSlide(1);
    setView('presenting');
  }, []);

  // Direct switch to a module (resets to example 1, slide 1)
  const handleSelectModule = useCallback((moduleId: 1 | 2 | 3 | 4) => {
    setCurrentModuleId(moduleId);
    setCurrentExampleId(1);
    setCurrentSlide(1);
    setView('presenting');
    setIsExitConfirmOpen(false);
  }, []);

  // Change slide within current example
  const handleSlideChange = useCallback((newSlide: number) => {
    if (newSlide >= 1 && newSlide <= 10) {
      setCurrentSlide(newSlide);
    }
  }, []);

  // Change example within current module (mandatory reset to slide 1)
  const handleExampleChange = useCallback((exampleId: 1 | 2 | 3) => {
    setCurrentExampleId(exampleId);
    setCurrentSlide(1);
  }, []);

  const handleHomeRequest = useCallback(() => {
    if (view === 'presenting' || view === 'module_overview') {
      setIsExitConfirmOpen(true);
    }
  }, [view]);

  const handleConfirmExit = useCallback(() => {
    setIsExitConfirmOpen(false);
    setView('home');
    setCurrentExampleId(1);
    setCurrentSlide(1);
  }, []);

  const handleCancelExit = useCallback(() => {
    setIsExitConfirmOpen(false);
  }, []);

  // Global Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input element
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      // 1. Modal handling with Escape
      if (e.key === 'Escape') {
        if (isGrammarOpen) {
          setIsGrammarOpen(false);
          return;
        }
        if (isExitConfirmOpen) {
          setIsExitConfirmOpen(false);
          return;
        }
        if (view === 'presenting' || view === 'module_overview') {
          setIsExitConfirmOpen(true);
          return;
        }
      }

      // If a modal is open, prevent slide progression with arrow keys
      if (isGrammarOpen || isExitConfirmOpen) {
        return;
      }

      // 2. Direct Module Jump Keys: '1', '2', '3', '4'
      if (e.key === '1') {
        handleOpenModuleOverview(1);
        return;
      }
      if (e.key === '2') {
        handleOpenModuleOverview(2);
        return;
      }
      if (e.key === '3') {
        handleOpenModuleOverview(3);
        return;
      }
      if (e.key === '4') {
        handleOpenModuleOverview(4);
        return;
      }

      // 3. Slide Navigation (only in presenting view)
      if (view === 'presenting') {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          setCurrentSlide((prevSlide) => {
            if (prevSlide < 10) return prevSlide + 1;

            // If at slide 10, advance to next example if available (and reset to slide 1)
            if (currentExampleId < 3) {
              setCurrentExampleId((prevEx) => (prevEx + 1) as 1 | 2 | 3);
              return 1;
            }

            // If at Example 3 Slide 10, advance to next module Example 1 Slide 1 if available
            if (currentModuleId < 4) {
              setCurrentModuleId((prevMod) => (prevMod + 1) as 1 | 2 | 3 | 4);
              setCurrentExampleId(1);
              return 1;
            }

            return prevSlide;
          });
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setCurrentSlide((prevSlide) => {
            if (prevSlide > 1) return prevSlide - 1;

            // If at slide 1 and example > 1, go to previous example at slide 10
            if (currentExampleId > 1) {
              setCurrentExampleId((prevEx) => (prevEx - 1) as 1 | 2 | 3);
              return 10;
            }

            return 1;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, isGrammarOpen, isExitConfirmOpen, currentModuleId, currentExampleId, handleOpenModuleOverview]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {view === 'home' && (
        <HomeScreen
          onStartPresentation={handleStartPresentation}
          onOpenModuleOverview={handleOpenModuleOverview}
          onOpenGrammarOverview={() => setIsGrammarOpen(true)}
        />
      )}

      {view === 'module_overview' && (
        <ModuleExamplesOverview
          module={activeModule}
          onSelectExample={handleSelectExample}
          onBackToHome={() => setView('home')}
          onOpenGrammar={() => setIsGrammarOpen(true)}
        />
      )}

      {view === 'presenting' && (
        <SlideViewer
          currentModule={activeModule}
          currentExampleId={currentExampleId}
          currentSlide={currentSlide}
          onSlideChange={handleSlideChange}
          onExampleChange={handleExampleChange}
          onSelectModule={handleSelectModule}
          onHomeRequest={handleHomeRequest}
          onOpenGrammar={() => setIsGrammarOpen(true)}
        />
      )}

      {/* Grammar & Vocabulary slide-over modal */}
      <GrammarDrawer
        isOpen={isGrammarOpen}
        onClose={() => setIsGrammarOpen(false)}
        activeModuleId={currentModuleId}
        onSelectModule={(id) => setCurrentModuleId(id)}
      />

      {/* Confirmation modal when teacher presses Escape or clicks Home */}
      <ExitConfirmModal
        isOpen={isExitConfirmOpen}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
        currentModuleName={`Módulo ${activeModule.number}: ${activeModule.shortTitle}`}
        currentSlide={currentSlide}
      />
    </div>
  );
}
