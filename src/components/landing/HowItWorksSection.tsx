import React, { useMemo } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface HowItWorksSectionProps {
  t: any;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ t }) => {
  const steps = useMemo(() => [
    { id: "01", title: t.step1Title || "Create an account", description: t.step1Desc || "Sign up in seconds and get your secure personal workspace." },
    { id: "02", title: t.step2Title || "Add your links", description: t.step2Desc || "Paste any tool, website, or article. We'll grab the details." },
    { id: "03", title: t.step3Title || "Stay organized", description: t.step3Desc || "Use categories and smart search to find everything instantly." },
  ], [t]);

  return (
    <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-4 py-16 md:px-6 md:py-24">
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-8 top-14 h-32 w-32 rounded-full bg-[#d8c5a1]/26 blur-3xl dark:bg-amber-400/8" />
        <div className="absolute right-10 bottom-12 h-40 w-40 rounded-full bg-[#e7ddc3]/28 blur-3xl dark:bg-white/4" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative rounded-[2.5rem] border border-black/8 bg-[#f5f1e8]/80 backdrop-blur p-6 dark:border-white/8 dark:bg-[#171717]/80 md:p-10 shadow-xl"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6a3f] dark:text-neutral-500">
            {t.howItWorksTitle || "How It Works"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white md:text-4xl">
            {t.specialTitle || "Simple, seamless workflow."}
          </h2>
        </div>

        {/* Connecting Line (Desktop) */}
        <div className="pointer-events-none absolute left-1/2 top-[10.5rem] hidden h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8a6a3f]/35 to-transparent lg:block dark:via-white/20" />
        
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative rounded-[2rem] border border-black/8 bg-white/90 backdrop-blur p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg dark:border-white/8 dark:bg-black/40"
            >
              <div className="pointer-events-none absolute right-5 top-5 h-12 w-12 rounded-full bg-[#f3e6cb] dark:bg-white/5 transition-transform group-hover:scale-110" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-[0.2em] text-neutral-400 group-hover:text-amber-500 transition-colors">
                  {step.id}
                </span>
                <ChevronDown className="h-4 w-4 rotate-[-90deg] text-neutral-400 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-black dark:group-hover:text-white" />
              </div>
              <h3 className="mt-8 text-2xl font-semibold text-black dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
