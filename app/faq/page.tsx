import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata = {
  title: "FAQ | NestSpace Interiors",
  description:
    "Find answers to the most frequently asked questions about NestSpace Interiors' design process, timelines, pricing, and more.",
}

const faqs = [
  // ── Process & Timeline ──────────────────────────────────────────────────────
  {
    category: "Process & Timeline",
    items: [
      {
        id: "faq-1",
        question: "How long does a typical project take?",
        answer:
          "Project timelines vary based on scope. A single room typically takes 4–6 weeks, while whole-home projects can take 3–6 months from concept to completion. We provide a detailed schedule during your initial consultation so you always know what to expect at every stage.",
      },
      {
        id: "faq-2",
        question: "What is your design process?",
        answer:
          "Our process has four phases: (1) Discovery — an in-depth consultation to understand your lifestyle, preferences, and budget; (2) Concept Development — mood boards, space planning, and material selections; (3) Design Refinement — detailed drawings, 3D visualisations, and client revisions; and (4) Project Execution — sourcing, procurement, and on-site coordination through to final styling and handover.",
      },
      {
        id: "faq-3",
        question: "How many revision rounds are included?",
        answer:
          "Every project includes two full revision rounds during the design phase. Additional revisions beyond that are billed at our standard hourly rate. We find that most clients are happy with the direction well before the second round.",
      },
    ],
  },
  // ── Services & Working With Us ──────────────────────────────────────────────
  {
    category: "Services & Working With Us",
    items: [
      {
        id: "faq-4",
        question: "Do you work with clients remotely?",
        answer:
          "Absolutely. We offer virtual consultations and can work with clients anywhere in the country through video calls, shared digital mood boards, and detailed 3D visualisations. Many of our most successful projects have been completed entirely online.",
      },
      {
        id: "faq-5",
        question: "Which types of spaces do you design?",
        answer:
          "We design residential and commercial spaces of all sizes — from single rooms and modular kitchens to entire apartments, luxury villas, and corporate offices. Visit our Services page for a full breakdown of what we offer.",
      },
      {
        id: "faq-6",
        question: "Can I hire you just for a consultation?",
        answer:
          "Yes. We offer standalone one-hour and two-hour advisory sessions. These are ideal if you want expert guidance on colour palettes, furniture layout, or purchasing decisions without committing to a full design package.",
      },
    ],
  },
  // ── Pricing & Payments ──────────────────────────────────────────────────────
  {
    category: "Pricing & Payments",
    items: [
      {
        id: "faq-7",
        question: "How are your design fees structured?",
        answer:
          "We offer three fee models depending on project type: a flat project fee (most common for full-service projects), an hourly rate for consultations and smaller tasks, and a cost-plus model for procurement-heavy projects where we source and purchase on your behalf. Your proposal will clearly state which model applies and why.",
      },
      {
        id: "faq-8",
        question: "What is your payment schedule?",
        answer:
          "A 30% deposit is due upon signing the design agreement. A further 40% is invoiced at the design approval milestone, and the remaining 30% is collected upon project completion. For longer projects, payments may be split into additional milestones — we'll outline this in your contract.",
      },
      {
        id: "faq-9",
        question: "Do you have a minimum project budget?",
        answer:
          "Our full-service interior design projects typically start at $25,000 (excluding furniture and materials). For smaller scopes — such as a single room refresh or an advisory session — there is no minimum. Reach out and we'll recommend the right engagement level for your needs.",
      },
    ],
  },
  // ── Materials & Sourcing ────────────────────────────────────────────────────
  {
    category: "Materials & Sourcing",
    items: [
      {
        id: "faq-10",
        question: "Do you have trade access to exclusive brands?",
        answer:
          "Yes. Our studio has trade accounts with leading furniture, lighting, fabric, and tile manufacturers that are not available to the general public. This means you get access to exclusive products and trade pricing that we pass on to you.",
      },
      {
        id: "faq-11",
        question: "Can I supply my own furniture or materials?",
        answer:
          "Of course. Client-supplied items are incorporated into the design at no extra charge. We do ask that you share specs and lead times early in the process so we can plan around them effectively.",
      },
    ],
  },
  // ── Still Have Questions? ───────────────────────────────────────────────────
  {
    category: "Still Have Questions?",
    items: [
      {
        id: "faq-12",
        question: "How do I get started?",
        answer:
          "Simply head to our Contact page and fill in the enquiry form, or email us directly at hello@nestspace.com. We'll get back to you within one business day to schedule a complimentary 20-minute discovery call.",
      },
    ],
  },
]

export default function FAQPage() {
  // Build FAQ structured data from the faqs array above
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((section) =>
      section.items.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      }))
    ),
  }

  return (
    <main className="min-h-screen">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <section className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-10 sm:mb-12">
              <span className="inline-block text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">
                Support
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                Everything you need to know about working with NestSpace
                Interiors. Can&apos;t find your answer here?{" "}
                <a
                  href="/contact"
                  className="text-primary hover:underline underline-offset-4 transition-colors"
                >
                  Contact our team
                </a>{" "}
                and we&apos;ll be happy to help.
              </p>
            </div>

            {/* FAQ Sections */}
            <div className="space-y-10">
              {faqs.map((section) => (
                <div key={section.category}>
                  <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
                    {section.category}
                  </h2>
                  <div className="rounded-xl border border-border bg-card px-6">
                    <Accordion type="single" collapsible className="w-full">
                      {section.items.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-foreground text-sm font-medium hover:no-underline hover:text-primary transition-colors py-5">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>

            {/* Still need help CTA */}
            <div className="mt-12 p-6 bg-secondary/30 rounded-xl text-center">
              <p className="font-medium text-foreground mb-1">
                Didn&apos;t find what you were looking for?
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                Our team is available Monday – Friday, 9 AM – 6 PM (ET).
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:hello@nestspace.com"
                  className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Email Us
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:bg-secondary/50 transition-colors"
                >
                  Contact Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
