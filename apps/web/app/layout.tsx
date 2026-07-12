import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// ─── Font Registration ────────────────────────────────────────────────────────
// Variable names MUST match the tokens defined in packages/tailwind-config/theme.css
// so next/font's optimised stack overrides the fallback string at runtime.

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const fontMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
});

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "Creative Growth — Music Education Platform",
    template: "%s | Creative Growth",
  },
  description:
    "A premium music education platform combining structured learning, interactive practice, progress tracking, and professional music tools.",
  keywords: [
    "music education",
    "music theory",
    "ear training",
    "piano",
    "MIDI",
    "metronome",
    "interactive learning",
  ],
  authors: [{ name: "Creative Growth" }],
  creator: "Creative Growth",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Creative Growth",
    title: "Creative Growth — Music Education Platform",
    description:
      "A premium music education platform combining structured learning, interactive practice, and professional music tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Growth — Music Education Platform",
    description:
      "A premium music education platform combining structured learning, interactive practice, and professional music tools.",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
      </body>
    </html>
  );
}