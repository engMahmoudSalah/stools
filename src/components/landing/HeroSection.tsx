import React, { useMemo } from "react";
import { motion } from "motion/react";
import { ArrowRight, Boxes, Package, ShieldCheck, Sparkles, Search, ArrowUpRight } from "lucide-react";
import { ChatGPTIcon, FigmaIcon, GithubCustomIcon, ReactIcon, VercelIcon, GeminiIcon } from "@/src/components/icons/Icons";
import { staticCategories } from "@/src/data/static";

interface HeroSectionProps {
  t: any;
  setAuthMode: (mode: string) => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ t, setAuthMode, setIsAuthModalOpen }) => {
  const [mockSearchTerm, setMockSearchTerm] = React.useState("");
  const [activeMockTab, setActiveMockTab] = React.useState("all");

  const mockBookmarksData = useMemo(() => [
    { id: 1, title: "Figma", url: "figma.com", cat: "design", description: "Collaborative UI design tool.", icon: <FigmaIcon size={20} />, time: "2h ago" },
    { id: 2, title: "React", url: "react.dev", cat: "coding", description: "Component-based UI framework.", icon: <ReactIcon size={20} />, time: "5h ago" },
    { id: 3, title: "ChatGPT", url: "chat.openai.com", cat: "ai", description: "AI assistant for writing and research.", icon: <ChatGPTIcon size={20} />, time: "1d ago" },
  ], []);

  const heroTrustItems = useMemo(() => [
    { type: "metric", value: "18.4K+", label: t.stat1 },
    { type: "metric", value: "99.9%", label: t.stat3 },
    { type: "metric", value: "256-bit", label: t.stat4 },
    { type: "tool", name: "ChatGPT", icon: ChatGPTIcon },
    { type: "tool", name: "Gemini", icon: GeminiIcon },
    { type: "tool", name: "Figma", icon: FigmaIcon },
  ], [t]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section className="relative mx-auto flex w-full max-w-[82rem] flex-col gap-8 px-4 pb-14 pt-8 md:px-6 md:gap-10 md:pb-20 md:pt-12 xl:px-8 xl:pb-24 xl:pt-16">
      
      {/* Dynamic Background */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(circle_at_top,_rgba(195,213,255,0.82),_transparent_40%),radial-gradient(circle_at_12%_24%,_rgba(255,218,176,0.26),_transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(252,252,252,0))] dark:bg-[radial-gradient(circle_at_top,_rgba(82,104,154,0.34),_transparent_36%),radial-gradient(circle_at_18%_18%,_rgba(170,128,84,0.14),_transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0))]" />
      
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        
        {/* Left Column: Copy */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative max-w-2xl"
        >
          <motion.div variants={itemVariants} className="inline-flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300 sm:px-4 sm:text-[10px] sm:tracking-[0.22em]">
            <Package className="h-3.5 w-3.5 shrink-0 text-sky-500" />
            <span className="min-w-0 truncate">{t.heroBadge || "NEW: SMART CATEGORIZATION"}</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mt-6 text-[2.85rem] font-semibold leading-[0.92] tracking-[-0.085em] text-black dark:text-white sm:max-w-[11ch] sm:text-[3.8rem] md:max-w-[10ch] md:text-[4.65rem] lg:max-w-none lg:text-[5rem] xl:text-[5.45rem]">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-black via-neutral-800 to-black dark:from-white dark:via-neutral-200 dark:to-white">{t.heroTitle1 || "Your ultimate"}</span>
            <span className="mt-1 block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">
              {t.heroTitle2 || "tool stock."}
            </span>
            <span className="mt-1 block">{t.heroTitle3 || "Powered by AI."}</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-6 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg md:leading-8">
            {t.heroSubtitle || "Organize, categorize, and access your favorite tools and links faster than ever. Built for modern creators."}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => { setAuthMode("register"); setIsAuthModalOpen(true); }}
              className="group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(13,18,32,0.14)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(13,18,32,0.22)] dark:bg-white dark:text-black sm:px-6 sm:py-3.5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Boxes className="h-4 w-4 relative z-10 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10">{t.getStarted || "Get Started"}</span>
            </button>
            <a
              href="#features"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white/75 px-5 py-3 text-sm font-medium text-black transition-all hover:bg-black/5 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] sm:px-6 sm:py-3.5"
            >
              {t.learnMore || "Learn More"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/75 px-3 py-2 shadow-sm dark:border-white/8 dark:bg-white/[0.04]">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
              {t.stat4 || "256-bit encryption"}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/75 px-3 py-2 shadow-sm dark:border-white/8 dark:bg-white/[0.04]">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              {t.geminiPowered || "Gemini Powered"}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-2 text-emerald-700 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/8 dark:text-emerald-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Live sync
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          className="relative mx-auto w-full max-w-3xl lg:max-w-none perspective-1000"
        >
          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-4 top-12 hidden rounded-2xl border border-black/8 bg-white/75 px-3 py-2 text-xs font-medium text-neutral-600 shadow-lg backdrop-blur dark:border-white/8 dark:bg-white/[0.05] dark:text-neutral-300 lg:flex items-center z-20"
          >
            <FigmaIcon size={16} />
            <span className="ms-2">Design stack</span>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="pointer-events-none absolute -right-3 top-24 hidden rounded-2xl border border-black/8 bg-white/75 px-3 py-2 text-xs font-medium text-neutral-600 shadow-lg backdrop-blur dark:border-white/8 dark:bg-white/[0.05] dark:text-neutral-300 lg:flex items-center z-20"
          >
            <ChatGPTIcon size={16} />
            <span className="ms-2">AI metadata</span>
          </motion.div>

          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/10 to-emerald-500/10 blur-2xl dark:from-blue-500/5 dark:to-emerald-500/5" />
          
          <div className="relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/80 p-2.5 shadow-[0_30px_70px_rgba(20,28,44,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#090909]/80 dark:shadow-[0_30px_70px_rgba(0,0,0,0.38)] sm:rounded-[1.75rem] sm:p-4 xl:p-5 transform-gpu hover:rotate-y-2 hover:rotate-x-2 transition-transform duration-700 ease-out">
            <div className="flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5 sm:pb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-400 shadow-inner" />
                  <span className="h-3 w-3 rounded-full bg-amber-400 shadow-inner" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-inner" />
                </div>
                <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
                  <Boxes className="h-3 w-3" />
                  <span>{t.preview || "Preview"}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_200px]">
              <div className="rounded-2xl border border-black/5 bg-[#f7f8fb]/80 p-4 dark:border-white/5 dark:bg-[#0d0d10]/80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">Library</h3>
                  <div className="flex bg-white dark:bg-black/50 rounded-full p-1 border border-black/5 dark:border-white/5">
                    {["all", "design", "coding"].map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => setActiveMockTab(cat)}
                        className={`text-[10px] px-3 py-1 rounded-full transition-colors ${activeMockTab === cat ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-neutral-500'}`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {mockBookmarksData.filter(b => activeMockTab === 'all' || b.cat === activeMockTab).map((b, i) => (
                    <motion.div 
                      key={b.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-black/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-black/50 flex items-center justify-center shrink-0">
                          {b.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black dark:text-white group-hover:text-blue-500 transition-colors">{b.title}</p>
                          <p className="text-[11px] text-neutral-500">{b.description}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 text-white">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-3">AI Suggestions</p>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-white/10 text-xs flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-amber-400" /> Auto-tagged Figma
                    </div>
                    <div className="p-2 rounded-lg bg-white/10 text-xs flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-blue-400" /> Extracted Descriptions
                    </div>
                  </div>
                </div>
                
                <div className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/5 dark:bg-white/5">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">Storage</p>
                  <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[65%]" />
                  </div>
                  <p className="text-[10px] mt-2 text-neutral-500 text-right">65% used</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Trust Items Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 grid gap-3 rounded-[1.75rem] border border-black/8 bg-white/65 p-3 shadow-sm backdrop-blur dark:border-white/8 dark:bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        {heroTrustItems.map((item, index) =>
          item.type === "metric" ? (
            <div key={`${item.label}-${index}`} className="rounded-[1.15rem] border border-black/6 bg-white/90 px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/6 dark:bg-black/20">
              <p className="text-lg font-semibold tracking-tight text-black dark:text-white">{item.value}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.label}</p>
            </div>
          ) : (
            <div key={`${item.name}-${index}`} className="flex items-center justify-center gap-3 rounded-[1.15rem] border border-black/6 bg-white/90 px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/6 dark:bg-black/20">
              <item.icon size={20} />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{item.name}</span>
            </div>
          )
        )}
      </motion.div>

    </section>
  );
};
