import React from 'react';
import { AlertCircle, Home, X } from 'lucide-react';

interface ExitConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  currentModuleName: string;
  currentSlide: number;
}

export const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  currentModuleName,
  currentSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-left">
        <div className="flex items-center gap-3 text-amber-600 mb-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200 shrink-0">
            <AlertCircle className="w-6 h-6 text-amber-700" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            ¿Regresar a la Pantalla de Inicio?
          </h3>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Estás actualmente en la <span className="font-semibold text-slate-800">diapositiva {currentSlide} de 10</span> del módulo <span className="font-semibold text-slate-800">{currentModuleName}</span>.
        </p>

        <p className="text-xs text-slate-600 mt-2">
          Si sales ahora, la presentación en pantalla grande volverá al menú inicial.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Continuar Presentación
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Sí, volver a Inicio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
