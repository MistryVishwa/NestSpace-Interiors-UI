import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTASection } from "@/components/home/cta-section";
import { EstimatorHero } from "@/components/cost-estimator/EstimatorHero";
import { EstimatorForm } from "@/components/cost-estimator/EstimatorForm";

export const metadata: Metadata = {
  title: "Interior Cost Estimator | NestSpace Interiors",
  description:
    "Calculate instant, transparent interior design project estimates based on room type, dimensions, design style, material quality, and custom add-ons.",
  openGraph: {
    title: "Interior Cost Estimator | NestSpace Interiors",
    description:
      "Interactive interior design pricing calculator with detailed cost breakdowns, custom material selection, and budget recommendations.",
    url: "https://nestspace-interiors.vercel.app/cost-estimator",
    siteName: "NestSpace Interiors",
    images: [
      {
        url: "/images/hero-interior.jpg",
        width: 1200,
        height: 630,
        alt: "NestSpace Interiors Cost Estimator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Cost Estimator | NestSpace Interiors",
    description:
      "Calculate instant, transparent interior design project estimates based on room type, dimensions, style, and add-ons.",
    images: ["/images/hero-interior.jpg"],
  },
};

export default function CostEstimatorPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <EstimatorHero />
      <section className="bg-background">
        <EstimatorForm />
      </section>
      <CTASection />
      <Footer />
    </main>
  );
}
