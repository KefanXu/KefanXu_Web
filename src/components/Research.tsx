import React, { useState } from 'react';
import { NeuCard } from './NeuCard';
import { NeuInput } from './NeuInput';
import { NeuButton } from './NeuButton';
import { TiltCard } from './TiltCard';
import { EcologicalDiagram } from './EcologicalDiagram';
import { publications, Publication } from '../data/portfolio';
import {
  FileText,
  X,
  User,
  Tag,
  Database,
  Search,
  ChevronRight,
  Orbit,
  Network,
  Globe2,
  Clock3,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Research: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [activeSystems, setActiveSystems] = useState<Set<'Microsystem' | 'Mesosystem' | 'Macrosystem' | 'Chronosystem'>>(new Set());

  const filteredPubs = publications.filter(pub => 
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      
      {/* Ecological Diagram Section - Above Publications */}
      <div className="mb-16">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16 py-8 px-4 md:px-12">
          {/* Left controls */}
          <div className="shrink-0 max-w-lg">
            <div className="mb-4">
              <h3 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight mb-20 font-heading">
                Ecological Lens.
              </h3>
              
              <div className="flex flex-wrap grid grid-cols-2 lg:flex lg:flex-wrap gap-5 mb-24">
              {(['Microsystem', 'Mesosystem', 'Macrosystem', 'Chronosystem'] as const).map((label) => {
                const isActive = activeSystems.has(label);
                const Icon =
                  label === 'Microsystem'
                    ? Orbit
                    : label === 'Mesosystem'
                      ? Network
                      : label === 'Macrosystem'
                        ? Globe2
                        : Clock3;
                return (
                  <button key={label} type="button" onClick={() => {
                    const newActiveSystems = new Set(activeSystems);
                    if (isActive) {
                      newActiveSystems.delete(label);
                    } else {
                      newActiveSystems.add(label);
                    }
                    setActiveSystems(newActiveSystems);
                  }} className="group select-none">
                    <div
                      className={`relative h-16 w-full lg:w-[280px] rounded-2xl bg-bg-light dark:bg-bg-dark
                        border border-transparent
                        flex items-center overflow-hidden transition-colors`}
                    >
                      {/* Engraved border only (plain surface) */}
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none
                          shadow-[inset_1px_1px_2px_rgba(0,0,0,0.10),inset_-1px_-1px_2px_rgba(255,255,255,0.55)]
                          dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.55),inset_-1px_-1px_2px_rgba(255,255,255,0.06)]"
                      />

                      {/* Left segment */}
                      <div className="relative z-10 flex-1 h-full flex items-center gap-4 pl-5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-text-light/20 dark:bg-text-dark/20'}`} />
                        <span className="text-xs font-bold uppercase tracking-widest text-text-light/60 dark:text-text-dark/60">
                          {label}
                        </span>
                      </div>

                      {/* Right segment */}
                      <div className="relative z-10 w-16 h-full flex items-center justify-center">
                        {/* Neumorphic toggle switch (visual only; whole button toggles) */}
                        <div
                          className={`relative w-12 h-7 rounded-full transition-all duration-300
                            bg-bg-light dark:bg-bg-dark
                            border border-text-light/5 dark:border-text-dark/5
                            shadow-[inset_2px_2px_4px_rgba(0,0,0,0.10),inset_-2px_-2px_4px_rgba(255,255,255,0.70)]
                            dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.55),inset_-2px_-2px_4px_rgba(255,255,255,0.06)]
                            ${isActive ? 'ring-1 ring-blue-500/30' : ''}`}
                        >
                          {/* Slider knob */}
                          <div
                            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center
                              bg-bg-light dark:bg-bg-dark
                              shadow-[2px_2px_5px_rgba(0,0,0,0.12),-2px_-2px_5px_rgba(255,255,255,0.75)]
                              dark:shadow-[2px_2px_6px_rgba(0,0,0,0.65),-2px_-2px_6px_rgba(255,255,255,0.06)]
                              transition-transform duration-300 ease-out
                              ${isActive ? 'translate-x-5' : 'translate-x-0'}`}
                          >
                            <Icon
                              size={14}
                              className={`transition-all duration-300 ${
                                isActive
                                  ? 'text-blue-500 dark:text-blue-400 opacity-100'
                                  : 'text-text-light dark:text-text-dark opacity-40'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
              </div>

              <p className="text-lg md:text-xl font-normal text-text-light/80 dark:text-text-dark/80 leading-[30px] max-w-sm mt-10 font-display">
                My research applies an <span className="font-bold text-text-light dark:text-text-dark">ecological lens</span> that situates individuals at the center of multiple interconnected layers, aiming to investigate how the information is transiting between and how the ecology evolves over time.
              </p>
            </div>
          </div>

          {/* Right: Diagram (kept on right, but closer to controls) */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <EcologicalDiagram activeSystems={activeSystems} />
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-text-light/10 dark:border-text-dark/10 pb-4">
          <Database size={20} className="text-blue-500" />
          <div>
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Publications</h2>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono">Selected Works</p>
          </div>
      </div>

      {/* Search & Filter Section (No Panel) */}
      <div>
         <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 w-full">
               <label className="text-[10px] uppercase font-bold text-text-light/50 dark:text-text-dark/50 mb-2 block tracking-wider flex items-center gap-2">
                 <Search size={12} /> Search Keywords / Tags
               </label>
               <NeuInput 
                placeholder="Enter search terms..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex gap-2 h-full">
               {/* Retro Camera LCD Counter - Embedded directly */}
               <div className="bg-[#8aa899] px-4 h-14 rounded-2xl shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center min-w-[80px] relative overflow-hidden border border-white/10 dark:border-white/5">
                  {/* Pixel Grid Overlay */}
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
                       style={{ 
                         backgroundImage: 'linear-gradient(to right, #1a2f23 1px, transparent 1px), linear-gradient(to bottom, #1a2f23 1px, transparent 1px)',
                         backgroundSize: '3px 3px'
                       }} 
                  />
                  <span className="text-[7px] font-bold text-[#1a2f23] opacity-60 uppercase tracking-widest mb-0.5 relative z-10">Count</span>
                  <span className="font-mono text-xl font-bold text-[#1a2f23] leading-none tracking-widest relative z-10">
                    {filteredPubs.length.toString().padStart(2, '0')}
                  </span>
               </div>
            </div>
         </div>
      </div>

      {/* Publications Grid (No Panel) */}
      <div className="min-h-[500px]">
        <div className="grid grid-cols-1 gap-8">
          {/* Header Row (Hidden as we are moving to cards) */}
          
          {filteredPubs.map((pub, index) => (
            <motion.div 
              layoutId={`card-container-${pub.id}`}
              key={pub.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard 
                onClick={() => setSelectedPub(pub)}
                className="cursor-pointer group"
              >
                 <div className="md:grid md:grid-cols-12 md:gap-6 md:items-center">
                    
                    {/* ID Status Line (Mobile) */}
                    <div className="col-span-12 flex md:hidden justify-between items-center mb-4 text-xs font-mono opacity-50">
                       <span>#{pub.id.toUpperCase()}</span>
                       <span>{pub.year}</span>
                    </div>

                    {/* Desktop Columns */}
                    <div className="hidden md:flex col-span-1 font-mono text-xs opacity-30 justify-center items-center h-full border-r border-black/5 dark:border-white/5">
                        <div className="-rotate-90 whitespace-nowrap tracking-widest font-bold">#{pub.id.toUpperCase()}</div>
                    </div>
                    
                    <div className="col-span-12 md:col-span-7">
                       <h3 className="font-bold text-lg md:text-xl text-text-light dark:text-text-dark group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                         {pub.title}
                       </h3>
                       <div className="flex items-center gap-2 text-xs text-text-light/60 dark:text-text-dark/60">
                         <User size={12} />
                         <span className="truncate max-w-md font-mono">{pub.authors.join(", ")}</span>
                       </div>
                    </div>

                    <div className="col-span-12 md:col-span-3 mt-4 md:mt-0 flex flex-col justify-center items-start md:items-end">
                       <div className="text-right">
                           <span className="text-xs font-mono font-bold text-blue-500 block mb-1">{pub.conference}</span>
                           <span className="text-[10px] font-bold text-text-light/40 dark:text-text-dark/40 uppercase tracking-widest">{pub.year}</span>
                       </div>
                    </div>

                    <div className="col-span-12 md:col-span-1 flex justify-end mt-4 md:mt-0">
                       <div className="w-10 h-10 rounded-full bg-bg-light dark:bg-bg-dark shadow-neu-light dark:shadow-neu-dark flex items-center justify-center text-text-light/40 group-hover:text-blue-500 transition-all">
                          <ChevronRight size={20} />
                       </div>
                    </div>
                 </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPub && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPub(null)}
              className="fixed inset-0 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md z-[60]"
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
              <motion.div 
                layoutId={`card-container-${selectedPub.id}`}
                className="w-full max-w-3xl pointer-events-auto"
              >
                <NeuCard className="overflow-hidden flex flex-col relative shadow-2xl shadow-blue-900/20 border-t-4 border-blue-500">
                  
                  {/* Modal Header */}
                  <div className="p-8 pb-4 bg-bg-light dark:bg-bg-dark relative">
                    <button 
                      onClick={() => setSelectedPub(null)}
                      className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <X size={24} />
                    </button>
                    
                    <div className="flex items-center gap-3 mb-4 opacity-50 font-mono text-xs uppercase tracking-widest">
                      <Database size={14} />
                      <span>Paper ID: {selectedPub.id.toUpperCase()}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark leading-tight mb-6">
                       {selectedPub.title}
                    </h2>

                    <div className="flex flex-wrap gap-2 text-sm text-text-light/70 dark:text-text-dark/70 leading-relaxed font-mono">
                      {selectedPub.authors.map((author, i) => (
                         <span key={i} className={author === "Kefan Xu" ? "font-bold text-blue-600 dark:text-blue-400" : ""}>
                           {author}{i < selectedPub.authors.length - 1 ? "," : ""}
                         </span>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="p-8 pt-0 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                       <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                          <div className="text-[10px] uppercase font-bold text-blue-500 mb-1">Venue</div>
                          <div className="font-mono text-lg font-bold">{selectedPub.conference}</div>
                       </div>
                       <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/10">
                          <div className="text-[10px] uppercase font-bold text-purple-500 mb-1">Year</div>
                          <div className="font-mono text-lg font-bold">{selectedPub.year}</div>
                       </div>
                       <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10">
                          <div className="text-[10px] uppercase font-bold text-green-500 mb-1">Status</div>
                          <div className="font-mono text-lg font-bold">PUBLISHED</div>
                       </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-light/40 dark:text-text-dark/40 mb-3 border-b border-text-light/10 dark:border-text-dark/10 pb-2">
                        <FileText size={14} /> Abstract
                      </h4>
                      <p className="text-text-light/80 dark:text-text-dark/80 leading-relaxed text-justify font-light text-sm md:text-base">
                        {selectedPub.abstract || "No abstract available."}
                      </p>
                    </div>

                    {selectedPub.tags && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {selectedPub.tags.map(tag => (
                          <span key={tag} className="flex items-center gap-1 text-[10px] uppercase font-bold px-3 py-1.5 rounded bg-black/5 dark:bg-white/5 text-text-light/60 dark:text-text-dark/60">
                            <Tag size={10} /> {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {selectedPub.doi && (
                       <a href={selectedPub.doi} target="_blank" rel="noopener noreferrer" className="block">
                         <NeuButton className="w-full justify-center py-4 font-mono font-bold uppercase tracking-widest text-xs hover:text-blue-500">
                           <FileText size={16} className="mr-2" />
                           Read Paper
                         </NeuButton>
                       </a>
                    )}
                  </div>
                </NeuCard>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
