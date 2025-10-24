import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";
import ChatButton from "@/components/layout/chat-button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PWARegister } from "@/components/pwa-register";
import { ThemeProvider } from "@/context/theme-provider";
import { en } from "@/data/en";
import { env } from "@/env";
import { ICONS, MANIFEST_ROUTE, OG_IMAGE, SITE_URL } from "@/lib/constant";
import { TRPCProvider } from "@/server/client";

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
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    siteName: "Prathamesh Chougale",
    title: "Prathamesh Chougale | Software Engineer",
    description:
      "Full-stack software engineer specializing in React, Next.js, and TypeScript. Building performant, scalable web applications.",
    images: [
      {
        url: OG_IMAGE,
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
    images: [OG_IMAGE],
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
      { url: ICONS.favicon32, sizes: "32x32", type: "image/png" },
      { url: ICONS.favicon16, sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: ICONS.appleTouch, sizes: "180x180" }],
  },
  manifest: MANIFEST_ROUTE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta content="Prathamesh Chougale" name="application-name" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
        <meta content="Prathamesh Chougale" name="apple-mobile-web-app-title" />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="#000000" name="theme-color" />
        <link href="https://prathamesh-chougale.vercel.app" rel="canonical" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
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
