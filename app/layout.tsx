import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Carbon Footprint Tracker | Business Sustainability Analytics",
  description: "Track, analyze, and optimize your business's carbon footprint with our comprehensive sustainability analytics platform. Monitor energy consumption, transportation emissions, waste management, and more to make data-driven decisions for a greener future.",
  keywords: "carbon footprint, sustainability, business analytics, emissions tracking, environmental impact, green business, carbon reduction, sustainability metrics",
  authors: [{ name: "Carbon Footprint Tracker Team" }],
  openGraph: {
    title: "Carbon Footprint Tracker | Business Sustainability Analytics",
    description: "Track, analyze, and optimize your business's carbon footprint with our comprehensive sustainability analytics platform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carbon Footprint Tracker | Business Sustainability Analytics",
    description: "Track, analyze, and optimize your business's carbon footprint with our comprehensive sustainability analytics platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
