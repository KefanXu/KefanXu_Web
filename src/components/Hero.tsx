import React, { useRef, useState } from 'react';
import { ToggleSwitch, ToggleSmall } from './NeuControls';
import { Shield, Database, Hash } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { SnakeGame } from './SnakeGame';

export const Hero: React.FC = () => {
  const [power, setPower] = useState(true);
  const [backlight, setBacklight] = useState(true); // Default to TRUE (Green Backlight)
  const [secureMode, setSecureMode] = useState(false);
  
  // Right side states
  const [bioMetrics, setBioMetrics] = useState(false);
  const [consoleLock, setConsoleLock] = useState(false);
  // Removed haptics state as it is now just a static indicator

  // Check if Easter Egg condition is met (All 5 switches ON)
  const isEasterEggActive = power && backlight && secureMode && bioMetrics && consoleLock;

  // 3D Tilt Effect
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [2, -2]);
  const rotateY = useTransform(x, [-300, 300], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Define colors based on state to ensure no "white" leaks
  // Retro Green: bg-[#8aa899] text-[#1a2f23]
  // Retro Gray: bg-[#9ca3af] text-[#1f2937]
  const screenBg = power 
    ? (backlight ? 'bg-[#8aa899]' : 'bg-[#9ca3af]') 
    : 'bg-[#1a1c20]';
  
  const screenText = power
    ? (backlight ? 'text-[#1a2f23]' : 'text-[#1f2937]')
    : 'text-[#333]';

  const borderColor = power
    ? (backlight ? 'border-[#1a2f23]' : 'border-[#1f2937]')
    : 'border-[#333]';

  return (
    <section className="py-12 flex flex-col items-center justify-center min-h-[70vh] perspective-1000 w-full max-w-7xl mx-auto px-4">
      
      <div className="text-center mb-16">
        <h2 className="text-text-light dark:text-text-dark text-sm tracking-[0.3em] uppercase mb-2 font-mono">
          About Me
        </h2>
        <p className="text-text-light dark:text-text-dark text-xs opacity-60">
          Kefan Xu - PhD Student
        </p>
      </div>

      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16"
      >
        
        {/* LEFT CONTROLS (Desktop: Left Column, Mobile: Hidden/Moved below) */}
        <div className="hidden lg:flex flex-col gap-10 mt-4 items-center order-1">
           <ToggleSwitch 
             isChecked={power} 
             onChange={setPower} 
             label="System Power"
           />
           <ToggleSwitch 
             isChecked={secureMode} 
             onChange={setSecureMode} 
             label="Secure Mode"
           />
           <ToggleSmall 
             isChecked={backlight}
             onChange={setBacklight}
             label="Backlight"
           />
        </div>

        {/* CENTER SCREEN MODULE */}
        <div className="relative flex-grow max-w-2xl w-full order-1 lg:order-2">
            {/* Screen Bezel */}
            <div 
            className={`
                relative overflow-hidden font-mono rounded-[40px] p-4 shadow-neu-light dark:shadow-neu-dark transition-all duration-500 bg-bg-light dark:bg-bg-dark
            `}
            >
                {/* LCD Screen Surface */}
                <div className={`
                    ${screenBg} ${screenText}
                    rounded-[28px] min-h-[320px] transition-colors duration-500 relative overflow-hidden flex flex-col
                    border-4 ${borderColor} border-opacity-10
                `}>
                    
                    {/* Inner Shadow & Texture */}
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.15)] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.12] pointer-events-none" 
                        style={{ 
                          backgroundImage: power ? 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)' : 'none',
                          backgroundSize: '3px 3px'
                        }} 
                    />

                    {/* LCD Content */}
                    <motion.div 
                        animate={{ opacity: power ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-grow flex flex-col relative z-10 p-4"
                    >
                        {isEasterEggActive ? (
                           <SnakeGame />
                        ) : (
                           <>
                              {/* Top Header Row */}
                              <div className={`flex border-b-4 ${borderColor} mb-8`}>
                                 {/* Inverted Block */}
                                 <div className={`
                                   ${backlight ? 'bg-[#1a2f23] text-[#8aa899]' : 'bg-[#1f2937] text-[#9ca3af]'}
                                   px-3 py-1 text-xs font-bold uppercase tracking-widest flex items-center
                                 `}>
                                    KEYS NAME
                                 </div>
                                 {/* Data */}
                                 <div className={`flex-grow px-3 py-1 text-xs font-bold font-mono tracking-wider flex items-center justify-between`}>
                                    <span>No.9908032189</span>
                                    {secureMode && <Shield size={12} fill="currentColor" />}
                                 </div>
                              </div>

                              {/* Main Center Content */}
                              <div className="flex-grow flex flex-col justify-center mb-8 pl-2">
                                 <div className="text-5xl md:text-7xl font-bold tracking-tighter uppercase font-mono leading-none">
                                    KEFAN XU
                                 </div>
                                 {/* Blinking Cursor */}
                                 <div className="w-8 h-2 bg-current mt-2 animate-pulse" />
                              </div>

                              {/* Bottom Grid System */}
                              <div className={`border-t-4 border-b-4 ${borderColor}`}>
                                 {/* Header Row */}
                                 <div className={`grid grid-cols-10 border-b-2 ${borderColor}`}>
                                    <div className={`col-span-3 ${backlight ? 'bg-[#1a2f23] text-[#8aa899]' : 'bg-[#1f2937] text-[#9ca3af]'} px-2 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center border-r-2 ${borderColor}`}>
                                       TYPE
                                    </div>
                                    <div className={`col-span-4 px-2 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center border-r-2 ${borderColor}`}>
                                       ACCESS APPS
                                    </div>
                                    <div className={`col-span-3 px-2 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center justify-end`}>
                                       CREATE TIME
                                    </div>
                                 </div>

                                 {/* Content Row */}
                                 <div className="grid grid-cols-10 py-3">
                                    <div className={`col-span-3 px-2 flex flex-col items-center justify-center border-r-2 ${borderColor}`}>
                                       {/* Seed Box Style */}
                                       <div className={`border-2 ${borderColor} px-2 py-1 rounded-sm text-[10px] font-bold uppercase`}>
                                          PhD Student
                                       </div>
                                    </div>
                                    <div className={`col-span-4 px-2 flex items-center gap-3 border-r-2 ${borderColor}`}>
                                       <div className={`w-6 h-6 rounded-full border-2 ${borderColor} flex items-center justify-center`}>
                                          <Database size={12} />
                                       </div>
                                       <div className={`w-6 h-6 rounded-full border-2 ${borderColor} flex items-center justify-center`}>
                                          <Hash size={12} />
                                       </div>
                                       <span className="text-[10px] font-bold">HCI_LAB</span>
                                    </div>
                                    <div className={`col-span-3 px-2 flex items-center justify-end text-[10px] font-bold font-mono`}>
                                       2022-09-01
                                    </div>
                                 </div>
                              </div>
                           </>
                        )}

                    </motion.div>
                </div>
            </div>
        </div>

        {/* RIGHT CONTROLS (Desktop: Right Column, Mobile: Hidden/Moved below) */}
        <div className="hidden lg:flex flex-col gap-10 mt-4 items-center order-3">
           <ToggleSwitch 
             isChecked={bioMetrics} 
             onChange={setBioMetrics} 
             label="Bio-Metrics"
           />
           <ToggleSwitch 
             isChecked={consoleLock} 
             onChange={setConsoleLock} 
             label="Console Lock"
           />
           <div className="flex flex-col gap-3 items-start pl-2">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]" />
                 <span className="text-[9px] font-mono uppercase opacity-50 tracking-widest">Haptics</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.6)] animate-pulse" />
                 <span className="text-[9px] font-mono uppercase opacity-50 tracking-widest">Data Link</span>
              </div>
           </div>
        </div>

        {/* MOBILE CONTROLS (Horizontal Grid) */}
        <div className="lg:hidden w-full grid grid-cols-2 md:grid-cols-3 gap-8 order-2 mt-8">
           {/* All controls flattened */}
           <div className="flex justify-center"><ToggleSwitch isChecked={power} onChange={setPower} label="System Power" /></div>
           <div className="flex justify-center"><ToggleSwitch isChecked={secureMode} onChange={setSecureMode} label="Secure Mode" /></div>
           <div className="flex justify-center"><ToggleSwitch isChecked={bioMetrics} onChange={setBioMetrics} label="Bio-Metrics" /></div>
           <div className="flex justify-center"><ToggleSmall isChecked={backlight} onChange={setBacklight} label="Backlight" /></div>
           <div className="flex justify-center"><ToggleSwitch isChecked={consoleLock} onChange={setConsoleLock} label="Console Lock" /></div>
           
           {/* Static Indicators */}
           <div className="flex flex-col gap-3 items-center justify-center pl-2">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]" />
                 <span className="text-[9px] font-mono uppercase opacity-50 tracking-widest">Haptics</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.6)] animate-pulse" />
                 <span className="text-[9px] font-mono uppercase opacity-50 tracking-widest">Data Link</span>
              </div>
           </div>
        </div>

      </motion.div>

    </section>
  );
};
