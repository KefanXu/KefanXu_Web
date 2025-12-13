import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface ToggleSwitchProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  isChecked, 
  onChange, 
  label
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
         <span className="text-[10px] font-bold text-text-light/40 dark:text-text-dark/40 uppercase tracking-wider">OFF</span>
         
         {/* Recessed Track */}
         <div 
            className="w-24 h-12 rounded-xl bg-bg-light dark:bg-bg-dark shadow-neu-pressed-light dark:shadow-neu-pressed-dark p-1.5 cursor-pointer relative"
            onClick={() => onChange(!isChecked)}
         >
            {/* Rocker Button */}
            <motion.div
               className="w-10 h-full rounded-lg bg-bg-light dark:bg-bg-dark shadow-neu-light dark:shadow-neu-dark flex items-center justify-center border border-white/20 dark:border-white/5 relative z-10"
               animate={{ 
                  x: isChecked ? '100%' : '0%' 
               }}
               transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
               {/* Texture Lines */}
               <div className="flex gap-[3px]">
                  <div className="w-[1px] h-4 bg-text-light/20 dark:text-text-dark/20" />
                  <div className="w-[1px] h-4 bg-text-light/20 dark:text-text-dark/20" />
                  <div className="w-[1px] h-4 bg-text-light/20 dark:text-text-dark/20" />
               </div>

               {/* Active Gradient Overlay (Subtle) */}
               {isChecked && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-transparent to-white/10 pointer-events-none" />
               )}
            </motion.div>
         </div>

         <span className="text-[10px] font-bold text-text-light/40 dark:text-text-dark/40 uppercase tracking-wider">ON</span>
      </div>
      
      {label && <span className="text-[9px] font-mono uppercase opacity-50 tracking-widest">{label}</span>}
    </div>
  );
};

interface ToggleSmallProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const ToggleSmall: React.FC<ToggleSmallProps> = ({ 
   isChecked, 
   onChange, 
   label
 }) => {
   return (
     <div className="flex items-center gap-3">
       {/* Toggle Track */}
       <div 
         className="w-12 h-6 rounded-full bg-bg-light dark:bg-bg-dark shadow-neu-pressed-light dark:shadow-neu-pressed-dark p-[2px] cursor-pointer relative"
         onClick={() => onChange(!isChecked)}
       >
         {/* Knob */}
         <motion.div
           className="w-5 h-5 rounded-full bg-bg-light dark:bg-bg-dark shadow-neu-light dark:shadow-neu-dark border border-white/20 dark:border-white/5"
           animate={{ x: isChecked ? 24 : 0 }}
           transition={{ type: "spring", stiffness: 500, damping: 30 }}
         />
       </div>
 
       {/* Indicator Dot */}
       <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isChecked ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]' : 'bg-gray-300 dark:bg-gray-600'}`} />
       
       {label && <span className="text-[9px] font-mono uppercase opacity-50 tracking-widest ml-1">{label}</span>}
     </div>
   );
 };

interface SwipeButtonProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const SwipeButton: React.FC<SwipeButtonProps> = ({ isChecked, onChange, label }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className="w-32 h-14 rounded-2xl bg-bg-light dark:bg-bg-dark shadow-neu-pressed-light dark:shadow-neu-pressed-dark p-2 relative cursor-pointer overflow-hidden flex items-center"
        onClick={() => onChange(!isChecked)}
      >
         {/* Arrow Icon in Track */}
         <div className={`absolute left-4 text-text-light/30 dark:text-text-dark/30 transition-opacity duration-300 ${isChecked ? 'opacity-0' : 'opacity-100'}`}>
            <ArrowLeft size={16} />
         </div>

         {/* Handle */}
         <motion.div 
           className="absolute top-2 bottom-2 w-12 rounded-xl bg-bg-light dark:bg-bg-dark shadow-neu-light dark:shadow-neu-dark flex items-center justify-center border border-white/20 dark:border-white/5 z-10"
           animate={{ 
             left: isChecked ? 'calc(100% - 3.5rem)' : '0.5rem'
           }}
           transition={{ type: "spring", stiffness: 400, damping: 30 }}
         >
            {/* Grip Dots */}
            <div className="grid grid-cols-2 gap-1 opacity-40">
               <div className="w-1 h-1 rounded-full bg-text-light dark:text-text-dark bg-current" />
               <div className="w-1 h-1 rounded-full bg-text-light dark:text-text-dark bg-current" />
               <div className="w-1 h-1 rounded-full bg-text-light dark:text-text-dark bg-current" />
               <div className="w-1 h-1 rounded-full bg-text-light dark:text-text-dark bg-current" />
            </div>
         </motion.div>
         
         {/* Active State Background Fill (Optional/Subtle) */}
         <motion.div 
            className="absolute inset-0 bg-blue-500/5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isChecked ? 1 : 0 }}
         />

      </div>
      {label && <span className="text-[8px] font-mono uppercase opacity-50 tracking-widest">{label}</span>}
    </div>
  );
};
