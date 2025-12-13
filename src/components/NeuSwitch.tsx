import React from 'react';

interface NeuSwitchProps {
  options: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const NeuSwitch: React.FC<NeuSwitchProps> = ({ options, activeId, onChange, className = '' }) => {
  return (
    <div className={`p-1 rounded-xl bg-bg-light dark:bg-bg-dark shadow-neu-pressed-light dark:shadow-neu-pressed-dark flex ${className}`}>
      {options.map((option) => {
        const isActive = activeId === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`
              flex-1 py-2 px-4 rounded-lg font-medium text-xs md:text-sm uppercase tracking-wider transition-all duration-300
              ${isActive 
                ? 'bg-bg-light dark:bg-bg-dark text-primary-light dark:text-primary-dark shadow-neu-light dark:shadow-neu-dark transform scale-[1.02]' 
                : 'text-text-light/50 dark:text-text-dark/50 hover:text-text-light dark:hover:text-text-dark'}
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
