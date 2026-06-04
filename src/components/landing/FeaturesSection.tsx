import React, { useMemo } from "react";
import { motion } from "motion/react";
import { Check, LayoutGrid, Sparkles, Workflow } from "lucide-react";

interface FeaturesSectionProps {
  t: any;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ t }) => {
  const featureCards = useMemo(() => [
    { icon: LayoutGrid, title: t.feature1Title || "Organize with ease", description: t.feature1Desc || "Group your links into collections and tag them for quick access later." },
    { icon: Workflow, title: t.feature2Title || "Automated Metadata", description: t.feature2Desc || "Paste a link and AI automatically extracts the title, icon, and description." },
    { icon: Sparkles, title: t.feature3Title || "Live Syncing", description: t.feature3Desc || "Access your tool stock instantly across all your devices securely." },
  ], [t]);

  const stats = useMemo(() => [
    { value: "18.4K+", label: t.stat1 || "Active Users" },
    { value: "3.2K+", label: t.stat2 || "Collections Created" },
    { value: "99.9%", label: t.stat3 || "Uptime" },
    { value: "256-bit", label: t.stat4 || "Encryption" },
  ], [t]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <section id="features" className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 overflow-hidden px-4 py-16 md:px-6 md:py-24">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-sky-200/25 blur-3xl dark:bg-sky-400/8" />
        <div className="absolute right-0 top-24 h-52 w-52 rounded-full bg-amber-200/18 blur-3xl dark:bg-amber-400/8" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
          {t.featuresTitle || "Core Features"}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-4xl">
          {t.specialTitle || "Everything you need, beautifully designed."}
        </h2>
        <p className="mt-4 text-base leading-8 text-neutral-600 dark:text-neutral-400">
          {t.specialDesc || "Say goodbye to scattered bookmarks. Bring everything into one organized space powered by modern AI features."}
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-4 lg:grid-cols-3"
      >
        {featureCards.map((feature, index) => (
          <motion.article
            key={feature.title}
            variants={cardVariants}
            className="group relative rounded-[2rem] border border-black/8 bg-white/60 backdrop-blur p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-white/8 dark:bg-white/[0.02]"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-100/70 blur-2xl transition-transform duration-500 group-hover:scale-125 dark:bg-sky-400/10" />
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent dark:via-sky-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/10 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-black dark:text-white">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              {feature.description}
            </p>
          </motion.article>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] mt-8"
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-[#111] p-8 text-white dark:bg-white dark:text-black shadow-2xl">
          <div className="pointer-events-none absolute -right-14 top-6 h-36 w-36 rounded-full border border-white/10 dark:border-black/10" />
          <div className="pointer-events-none absolute right-12 top-14 h-20 w-20 rounded-full bg-white/6 blur-xl dark:bg-black/6" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60 dark:text-black/60">
            {t.aiSectionTitle || "AI Automation"}
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight">
            {t.sectionLibraryTitle || "Smart Library Engine"}
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/72 dark:text-black/72">
            {t.sectionLibraryDesc || "Don't waste time typing. Just paste the URL and our AI will instantly categorize it, pull metadata, and tag it properly."}
          </p>
          <div className="mt-8 space-y-3">
            {[t.feature1Desc || "Automatic organization", t.feature2Desc || "Auto extraction", t.aiSectionDesc || "AI suggestions"].map((desc, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                key={i} 
                className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 dark:bg-black/8 hover:bg-white/20 dark:hover:bg-black/15 transition-colors"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400 dark:text-emerald-600" />
                <span className="text-sm text-white/80 dark:text-black/80">{desc}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-[2rem] border border-black/8 bg-white/80 backdrop-blur p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/8 dark:bg-white/[0.04]"
            >
              <div className="pointer-events-none absolute right-4 top-4 h-14 w-14 rounded-full bg-sky-100/70 blur-2xl dark:bg-sky-400/10" />
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                {stat.label}
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-black dark:text-white">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
