import React from 'react';
import { PillContainer } from './PillContainer';
import ducssLogo from '../assets/ducss.svg';

export const GlowingPill: React.FC = () => {
  return (
    <PillContainer>
       <div className="h-full flex flex-col items-center justify-between py-16 px-6 relative z-10">
           <div className="flex-grow flex items-center justify-center pb-32">
             <img 
               src={ducssLogo}   
               alt="Ducss Logo" 
               className="w-24 h-auto opacity-80 text-text-light dark:text-text-dark"
               style={{ 
                 filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' 
               }}
             />
           </div>
           <div className="space-y-1 text-center">
               <h3 className="text-lg font-bold text-text-light dark:text-text-dark tracking-wider">DUCSS</h3>
               <p className="text-[10px] font-medium text-text-light/60 dark:text-text-dark/60 uppercase tracking-widest">A Diabetic Foot Monitoring System</p>
           </div>
       </div>
    </PillContainer>
  );
};
