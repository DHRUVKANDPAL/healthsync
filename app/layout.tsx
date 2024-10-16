import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "HealthSync",
  description: "HealthSync provides well being of our society.",
  icons: {
    icon: [
      "https://res-console.cloudinary.com/djhehoyxl/media_explorer_thumbnails/d0c197dc3fc4e75c0e92f06182561233/detailed",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.opencagedata.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col">
          {/* <Header></Header> */}
          {children}
          <Toaster richColors></Toaster>
          <Analytics></Analytics>
          <SpeedInsights></SpeedInsights>
        </div>
      </body>
    </html>
  );
}
