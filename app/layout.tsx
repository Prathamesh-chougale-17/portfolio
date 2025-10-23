import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/server/client";
import { ThemeProvider } from "@/context/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { en } from "@/data/en";
import { Toaster } from "sonner";
import ChatButton from "@/components/layout/chat-button";
import { PWARegister } from "@/components/pwa-register";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "@/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Prathamesh Chougale | Software Engineer",
    template: "%s | Prathamesh Chougale",
  },
  description:
    "Full-stack software engineer specializing in React, Next.js, and TypeScript. Winner of Smart India Hackathon and HSBC Hackathon 2024. Building performant, scalable web applications.",
  metadataBase: new URL("https://prathamesh-chougale.vercel.app"),
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Development",
    "Prathamesh Chougale",
  ],
  authors: [{ name: "Prathamesh Chougale" }],
  creator: "Prathamesh Chougale",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prathamesh-chougale.vercel.app",
    siteName: "Prathamesh Chougale",
    title: "Prathamesh Chougale | Software Engineer",
    description:
      "Full-stack software engineer specializing in React, Next.js, and TypeScript. Building performant, scalable web applications.",
    images: [
      {
        url: "/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prathamesh Chougale - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathamesh Chougale | Software Engineer",
    description:
      "Full-stack software engineer specializing in React, Next.js, and TypeScript.",
    images: ["/icons/og-image.png"],
    creator: "@prathamesh_7717",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="Prathamesh Chougale" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Prathamesh Chougale" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://prathamesh-chougale.vercel.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <PWARegister />
        <TRPCProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar navItems={en.navItems} />
            <main className="px-4 sm:px-6 md:px-8 lg:px-12">{children}</main>
            <ChatButton />
            <Footer />
            <Toaster />
          </ThemeProvider>
        </TRPCProvider>
      </body>
      <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
