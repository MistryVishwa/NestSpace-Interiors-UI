import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "Terms of Service | NestSpace Interiors",
  description: "Read the terms and conditions governing your use of NestSpace Interiors website and services.",
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-10 sm:mb-12">
              <span className="inline-block text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">
                Legal
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Terms of Service
              </h1>
              <p className="text-muted-foreground text-sm">
                Last updated: January 2024
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="space-y-8">
                {/* Acceptance of Terms */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Acceptance of Terms</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    By accessing and using the NestSpace Interiors website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. We reserve the right to modify these terms at any time, and your continued use of the website constitutes acceptance of any changes.
                  </p>
                </section>

                {/* Use of Website */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Use of Website</h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    You agree to use our website only for lawful purposes and in a way that does not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Interfere with the proper functioning of the website</li>
                    <li>Attempt to gain unauthorized access to any part of the website</li>
                    <li>Use automated systems to access or scrape website content</li>
                  </ul>
                </section>

                {/* Intellectual Property */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Intellectual Property</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    All content on this website, including but not limited to text, images, graphics, logos, designs, photographs, and software, is the property of NestSpace Interiors or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
                  </p>
                </section>

                {/* Design Services */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Design Services</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Our interior design services are subject to separate service agreements that will be provided upon engagement. Project timelines, deliverables, and fees will be outlined in individual contracts. Design concepts and materials remain our property until full payment is received. We reserve the right to use completed projects in our portfolio unless otherwise agreed in writing.
                  </p>
                </section>

                {/* User Responsibilities */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">User Responsibilities</h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    When using our website or services, you are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
                    <li>Providing accurate and complete information</li>
                    <li>Maintaining the confidentiality of any account credentials</li>
                    <li>Notifying us promptly of any unauthorized use</li>
                    <li>Ensuring your use complies with all applicable laws</li>
                    <li>Respecting our intellectual property rights</li>
                  </ul>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    To the fullest extent permitted by law, NestSpace Interiors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our website or services.
                  </p>
                </section>

                {/* Disclaimer */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Disclaimer</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    The website and its content are provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. Any design inspiration or advice provided on this website is for informational purposes only and should not be considered professional design advice for your specific situation.
                  </p>
                </section>

                {/* Governing Law */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Governing Law</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in New York County, New York.
                  </p>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Contact Us</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-secondary/30 rounded-xl">
                    <p className="text-foreground font-medium">NestSpace Interiors</p>
                    <p className="text-muted-foreground text-sm mt-1">123 Design Street, Creative District, NY 10001</p>
                    <p className="text-muted-foreground text-sm">Email: legal@nestspace.com</p>
                    <p className="text-muted-foreground text-sm">Phone: +1 (234) 567-890</p>
                  </div>
                </section>
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
