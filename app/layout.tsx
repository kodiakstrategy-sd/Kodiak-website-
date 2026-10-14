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
  metadataBase: new URL("https://www.kodiakstrategy.com"),
  title: "Kodiak Strategy | AI Consulting & Training for Owner-Operated Businesses | Sioux Falls, SD",
  description: "Real-world AI. Real time back. Kodiak Strategy builds AI systems and trains teams for owner-operated businesses in Sioux Falls and across South Dakota.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Kodiak Strategy | Real-world AI. Real time back.",
    description: "AI systems and training for owner-operated businesses, based in Sioux Falls, SD.",
    url: "/",
    siteName: "Kodiak Strategy",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Kodiak Strategy. Real-world AI. Real time back." }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodiak Strategy | Real-world AI. Real time back.",
    description: "AI systems and training for owner-operated businesses, based in Sioux Falls, SD.",
    images: ["/og.png"],
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
