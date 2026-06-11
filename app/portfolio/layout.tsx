import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Portfolio",
  description:
    "Explore our luxury interior design projects, from modern living rooms to elegant corporate offices.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
