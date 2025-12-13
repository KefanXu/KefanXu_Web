import React, { useState } from 'react';
import { NeuCard } from './NeuCard';
import { NeuInput } from './NeuInput';
import { projects } from '../data/portfolio';
import { Calendar, Radio, ArrowUpRight, Cpu, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { AbstractPattern } from './AbstractPattern';

// Live Monitor Component for Project Cards
const LiveMonitor = () => {
  return (
    <div className="flex items-end gap-[2px] h-6 w-16 opacity-50">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="w-full bg-green-500 rounded-t-[1px]"
          animate={{
            height: ["20%", "90%", "30%"],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

export const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(proj => 
    proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proj.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      
       {/* Section Header */}
       <div className="flex items-center gap-3 border-b border-text-light/10 dark:border-text-dark/10 pb-4">
          <Cpu size={20} className="text-blue-500" />
          <div>
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Projects</h2>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono">Selected Works</p>
          </div>
       </div>

       {/* Search Bar */}
       <div className="flex flex-col gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj, index) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NeuCard className="h-full flex flex-col overflow-hidden group hover:border-blue-500/50 transition-colors duration-300 border-2 border-transparent">
               
               {/* Header / Status */}
               <div className="relative h-40 overflow-hidden bg-black/5 dark:bg-white/5 border-b border-text-light/5 dark:border-text-dark/5">
                  <AbstractPattern id={proj.id} className="opacity-40 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Status Overlay */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                     <div className="px-2 py-1 rounded bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur border border-text-light/10 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider">Active</span>
                     </div>
                     <LiveMonitor />
                  </div>

                  {/* Role Badge */}
                  <div className="absolute bottom-4 left-4">
                    {proj.role && (
                      <span className="bg-blue-500 text-white text-[9px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider">
                        {proj.role}
                      </span>
                    )}
                  </div>
               </div>

               <div className="p-6 flex flex-col flex-grow relative">
                  {/* Decorative Scan Line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-text-light/40 dark:text-text-dark/40 uppercase mb-2">
                      <Calendar size={12} />
                      {proj.period}
                    </div>
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark leading-tight group-hover:text-blue-500 transition-colors">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                     {proj.description.slice(0, 2).map((desc, i) => (
                       <div key={i} className="flex gap-2 text-xs text-text-light/70 dark:text-text-dark/70">
                         <Radio size={12} className="shrink-0 mt-0.5 text-blue-500/50" />
                         <p className="line-clamp-2">{desc}</p>
                       </div>
                     ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-text-light/10 dark:border-text-dark/10 flex justify-between items-end">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-text-light/50 dark:text-text-dark/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                       <ArrowUpRight size={16} />
                    </div>
                  </div>
               </div>
            </NeuCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
