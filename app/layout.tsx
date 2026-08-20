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
  metadataBase: new URL("https://kodiakstrategy.com"),
  title: "Kodiak Strategy | Practical AI for Real Businesses",
  description: "Kodiak Strategy helps businesses assess, optimize, implement, and teach practical AI that creates measurable operational value.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Kodiak Strategy | Practical AI for Real Businesses",
    description: "Practical AI strategy, implementation, and team training built around how real businesses operate.",
    url: "/",
    siteName: "Kodiak Strategy",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Kodiak Strategy — Practical AI for real businesses." }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodiak Strategy | Practical AI for Real Businesses",
    description: "Practical AI strategy, implementation, and team training built around how real businesses operate.",
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
