import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";
import GridBackground from "@/components/GridBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";

const headingFont = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MD Sifat Hossain - Full-Stack & AI/ML Engineer",
  description: "CSE undergrad @ Northern University Bangladesh | Full-Stack Dev & AI/ML Enthusiast | Dhaka, Bangladesh",
  openGraph: {
    title: "MD Sifat Hossain - Full-Stack & AI/ML Engineer",
    description: "CSE undergrad @ Northern University Bangladesh | Full-Stack Dev & AI/ML Enthusiast",
    url: "https://decodersifat.github.io",
    siteName: "MD Sifat Hossain",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${headingFont.variable} ${sansFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground transition-colors duration-500" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <PageTransition />
          <GridBackground />
          <NoiseOverlay />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
