import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The PM Consensus Machine",
  description:
    "What do 289 top product leaders actually agree on — and fiercely debate? 7 years of Lenny's Newsletter & Podcast, distilled.",
  openGraph: {
    title: "The PM Consensus Machine",
    description: "7 years · 638 sources · What top PMs actually agree on (and where they fight)",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  );
}
