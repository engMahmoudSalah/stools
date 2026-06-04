import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Boxes } from "lucide-react";

interface CtaSectionProps {
  t: any;
  setAuthMode: (mode: string) => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ t, setAuthMode, setIsAuthModalOpen }) => {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative overflow-hidden rounded-[2.5rem] border border-black/8 bg-[linear-gradient(135deg,#111111,#2a2e38)] p-8 text-center text-white shadow-[0_24px_90px_rgba(15,18,28,0.24)] dark:border-white/8 dark:bg-[linear-gradient(135deg,#f6f6f6,#e8ebf4)] dark:text-black md:p-14"
      >
        <div className="pointer-events-none absolute left-8 top-8 h-28 w-28 rounded-full bg-white/8 blur-2xl dark:bg-black/8" />
        <div className="pointer-events-none absolute right-12 bottom-8 h-36 w-36 rounded-full bg-white/10 blur-3xl dark:bg-black/8" />
        <div className="pointer-events-none absolute inset-x-0 top-12 flex justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="h-24 w-24 rounded-full border border-white/10 border-t-white/30 dark:border-black/10 dark:border-t-black/30" 
          />
        </div>

        <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.24em] text-white/60 dark:text-black/55">
          {t.ctaTitle || "Get Started Today"}
        </p>
        <h2 className="relative z-10 mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
          {t.sectionLibraryTitle || "Your library, elevated."}
        </h2>
        <p className="relative z-10 mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 dark:text-black/70 md:text-base">
          {t.ctaDesc || "Join the community of creators who have supercharged their workflow with Stools."}
        </p>
        
        <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => {
              setAuthMode("register");
              setIsAuthModalOpen(true);
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105 hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90 shadow-lg"
          >
            <Boxes className="h-4 w-4 transition-transform group-hover:rotate-12" />
            {t.getStarted || "Get Started for Free"}
          </button>
          <a
            href="#features"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-medium text-white/90 transition-all hover:bg-white/10 dark:border-black/10 dark:text-black/80 dark:hover:bg-black/5"
          >
            {t.browseAll || "View Features"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
