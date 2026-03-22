import { Calendar } from 'lucide-react';
import { useRef } from 'react';

export default function DatePicker({ value, onChange, label, disabled, required, className }) {
    const inputRef = useRef(null);

    const handleContainerClick = () => {
        if (!disabled && inputRef.current) {
            try {
                inputRef.current.showPicker();
            } catch (e) {
                inputRef.current.focus();
            }
        }
    };

    return (
        <div className={`space-y-1.5 ${className || ''}`}>
            {label && (
                <label className="block text-sm font-semibold text-slate-400 ml-1 uppercase tracking-widest">
                    {label}
                </label>
            )}
            <div 
                className={`relative flex items-center bg-slate-900 border border-white/5 rounded-2xl transition-all overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text focus-within:ring-2 focus-within:ring-blue-500/40 hover:border-white/10'}`}
                onClick={handleContainerClick}
            >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10">
                    <Calendar className="w-5 h-5 pointer-events-none" />
                </div>
                <input 
                    ref={inputRef}
                    type="date" 
                    required={required}
                    disabled={disabled}
                    className="w-full bg-transparent px-12 py-3.5 text-white focus:outline-none appearance-none cursor-pointer [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer relative z-20"
                    value={value || ''}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
