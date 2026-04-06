import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Check,
  ChevronDown,
  LayoutGrid,
  Package,
  Plus,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  Workflow,
} from "lucide-react";
import {
  ChatGPTIcon,
  FigmaIcon,
  GeminiIcon,
  GithubCustomIcon,
  ReactIcon,
  VercelIcon,
} from "@/src/components/icons/Icons";
import { staticCategories } from "@/src/data/static";

interface LandingPageProps {
  t: any;
  lang: string;
  setAuthMode: (mode: string) => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  faqs: any[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  t,
  setAuthMode,
  setIsAuthModalOpen,
  faqs,
}) => {
  const [mockSearchTerm, setMockSearchTerm] = useState("");
  const [activeMockTab, setActiveMockTab] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const mockBookmarksData = useMemo(
    () => [
      {
        id: 1,
        title: "Figma",
        url: "figma.com",
        cat: "design",
        description: "Collaborative UI design tool.",
        icon: <FigmaIcon size={20} />,
        time: "2 hours ago",
      },
      {
        id: 2,
        title: "React",
        url: "react.dev",
        cat: "codeing",
        description: "Component-based UI framework.",
        icon: <ReactIcon size={20} />,
        time: "5 hours ago",
      },
      {
        id: 3,
        title: "ChatGPT",
        url: "chat.openai.com",
        cat: "ai tools",
        description: "AI assistant for writing and research.",
        icon: <ChatGPTIcon size={20} />,
        time: "1 day ago",
      },
      {
        id: 4,
        title: "Vercel",
        url: "vercel.com",
        cat: "work",
        description: "Deploy and monitor web products.",
        icon: <VercelIcon size={20} />,
        time: "2 days ago",
      },
      {
        id: 5,
        title: "GitHub",
        url: "github.com",
        cat: "work",
        description: "Code hosting and team collaboration.",
        icon: <GithubCustomIcon size={20} />,
        time: "1 week ago",
      },
    ],
    [],
  );

  const featureCards = useMemo(
    () => [
      {
        icon: LayoutGrid,
        title: t.feature1Title,
        description: t.feature1Desc,
      },
      {
        icon: Workflow,
        title: t.feature2Title,
        description: t.feature2Desc,
      },
      {
        icon: Sparkles,
        title: t.feature3Title,
        description: t.feature3Desc,
      },
    ],
    [t],
  );

  const steps = useMemo(
    () => [
      { id: "01", title: t.step1Title, description: t.step1Desc },
      { id: "02", title: t.step2Title, description: t.step2Desc },
      { id: "03", title: t.step3Title, description: t.step3Desc },
    ],
    [t],
  );

  const stats = useMemo(
    () => [
      { value: "18.4K+", label: t.stat1 },
      { value: "3.2K+", label: t.stat2 },
      { value: "99.9%", label: t.stat3 },
      { value: "256-bit", label: t.stat4 },
    ],
    [t],
  );

  const trustedTools = useMemo(
    () => [
      { name: "ChatGPT", icon: ChatGPTIcon },
      { name: "Gemini", icon: GeminiIcon },
      { name: "Figma", icon: FigmaIcon },
      { name: "React", icon: ReactIcon },
      { name: "Vercel", icon: VercelIcon },
      { name: "GitHub", icon: GithubCustomIcon },
    ],
    [],
  );

  const heroTrustItems = useMemo(
    () => [
      { type: "metric", value: "18.4K+", label: t.stat1 },
      { type: "metric", value: "99.9%", label: t.stat3 },
      { type: "metric", value: "256-bit", label: t.stat4 },
      ...trustedTools.slice(0, 3).map((tool) => ({
        type: "tool",
        name: tool.name,
        icon: tool.icon,
      })),
    ],
    [t, trustedTools],
  );

  const filteredMockBookmarksList = useMemo(() => {
    const q = mockSearchTerm.toLowerCase();
    return mockBookmarksData.filter((bookmark) => {
      const titleMatch = bookmark.title.toLowerCase().includes(q);
      const descriptionMatch = bookmark.description.toLowerCase().includes(q);
      const categoryMatch =
        activeMockTab === "all" || bookmark.cat === activeMockTab;

      return (q === "" || titleMatch || descriptionMatch) && categoryMatch;
    });
  }, [activeMockTab, mockBookmarksData, mockSearchTerm]);

  const heroPreviewBookmarks = useMemo(
    () => filteredMockBookmarksList.slice(0, 3),
    [filteredMockBookmarksList],
  );

  return (
    <div className="relative w-full">
      <div className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(circle_at_top,_rgba(195,213,255,0.82),_transparent_40%),radial-gradient(circle_at_12%_24%,_rgba(255,218,176,0.26),_transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(252,252,252,0))] dark:bg-[radial-gradient(circle_at_top,_rgba(82,104,154,0.34),_transparent_36%),radial-gradient(circle_at_18%_18%,_rgba(170,128,84,0.14),_transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="mt-2 h-56 w-[88%] max-w-5xl rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.92),rgba(255,255,255,0))] opacity-75 blur-3xl dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.07),rgba(255,255,255,0))]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-10 -z-10 hidden justify-center lg:flex">
        <div className="relative h-[28rem] w-full max-w-6xl">
          <div className="absolute left-8 top-10 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10" />
          <div className="absolute right-16 top-24 h-48 w-48 rounded-full bg-amber-200/35 blur-3xl dark:bg-amber-500/10" />
          <div className="absolute left-1/2 top-12 h-56 w-[32rem] -translate-x-1/2 rounded-full border border-black/6 dark:border-white/6" />
          <div className="absolute left-1/2 top-20 h-56 w-[26rem] -translate-x-1/2 rounded-full border border-black/5 dark:border-white/5" />
        </div>
      </div>

      <section className="mx-auto flex w-full max-w-[82rem] flex-col gap-8 px-4 pb-14 pt-8 md:px-6 md:gap-10 md:pb-20 md:pt-12 xl:px-8 xl:pb-24 xl:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="relative max-w-2xl">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300 sm:px-4 sm:text-[10px] sm:tracking-[0.22em]">
              <Package className="h-3.5 w-3.5 shrink-0 text-sky-500" />
              <span className="min-w-0 truncate">{t.heroBadge}</span>
            </div>

            <h1 className="mt-6 text-[2.85rem] font-semibold leading-[0.92] tracking-[-0.085em] text-black dark:text-white sm:max-w-[11ch] sm:text-[3.8rem] md:max-w-[10ch] md:text-[4.65rem] lg:max-w-none lg:text-[5rem] xl:text-[5.45rem]">
              <span className="block">{t.heroTitle1}</span>
              <span className="mt-1 block text-neutral-500 dark:text-neutral-400">
                {t.heroTitle2}
              </span>
              <span className="mt-1 block">{t.heroTitle3}</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg md:leading-8">
              {t.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setAuthMode("register");
                  setIsAuthModalOpen(true);
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(13,18,32,0.14)] transition-all hover:-translate-y-0.5 hover:shadow-[0_30px_80px_rgba(13,18,32,0.18)] dark:bg-white dark:text-black sm:px-6 sm:py-3.5"
              >
                <Boxes className="h-4 w-4" />
                {t.getStarted}
              </button>
              <a
                href="#features"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white/75 px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-black/5 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] sm:px-6 sm:py-3.5"
              >
                {t.learnMore}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/75 px-3 py-2 shadow-sm dark:border-white/8 dark:bg-white/[0.04]">
                <ShieldCheck className="h-3.5 w-3.5" />
                {t.stat4}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/75 px-3 py-2 shadow-sm dark:border-white/8 dark:bg-white/[0.04]">
                <Sparkles className="h-3.5 w-3.5" />
                {t.geminiPowered}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-2 text-emerald-700 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/8 dark:text-emerald-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Live organization
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-3xl lg:max-w-none">
            <div className="pointer-events-none absolute -left-4 top-12 hidden rounded-2xl border border-black/8 bg-white/75 px-3 py-2 text-xs font-medium text-neutral-600 shadow-lg backdrop-blur landing-float-slow dark:border-white/8 dark:bg-white/[0.05] dark:text-neutral-300 lg:flex">
              <FigmaIcon size={16} />
              <span className="ms-2">Design stack</span>
            </div>
            <div className="pointer-events-none absolute -right-3 top-24 hidden rounded-2xl border border-black/8 bg-white/75 px-3 py-2 text-xs font-medium text-neutral-600 shadow-lg backdrop-blur landing-float-slow dark:border-white/8 dark:bg-white/[0.05] dark:text-neutral-300 lg:flex">
              <ChatGPTIcon size={16} />
              <span className="ms-2">AI metadata</span>
            </div>
            <div className="pointer-events-none absolute left-10 -bottom-4 hidden rounded-2xl border border-black/8 bg-white/75 px-3 py-2 text-xs font-medium text-neutral-600 shadow-lg backdrop-blur landing-float-slow dark:border-white/8 dark:bg-white/[0.05] dark:text-neutral-300 xl:flex">
              <VercelIcon size={16} />
              <span className="ms-2">Deploy ready</span>
            </div>
            <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(245,247,252,0.56))] blur-2xl dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))]" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/88 p-2.5 shadow-[0_30px_70px_rgba(20,28,44,0.12)] backdrop-blur dark:border-white/10 dark:bg-[#090909]/90 dark:shadow-[0_30px_70px_rgba(0,0,0,0.38)] sm:rounded-[1.75rem] sm:p-4 xl:p-5">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
              <div className="pointer-events-none absolute -right-8 top-8 h-28 w-28 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-400/10" />
              <div className="flex flex-col gap-3 border-b border-black/5 pb-3 dark:border-white/5 sm:flex-row sm:items-center sm:justify-between sm:pb-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex min-w-0 items-center gap-2 rounded-full border border-black/10 bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white dark:border-white/10 dark:bg-white dark:text-black sm:text-[11px] sm:tracking-[0.22em]">
                    <Boxes className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{t.preview}</span>
                  </div>
                </div>
                <div className="hidden w-fit items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[11px] text-neutral-500 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-400 sm:inline-flex sm:text-xs md:w-auto">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t.sharedMode}
                </div>
              </div>

              <div className="mt-3 grid gap-3 xl:mt-4 xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-4">
                <div className="rounded-[1.25rem] border border-black/8 bg-[#f7f8fb] p-3 dark:border-white/8 dark:bg-[#0d0d10] sm:rounded-[1.45rem] sm:p-4">
                  <div className="flex flex-col gap-3 border-b border-black/6 pb-4 dark:border-white/6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                        {t.sectionLibrarySubtitle}
                      </p>
                      <h2 className="mt-2 max-w-md text-base font-semibold tracking-tight text-black dark:text-white sm:text-lg xl:text-xl">
                        {t.sectionLibraryTitle}
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        setAuthMode("register");
                        setIsAuthModalOpen(true);
                      }}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
                    >
                      <Plus className="h-4 w-4" />
                      {t.addLink}
                    </button>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                      <div className="relative w-full xl:max-w-sm">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          value={mockSearchTerm}
                          onChange={(e) => setMockSearchTerm(e.target.value)}
                          placeholder={t.searchPlaceholder}
                          className="w-full rounded-2xl border border-black/8 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-black/15 dark:border-white/8 dark:bg-white/[0.04]"
                        />
                      </div>

                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide xl:flex-wrap xl:overflow-visible xl:pb-0">
                        {staticCategories.slice(0, 4).map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveMockTab(cat)}
                            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                              activeMockTab === cat
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "bg-white text-neutral-500 hover:text-black dark:bg-white/[0.04] dark:text-neutral-400 dark:hover:text-white"
                            }`}
                          >
                            {t[cat] || cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3 lg:grid-cols-2">
                      {heroPreviewBookmarks.map((bookmark) => (
                        <article
                          key={bookmark.id}
                          className="rounded-[1.2rem] border border-black/8 bg-white p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-black/15 dark:border-white/8 dark:bg-white/[0.04] dark:hover:border-white/15 sm:rounded-[1.3rem] sm:p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef2fb] dark:bg-white/[0.06]">
                                {bookmark.icon}
                              </div>
                              <div className="min-w-0">
                                <h3 className="truncate text-sm font-semibold text-black dark:text-white">
                                  {bookmark.title}
                                </h3>
                                <p className="truncate text-xs text-neutral-500">
                                  {bookmark.url}
                                </p>
                              </div>
                            </div>
                            <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400">
                              {bookmark.time}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                            {bookmark.description}
                          </p>

                          <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                            <span className="rounded-full border border-black/8 px-2.5 py-1 text-[11px] font-medium text-neutral-600 dark:border-white/8 dark:text-neutral-300">
                              {t[bookmark.cat] || bookmark.cat}
                            </span>
                            <button className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 transition hover:text-black dark:hover:text-white">
                              <span className="hidden md:inline">
                                {t.openInNewTab}
                              </span>
                              <span className="md:hidden">Open</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-[1.25rem] bg-[#111] p-4 text-white dark:bg-white dark:text-black sm:rounded-[1.35rem]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 dark:text-black/60">
                      {t.statsTitle}
                    </p>
                    <div className="mt-4 space-y-2.5">
                      {stats.slice(0, 3).map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl bg-white/10 px-3 py-3 dark:bg-black/8"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-lg font-semibold">{stat.value}</p>
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.7)] animate-pulse dark:bg-emerald-500" />
                          </div>
                          <p className="text-xs text-white/70 dark:text-black/70">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.25rem] border border-black/8 bg-white p-4 dark:border-white/8 dark:bg-white/[0.04] sm:rounded-[1.35rem]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                      {t.aiSectionTitle}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                      {t.aiSectionDesc}
                    </p>
                    <div className="mt-4 rounded-2xl bg-[#f7f8fb] p-3 dark:bg-black/20">
                      <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
                        <WandSparkles className="h-4 w-4 text-sky-500" />
                        {t.aiGen}
                      </div>
                      <div className="mt-3 space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <div className="rounded-xl bg-white px-3 py-2 dark:bg-white/[0.05]">
                          URL pasted
                        </div>
                        <div className="rounded-xl bg-white px-3 py-2 dark:bg-white/[0.05]">
                          Title + description extracted
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid gap-3 rounded-[1.75rem] border border-black/8 bg-white/65 p-3 shadow-sm backdrop-blur dark:border-white/8 dark:bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {heroTrustItems.map((item, index) =>
            item.type === "metric" ? (
              <div
                key={`${item.label}-${index}`}
                className="rounded-[1.15rem] border border-black/6 bg-white/90 px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/6 dark:bg-black/20"
              >
                <p className="text-lg font-semibold tracking-tight text-black dark:text-white">
                  {item.value}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item.label}
                </p>
              </div>
            ) : (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center gap-3 rounded-[1.15rem] border border-black/6 bg-white/90 px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/6 dark:bg-black/20"
              >
                <item.icon size={18} />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  {item.name}
                </span>
              </div>
            ),
          )}
        </div>
      </section>

      <section
        id="features"
        className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-hidden px-4 py-16 md:px-6 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-sky-200/25 blur-3xl dark:bg-sky-400/8" />
          <div className="absolute right-0 top-24 h-52 w-52 rounded-full bg-amber-200/18 blur-3xl dark:bg-amber-400/8" />
        </div>

        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            {t.featuresTitle}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-4xl">
            {t.specialTitle}
          </h2>
          <p className="mt-4 text-base leading-8 text-neutral-600 dark:text-neutral-400">
            {t.specialDesc}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <article
              key={feature.title}
              className="group relative rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/8 dark:bg-white/[0.04]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-100/70 blur-2xl transition-transform duration-500 group-hover:scale-125 dark:bg-sky-400/10" />
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent dark:via-sky-400/30" />
              <div className="landing-float-slow flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f6fb] dark:bg-white/[0.06]">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-black dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div
            className="relative overflow-hidden rounded-[2rem] bg-[#111] p-8 text-white dark:bg-white dark:text-black"
          >
            <div className="pointer-events-none absolute -right-14 top-6 h-36 w-36 rounded-full border border-white/10 dark:border-black/10" />
            <div className="pointer-events-none absolute right-12 top-14 h-20 w-20 rounded-full bg-white/6 blur-xl dark:bg-black/6" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60 dark:text-black/60">
              {t.aiSectionTitle}
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">
              {t.sectionLibraryTitle}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/72 dark:text-black/72">
              {t.sectionLibraryDesc}
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 dark:bg-black/8">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400 dark:text-emerald-600" />
                <span className="text-sm text-white/80 dark:text-black/80">
                  {t.feature1Desc}
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 dark:bg-black/8">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400 dark:text-emerald-600" />
                <span className="text-sm text-white/80 dark:text-black/80">
                  {t.feature2Desc}
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 dark:bg-black/8">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400 dark:text-emerald-600" />
                <span className="text-sm text-white/80 dark:text-black/80">
                  {t.aiSectionDesc}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="relative rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/8 dark:bg-white/[0.04]"
              >
                <div className="pointer-events-none absolute right-4 top-4 h-14 w-14 rounded-full bg-sky-100/70 blur-2xl dark:bg-sky-400/10" />
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  {stat.label}
                </p>
                <p className="mt-4 text-4xl font-semibold tracking-tight text-black dark:text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-4 py-16 md:px-6 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-8 top-14 h-32 w-32 rounded-full bg-[#d8c5a1]/26 blur-3xl dark:bg-amber-400/8" />
          <div className="absolute right-10 bottom-12 h-40 w-40 rounded-full bg-[#e7ddc3]/28 blur-3xl dark:bg-white/4" />
        </div>
        <div className="relative rounded-[2.5rem] border border-black/8 bg-[#f5f1e8] p-6 dark:border-white/8 dark:bg-[#171717] md:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6a3f] dark:text-neutral-500">
              {t.howItWorksTitle}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-4xl">
              {t.specialTitle}
            </h2>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[9.75rem] hidden h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8a6a3f]/35 to-transparent lg:block dark:via-white/20" />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.id}
                className="group relative rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/8 dark:bg-black/20"
              >
                <div className="pointer-events-none absolute right-5 top-5 h-12 w-12 rounded-full bg-[#f3e6cb] dark:bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-[0.2em] text-neutral-400">
                    {step.id}
                  </span>
                  <ChevronDown className="h-4 w-4 rotate-[-90deg] text-neutral-400 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-black dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#f7f7f2] py-16 dark:bg-[#121212] md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-5%] top-20 h-44 w-44 rounded-full bg-white/45 blur-3xl dark:bg-white/4" />
          <div className="absolute right-[-4%] bottom-16 h-52 w-52 rounded-full bg-[#d8decf]/26 blur-3xl dark:bg-neutral-700/16" />
        </div>
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.2rem] border border-black/8 bg-white p-6 shadow-sm dark:border-white/8 dark:bg-white/[0.04] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
              {t.faqBadge}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white">
              {t.faqTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              {t.faqDesc}
            </p>

            <div className="mt-8 space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    className="rounded-[1.6rem] border border-black/8 bg-neutral-50/90 p-2 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/8 dark:bg-black/20"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 rounded-[1.2rem] px-4 py-4 text-left"
                    >
                      <span className="text-sm font-medium text-black dark:text-white">
                        {faq.q}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm dark:bg-white/[0.08]">
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4">
                        <div className="rounded-[1.2rem] bg-white px-4 py-4 text-sm leading-7 text-neutral-600 dark:bg-white/[0.05] dark:text-neutral-400">
                          {faq.a}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[2.2rem] border border-black/8 bg-[#111] p-8 text-white shadow-sm dark:border-white/8 dark:bg-white dark:text-black">
              <div className="pointer-events-none absolute -right-14 top-2 h-32 w-32 rounded-full border border-white/10 dark:border-black/10" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60 dark:text-black/60">
                {t.testiBadge}
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                {t.testiTitle1}{" "}
                <span className="text-white/60 dark:text-black/60">
                  {t.testiTitle2}
                </span>
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/72 dark:text-black/72">
                {t.testiDesc}
              </p>
            </div>

            <article className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/8 dark:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <Quote className="h-7 w-7 text-neutral-300" />
                <img
                  src="https://ui-avatars.com/api/?name=Ray+Fernando&background=111111&color=fff"
                  className="h-12 w-12 rounded-full"
                  alt={t.quote1Name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-5 text-sm leading-7 text-black dark:text-white">
                "{t.quote1}"
              </p>
              <div className="mt-5">
                <p className="text-sm font-semibold text-black dark:text-white">
                  {t.quote1Name}
                </p>
                <p className="text-xs text-neutral-500">{t.quote1Title}</p>
              </div>
            </article>

            <article className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/8 dark:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <Quote className="h-7 w-7 text-neutral-300" />
                <img
                  src="https://ui-avatars.com/api/?name=Greg+Isenberg&background=111111&color=fff"
                  className="h-12 w-12 rounded-full"
                  alt={t.quote2Name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-5 text-sm leading-7 text-black dark:text-white">
                "{t.quote2}"
              </p>
              <div className="mt-5">
                <p className="text-sm font-semibold text-black dark:text-white">
                  {t.quote2Name}
                </p>
                <p className="text-xs text-neutral-500">{t.quote2Title}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-black/8 bg-[linear-gradient(135deg,#111111,#2a2e38)] p-8 text-center text-white shadow-[0_24px_90px_rgba(15,18,28,0.24)] dark:border-white/8 dark:bg-[linear-gradient(135deg,#f6f6f6,#e8ebf4)] dark:text-black md:p-14">
          <div className="pointer-events-none absolute left-8 top-8 h-28 w-28 rounded-full bg-white/8 blur-2xl dark:bg-black/8" />
          <div className="pointer-events-none absolute right-12 bottom-8 h-36 w-36 rounded-full bg-white/10 blur-3xl dark:bg-black/8" />
          <div className="pointer-events-none absolute inset-x-0 top-12 flex justify-center">
            <div className="h-24 w-24 rounded-full border border-white/10 dark:border-black/10" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60 dark:text-black/55">
            {t.ctaTitle}
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            {t.sectionLibraryTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 dark:text-black/70 md:text-base">
            {t.ctaDesc}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => {
                setAuthMode("register");
                setIsAuthModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90"
            >
              <Boxes className="h-4 w-4" />
              {t.getStarted}
            </button>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-medium text-white/90 transition hover:bg-white/10 dark:border-black/10 dark:text-black/80 dark:hover:bg-black/5"
            >
              {t.browseAll}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
