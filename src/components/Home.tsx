import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { GraduationCap, Linkedin, Mail, X, Download } from 'lucide-react';
import { Hero } from './Hero';
import { MoonClock } from './MoonClock';
import { ProfileMatrix } from './ProfileMatrix';
import { AnimatePresence, motion } from 'framer-motion';
import cvPdf from '../assets/KefanXu_CV.pdf';

// Helper component for a single moon phase
const MoonPhase: React.FC<{ phase: number; isActive: boolean }> = ({ phase, isActive }) => {
  const getMaskStyle = (p: number) => {
    if (p === 3) return { display: 'none' }; // Full moon (No shadow mask)

    const transforms = [
      'translateX(-25%) scale(1.1)', // 0: Waxing Crescent - Shadow on Left
      'translateX(-40%) scale(1.1)', // 1: Quarter
      'translateX(-55%) scale(1.1)', // 2: Gibbous
      'none', // 3: Full
      'translateX(55%) scale(1.1)', // 4: Waning Gibbous - Shadow on Right
      'translateX(40%) scale(1.1)', // 5: Quarter
      'translateX(25%) scale(1.1)', // 6: Waning Crescent
    ];

    return {
      transform: transforms[p],
      display: 'block',
    };
  };

  return (
    <div
      className={`relative flex flex-col items-center gap-4 transition-all duration-500 ${
        isActive ? 'opacity-100 scale-110' : 'opacity-20 scale-100'
      }`}
    >
      {/* Red Dot Indicator */}
      <div className={`w-1.5 h-1.5 rounded-full bg-red-500 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

      {/* Moon Body */}
      <div className="relative w-10 h-10 rounded-full bg-text-light dark:bg-text-dark overflow-hidden">
        {/* Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Shadow Mask (Bg Color) */}
        <div
          className="absolute inset-0 bg-bg-light dark:bg-bg-dark rounded-full transition-all duration-500 ease-in-out"
          style={getMaskStyle(phase) as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const [currentMoonPhase, setCurrentMoonPhase] = useState(0.5); // 0 to 1
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isHealthInformaticsHovered, setIsHealthInformaticsHovered] = useState(false);
  const [isGTHovered, setIsGTHovered] = useState(false);
  const [isGraduationCapHovered, setIsGraduationCapHovered] = useState(false);
  const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);
  const [isMailHovered, setIsMailHovered] = useState(false);
  const [isCVHovered, setIsCVHovered] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);

  // Map slider (0-1) to 7 distinct phases (0-6)
  const activePhaseIndex = Math.min(Math.floor(currentMoonPhase * 7), 6);

  // Auto-scroll logic
  useEffect(() => {
    if (!timelineRef.current) return;
    const container = timelineRef.current;
    const activeItem = container.children[activePhaseIndex] as HTMLElement | undefined;
    if (!activeItem) return;

    const containerCenter = container.offsetWidth / 2;
    const itemCenter = activeItem.offsetLeft + activeItem.offsetWidth / 2;
    const scrollLeft = itemCenter - containerCenter;

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }, [activePhaseIndex]);

  const handleMoonPhaseClick = (phaseIndex: number) => {
    // Set the exact phase value (0-6 maps to 0-1)
    const exactPhase = phaseIndex / 6;
    setCurrentMoonPhase(exactPhase);

    // Scroll to center the clicked item
    requestAnimationFrame(() => {
      if (!timelineRef.current) return;
      const container = timelineRef.current;
      const clickedItem = container.children[phaseIndex] as HTMLElement | undefined;
      if (!clickedItem) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.width / 2;
      const itemCenter = clickedItem.offsetLeft + clickedItem.offsetWidth / 2;
      const scrollLeft = itemCenter - containerCenter;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    });
  };

  return (
    <div className="flex flex-col gap-24 max-w-7xl mx-auto mb-20">
      {/* Intro Section (Hero) */}
      <Hero />

      {/* Introduction Section (Added below Hero) */}
      <div className="grid lg:grid-cols-2 gap-16 items-center px-4 md:px-12 pt-20 pb-32 mb-32">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-6 text-lg md:text-xl font-display leading-relaxed text-text-light/80 dark:text-text-dark/80">
            <p>
              A PhD student at the{' '}
              <span
                className="font-bold text-text-light dark:text-text-dark cursor-pointer transition-colors"
                onMouseEnter={() => setIsGTHovered(true)}
                onMouseLeave={() => setIsGTHovered(false)}
              >
                Georgia Institute of Technology
              </span>
              , advised by <span className="font-bold text-text-light dark:text-text-dark">Dr. Rosa I. Arriaga</span>.
            </p>
            <p>
              I am working in the field of{' '}
              <span
                className="font-bold text-text-light dark:text-text-dark cursor-pointer transition-colors"
                onMouseEnter={() => setIsHealthInformaticsHovered(true)}
                onMouseLeave={() => setIsHealthInformaticsHovered(false)}
              >
                health informatics
              </span>
              , seeking a path to benefit people's well-being with technologies.
            </p>
          </div>

          <div className="pt-4 border-t border-text-light/10 dark:border-text-dark/10">
            <p className="text-sm font-bold text-text-light/60 dark:text-text-dark/60 mb-1 uppercase tracking-widest font-mono">Contact</p>
            <a href="mailto:kefanxu@gatech.edu" className="text-lg font-mono font-bold text-blue-500 hover:text-blue-600 transition-colors">
              kefanxu@gatech.edu
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="https://scholar.google.com/citations?user=ocdZFbwAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-bg-light dark:bg-bg-dark shadow-neu-light dark:shadow-neu-dark flex items-center justify-center text-text-light/60 dark:text-text-dark/60 hover:text-blue-500 transition-all hover:scale-110 active:scale-95"
              onMouseEnter={() => setIsGraduationCapHovered(true)}
              onMouseLeave={() => setIsGraduationCapHovered(false)}
            >
              <GraduationCap size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/kefan-xu-8a8b2b1b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-bg-light dark:bg-bg-dark shadow-neu-light dark:shadow-neu-dark flex items-center justify-center text-text-light/60 dark:text-text-dark/60 hover:text-blue-500 transition-all hover:scale-110 active:scale-95"
              onMouseEnter={() => setIsLinkedinHovered(true)}
              onMouseLeave={() => setIsLinkedinHovered(false)}
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:kefanxu@gatech.edu"
              className="w-12 h-12 rounded-xl bg-bg-light dark:bg-bg-dark shadow-neu-light dark:shadow-neu-dark flex items-center justify-center text-text-light/60 dark:text-text-dark/60 hover:text-blue-500 transition-all hover:scale-110 active:scale-95"
              onMouseEnter={() => setIsMailHovered(true)}
              onMouseLeave={() => setIsMailHovered(false)}
            >
              <Mail size={24} />
            </a>
            <button
              onClick={() => setIsCVOpen(true)}
              className="w-12 h-12 rounded-xl bg-bg-light dark:bg-bg-dark shadow-neu-light dark:shadow-neu-dark flex items-center justify-center text-text-light/60 dark:text-text-dark/60 hover:text-blue-500 transition-all hover:scale-110 active:scale-95 group"
              onMouseEnter={() => setIsCVHovered(true)}
              onMouseLeave={() => setIsCVHovered(false)}
            >
              <span className="font-bold font-mono text-lg">CV</span>
            </button>
          </div>
        </div>

        {/* Right: Interactive Matrix (Visual) */}
        <div className="hidden lg:flex justify-center items-center mt-12 lg:mt-0">
          <ProfileMatrix
            showCross={isHealthInformaticsHovered && !isGTHovered && !isGraduationCapHovered && !isLinkedinHovered && !isMailHovered && !isCVHovered}
            showGTLogo={isGTHovered && !isGraduationCapHovered && !isLinkedinHovered && !isMailHovered && !isCVHovered}
            showGraduationCap={isGraduationCapHovered}
            showLinkedin={isLinkedinHovered}
            showMail={isMailHovered}
            showCV={isCVHovered}
          />
        </div>
      </div>

      {/* Research Vision Section - Redesigned */}
      <div id="investigating-life" className="flex flex-col lg:flex-row gap-16 items-center px-4 md:px-12 mt-24 w-full max-w-7xl mx-auto scroll-mt-32">
        {/* Left: Playful Interaction */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <MoonClock value={currentMoonPhase} onSliderChange={(val) => setCurrentMoonPhase(val / 100)} />
        </div>

        {/* Right: Plain Text & Vision */}
        <div className="w-full lg:w-1/2 space-y-12 relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight mb-6 font-heading">
              Investigating Life Transitions.
            </h2>

            <div ref={timelineRef} className="flex gap-8 mb-24 overflow-x-auto pb-4 md:pb-0 pt-12 items-end scrollbar-hide snap-x">
              {['Life changes', 'Reflection', 'Sense making', 'Coping', 'Iteration', 'Improving', 'Progressing'].map((step, i) => {
                const phaseIndex = i;
                const isActive = activePhaseIndex === phaseIndex;

                return (
                  <div
                    key={i}
                    className="flex-shrink-0 flex flex-col items-center gap-4 group cursor-pointer"
                    onClick={() => handleMoonPhaseClick(phaseIndex)}
                  >
                    <MoonPhase phase={phaseIndex} isActive={isActive} />
                    <span
                      className={`text-[10px] font-bold tracking-widest mt-2 transition-colors uppercase ${
                        isActive ? 'text-text-light dark:text-text-dark' : 'text-text-light/40 dark:text-text-dark/40'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Updated per your earlier CSS change: 300 -> 400 */}
            <p className="text-lg md:text-xl font-normal text-text-light/80 dark:text-text-dark/80 leading-[30px] max-w-xl font-display">
              I am intrigued by how individuals <span className="font-bold text-text-light dark:text-text-dark">comprehend and adjust to life transitions</span>, while also delving
              into the designing technologies to assist individuals in <span className="font-bold text-text-light dark:text-text-dark">navigating such transitions</span>.
            </p>
          </div>
        </div>
      </div>
      
      {/* CV Modal */}
      {createPortal(
        <AnimatePresence>
          {isCVOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCVOpen(false)}
                className="fixed inset-0 bg-black/80 z-[60] top-0 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 top-0 z-[70] flex justify-center pointer-events-none p-4 pb-0 pt-12 md:pt-20"
              >
                <motion.div 
                  className="w-full max-w-7xl h-full bg-[#f0f0f0] dark:bg-[#1a1a1a] shadow-2xl rounded-t-[30px] overflow-hidden pointer-events-auto flex flex-col relative will-change-transform"
                >
                    {/* Close Button */}
                    <button 
                        onClick={() => setIsCVOpen(false)}
                        className="absolute top-6 right-6 z-50 p-2 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors backdrop-blur-md"
                    >
                        <X size={24} className="text-black dark:text-white" />
                    </button>

                    {/* PDF Content */}
                    <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-neutral-900 relative">
                        {/* Header Bar */}
                        <div className="flex justify-between items-center p-6 pr-20 border-b border-black/10 dark:border-white/10 bg-bg-light dark:bg-bg-dark">
                            <h2 className="text-xl md:text-2xl font-bold text-text-light dark:text-text-dark font-heading uppercase tracking-widest">Curriculum Vitae</h2>
                            <a 
                                href={cvPdf} 
                                download="KefanXu_CV.pdf"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-colors"
                            >
                                <Download size={16} />
                                <span className="hidden md:inline">Download PDF</span>
                            </a>
                        </div>
                        
                        {/* PDF Viewer */}
                        <div className="flex-1 w-full h-full bg-gray-100 dark:bg-gray-900">
                           <iframe src={cvPdf} className="w-full h-full border-none" title="CV PDF" />
                        </div>
                    </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
