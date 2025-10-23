import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CursorTrail, BreathingNoise } from "@/components/effects";
import { IntroWrapper } from "@/components/intro/IntroWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://olosoma.com'),
  title: {
    default: 'OloSoma | Systems of Meaning',
    template: '%s | OloSoma',
  },
  description: 'Design × Technology × Human Emotion. We craft systems where potential finds form—transforming vision into integrated experiences.',
  keywords: ['design consultancy', 'spatial design', 'AI-augmented design', 'brand strategy', 'experience design', 'systems of meaning'],
  authors: [{ name: 'OloSoma Design Consultancy' }],
  creator: 'OloSoma',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://olosoma.com',
    siteName: 'OloSoma',
    title: 'OloSoma | Systems of Meaning',
    description: 'Design × Technology × Human Emotion. Crafting systems where potential finds form.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OloSoma Design Consultancy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OloSoma | Systems of Meaning',
    description: 'Design × Technology × Human Emotion.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        {/* Global ambient effects */}
        <CursorTrail
          particleCount={8}
          particleSize={2}
          particleLife={1500}
          color="#62bfa4"
        />
        <BreathingNoise
          opacity={0.025}
          speed={10000}
          scale={1.5}
        />

        {/* IntroWrapper manages light beam intro, children = main content */}
        <IntroWrapper>
          {children}
        </IntroWrapper>
      </body>
    </html>
  );
}
