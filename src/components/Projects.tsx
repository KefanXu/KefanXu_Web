import React, { useState } from 'react';
import { NeuInput } from './NeuInput';
import { projects } from '../data/portfolio';
import { Calendar, Radio, ArrowUpRight, Cpu, Search, Activity, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { AbstractPattern } from './AbstractPattern';

import { GlowingPill } from './GlowingPill';
import { PillContainer } from './PillContainer';
import { ActivityMonitor } from './ActivityMonitor';
import { MedicalControls } from './MedicalControls';
import { DashboardPanel } from './DashboardPanel';

export const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter out DUCSS as it is now featured at the top
  const filteredProjects = projects.filter(proj => 
    proj.id !== 'ducss' && (
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const getProjectVisual = (id: string) => {
    switch (id) {
      case 'sedentary':
        return (
          <PillContainer>
             <div className="h-full w-full flex flex-col items-center justify-between py-16 px-6 relative z-10">
                <div className="flex-grow flex items-center justify-center pb-32">
                   <Activity 
                     size={96} 
                     strokeWidth={1}
                     className="text-text-light dark:text-text-dark opacity-80 drop-shadow-md"
                   />
                </div>
                <div className="text-center">
                   <h3 className="text-lg font-bold text-text-light dark:text-text-dark tracking-wider uppercase mb-2">Activity Monitor</h3>
                   <p className="text-[10px] font-medium text-text-light/60 dark:text-text-dark/60 uppercase tracking-widest">Sedentary Behavior Analysis</p>
                </div>
             </div>
          </PillContainer>
        );
      case 'ptsd':
        return (
          <PillContainer>
             <div className="h-full w-full flex flex-col items-center justify-between py-16 px-6 relative z-10">
                <div className="flex-grow flex items-center justify-center pb-32">
                   <Brain 
                     size={96} 
                     strokeWidth={1}
                     className="text-text-light dark:text-text-dark opacity-80 drop-shadow-md"
                   />
                </div>
                <div className="text-center">
                   <h3 className="text-lg font-bold text-text-light dark:text-text-dark tracking-wider uppercase mb-2">PTSD System</h3>
                   <p className="text-[10px] font-medium text-text-light/60 dark:text-text-dark/60 uppercase tracking-widest">Clinical Support Interface</p>
                </div>
             </div>
          </PillContainer>
        );
      default:
        return (
          <PillContainer>
             <div className="h-full w-full flex items-center justify-center opacity-50 relative z-10">
               <AbstractPattern id={id} />
             </div>
          </PillContainer>
        );
    }
  };

  return (
    <div className="space-y-32 max-w-7xl mx-auto">
      
       <div className="flex flex-col gap-6 mb-16">
         {/* Section Header */}
         <div className="flex items-center gap-3 border-b border-text-light/10 dark:border-text-dark/10 pb-4">
            <Cpu size={20} className="text-blue-500" />
            <div>
                <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Projects</h2>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono">Selected Works</p>
            </div>
         </div>

         {/* Search Bar */}
         <div className="w-full md:w-1/2">
           <label className="text-[10px] uppercase font-bold text-text-light/50 dark:text-text-dark/50 mb-2 block tracking-wider flex items-center gap-2">
             <Search size={12} /> Search Projects
           </label>
           <NeuInput 
             placeholder="Enter search terms..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="font-mono text-sm"
           />
         </div>
       </div>

      {/* Featured Project: DUCSS (Top) */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
        {/* Left: Glowing Pill */}
        <div className="shrink-0 transform scale-90 lg:scale-100 flex justify-center w-full lg:w-auto">
           <GlowingPill />
        </div>

        {/* Right: Text Description */}
        <div className="max-w-xl">
            <h3 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight mb-10 font-heading">
              Diabetes Ubiquitous Computational Sensing System.
            </h3>
            
            <div className="space-y-8 text-lg md:text-xl font-normal text-text-light/80 dark:text-text-dark/80 leading-[30px] font-display">
               <p>
                 Designing user studies to uncover diabetes patients' <span className="font-bold text-text-light dark:text-text-dark">self-management challenges</span>.
               </p>
               <p>
                 Exploring <span className="font-bold text-text-light dark:text-text-dark">caregiving dynamics</span> in diabetes management.
               </p>
               <p>
                 Leading the creation of <span className="font-bold text-text-light dark:text-text-dark">patient-empowering sensors</span> and mobile technologies.
               </p>
            </div>
            
             <div className="mt-8 flex gap-2">
                 {['Health Informatics', 'Diabetes', 'Sensing'].map(tag => (
                   <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-black/5 dark:bg-white/5 text-text-light/50 dark:text-text-dark/50 tracking-wider">
                     {tag}
                   </span>
                 ))}
             </div>
        </div>
      </div>
      
      {/* Other Projects List (Staggered) */}
      <div className="space-y-32">
        {filteredProjects.map((proj, index) => {
           // index 0 (Sedentary) -> Image Right, Text Left
           // index 1 (PTSD) -> Image Left, Text Right
           // ...
           const isImageRight = index % 2 === 0;

           return (
             <div key={proj.id} className={`flex flex-col ${isImageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-24`}>
                
                {/* Visual Artifact */}
                <motion.div 
                  className="shrink-0 flex justify-center w-full lg:w-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                   {getProjectVisual(proj.id)}
                </motion.div>

                {/* Text Content */}
                <motion.div 
                  className="max-w-xl"
                  initial={{ opacity: 0, x: isImageRight ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-center gap-2 text-xs font-mono text-text-light/40 dark:text-text-dark/40 uppercase mb-4 tracking-widest">
                      <Calendar size={14} />
                      {proj.period}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight mb-10 font-heading">
                      {proj.title}
                    </h3>

                    <div className="space-y-8 text-lg md:text-xl font-normal text-text-light/80 dark:text-text-dark/80 leading-[30px] font-display">
                        {proj.description.map((desc, i) => (
                           <p key={i}>
                             {/* Simple highlighting logic for demo, ideally passed from data */}
                             {desc.split(' ').map((word, wI) => (
                               ['studies', 'sensors', 'clinicians', 'technologies', 'contextual', 'physical'].some(k => word.toLowerCase().includes(k)) 
                               ? <span key={wI} className="font-bold text-text-light dark:text-text-dark">{word} </span>
                               : word + ' '
                             ))}
                           </p>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {proj.tags?.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-black/5 dark:bg-white/5 text-text-light/50 dark:text-text-dark/50 tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                </motion.div>
             </div>
           );
        })}
      </div>
    </div>
  );
};
