import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Statiful - Professional Football Statistics Dashboard",
  description: "Generate broadcast-quality football statistics graphics in seconds. Perfect for YouTube creators, analysts, and content producers.",
  keywords: ["football statistics", "soccer stats", "xG", "Premier League", "YouTube graphics", "content creation"],
  authors: [{ name: "Statiful" }],
  openGraph: {
    title: "Statiful - Professional Football Statistics Dashboard",
    description: "Generate broadcast-quality football statistics graphics in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen`}
      >
        <Providers>
          {/* Main App Container */}
          <div className="relative min-h-screen bg-statiful-dark">
            {/* Grid background effect */}
            <div className="fixed inset-0 grid-background opacity-30 pointer-events-none" />
            
            {/* Main content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}