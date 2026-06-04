import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Quote } from "lucide-react";

interface FaqAndTestimonialsProps {
  t: any;
  faqs: any[];
}

export const FaqAndTestimonials: React.FC<FaqAndTestimonialsProps> = ({ t, faqs }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f7f2] py-16 dark:bg-[#121212] md:py-24">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5%] top-20 h-44 w-44 rounded-full bg-white/45 blur-3xl dark:bg-white/4" />
        <div className="absolute right-[-4%] bottom-16 h-52 w-52 rounded-full bg-[#d8decf]/26 blur-3xl dark:bg-neutral-700/16" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        
        {/* FAQs */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.2rem] border border-black/8 bg-white/80 backdrop-blur p-6 shadow-sm dark:border-white/8 dark:bg-white/[0.02] md:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            {t.faqBadge || "FAQ"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white">
            {t.faqTitle || "Questions? We got you."}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">
            {t.faqDesc || "Everything you need to know about the product and billing."}
          </p>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  layout
                  className="overflow-hidden rounded-[1.6rem] border border-black/8 bg-neutral-50/90 transition-all hover:shadow-md dark:border-white/8 dark:bg-black/40"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 rounded-[1.2rem] px-5 py-5 text-left"
                  >
                    <span className="text-sm font-medium text-black dark:text-white">
                      {faq.q}
                    </span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ${isOpen ? 'bg-black text-white dark:bg-white dark:text-black rotate-180' : 'bg-white text-neutral-500 dark:bg-white/[0.08] dark:text-neutral-300'}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5">
                          <div className="rounded-[1.2rem] bg-white px-5 py-4 text-sm leading-7 text-neutral-600 dark:bg-white/[0.05] dark:text-neutral-400">
                            {faq.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="relative overflow-hidden rounded-[2.2rem] border border-black/8 bg-[#111] p-8 text-white shadow-xl dark:border-white/8 dark:bg-white dark:text-black">
            <div className="pointer-events-none absolute -right-14 top-2 h-32 w-32 rounded-full border border-white/10 dark:border-black/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60 dark:text-black/60">
              {t.testiBadge || "Loved by many"}
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight">
              {t.testiTitle1 || "Built for"}{" "}
              <span className="text-white/60 dark:text-black/60">
                {t.testiTitle2 || "creators."}
              </span>
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/72 dark:text-black/72">
              {t.testiDesc || "Join thousands of designers, developers, and creators who organize their digital life with Stools."}
            </p>
          </div>

          <article className="group rounded-[2rem] border border-black/8 bg-white/80 backdrop-blur p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/8 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between">
              <Quote className="h-7 w-7 text-neutral-300 group-hover:text-blue-500 transition-colors" />
              <img src="https://ui-avatars.com/api/?name=Ray+Fernando&background=111111&color=fff" className="h-12 w-12 rounded-full" alt="Ray Fernando" />
            </div>
            <p className="mt-5 text-sm leading-7 text-black dark:text-white">
              "{t.quote1 || "Stools completely changed how I organize my design assets and inspiration links. The AI feature is a lifesaver."}"
            </p>
            <div className="mt-5">
              <p className="text-sm font-semibold text-black dark:text-white">{t.quote1Name || "Ray Fernando"}</p>
              <p className="text-xs text-neutral-500">{t.quote1Title || "Product Designer"}</p>
            </div>
          </article>

          <article className="group rounded-[2rem] border border-black/8 bg-white/80 backdrop-blur p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/8 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between">
              <Quote className="h-7 w-7 text-neutral-300 group-hover:text-blue-500 transition-colors" />
              <img src="https://ui-avatars.com/api/?name=Greg+Isenberg&background=111111&color=fff" className="h-12 w-12 rounded-full" alt="Greg Isenberg" />
            </div>
            <p className="mt-5 text-sm leading-7 text-black dark:text-white">
              "{t.quote2 || "The shared spaces allow my team to have a centralized repository of tools without cluttering our Slack channels."}"
            </p>
            <div className="mt-5">
              <p className="text-sm font-semibold text-black dark:text-white">{t.quote2Name || "Greg Isenberg"}</p>
              <p className="text-xs text-neutral-500">{t.quote2Title || "CEO"}</p>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
};
