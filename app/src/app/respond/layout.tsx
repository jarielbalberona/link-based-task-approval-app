import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ReactQueryProvider from "@/providers/react-query";
import { cn } from "@/utils/ui";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig, META_THEME_COLORS } from "@/config/site";
import {ModeSwitcher} from "@/components/ui/mode-switcher"

import "@/app/globals.css";

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
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProvider>
        <div className="flex justify-center w-full mx-auto my-4">
          <ModeSwitcher />
        </div>
        {children}
        <Toaster />
        <Analytics />
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export const dynamic = 'force-dynamic'
