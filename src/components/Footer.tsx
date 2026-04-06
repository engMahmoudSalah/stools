import React from "react";
import Logo from "../images/logo.jpeg";
export const Footer = ({ t }: { t: any }) => {
  return (
    <footer className="w-full border-t border-black/[0.06] dark:border-white/[0.04] bg-[#fcfcfc] dark:bg-[#000000] mt-auto relative z-20 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full flex flex-col">
        <div className="relative w-full py-6 bg-black/[0.01] dark:bg-white/[0.01]">
          <div className="absolute w-0 border-l border-black/[0.05] dark:border-white/[0.05] top-0 bottom-0 left-0 pointer-events-none"></div>
          <div className="absolute w-0 border-r border-black/[0.05] dark:border-white/[0.05] top-0 bottom-0 right-0 pointer-events-none"></div>
          <div className="relative pointer-events-auto flex flex-col items-center justify-center gap-3">
            <a
              href="https://mahmoud-salah-portfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-opacity hover:opacity-90"
            >
              <img className="h-8" src={Logo} alt="" />
              <span className="text-[9px] md:text-[10px] tracking-[0.2em] font-medium text-neutral-500 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors uppercase text-center">
                {t.madeBy}
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
