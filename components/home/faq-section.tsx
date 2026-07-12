"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does a typical interior design project take?",
    answer:
      "Project timelines vary based on scope, but most residential projects take 6-12 weeks from concept to completion, while larger commercial spaces may take 3-6 months. We'll provide a detailed timeline during your initial consultation.",
  },
  {
    question: "Do you offer design services for both small and large spaces?",
    answer:
      "Yes, we work on projects of all sizes — from single room makeovers to complete home and office transformations. Our team tailors the approach based on your space and requirements.",
  },
  {
    question: "What is included in the initial consultation?",
    answer:
      "Our initial consultation includes an in-depth discussion about your vision, lifestyle, budget, and requirements for the space, along with a walkthrough of our design process and next steps.",
  },
  {
    question: "Can I see 3D visualizations before execution begins?",
    answer:
      "Absolutely. During the Concept Design phase, our designers create detailed mood boards and 3D visualizations so you can review and approve the design before any execution work begins.",
  },
  {
    question: "Do you provide post-project support?",
    answer:
      "Yes, we offer post-project support and maintenance services to ensure your space continues to look and function exactly as intended long after handover.",
  },
  {
    question: "How is pricing determined for a project?",
    answer:
      "Every project is unique, so pricing is based on the scope, materials, and specific requirements of your space. We offer transparent, flexible packages with no hidden costs — contact us for a personalized quote.",
  },
];

export function FAQSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]));

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--primary)_0%,transparent_50%)] opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--accent)_0%,transparent_50%)] opacity-[0.03]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 reveal",
            headerVisible && "visible",
          )}
        >
          <span className="inline-block text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3 sm:mb-4">
            Got Questions?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-5 text-balance leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="decorative-line mx-auto mb-4 sm:mb-5" />
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about working with NestSpace Interiors.
            Can&apos;t find the answer you&apos;re looking for? Feel free to
            reach out.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.has(index);
            return (
              <div
                key={faq.question}
                className={cn(
                  "group relative border-2 rounded-2xl bg-linear-to-b from-card to-secondary/20 overflow-hidden transition-all duration-300",
                  isOpen
                    ? "border-primary/40 shadow-xl shadow-primary/5"
                    : "border-border shadow-sm hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5",
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    {/* Number Badge */}
                    <span
                      className={cn(
                        "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-serif font-semibold text-sm transition-all duration-300",
                        isOpen
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary group-hover:bg-primary/20",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-semibold text-foreground">
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300",
                      isOpen && "rotate-45 bg-primary",
                    )}
                  >
                    <Plus
                      className={cn(
                        "h-4 w-4 text-primary transition-colors duration-300",
                        isOpen && "text-primary-foreground",
                      )}
                    />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pl-19 pr-5 sm:pl-20 sm:pr-6 pb-5 sm:pb-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
