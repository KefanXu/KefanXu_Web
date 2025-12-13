import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for rotation
  const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

  // Calculate rotation based on mouse position (tilt effect)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of card
    // Range: -0.5 to 0.5
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-[32px] bg-bg-light dark:bg-bg-dark shadow-neu-light dark:shadow-neu-dark transition-colors duration-300 ${className}`}
    >
        {/* Light Reflection Gradient */}
        <motion.div 
            className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-0"
            style={{ opacity: useTransform(mouseY, [-0.5, 0.5], [0, 0.2]) }}
        />

        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-8 rounded-[32px] overflow-hidden">
             {children}
        </div>
    </motion.div>
  );
};

