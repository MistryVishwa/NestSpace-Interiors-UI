import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/scroll-to-top";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nestspace-interiors.vercel.app/"),
  title: {
    default: "NestSpace Interiors | Premium Interior Design",
    template: "%s | NestSpace Interiors", // Automatically formats child pages like "About | NestSpace Interiors"
  },
  description:
    "We create modern, elegant interiors for homes and offices. Transform your space with our luxury design services.",
  keywords: [
    "interior design",
    "luxury interiors",
    "home design",
    "office design",
    "modular kitchen",
  ],
  openGraph: {
    title: "NestSpace Interiors | Premium Interior Design",
    description: "We create modern, elegant interiors for homes and offices.",
    url: "https://nestspace-interiors.vercel.app/",
    siteName: "NestSpace Interiors",
    images: [
      {
        url: "/images/hero-interior.jpg",
        width: 1200,
        height: 630,
        alt: "NestSpace Interiors - Premium Interior Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NestSpace Interiors | Premium Interior Design",
    description: "We create modern, elegant interiors for homes and offices.",
    images: ["/images/hero-interior.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${poppins.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="nestspace-theme"
        >
          {children}
          <ScrollToTop/>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
