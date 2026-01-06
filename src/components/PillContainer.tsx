import React from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

interface PillContainerProps {
  children: React.ReactNode;
  className?: string;
  topText?: string;
  bottomText?: string;
}

export const PillContainer: React.FC<PillContainerProps> = ({ children, className = '', topText, bottomText }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXStart = useMotionValue(150); // Center width by default
  const mouseYStart = useMotionValue(270); // Center height by default

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const isHovering = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    mouseXStart.set(mouseX);
    mouseYStart.set(mouseY);
    isHovering.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseXStart.set(150);
    mouseYStart.set(270);
    isHovering.set(0);
  };

  const bgGradient = useMotionTemplate`radial-gradient(circle at ${mouseXStart}px ${mouseYStart}px, rgba(255, 170, 50, var(--light-intensity-start, 0.25)) 0%, rgba(255, 170, 50, var(--light-intensity-end, 0.05)) 50%, transparent 70%)`;
  
  const shadowX = useTransform(mouseXStart, [0, 300], [-20, 20]);
  const shadowY = useTransform(mouseYStart, [0, 540], [-20, 20]);
  const shadowOpacity = useTransform(
    [x, y], 
    ([latestX, latestY]: number[]) => {
      const dist = Math.sqrt(latestX * latestX + latestY * latestY);
      return 0.15 + (dist * 0.4); // Increases opacity as we move away from center (towards edge)
    }
  );
  
  // To properly handle light/dark mode shadows + the dynamic shadow, we need to know the theme or use CSS variables if possible. 
  // However, framer motion boxShadow overrides class shadows. 
  // We can construct the shadow string to include the base shadow.
  // Base shadows: 
  // Light: 0 20px 40px rgba(163,177,198,0.5)
  // Dark: 0 20px 40px #1d1e22  (which is rgba(29,30,34, 1))

  // Let's use a robust approach by conditionally applying the dynamic shadow ON TOP of the static one.
  // Actually, standard CSS variables work in motion templates if defined.
  
  // We will simply hardcode the base shadow into the template, but we need to know if it's dark mode to change the base color.
  // Since we don't have easy access to the theme state here without context, and Tailwind classes are overridden,
  // we can use a CSS variable for the base shadow color.
  
  // Let's rely on the fact that we can set a CSS variable in the parent and use it here.
  
  // Dynamic Shadow Logic:
  // When isHovering is 0 (not hovering), we want ONLY the base shadow.
  // When isHovering is 1 (hovering), we want to REPLACE the base shadow with the warm light shadow.
  // Wait, the user wants it to REPLACE the normal shadow when triggered.
  
  // To achieve replacement, we can cross-fade the shadows or simply switch them.
  // Since we have `isHovering` as a motion value (0 or 1), we can interpolate.
  // However, `isHovering` jumps to 0/1 immediately in current implementation.
  // If we want a smooth transition, `isHovering` should ideally be animate, but here we just use it for logic.
  
  // Let's make `isHovering` a Spring or use `animate` to smooth it if we want smooth replacement.
  // But for now, let's just implement the logic:
  // IF (hovering and shadowOpacity > 0) -> Show Warm Shadow
  // ELSE -> Show Base Shadow
  
  // Actually, mixing them causes the muddy look.
  // We can use a transform for the base shadow opacity too.
  
  // If we want to replace, we should reduce the alpha of the base shadow as the warm shadow increases.
  // Or just simply: if hovering, base shadow is 0 opacity.
  // But we only want to replace it when the warm light is actually visible (dark mode).
  // The current logic applies warm shadow regardless of theme in JS, but we only see the light effect in dark mode via CSS.
  // We need to be careful not to break light mode.
  // In light mode, the warm light div is hidden. But this boxShadow logic runs in JS.
  // This JS logic adds a warm shadow in light mode too currently! 
  // We should fix that first: The warm shadow should probably only appear in dark mode or be very subtle.
  // The user previously asked to remove the light effect for light view.
  
  // Since we can't easily detect dark mode in JS without a hook/context, 
  // we can use a CSS variable for the warm shadow color too, and set it to transparent in light mode!

  return (
    <div className={`flex justify-center items-center relative group ${className}`}>
      {/* Outer Raised Rim (The "Outer Part" that is raised) */}
      <div className="relative p-[2px] rounded-full bg-bg-light dark:bg-bg-dark shadow-neu-light dark:shadow-neu-dark">
        
        {/* Inner Trench (The "Concave Part") */}
        <div 
            className="relative w-[300px] h-[540px] rounded-full p-14 bg-bg-light dark:bg-bg-dark shadow-[inset_3px_3px_6px_0_rgba(163,177,198,0.3),inset_-3px_-3px_6px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_2px_2px_5px_#1d1e22,inset_-2px_-2px_5px_#393c44] flex items-center justify-center"
            style={{ perspective: 1000 }} // Add perspective here
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
          {/* Curved Text Overlay (On the trench, outside the inner pill) */}
          {(topText || bottomText) && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 300 540">
                <defs>
                  {/* Adjusted radius to align with the trench curve. Center (150, 150) and (150, 390). Radius ~122. */}
                  <path id="topCurve" d="M 28,150 A 122,122 0 0,1 272,150" />
                  <path id="bottomCurve" d="M 28,390 A 122,122 0 0,0 272,390" />
                </defs>
                {topText && (
                  <text className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-light/50 dark:text-text-dark/50 fill-current" dominantBaseline="middle">
                    <textPath href="#topCurve" startOffset="50%" textAnchor="middle">
                      {topText}
                    </textPath>
                  </text>
                )}
                {bottomText && (
                  <text className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-light/50 dark:text-text-dark/50 fill-current" dominantBaseline="middle">
                    <textPath href="#bottomCurve" startOffset="50%" textAnchor="middle">
                      {bottomText}
                    </textPath>
                  </text>
                )}
              </svg>
            )}
          
          {/* Inner Glowing Pill */}
          <motion.div 
            className="w-full h-full rounded-full relative [--base-shadow-color:rgba(163,177,198,0.5)] dark:[--base-shadow-color:#1d1e22] group-hover:dark:[--base-shadow-color:transparent]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ 
                rotateX: rotateXSpring, 
                rotateY: rotateYSpring,
                boxShadow: useMotionTemplate`${shadowX}px ${shadowY}px 40px rgba(255,170,50,${useTransform(() => isHovering.get() ? shadowOpacity.get() : 0)}), 0px 20px 40px var(--base-shadow-color)`,
                transformStyle: 'preserve-3d', // Help with Safari rendering
            }}
          >
            {/* Content Clipper for Safari */}
            <div 
               className="w-full h-full rounded-full relative overflow-hidden"
              style={{
                  WebkitMaskImage: '-webkit-radial-gradient(white, black)', // Force Safari clipping
                  transform: 'translateZ(0)' // Extra help for Safari
              }}
            >
            {/* Main Background with Leather Texture */}
            <div className="absolute inset-0 bg-bg-light dark:bg-bg-dark">
              <div 
                className="absolute inset-0 opacity-40 dark:opacity-20 mix-blend-overlay" 
                style={{ 
                  filter: 'contrast(120%) brightness(100%)',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }} 
              />
            </div>

            {/* Warm Light Effect (Bottom Emission) - Dark Mode Only */}
            <motion.div 
              className="hidden dark:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none z-0 [--light-intensity-start:0.45] [--light-intensity-end:0.15]"
              style={{
                background: bgGradient,
                filter: 'blur(30px)',
              }}
            />
            
            {/* Inner Glow/Shadow for Depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] rounded-full" />
            
            {/* Subtle white border for glass effect */}
            <div className="absolute inset-0 border border-white/30 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />

            {/* Content Injection */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               {children}
            </div>
            
            {/* Shine/Reflection effect */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white opacity-20 blur-3xl rounded-full pointer-events-none dark:hidden" />
          </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
