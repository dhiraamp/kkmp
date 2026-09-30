import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useKkmp } from '../context/KkmpContext';

export default function Toast() {
  const { toastMessage } = useKkmp();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isError = toastMessage.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-200">
      <div
        className={`p-4 rounded-2xl shadow-xl border flex items-center gap-3 backdrop-blur-md ${
          isSuccess
            ? 'bg-emerald-900/90 text-white border-emerald-700'
            : isError
            ? 'bg-rose-900/90 text-white border-rose-700'
            : 'bg-slate-900/90 text-white border-slate-700'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
        
        <p className="text-xs font-semibold flex-1 leading-snug">
          {toastMessage.message}
        </p>
      </div>
    </div>
  );
}
