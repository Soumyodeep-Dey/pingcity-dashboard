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
  title: "PingCity Dashboard - Municipal Administration Platform",
  description: "Comprehensive municipal administration dashboard for Smart India Hackathon. Real-time issue management, analytics, and citizen engagement tools for modern city governance.",
  keywords: "municipal dashboard, smart city, issue management, citizen engagement, SIH, government, administration",
  authors: [{ name: "PingCity Team" }],
  creator: "Smart India Hackathon Team",
  publisher: "PingCity",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pingcity-dashboard.vercel.app",
    title: "PingCity Dashboard - Municipal Administration",
    description: "Modern municipal administration platform for efficient city governance and citizen engagement.",
    siteName: "PingCity Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "PingCity Dashboard - Municipal Administration",
    description: "Modern municipal administration platform for efficient city governance and citizen engagement.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8B5CF6" },
    { media: "(prefers-color-scheme: dark)", color: "#A855F7" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="application-name" content="PingCity Dashboard" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100 text-zinc-900`}
      >
        <div id="root">
          {children}
        </div>
        {/* Municipal Dashboard Loading Indicator */}
        <div id="loading-indicator" className="hidden fixed inset-0 bg-purple-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading PingCity Dashboard...</p>
          </div>
        </div>
      </body>
    </html>
  );
}
