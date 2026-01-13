import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NeuInput } from './NeuInput';
import { ConcaveCard } from './ConcaveCard';
import { EcologicalDiagram } from './EcologicalDiagram';
import { LCDBezel } from './LCDBezel';
import { publications, Publication } from '../data/portfolio';
import {
  FileText,
  X,
  User,
  Database,
  Search,
  Orbit,
  Network,
  Globe2,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Research: React.FC<{ setIsDetailOpen?: (isOpen: boolean) => void }> = ({ setIsDetailOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [activeSystems, setActiveSystems] = useState<Set<'Microsystem' | 'Mesosystem' | 'Macrosystem' | 'Chronosystem'>>(new Set());
  const [direction, setDirection] = useState(0);

  // Notify parent about detail view state
  useEffect(() => {
    if (setIsDetailOpen) {
      setIsDetailOpen(!!selectedPub);
    }
  }, [selectedPub, setIsDetailOpen]);

  // Lock body scroll logic
  useEffect(() => {
    if (selectedPub) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPub]);

  const filteredPubs = publications.filter(pub => 
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedIndex = selectedPub ? filteredPubs.findIndex(p => p.id === selectedPub.id) : -1;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex > 0) {
      setDirection(-1);
      setSelectedPub(filteredPubs[selectedIndex - 1]);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex < filteredPubs.length - 1) {
      setDirection(1);
      setSelectedPub(filteredPubs[selectedIndex + 1]);
    }
  };

  const handleClose = () => {
    setDirection(0);
    setSelectedPub(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPub) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPub, selectedIndex, filteredPubs]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : direction > 0 ? "-100%" : 0,
      opacity: 0
    })
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      
      {/* Ecological Diagram Section - Above Publications */}
      <div className="mb-16">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16 py-8 px-4 md:px-12">
          {/* Left controls */}
          <div className="shrink-0 max-w-lg">
            <div className="flex flex-col mb-4">
              <h3 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight mb-10 lg:mb-20 font-heading">
                Ecological Lens.
              </h3>
              
              <div className="flex flex-wrap grid grid-cols-2 lg:flex lg:flex-wrap gap-5 mb-10 lg:mb-14 order-last lg:order-none">
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
                      <div className="relative z-10 w-16 h-full hidden lg:flex items-center justify-center">
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

              <p className="text-lg md:text-xl font-normal text-text-light/80 dark:text-text-dark/80 leading-[30px] max-w-sm mt-0 lg:mt-10 mb-8 lg:mb-0 font-display">
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
               {/* Retro Camera LCD Counter - Unified bezel */}
               <LCDBezel
                 outerRadiusClassName="rounded-2xl"
                 trenchRadiusClassName="rounded-[14px]"
                 outerClassName="h-14 min-w-[92px]"
                 trenchClassName="w-full h-full"
                 trenchPaddingClassName="p-[3px]"
               >
                 <div className="w-full h-full bg-[#8aa899] rounded-[12px] flex flex-col items-center justify-center relative overflow-hidden">
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
               </LCDBezel>
            </div>
         </div>
      </div>

      {/* Publications Grid (No Panel) */}
      <div className="min-h-[500px]">
        <div className="grid grid-cols-1 gap-8">
          {/* Header Row (Hidden as we are moving to cards) */}
          
          {filteredPubs.map((pub) => (
            <motion.div 
              layoutId={`card-container-${pub.id}`}
              key={pub.id} 
              transition={{ duration: 0 }}
            >
              <ConcaveCard 
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
                    
                    <div className="col-span-12 md:col-span-8">
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
                 </div>
              </ConcaveCard>
            </motion.div>
          ))}
        </div>
      </div>

            {/* Detail Modal - Belgium Poster Style */}
      {createPortal(
        <AnimatePresence>
          {selectedPub && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="fixed inset-0 bg-black/80 z-[60] top-0 backdrop-blur-sm"
              />
              {/* Modal Container - Half shown / Bottom Sheet style */}
              <motion.div 
                key="modal-container"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 top-0 z-[70] flex justify-center pointer-events-none p-4 pb-0 pt-12 md:pt-20"
              >
                {/* Navigation Buttons */}
                <div className="absolute bottom-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto left-4 md:left-8 z-[80] pointer-events-auto">
                   {selectedIndex > 0 && (
                      <button 
                         onClick={handlePrev}
                         className="p-3 md:p-4 rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-sm border bg-black/10 hover:bg-black/20 text-black border-black/5 dark:bg-black/40 dark:hover:bg-black/60 dark:text-white dark:border-white/10 2xl:bg-white/10 2xl:hover:bg-white/20 2xl:text-white 2xl:border-white/10"
                      >
                         <ChevronLeft size={32} />
                      </button>
                   )}
                </div>
                <div className="absolute bottom-8 md:top-1/2 md:-translate-y-1/2 md:bottom-auto right-4 md:right-8 z-[80] pointer-events-auto">
                   {selectedIndex < filteredPubs.length - 1 && (
                      <button 
                         onClick={handleNext}
                         className="p-3 md:p-4 rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-sm border bg-black/10 hover:bg-black/20 text-black border-black/5 dark:bg-black/40 dark:hover:bg-black/60 dark:text-white dark:border-white/10 2xl:bg-white/10 2xl:hover:bg-white/20 2xl:text-white 2xl:border-white/10"
                      >
                         <ChevronRight size={32} />
                      </button>
                   )}
                </div>

                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.div 
                    key={selectedPub.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="w-full max-w-7xl h-full bg-[#f0f0f0] dark:bg-[#1a1a1a] shadow-2xl rounded-t-[30px] overflow-hidden pointer-events-auto flex flex-col relative will-change-transform"
                  >
                    {/* Close Button */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-6 right-6 z-50 p-2 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors backdrop-blur-md"
                    >
                        <X size={24} className="text-black dark:text-white" />
                    </button>

                    {/* Poster Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain">
                        <div className="min-h-full bg-white text-black p-8 md:p-16 relative overflow-hidden">
                            
                            {/* Top Header Info */}
                            <div className="relative z-10 flex justify-end gap-12 mb-32 pt-12 text-xs font-bold tracking-widest uppercase">
                                <div className="flex flex-col items-end">
                                    <span className="opacity-40 mb-1">Paper ID</span>
                                    <span className="text-2xl border-b-2 border-black pb-1 min-w-[60px] text-right">{selectedPub.id.toUpperCase()}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="opacity-40 mb-1">Conference</span>
                                    <span className="text-2xl border-b-2 border-black pb-1 min-w-[60px] text-right">{selectedPub.conference.split(' ')[0]}</span>
                                </div>
                            </div>

                            {/* Main Title */}
                            <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-['Oswald'] font-bold leading-[1.1] tracking-tight mb-16 max-w-5xl uppercase mix-blend-multiply text-[#1a1a1a]">
                                {selectedPub.title}
                            </h2>

                            {/* Content Columns */}
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
                                
                                {/* Left Column: Authors & Year */}
                                <div className="md:col-span-4 space-y-12">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 border-b border-black pb-2">Authors</h4>
                                        <ul className="space-y-2 font-bold text-sm">
                                            {selectedPub.authors.map((author, i) => (
                                                <li key={i} className={author === "Kefan Xu" ? "text-red-600" : ""}>
                                                    {author}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 border-b border-black pb-2">Year</h4>
                                        <div className="font-bold text-xl">{selectedPub.year}</div>
                                    </div>

                                    {selectedPub.tags && (
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 border-b border-black pb-2">Keywords</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPub.tags.map(tag => (
                                                    <span key={tag} className="text-xs font-bold px-2 py-1 bg-black text-white rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: Abstract & Extra Details */}
                                <div className="md:col-span-8 space-y-12">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 border-b border-black pb-2 font-sans">Abstract</h4>
                                        <p className="text-base font-serif font-normal leading-relaxed text-justify text-neutral-800">
                                            {selectedPub.abstract || "No abstract available."}
                                        </p>
                                    </div>

                                    {selectedPub.methodology && (
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 border-b border-black pb-2 font-sans">Methodology</h4>
                                            <p className="text-base font-serif font-normal leading-relaxed text-neutral-800">
                                                {selectedPub.methodology}
                                            </p>
                                        </div>
                                    )}

                                    {selectedPub.keyFindings && (
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 border-b border-black pb-2 font-sans">Key Findings</h4>
                                            <ul className="list-disc list-outside ml-4 space-y-2 text-base font-serif font-normal text-neutral-800">
                                                {selectedPub.keyFindings.map((finding, idx) => (
                                                    <li key={idx} className="pl-2">{finding}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {selectedPub.bibtex && (
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 border-b border-black pb-2 font-sans">BibTeX</h4>
                                            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-sm font-mono text-xs overflow-x-auto whitespace-pre text-neutral-600 dark:text-neutral-400">
                                                {selectedPub.bibtex}
                                            </div>
                                        </div>
                                    )}

                                    {selectedPub.doi && (
                                        <div className="mt-16 flex justify-end">
                                            <a href={selectedPub.doi} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 group">
                                                <span className="text-xs font-bold uppercase tracking-widest group-hover:underline">Read Full Paper</span>
                                                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <FileText size={20} />
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Decoration */}
                            <div className="mt-24 pt-8 border-t-4 border-black flex justify-between items-center font-black text-4xl tracking-tighter opacity-10">
                                <span>WEBSITE2026</span>
                                <span>{selectedPub.year}</span>
                            </div>
                        </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};