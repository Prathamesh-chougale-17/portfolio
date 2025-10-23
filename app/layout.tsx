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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prathamesh Chougale",
  description: "Portfolio of a software engineer",
  metadataBase: new URL("https://prathamesh-chougale.vercel.app"),
  openGraph: {
    title: "Prathamesh Chougale",
    description:
      "Portfolio of a software engineer showcasing projects and skills.",
    url: "https://prathamesh-chougale.vercel.app",
    siteName: "Prathamesh Chougale",
    images: [
      {
        url: "/icons/og-image.png", // Recommended size: 1200 x 630 px
        width: 1200,
        height: 630,
        alt: "Prathamesh Chougale Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathamesh Chougale",
    description:
      "Portfolio of a software engineer showcasing projects and skills.",
    images: ["/icons/og-image.png"],
    creator: "@prathamesh_7717", // optional
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
        <meta name="theme-color" content="#0070f3" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0070f3" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" href="/icons/android-chrome-192x192.png" />

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
    </html>
  );
}
