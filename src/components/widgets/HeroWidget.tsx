import React from "react";
import { RefreshCw, BrainCircuit, Bookmark, ShieldCheck } from "lucide-react";

interface HeroWidgetProps {
  lang: string;
  activeWidget: string;
  currentTime: Date;
  randomQuran: any;
  randomHadith: any;
  aiWisdom: any;
  isAiLoading: boolean;
  refreshWidgetContent: () => void;
}

export const HeroWidget: React.FC<HeroWidgetProps> = ({
  lang,
  activeWidget,
  currentTime,
  randomQuran,
  randomHadith,
  aiWisdom,
  isAiLoading,
  refreshWidgetContent,
}) => {
  if (activeWidget === "none") return null;
  let content = null;
  if (activeWidget === "time") {
    content = (
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-5xl font-medium text-black dark:text-white mb-2 tracking-tight">
          {currentTime.toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span className="text-xs text-neutral-500 dark:text-zinc-500 uppercase tracking-[0.2em] font-medium">
          {currentTime.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>
      </div>
    );
  } else if (activeWidget === "quran") {
    content = (
      <div className="flex flex-col items-center max-w-lg mx-auto px-4 relative group/widget">
        <span className="text-xl md:text-2xl font-medium text-black dark:text-white mb-3 text-center leading-relaxed font-serif">
          "{randomQuran.text}"
        </span>
        <span className="text-[10px] md:text-xs text-neutral-500 dark:text-zinc-500 font-light italic">
          {randomQuran.info}
        </span>
        <button
          onClick={refreshWidgetContent}
          className="absolute -bottom-8 opacity-0 group-hover/widget:opacity-100 transition-opacity p-2 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-500 hover:text-blue-500"
        >
          <RefreshCw size={12} />
        </button>
      </div>
    );
  } else if (activeWidget === "hadith") {
    content = (
      <div className="flex flex-col items-center max-w-lg mx-auto px-4 relative group/widget">
        <span className="text-base md:text-lg font-medium text-black dark:text-white mb-3 text-center leading-relaxed">
          {randomHadith.text}
        </span>
        <span className="text-[10px] text-neutral-500 dark:text-zinc-500 uppercase tracking-widest font-semibold">
          {randomHadith.info}
        </span>
        <button
          onClick={refreshWidgetContent}
          className="absolute -bottom-8 opacity-0 group-hover/widget:opacity-100 transition-opacity p-2 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-500 hover:text-blue-500"
        >
          <RefreshCw size={12} />
        </button>
      </div>
    );
  } else if (activeWidget === "ai") {
    content = (
      <div className="flex flex-col items-center max-w-xl mx-auto px-4 relative group/widget">
        <div className="flex items-center gap-2 mb-3">
          <BrainCircuit className="text-purple-500" size={16} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-500">
            Stools Insight
          </span>
        </div>
        <span
          className={`text-lg md:text-xl font-medium text-black dark:text-white mb-2 text-center leading-relaxed ${isAiLoading ? "animate-pulse opacity-50" : ""}`}
        >
          {aiWisdom.text}
        </span>
        <span className="text-[10px] text-neutral-500 dark:text-zinc-500 uppercase tracking-widest">
          {aiWisdom.info}
        </span>
        <button
          onClick={refreshWidgetContent}
          disabled={isAiLoading}
          className="absolute -bottom-8 opacity-0 group-hover/widget:opacity-100 transition-opacity p-1.5 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-500 hover:text-purple-500"
        >
          <RefreshCw size={12} className={isAiLoading ? "animate-spin" : ""} />
        </button>
      </div>
    );
  }
  return (
    <div className="flex w-full mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="relative w-full p-8 md:p-10 bg-black/[0.01] dark:bg-white/[0.01]">
        <div
          className="absolute h-0 border-t border-black/[0.05] dark:border-white/[0.05] top-0 left-0 right-0 pointer-events-none"
          style={{ width: "4000px", marginLeft: "-2000px" }}
        ></div>
        <div
          className="absolute h-0 border-b border-black/[0.05] dark:border-white/[0.05] bottom-0 left-0 right-0 pointer-events-none"
          style={{ width: "4000px", marginLeft: "-2000px" }}
        ></div>
        <div
          className="absolute w-0 border-l border-black/[0.05] dark:border-white/[0.05] top-0 bottom-0 left-0 pointer-events-none"
          style={{ height: "4000px", marginTop: "-2000px" }}
        ></div>
        <div
          className="absolute w-0 border-r border-black/[0.05] dark:border-white/[0.05] top-0 bottom-0 right-0 pointer-events-none"
          style={{ height: "4000px", marginTop: "-2000px" }}
        ></div>
        <div className="relative pointer-events-auto flex justify-center">
          {content}
        </div>
      </div>
    </div>
  );
};
