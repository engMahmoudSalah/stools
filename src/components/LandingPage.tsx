import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  LayoutGrid,
  AlignJustify,
  Menu,
  Archive,
  MoreHorizontal,
  Sparkles,
  BrainCircuit,
  Quote,
  Minus,
  Boxes,
  Package,
} from "lucide-react";
import { FloatingToolComp } from "@/src/components/ui/FloatingToolComp";
import {
  ChatGPTIcon,
  GeminiIcon,
  NeonDBIcon,
  StitchIcon,
  ReactIcon,
  FigmaIcon,
  VercelIcon,
  GithubCustomIcon,
} from "@/src/components/icons/Icons";
import { staticCategories } from "@/src/data/static";
import { DynamicLightRays } from "@/src/components/DynamicLightRays";

interface LandingPageProps {
  t: any;
  lang: string;
  setAuthMode: (mode: string) => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  faqs: any[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  t,
  lang,
  setAuthMode,
  setIsAuthModalOpen,
  faqs,
}) => {
  const [mockSearchTerm, setMockSearchTerm] = useState("");
  const [activeMockTab, setActiveMockTab] = useState("all");
  const [mockViewMode, setMockViewMode] = useState("list");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const mockBookmarksData = useMemo(
    () => [
      {
        id: 1,
        title: "Figma",
        url: "figma.com",
        cat: "work",
        description: "Collaborative UI design tool.",
        icon: <FigmaIcon size={20} />,
        time: "2 hours ago",
      },
      {
        id: 2,
        title: "Next.js",
        url: "nextjs.org",
        cat: "study",
        description: "React framework for production.",
        icon: <ReactIcon size={20} />,
        time: "5 hours ago",
      },
      {
        id: 3,
        title: "ChatGPT",
        url: "chat.openai.com",
        cat: "other",
        description: "AI conversational agent.",
        icon: <ChatGPTIcon size={20} />,
        time: "1 day ago",
      },
      {
        id: 4,
        title: "Vercel",
        url: "vercel.com",
        cat: "work",
        description: "Deployment and hosting platform.",
        icon: <VercelIcon size={20} />,
        time: "2 days ago",
      },
      {
        id: 5,
        title: "GitHub",
        url: "github.com",
        cat: "work",
        description: "Code hosting and version control.",
        icon: <GithubCustomIcon size={20} />,
        time: "1 week ago",
      },
    ],
    [],
  );

  const filteredMockBookmarksList = useMemo(() => {
    const q = mockSearchTerm.toLowerCase();
    return mockBookmarksData.filter((b) => {
      const titleMatch = b.title?.toLowerCase().includes(q);
      const descMatch = b.description?.toLowerCase().includes(q);
      const categoryMatch = activeMockTab === "all" || b.cat === activeMockTab;
      return (titleMatch || descMatch || q === "") && categoryMatch;
    });
  }, [mockSearchTerm, activeMockTab, mockBookmarksData]);

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Section 1: Hero */}
      <div className="w-full flex flex-col items-center pt-6 md:pt-8 mb-2 relative px-4 md:px-0">
        <DynamicLightRays lang={lang} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <FloatingToolComp
            Icon={ChatGPTIcon}
            className="top-[10%] left-[10%] animate-float-tool"
            delay="0s"
            duration="12s"
          />
          <FloatingToolComp
            Icon={GeminiIcon}
            className="top-[40%] left-[5%] animate-float-tool"
            delay="2s"
            duration="15s"
          />
          <FloatingToolComp
            Icon={NeonDBIcon}
            className="top-[70%] left-[15%] animate-float-tool"
            delay="1s"
            duration="10s"
          />
          <FloatingToolComp
            Icon={StitchIcon}
            className="top-[20%] right-[10%] animate-float-tool"
            delay="3s"
            duration="14s"
          />
          <FloatingToolComp
            Icon={ReactIcon}
            className="top-[50%] right-[8%] animate-float-tool"
            delay="1.5s"
            duration="11s"
          />
          <FloatingToolComp
            Icon={FigmaIcon}
            className="top-[80%] right-[15%] animate-float-tool"
            delay="0.5s"
            duration="13s"
          />
          <FloatingToolComp
            Icon={VercelIcon}
            className="top-[15%] left-[50%] animate-float-tool"
            delay="4s"
            duration="16s"
          />
          <FloatingToolComp
            Icon={GithubCustomIcon}
            className="top-[85%] left-[50%] animate-float-tool"
            delay="2.5s"
            duration="12s"
          />
        </div>

        <div className="space-y-0 w-full relative z-10">
          <div className="flex justify-center">
            <div className="relative inline-block px-2 py-3 md:px-8 md:py-6">
              <div
                className="absolute h-0 border-t border-black/[0.05] dark:border-white/[0.05] top-0 left-0 right-0 pointer-events-none"
                style={{ width: "4000px", marginLeft: "-2000px" }}
              ></div>
              <div
                className="absolute h-0 border-b border-black/[0.05] dark:border-white/[0.05] bottom-0 left-0 right-0 pointer-events-none"
                style={{ width: "4000px", marginLeft: "-2000px" }}
              ></div>
              <div className="relative pointer-events-auto text-center space-y-4 max-w-4xl mx-auto">
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] shadow-sm animate-in fade-in zoom-in duration-1000">
                    <Package size={12} className="text-blue-500" />
                    <span className="text-[9px] md:text-[10px] font-semibold text-neutral-600 dark:text-zinc-300 tracking-wide uppercase">
                      {t.heroBadge}
                    </span>
                  </div>
                </div>
                <h1 className="font-[500] tracking-tighter text-4xl sm:text-5xl md:text-6xl text-black dark:text-white leading-[1.1]">
                  <span className="block animate-in slide-in-from-bottom-4 duration-500 whitespace-nowrap">
                    <span className="inline-block me-[0.3em]">
                      {t.heroTitle1}
                    </span>
                    <span className="inline-block me-[0.3em]">
                      {t.heroTitle2}
                    </span>
                    <span className="inline-block">{t.heroTitle3}</span>
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center max-w-3xl mx-auto">
            <div className="flex justify-center w-full">
              <div className="relative inline-block px-2 py-3 md:px-8 md:py-5 w-full">
                <div
                  className="absolute h-0 border-b border-black/[0.05] dark:border-white/[0.05] bottom-0 left-0 right-0 pointer-events-none"
                  style={{ width: "4000px", marginLeft: "-2000px" }}
                ></div>
                <div className="relative pointer-events-auto">
                  <p className="text-sm md:text-lg max-w-2xl mx-auto text-center text-neutral-600 dark:text-zinc-400 font-light animate-in slide-in-from-bottom-8 duration-1000 px-4 md:px-0">
                    {t.heroSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-3xl mx-auto">
            <div className="relative w-full px-2 py-4 md:px-8 md:py-6 bg-black/[0.01] dark:bg-white/[0.01]">
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

              <div className="relative pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-3 animate-in slide-in-from-bottom-8 duration-1000 delay-200">
                <button
                  onClick={() => {
                    setAuthMode("register");
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full sm:w-48 justify-center px-5 md:px-6 py-2 md:py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group text-xs md:text-sm whitespace-nowrap"
                >
                  <Boxes
                    size={16}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  {t.getStarted}
                </button>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 800, behavior: "smooth" })
                  }
                  className="w-full sm:w-48 justify-center px-5 md:px-6 py-2 md:py-2.5 rounded-xl bg-transparent border border-black/10 dark:border-white/10 font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs md:text-sm whitespace-nowrap"
                >
                  {t.learnMore}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mockup Section */}
      <div className="w-full max-w-5xl mx-auto px-4 mt-2 mb-12 relative z-20">
        <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-400 dark:from-neutral-800 dark:to-neutral-600 rounded-[2rem] blur-xl opacity-40 dark:opacity-30 pointer-events-none"></div>

        <div className="relative bg-[#fcfcfc] dark:bg-[#000000] rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col h-[400px] md:h-[450px] animate-in slide-in-from-bottom-12 duration-1000 delay-300 pointer-events-auto">
          <div className="flex items-center justify-between p-2 md:p-3 border-b border-black/5 dark:border-white/5 bg-white dark:bg-[#0a0a0a] gap-2 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
              <div className="flex gap-1 md:gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
              </div>
              <div className="w-6 h-6 rounded bg-black dark:bg-white flex items-center justify-center">
                <Boxes className="text-white dark:text-black w-3 h-3" />
              </div>
              <span className="font-bold text-xs tracking-tighter uppercase whitespace-nowrap">
                {t.logo} <span className="hidden sm:inline">{t.preview}</span>
              </span>
            </div>
            <div className="flex relative w-full max-w-[120px] sm:max-w-xs group shrink-0">
              <Search className="absolute start-2 top-1/2 -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-neutral-400 dark:text-zinc-500" />
              <input
                type="text"
                value={mockSearchTerm}
                onChange={(e) => setMockSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-neutral-100 dark:bg-[#111] border border-transparent rounded-md py-1 md:py-1.5 pl-6 pr-2 text-[8px] md:text-xs focus:outline-none"
              />
            </div>
            <div className="flex items-center shrink-0">
              <button
                onClick={() => {
                  setAuthMode("register");
                  setIsAuthModalOpen(true);
                }}
                className="flex text-[8px] md:text-[10px] font-bold bg-black text-white dark:bg-white dark:text-black px-1.5 py-1 md:px-2.5 md:py-1.5 rounded-md opacity-90 hover:opacity-100 transition-all items-center gap-1 whitespace-nowrap"
              >
                <Plus size={10} /> {t.addLink}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
            <div className="w-full flex flex-col items-center mt-4 md:mt-6 px-3 md:px-8 pb-12">
              <div className="flex w-full mb-4 md:mb-6">
                <div className="relative w-full p-3 md:p-4 bg-black/[0.01] dark:bg-white/[0.01]">
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
                  <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full py-1 gap-2 md:gap-0">
                    <div className="flex items-center gap-3 md:gap-6 overflow-x-auto scrollbar-hide w-full md:w-auto pb-1">
                      {staticCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveMockTab(cat)}
                          className={`text-[9px] md:text-xs transition-colors capitalize whitespace-nowrap ${activeMockTab === cat ? "text-black dark:text-white font-medium" : "text-neutral-500 dark:text-zinc-600 hover:text-black dark:hover:text-zinc-300"}`}
                        >
                          {t[cat] || cat}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center p-1 rounded-md bg-neutral-100 dark:bg-[#111] border border-black/5 dark:border-white/[0.05] w-full md:w-auto justify-center md:justify-start">
                      <button
                        onClick={() => setMockViewMode("grid")}
                        className={`flex-1 md:flex-none flex justify-center p-1 md:p-1.5 rounded ${mockViewMode === "grid" ? "bg-white dark:bg-[#222] text-black dark:text-white shadow-sm" : "text-neutral-500"}`}
                      >
                        <LayoutGrid size={12} className="md:w-3.5 md:h-3.5" />
                      </button>
                      <button
                        onClick={() => setMockViewMode("list")}
                        className={`flex-1 md:flex-none flex justify-center p-1 md:p-1.5 rounded ${mockViewMode === "list" ? "bg-white dark:bg-[#222] text-black dark:text-white shadow-sm" : "text-neutral-500"}`}
                      >
                        <AlignJustify size={12} className="md:w-3.5 md:h-3.5" />
                      </button>
                      <button
                        onClick={() => setMockViewMode("compact")}
                        className={`flex-1 md:flex-none flex justify-center p-1 md:p-1.5 rounded ${mockViewMode === "compact" ? "bg-white dark:bg-[#222] text-black dark:text-white shadow-sm" : "text-neutral-500"}`}
                      >
                        <Menu size={12} className="md:w-3.5 md:h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full mb-4">
                <div className="relative w-full p-3 md:p-4 bg-black/[0.01] dark:bg-white/[0.01]">
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
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h2 className="text-[9px] md:text-xs font-medium tracking-tight uppercase tracking-widest text-neutral-400">
                        {t[activeMockTab] || activeMockTab}
                      </h2>
                    </div>
                    {filteredMockBookmarksList?.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 md:py-12 text-neutral-500">
                        <Archive
                          size={16}
                          className="mb-2 opacity-50"
                          strokeWidth={1}
                        />
                        <p className="text-[8px] md:text-[10px] font-light">
                          {t.noLinks}
                        </p>
                      </div>
                    ) : (
                      <div
                        className={
                          mockViewMode === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3"
                            : mockViewMode === "list"
                              ? "flex flex-col gap-2"
                              : "flex flex-col gap-1"
                        }
                      >
                        {filteredMockBookmarksList.map((bookmark) => (
                          <div
                            key={bookmark.id}
                            className={`group relative bg-white dark:bg-[#0a0a0a] hover:bg-neutral-50 dark:hover:bg-[#0f0f0f] border border-black/[0.06] dark:border-white/[0.05] hover:border-black/[0.15] rounded-xl flex transition-all duration-200 cursor-pointer shadow-sm dark:shadow-none ${mockViewMode === "grid" ? "flex-col gap-2 p-3 md:p-4 h-auto" : mockViewMode === "list" ? "flex-row items-center gap-3 md:gap-4 p-3 md:p-4" : "flex-row items-center gap-2 p-2 h-10 md:h-12"}`}
                            onClick={() => {
                              setAuthMode("register");
                              setIsAuthModalOpen(true);
                            }}
                          >
                            <div
                              className={`flex items-start ${mockViewMode === "grid" ? "w-full gap-2 md:gap-3" : "gap-2 md:gap-3 shrink-0"}`}
                            >
                              <div
                                className={`${mockViewMode === "compact" ? "w-6 h-6 md:w-7 md:h-7 p-1" : "w-8 h-8 md:w-10 md:h-10 p-1.5 md:p-2"} rounded-lg bg-neutral-100 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.02] flex items-center justify-center overflow-hidden shrink-0 text-black dark:text-white`}
                              >
                                {bookmark.icon}
                              </div>
                              <div
                                className={`flex-1 min-w-0 ${mockViewMode === "compact" ? "flex items-center gap-2 md:gap-3" : ""}`}
                              >
                                <h3
                                  className={`font-semibold text-neutral-900 dark:text-zinc-100 truncate group-hover:text-blue-500 transition-colors ${mockViewMode === "grid" ? "text-xs md:text-sm mb-0.5" : "text-[10px] md:text-xs"}`}
                                >
                                  {bookmark.title}
                                </h3>
                                <p
                                  className={`text-[8px] md:text-[10px] text-neutral-500 dark:text-zinc-500 truncate ${mockViewMode === "compact" ? "flex-1" : "mt-0.5"}`}
                                >
                                  {bookmark.url?.replace(
                                    /^https?:\/\/(www\.)?/,
                                    "",
                                  )}
                                </p>
                              </div>
                            </div>
                            {bookmark.description &&
                              mockViewMode !== "compact" && (
                                <p
                                  className={`text-[9px] md:text-xs text-neutral-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-light ${mockViewMode === "list" ? "flex-1 pr-4 md:pr-6" : "mt-1"}`}
                                >
                                  {bookmark.description}
                                </p>
                              )}
                            <div
                              className={`absolute ${mockViewMode === "compact" ? "top-1/2 -translate-y-1/2" : "top-2 md:top-3"} end-2 md:end-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity`}
                            >
                              <button
                                className="p-1 md:p-1.5 text-neutral-400 dark:text-zinc-500 hover:text-black dark:hover:text-white rounded-md bg-neutral-100 lg:bg-white dark:bg-[#111] lg:dark:bg-[#0a0a0a] border border-transparent hover:border-black/10 transition-all shadow-sm lg:shadow-none"
                                title="Sign up to edit"
                              >
                                <MoreHorizontal
                                  size={12}
                                  className="md:w-3.5 md:h-3.5"
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-[#fcfcfc] dark:from-[#000000] to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* New Section: Features */}
      <div className="w-full py-20 bg-neutral-50 dark:bg-[#050505] relative">
        <div
          className="absolute h-0 border-t border-black/[0.05] dark:border-white/[0.05] top-0 left-0 right-0 pointer-events-none"
          style={{ width: "4000px", marginLeft: "-2000px" }}
        ></div>
        <div
          className="absolute h-0 border-b border-black/[0.05] dark:border-white/[0.05] bottom-0 left-0 right-0 pointer-events-none"
          style={{ width: "4000px", marginLeft: "-2000px" }}
        ></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fast", desc: "Lightning fast performance" },
              { title: "Secure", desc: "Your data is safe" },
              { title: "AI Powered", desc: "Built with Gemini" },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 border border-black/10 dark:border-white/10 rounded-2xl bg-white dark:bg-[#111] hover:border-blue-500 transition-all"
              >
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Primitives Section */}
      <div className="max-w-7xl mx-auto border-x border-white/10 pt-20 pb-24 px-6">
        <div className="flex items-center gap-6 mb-20 fade-up visible">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white">
            Core Primitives
          </h2>
          <div className="h-px bg-white/20 flex-1"></div>
          <span className="text-[10px] font-mono text-neutral-500">
            SYS_CAPABILITIES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border-t border-white/10">
          {/* Card 1 */}
          <div className="relative group fade-up h-full visible bg-black" style={{ perspective: '1200px' }}>
            <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-none bg-neutral-900 border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(24px,-24px,-60px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                <div className="font-mono text-[9px] text-neutral-500 uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                  Memory Alloc
                </div>
                <div className="h-1 w-full bg-neutral-800 rounded mt-3 overflow-hidden">
                  <div className="h-full bg-neutral-500 w-3/4"></div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-none bg-[#0a0a0a] border border-white/[0.08] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(12px,-12px,-30px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]"></div>
                <div className="font-mono text-[9px] text-neutral-400 uppercase">
                  Buffer State
                </div>
                <div className="font-mono text-[10px] text-white mt-1">
                  OPTIMIZED
                </div>
              </div>
              <div className="relative p-10 rounded-none bg-black border border-white/[0.05] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-white/20 group-hover:shadow-[-30px_30px_50px_rgba(0,0,0,0.8)] group-hover:bg-white/[0.04] z-10 h-full flex flex-col group-hover:[transform:translateZ(20px)]">
                <div className="absolute top-0 end-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-white/10 transition-colors"></div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-none bg-black border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    {/* @ts-expect-error iconify-icon is a web component */}
                    <iconify-icon icon="solar:box-minimalistic-linear" class="text-2xl text-neutral-300 group-hover:text-white"></iconify-icon>
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded bg-black/50">
                    MOD_01
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                  Spatial Interfaces
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8 flex-1">
                  Constructing multi-dimensional web planes. Moving beyond flat
                  coordinate systems into true Z-axis awareness.
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-white animate-[shimmerLine_2s_linear_infinite]"></div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group fade-up h-full md:mt-12 visible bg-black" style={{ perspective: '1200px', transitionDelay: '100ms' }}>
            <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-none bg-neutral-900 border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(24px,-24px,-60px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                <div className="font-mono text-[9px] text-neutral-500 uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                  Thread Count
                </div>
                <div className="flex items-end gap-1.5 mt-3 h-4">
                  <div className="h-2 w-1.5 bg-neutral-600 rounded-sm"></div>
                  <div className="h-4 w-1.5 bg-neutral-500 rounded-sm"></div>
                  <div className="h-3 w-1.5 bg-neutral-600 rounded-sm"></div>
                  <div className="h-2 w-1.5 bg-neutral-600 rounded-sm"></div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-none bg-[#0a0a0a] border border-white/[0.08] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(12px,-12px,-30px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]"></div>
                <div className="font-mono text-[9px] text-neutral-400 uppercase">
                  Model Sync
                </div>
                <div className="font-mono text-[10px] text-emerald-400 mt-1">
                  SYNCED
                </div>
              </div>
              <div className="relative p-10 rounded-none bg-black border border-white/[0.05] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-white/20 group-hover:shadow-[-30px_30px_50px_rgba(0,0,0,0.8)] group-hover:bg-white/[0.04] z-10 h-full flex flex-col group-hover:[transform:translateZ(20px)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]"></div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-none bg-black border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    {/* @ts-expect-error iconify-icon is a web component */}
                    <iconify-icon icon="solar:cpu-bolt-linear" class="text-2xl text-neutral-300 group-hover:text-white"></iconify-icon>
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded bg-black/50 flex items-center gap-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    MOD_02
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight relative z-10">
                  Neural Integration
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8 flex-1 relative z-10">
                  Embedded deterministic models enabling predictive rendering
                  and autonomous state resolution.
                </p>
                <div className="flex items-center gap-1 mt-auto relative z-10">
                  <div className="h-3 w-1 bg-white/20 group-hover:bg-white"></div>
                  <div className="h-4 w-1 bg-white/20 group-hover:bg-white"></div>
                  <div className="h-2 w-1 bg-white/20 group-hover:bg-white"></div>
                  <div className="h-5 w-1 bg-white/20 group-hover:bg-white"></div>
                  <div className="h-3 w-1 bg-white/20 group-hover:bg-white"></div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase ms-2">
                    Processing
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group fade-up h-full md:mt-24 visible bg-black" style={{ perspective: '1200px', transitionDelay: '200ms' }}>
            <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 rounded-none bg-neutral-900 border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(24px,-24px,-60px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                <div className="font-mono text-[9px] text-neutral-500 uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                  {t.hardwareAccel}
                </div>
                <div className="font-mono text-[10px] text-white mt-2">{t.enabled}</div>
              </div>
              <div className="absolute inset-0 rounded-none bg-[#0a0a0a] border border-white/[0.08] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:translate3d(12px,-12px,-30px)] opacity-0 group-hover:opacity-100 flex flex-col justify-start p-6 overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]"></div>
                <div className="font-mono text-[9px] text-neutral-400 uppercase">
                  {t.latencyTarget}
                </div>
                <div className="font-mono text-[10px] text-emerald-400 mt-1">
                  &lt;1.2MS
                </div>
              </div>
              <div className="relative p-10 rounded-none bg-black border border-white/[0.05] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-white/20 group-hover:shadow-[-30px_30px_50px_rgba(0,0,0,0.8)] group-hover:bg-white/[0.04] z-10 h-full flex flex-col group-hover:[transform:translateZ(20px)]">
                <div className="absolute inset-0 bg-grid-small opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity"></div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-none bg-black border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    {/* @ts-expect-error iconify-icon is a web component */}
                    <iconify-icon icon="solar:code-scan-linear" class="text-2xl text-neutral-300 group-hover:text-white"></iconify-icon>
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded bg-black/50">
                    MOD_03
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight relative z-10">
                  {t.lowLevelArch}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8 flex-1 relative z-10">
                  {t.lowLevelArchDesc}
                </p>
                <div className="font-mono text-[10px] text-neutral-500 flex flex-col gap-1 relative z-10 mt-auto">
                  <span className="group-hover:text-white transition-colors">
                    &gt; compile_shaders()
                  </span>
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity delay-75">
                    &gt; init_webgl_ctx()
                  </span>
                  <span className="opacity-25 group-hover:opacity-100 transition-opacity delay-150">
                    &gt; OK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Gemini AI */}
      <div className="w-full bg-neutral-100 dark:bg-[#111] py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
          <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {t.geminiPowered}
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-black dark:text-white tracking-tight">
              {t.aiSectionTitle}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-lg leading-relaxed">
              {t.aiSectionDesc}
            </p>
          </div>
          <div className="flex-1 w-full max-w-sm mx-auto md:mx-0">
            <div className="bg-white dark:bg-black rounded-3xl p-6 md:p-8 border border-black/5 dark:border-white/5 shadow-2xl relative">
              <div className="absolute -top-3 -end-3 md:-top-4 md:-end-4 w-10 h-10 md:w-12 h-12 bg-purple-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce">
                <BrainCircuit size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="h-1.5 md:h-2 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse"></div>
                <div className="h-1.5 md:h-2 w-1/2 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse"></div>
                <div className="h-1.5 md:h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse"></div>
              </div>
              <div className="mt-6 text-[10px] text-neutral-500">
                // Raw data output
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Library Pulse */}
      <div className="w-full flex justify-center mt-8 md:mt-12 mb-6 md:mb-8 px-4">
        <div className="relative inline-block p-4 md:p-8 w-full max-w-[1400px]">
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

          <div className="relative pointer-events-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 w-full mx-auto">
              <div className="space-y-2 md:space-y-3 max-w-xl">
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
                  {t.sectionLibrarySubtitle}
                </p>
                <h2 className="text-lg sm:text-2xl lg:text-3xl xl:text-3xl font-bold text-black dark:text-white tracking-tight">
                  {t.sectionLibraryTitle}
                </h2>
                <p className="text-[11px] sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {t.sectionLibraryDesc}
                </p>
              </div>

              <div className="bg-white/80 dark:bg-[#111]/80 backdrop-blur border border-black/10 dark:border-white/10 rounded-xl p-4 md:p-5 w-full lg:w-64 shadow-lg shrink-0 group hover:border-black/20 dark:hover:border-white/20 transition-all">
                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-bold">
                  {t.sectionLibraryCardTitle}
                </p>
                <div className="mt-2 md:mt-3 flex items-end gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-black dark:text-white group-hover:text-blue-500 transition-colors">
                    {t.sectionLibraryCardStat}
                  </span>
                  <span className="text-[10px] md:text-xs text-neutral-500 pb-0.5 md:pb-1">
                    {t.sectionLibraryCardLabel}
                  </span>
                </div>
                <div className="mt-2 md:mt-3 flex items-center gap-1.5 text-[9px] md:text-[10px] text-neutral-500">
                  <Sparkles className="h-3 w-3 text-blue-500 animate-pulse" />
                  <span>{t.sectionLibraryCardUpdate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Orbital Graphic */}
      <div className="w-full py-16 md:py-24 overflow-hidden flex flex-col items-center relative mt-6 md:mt-12 bg-black/[0.01] dark:bg-white/[0.01]">
        <div
          className="absolute h-0 border-t border-black/[0.05] dark:border-white/[0.05] top-0 left-0 right-0 pointer-events-none"
          style={{ width: "4000px", marginLeft: "-2000px" }}
        ></div>
        <div
          className="absolute h-0 border-b border-black/[0.05] dark:border-white/[0.05] bottom-0 left-0 right-0 pointer-events-none"
          style={{ width: "4000px", marginLeft: "-2000px" }}
        ></div>

        <div className="text-center space-y-2 md:space-y-3 mb-10 md:mb-16 relative z-20 px-4">
          <h2 className="text-xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
            {t.specialTitle}
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-zinc-400 max-w-lg mx-auto">
            {t.specialDesc}
          </p>
        </div>

        <div className="relative z-10 w-[640px] h-[640px] max-w-[94vw] max-h-[94vw] flex items-center justify-center scale-[0.72] md:scale-100">
          {/* Ambient Base Glow */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/[0.04] blur-[60px] opacity-80 pointer-events-none"></div>

          {/* Radar Pull Rings */}
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border-white/20 border-solid rounded-full pointer-events-none" style={{ animation: "radar-pull-anim 4s cubic-bezier(0.5, 0, 0.8, 1) infinite", animationDelay: "0s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border-white/20 border-solid rounded-full pointer-events-none" style={{ animation: "radar-pull-anim 4s cubic-bezier(0.5, 0, 0.8, 1) infinite", animationDelay: "1.33s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border-white/20 border-solid rounded-full pointer-events-none" style={{ animation: "radar-pull-anim 4s cubic-bezier(0.5, 0, 0.8, 1) infinite", animationDelay: "2.66s" }}></div>

          {/* Central Converging Core */}
          <div className="absolute top-1/2 left-1/2 z-30 pointer-events-none" style={{ animation: "core-pulse-anim 2s ease-in-out infinite" }}>
            <div className="absolute inset-0 rounded-full bg-black/20 dark:bg-white/20 opacity-20 blur-xl animate-pulse"></div>
            <div className="relative w-20 h-20 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.2),inset_0_0_20px_rgba(255,255,255,0.2)] dark:shadow-[0_0_60px_rgba(255,255,255,0.9),inset_0_0_20px_rgba(0,0,0,0.2)] before:content-[''] before:absolute before:-inset-4 before:border before:border-dashed before:border-black/40 dark:before:border-white/40 before:rounded-full before:animate-[spin_6s_linear_infinite]">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
          </div>

          {/* Scattered Converging Elements */}

          {/* Element 1: Code Block */}
          <div className="absolute top-1/2 left-1/2 p-3 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-1.5 w-32 z-20" style={{ "--tx": "-240px", "--ty": "-240px", "--rot": "15deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "0.2s" } as React.CSSProperties}>
            <div className="h-1.5 w-1/2 bg-black/20 dark:bg-white/20"></div>
            <div className="h-1.5 w-3/4 bg-black/40 dark:bg-white/40"></div>
            <div className="h-1.5 w-2/3 bg-black/20 dark:bg-white/20"></div>
          </div>

          {/* Element 2: Database */}
          <div className="absolute top-1/2 left-1/2 p-3 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 text-neutral-600 dark:text-neutral-300" style={{ "--tx": "260px", "--ty": "-180px", "--rot": "-20deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "0.6s" } as React.CSSProperties}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
              <path d="M3 12A9 3 0 0 0 21 12"></path>
            </svg>
          </div>

          {/* Element 3: Custom Toggle */}
          <div className="absolute top-1/2 left-1/2 p-2.5 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20" style={{ "--tx": "-180px", "--ty": "260px", "--rot": "30deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "1.0s" } as React.CSSProperties}>
            <div className="w-8 h-4 bg-black/20 dark:bg-white/20 relative">
              <div className="absolute end-1 top-[2px] w-3 h-3 bg-black dark:bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
            </div>
          </div>

          {/* Element 4: Metric */}
          <div className="absolute top-1/2 left-1/2 px-4 py-2 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2 z-20" style={{ "--tx": "220px", "--ty": "220px", "--rot": "-10deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "1.4s" } as React.CSSProperties}>
            <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] dark:shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
            <span className="text-xs font-mono text-black dark:text-white">99.9%</span>
          </div>

          {/* Element 5: Bar Chart */}
          <div className="absolute top-1/2 left-1/2 p-3 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-end gap-1.5 h-12 w-16 z-20" style={{ "--tx": "-320px", "--ty": "20px", "--rot": "25deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "1.8s" } as React.CSSProperties}>
            <div className="w-2 bg-black/20 dark:bg-white/20 h-1/3"></div>
            <div className="w-2 bg-black/40 dark:bg-white/40 h-2/3"></div>
            <div className="w-2 bg-black/60 dark:bg-white/60 h-1/2"></div>
            <div className="w-2 bg-black/80 dark:bg-white/80 h-full shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
          </div>

          {/* Element 6: Settings */}
          <div className="absolute top-1/2 left-1/2 p-3 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 text-neutral-600 dark:text-neutral-300" style={{ "--tx": "300px", "--ty": "60px", "--rot": "-25deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "2.2s" } as React.CSSProperties}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>

          {/* Element 7: User Profile Placeholder */}
          <div className="absolute top-1/2 left-1/2 p-2 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2 z-20" style={{ "--tx": "-80px", "--ty": "-300px", "--rot": "40deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "2.6s" } as React.CSSProperties}>
            <div className="w-6 h-6 bg-gradient-to-tr from-black/20 to-black/5 dark:from-white/20 dark:to-white/5 border border-black/20 dark:border-white/20"></div>
            <div className="h-1.5 w-8 bg-black/20 dark:bg-white/20"></div>
          </div>

          {/* Element 8: Security Shield */}
          <div className="absolute top-1/2 left-1/2 p-3 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 text-emerald-500 dark:text-emerald-400" style={{ "--tx": "100px", "--ty": "-280px", "--rot": "-15deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "3.0s" } as React.CSSProperties}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 8-2 2 0 6 1 8 2a1 1 0 0 1 1 1z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>

          {/* Element 9: Custom Slider */}
          <div className="absolute top-1/2 left-1/2 p-3 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] w-24 z-20" style={{ "--tx": "-120px", "--ty": "320px", "--rot": "20deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "3.4s" } as React.CSSProperties}>
            <div className="w-full h-1 bg-black/10 dark:bg-white/10 relative">
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-black dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div>
            </div>
          </div>

          {/* Element 10: CPU Node */}
          <div className="absolute top-1/2 left-1/2 p-3 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 text-neutral-600 dark:text-neutral-300" style={{ "--tx": "160px", "--ty": "300px", "--rot": "-35deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "3.8s" } as React.CSSProperties}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="16" height="16" x="4" y="4"></rect>
              <rect width="6" height="6" x="9" y="9"></rect>
              <path d="M15 2v2"></path>
              <path d="M15 20v2"></path>
              <path d="M2 15h2"></path>
              <path d="M2 9h2"></path>
              <path d="M20 15h2"></path>
              <path d="M20 9h2"></path>
              <path d="M9 2v2"></path>
              <path d="M9 20v2"></path>
            </svg>
          </div>

          {/* Element 11: Line Graph */}
          <div className="absolute top-1/2 left-1/2 p-3 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] w-20 z-20" style={{ "--tx": "-340px", "--ty": "-120px", "--rot": "10deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "4.2s" } as React.CSSProperties}>
            <svg viewBox="0 0 100 20" className="w-full h-4 overflow-visible">
              <path d="M0,10 Q15,20 25,10 T50,10 T75,5 T100,10" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/60 dark:text-white/60"></path>
            </svg>
          </div>

          {/* Element 12: Code Block 2 */}
          <div className="absolute top-1/2 left-1/2 p-3 bg-white/80 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-1.5 w-24 z-20" style={{ "--tx": "340px", "--ty": "-80px", "--rot": "-5deg", animation: "gravity-well-anim 4.8s cubic-bezier(0.5, 0, 0.8, 1) infinite both", animationDelay: "4.6s" } as React.CSSProperties}>
            <div className="h-1.5 w-full bg-emerald-500/40 dark:bg-emerald-400/40"></div>
            <div className="h-1.5 w-2/3 bg-black/20 dark:bg-white/20"></div>
          </div>
        </div>
      </div>

      {/* Section 5: FAQ & Testimonials */}
      <div className="w-full py-20 flex flex-col items-center relative overflow-hidden mt-12 bg-[#f5f5f0] dark:bg-[#1a1a1a]">
        <div className="max-w-[1400px] w-full px-4 relative z-10">
          <div className="bg-white dark:bg-[#111] border border-black/5 dark:border-white/5 rounded-[32px] shadow-lg overflow-hidden p-6 lg:p-12">
            <div className="grid md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-7">
                <div className="mb-6">
                  <div className="text-[10px] font-bold text-[#5A5A40] dark:text-neutral-400 tracking-widest uppercase mb-2">
                    {t.faqBadge}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                    {t.faqTitle}
                  </h2>
                  <p className="text-neutral-500 mt-3 text-sm max-w-lg leading-relaxed">
                    {t.faqDesc}
                  </p>
                </div>
                <div className="divide-y divide-black/5 dark:divide-white/5">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="py-4">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="group flex items-center justify-between w-full text-left focus:outline-none"
                      >
                        <h3 className="text-base font-medium text-black dark:text-white group-hover:text-[#5A5A40] transition-colors">
                          {faq.q}
                        </h3>
                        <span className="ms-3 inline-flex items-center justify-center rounded-full border border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-white/5 p-1.5 group-hover:bg-[#5A5A40]/10 transition-colors shrink-0 text-neutral-500">
                          {openFaq === idx ? (
                            <Minus size={14} />
                          ) : (
                            <Plus size={14} />
                          )}
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
                      >
                        <div className="p-3 bg-neutral-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border border-black/10 dark:border-white/10 bg-[#5A5A40]/10 mb-3">
                    <span className="text-[9px] font-bold tracking-widest text-[#5A5A40] uppercase">
                      {t.testiBadge}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white leading-tight">
                    {t.testiTitle1}{" "}
                    <span className="text-neutral-500">{t.testiTitle2}</span>
                  </h3>
                  <p className="mt-2 text-xs text-neutral-500 max-w-sm">
                    {t.testiDesc}
                  </p>
                </div>

                <div className="space-y-3">
                  <article className="rounded-[24px] border border-black/5 dark:border-white/5 bg-white dark:bg-[#1a1a1a] p-6 hover:border-[#5A5A40]/20 transition-all cursor-default shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <Quote className="w-6 h-6 text-[#5A5A40]/20" />
                      <img
                        src="https://ui-avatars.com/api/?name=Ray+Fernando&background=5A5A40&color=fff"
                        className="w-10 h-10 rounded-full grayscale hover:grayscale-0 transition-all shadow-sm"
                        alt="User"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-black dark:text-white text-xs font-medium leading-relaxed">
                      "{t.quote1}"
                    </p>
                    <div className="mt-3">
                      <p className="text-xs font-bold text-black dark:text-white">
                        {t.quote1Name}
                      </p>
                      <p className="text-[10px] text-neutral-500 mt-0.5">
                        {t.quote1Title}
                      </p>
                    </div>
                  </article>

                  <article className="rounded-[24px] border border-black/5 dark:border-white/5 bg-white dark:bg-[#1a1a1a] p-6 hover:border-[#5A5A40]/20 transition-all cursor-default shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <Quote className="w-6 h-6 text-[#5A5A40]/20" />
                      <img
                        src="https://ui-avatars.com/api/?name=Greg+Isenberg&background=5A5A40&color=fff"
                        className="w-10 h-10 rounded-full grayscale hover:grayscale-0 transition-all shadow-sm"
                        alt="User"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-black dark:text-white text-xs font-medium leading-relaxed">
                      "{t.quote2}"
                    </p>
                    <div className="mt-3">
                      <p className="text-xs font-bold text-black dark:text-white">
                        {t.quote2Name}
                      </p>
                      <p className="text-[10px] text-neutral-500 mt-0.5">
                        {t.quote2Title}
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="w-full max-w-3xl mx-auto py-24 px-4 text-center flex flex-col items-center gap-6 bg-white dark:bg-[#050505] rounded-[48px] border border-black/5 dark:border-white/5 my-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight">
          {t.ctaTitle}
        </h2>
        <p className="text-base md:text-lg text-neutral-500 dark:text-zinc-400 font-light max-w-lg">
          {t.ctaDesc}
        </p>
        <button
          onClick={() => {
            setAuthMode("register");
            setIsAuthModalOpen(true);
          }}
          className="mt-3 px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Package size={18} />
          {t.getStarted}
        </button>
      </div>
    </div>
  );
};
