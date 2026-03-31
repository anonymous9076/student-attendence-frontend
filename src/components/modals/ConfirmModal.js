'use client';
import { X, AlertTriangle, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

const icons = {
  danger: <Trash2 className="w-6 h-6 text-red-500" />,
  warning: <AlertTriangle className="w-6 h-6 text-amber-500" />,
  success: <CheckCircle2 className="w-6 h-6 text-green-500" />,
  info: <AlertCircle className="w-6 h-6 text-blue-500" />,
};

const colors = {
  danger: 'bg-red-500',
  warning: 'bg-amber-500',
  success: 'bg-green-500',
  info: 'bg-blue-500',
};

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
  loading = false
}) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 overscroll-contain">
          <div
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <div
            className="bg-slate-900 border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 relative shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/5 text-slate-400 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10`}>
                {icons[type]}
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                {title}
              </h2>

              <p className="text-slate-400 leading-relaxed mb-10 px-4">
                {message}
              </p>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={onClose}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all border border-white/5 active:scale-[0.98]"
                >
                  {cancelText}
                </button>
                <button 
                  onClick={onConfirm}
                  disabled={loading}
                  className={`flex-1 ${colors[type]} hover:opacity-90 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-black/20 active:scale-[0.98] disabled:opacity-50`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
