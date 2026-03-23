import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "Privacy Policy | NestSpace Interiors",
  description: "Learn about how NestSpace Interiors collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-muted-foreground text-sm">
                Last updated: January 2024
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Introduction</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    NestSpace Interiors (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Information We Collect</h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    We may collect information about you in a variety of ways:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
                    <li><strong className="text-foreground">Personal Data:</strong> Name, email address, phone number, and mailing address when you contact us or request a consultation.</li>
                    <li><strong className="text-foreground">Project Information:</strong> Details about your design preferences, property specifications, and budget requirements.</li>
                    <li><strong className="text-foreground">Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent.</li>
                    <li><strong className="text-foreground">Device Information:</strong> Browser type, operating system, and IP address for analytics purposes.</li>
                  </ul>
                </section>

                {/* How We Use Information */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
                    <li>Provide, maintain, and improve our interior design services</li>
                    <li>Respond to your inquiries and fulfill your requests</li>
                    <li>Send you updates about your project or our services</li>
                    <li>Analyze website usage to enhance user experience</li>
                    <li>Comply with legal obligations and protect our rights</li>
                  </ul>
                </section>

                {/* Cookies */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Cookies and Tracking Technologies</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you use our website. You can control cookie preferences through your browser settings, though disabling cookies may affect some website functionality.
                  </p>
                </section>

                {/* Third-Party Services */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Third-Party Services</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving you. These parties are contractually obligated to keep your information confidential and use it only for the purposes we specify. We do not sell your personal information to third parties.
                  </p>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Data Security</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Your Rights</h2>
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
                    <li>Access and receive a copy of your personal data</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Contact Us</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-secondary/30 rounded-xl">
                    <p className="text-foreground font-medium">NestSpace Interiors</p>
                    <p className="text-muted-foreground text-sm mt-1">123 Design Street, Creative District, NY 10001</p>
                    <p className="text-muted-foreground text-sm">Email: privacy@nestspace.com</p>
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
