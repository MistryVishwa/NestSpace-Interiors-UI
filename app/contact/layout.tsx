import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get In Touch",
  description:
    "Ready to transform your space? Contact NestSpace Interiors today to schedule a design consultation.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
