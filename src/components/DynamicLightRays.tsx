import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

// Vivid, neon-like color palettes using HSL for smooth, natural color interpolation
// HSL blends much more cleanly than Hex/RGB in CSS/JS animations
const COLOR_PALETTES = [
  ['hsl(328, 100%, 54%)', 'hsl(180, 100%, 50%)', 'hsl(16, 100%, 50%)', 'hsl(271, 76%, 53%)'], // DeepPink, Cyan, OrangeRed, BlueViolet
  ['hsl(150, 100%, 50%)', 'hsl(328, 100%, 54%)', 'hsl(51, 100%, 50%)', 'hsl(195, 100%, 50%)'], // SpringGreen, DeepPink, Gold, DeepSkyBlue
  ['hsl(300, 100%, 50%)', 'hsl(157, 100%, 49%)', 'hsl(282, 100%, 41%)', 'hsl(9, 100%, 64%)'],  // Magenta, MediumSpringGreen, DarkViolet, Tomato
  ['hsl(180, 100%, 50%)', 'hsl(16, 100%, 50%)', 'hsl(271, 76%, 53%)', 'hsl(120, 61%, 50%)'],  // Cyan, OrangeRed, BlueViolet, LimeGreen
];

export const DynamicLightRays: React.FC<{ lang: string }> = ({ lang }) => {
  const [paletteIndex, setPaletteIndex] = useState(0);

  useEffect(() => {
    // Smoothly transition color palettes every 12 seconds
    const interval = setInterval(() => {
      setPaletteIndex((prev) => (prev + 1) % COLOR_PALETTES.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const colors = COLOR_PALETTES[paletteIndex];

  return (
    // Container is absolute, sits at the top 35% of the main content area, behind the header (z-0).
    // pointer-events-none ensures it never blocks clicks.
    // mask-image creates a seamless fade-out at the bottom, eliminating hard edges.
    <div 
      className="absolute top-0 left-0 right-0 h-[35vh] min-h-[300px] pointer-events-none z-0 overflow-hidden" 
      style={{ 
        maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
      }}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      
      {/* Ray 1 - Left dominant, wide ellipse */}
      <motion.div
        className="absolute top-[-10vh] left-[-10vw] w-[60vw] h-[40vh] rounded-[100%] mix-blend-screen dark:mix-blend-color-dodge filter blur-[100px] opacity-70 dark:opacity-50 origin-center"
        animate={{
          backgroundColor: colors[0],
          // GPU-accelerated transforms for fluid, lag-free motion
          x: ['0%', '10%', '-5%', '0%'],
          y: ['0%', '5%', '-10%', '0%'],
          rotate: [0, 15, -5, 0],
          // Scaling larger than 1 ensures edges stay outside the visible bounds
          scale: [1.2, 1.4, 1.1, 1.2],
        }}
        transition={{
          backgroundColor: { duration: 12, ease: "linear" },
          x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 28, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 35, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 30, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Ray 2 - Right dominant, elongated */}
      <motion.div
        className="absolute top-[-15vh] right-[-10vw] w-[60vw] h-[45vh] rounded-[100%] mix-blend-screen dark:mix-blend-color-dodge filter blur-[120px] opacity-60 dark:opacity-40 origin-center"
        animate={{
          backgroundColor: colors[1],
          x: ['0%', '-10%', '5%', '0%'],
          y: ['0%', '10%', '-5%', '0%'],
          rotate: [0, -15, 10, 0],
          scale: [1.3, 1.1, 1.4, 1.3],
        }}
        transition={{
          backgroundColor: { duration: 12, ease: "linear" },
          x: { duration: 27, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 23, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 32, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 26, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Ray 3 - Center spanning, horizontal */}
      <motion.div
        className="absolute top-[-5vh] left-[15vw] w-[70vw] h-[30vh] rounded-[100%] mix-blend-screen dark:mix-blend-color-dodge filter blur-[100px] opacity-50 dark:opacity-30 origin-center"
        animate={{
          backgroundColor: colors[2],
          x: ['0%', '5%', '-5%', '0%'],
          y: ['0%', '-10%', '5%', '0%'],
          rotate: [0, 5, -5, 0],
          scale: [1.1, 1.3, 1.2, 1.1],
        }}
        transition={{
          backgroundColor: { duration: 12, ease: "linear" },
          x: { duration: 30, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 26, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 40, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 35, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Ray 4 - Top accent, vertical */}
      <motion.div
        className="absolute top-[-20vh] left-[30vw] w-[40vw] h-[50vh] rounded-[100%] mix-blend-screen dark:mix-blend-color-dodge filter blur-[90px] opacity-60 dark:opacity-40 origin-center"
        animate={{
          backgroundColor: colors[3],
          x: ['0%', '-15%', '10%', '0%'],
          y: ['0%', '5%', '-5%', '0%'],
          rotate: [0, -20, 15, 0],
          scale: [1.4, 1.2, 1.5, 1.4],
        }}
        transition={{
          backgroundColor: { duration: 12, ease: "linear" },
          x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 29, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 38, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 24, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </div>
  );
};
