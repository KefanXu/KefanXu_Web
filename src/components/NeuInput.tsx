import React from 'react';
import { ArrowUp } from 'lucide-react';

interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onAction?: () => void;
}

export const NeuInput: React.FC<NeuInputProps> = ({ className = '', onAction, ...props }) => {
  return (
    <div className={`relative group ${className}`}>
      <input
        {...props}
        className="
          w-full bg-bg-light dark:bg-bg-dark 
          rounded-2xl py-4 pl-6 pr-14
          shadow-[inset_2px_2px_5px_rgb(163,177,198,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.5)] 
          dark:shadow-[inset_2px_2px_5px_#1d1e22,inset_-2px_-2px_5px_#393c44]
          text-text-light dark:text-text-dark
          placeholder-text-light/30 dark:placeholder-text-dark/30
          focus:outline-none 
          transition-all duration-300
          text-sm font-mono
          border-[3px] border-white/20 dark:border-white/5
        "
      />
      
      {/* Right Action Button (Raised Neumorphic) */}
      <button 
        onClick={onAction}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          w-9 h-9 rounded-xl
          bg-bg-light dark:bg-bg-dark
          shadow-neu-light dark:shadow-neu-dark
          flex items-center justify-center
          text-text-light dark:text-text-dark
          hover:text-blue-500 transition-colors
          active:shadow-neu-pressed-light dark:active:shadow-neu-pressed-dark
          active:scale-95 duration-200
        "
      >
        <ArrowUp size={18} className="opacity-60" />
      </button>
    </div>
  );
};
