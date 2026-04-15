import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { Navbar } from "@/components/Navbar";
import { SEO_KEYWORDS } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "RM Haul & Clean | Same-Day Junk Removal Northern Virginia",
    template: "%s | RM Haul & Clean",
  },
  description:
    "Same-day junk removal in Northern Virginia. Fairfax, Loudoun County & nearby. Fully insured, locally owned. Call now or get a free quote.",
  keywords: [...SEO_KEYWORDS],
  openGraph: {
    title: "RM Haul & Clean | Junk Removal Fairfax & Loudoun County",
    description:
      "Call for same-day pickup. Upfront pricing. We do all the lifting. Serving Northern Virginia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 pb-24 sm:pb-0">
        <JsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}
