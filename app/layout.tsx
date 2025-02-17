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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title:
    "HealthSync | Advanced Real-Time Healthcare Solution for Hospitals, Patients, Doctors, and Pharmacies",
  description:
    "HealthSync is an all-in-one healthcare platform designed for hospitals, patients, doctors, and pharmacies. Offering real-time OPD management, bed availability tracking, patient care optimization, pharmacy inventory management, and a centralized health dashboard. Experience seamless healthcare collaboration with cutting-edge technology built for the modern healthcare ecosystem.",
  icons: {
    icon: ["https://i.imghippo.com/files/4OFtW1729338402.jpg"],
  },
  openGraph: {
    title:
      "HealthSync | Real-Time Healthcare Solution for Hospitals, Doctors, Patients & Pharmacies",
    description:
      "HealthSync revolutionizes healthcare with an integrated platform for hospitals, patients, doctors, and pharmacies. It offers real-time OPD tracking, pharmacy inventory control, bed availability updates, and a centralized patient dashboard for optimized care.",
    url: "https://healthsync-alpha.vercel.app/",
    images: [
      {
        url: "https://i.imghippo.com/files/4OFtW1729338402.jpg",
        width: 800,
        height: 600,
        alt: "HealthSync logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "HealthSync | Transforming Real-Time Healthcare for Hospitals, Doctors, Patients & Pharmacies",
    description:
      "Join the future of healthcare with HealthSync's all-in-one platform for hospitals, patients, doctors, and pharmacies. Real-time OPD management, bed tracking, pharmacy solutions, and patient dashboards for seamless healthcare collaboration.",
    images: ["https://i.imghippo.com/files/4OFtW1729338402.jpg"],
  },
  keywords:
    "HealthSync, healthcare platform, real-time healthcare solution, hospital management software, patient care system, pharmacy inventory management, doctor-patient communication, OPD tracking software, bed availability tracker, healthcare technology, health dashboard, modern healthcare ecosystem,OPD queuing, patient history management, patient care optimization, healthsync vercel, vercel healthsync, healthsync, vercel, vercel.app",
  robots: "index, follow",
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
        <link
          rel="shortcut icon"
          href="https://i.imghippo.com/files/4OFtW1729338402.jpg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "HealthSync",
              description:
                "HealthSync is an all-in-one healthcare platform for hospitals, doctors, patients, and pharmacies, offering real-time OPD management, bed tracking, pharmacy control, and patient dashboards.",
              applicationCategory: "Healthcare",
              operatingSystem: "Web",
              author: [
                {
                  "@type": "Organization",
                  name: "HealthSync",
                },
                {
                  "@type": "Person",
                  name: "Dhruv Kandpal",
                  role: "Team Lead & Backend Developer",
                },
                {
                  "@type": "Person",
                  name: "Sumit Sati",
                  role: "Frontend Developer",
                },
                {
                  "@type": "Person",
                  name: "Dewansh Mishra",
                },
                {
                  "@type": "Person",
                  name: "Tarush Gupta",
                },
              ],
              url: "https://healthsync-alpha.vercel.app/",
              image: "https://i.imghippo.com/files/4OFtW1729338402.jpg",
              screenshot: "https://i.imghippo.com/files/4OFtW1729338402.jpg",
            }),
          }}
        />
        <link rel="canonical" href="https://healthsync-alpha.vercel.app" />
        <meta
          name="google-site-verification"
          content="2tZd09eJ5U0jzjc3J802qGxywHG4Pkn_ckfWozi7SHA"
        />
        <meta name="msvalidate.01" content="F58EC3AEFB2BF4428D99AB71DCC624D4" />
      </head>
      <body className={inter.className}>
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-50 via-slate-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
          {/* Background Elements */}
          <div className="fixed inset-0 pointer-events-none">
            {/* Top Area Elements - Lighter and more subtle */}
            <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-sky-200/20 to-cyan-300/15 dark:from-slate-800/40 dark:to-slate-700/30 blur-3xl animate-pulse-slow" />
            <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-gradient-to-tr from-teal-200/15 to-emerald-300/10 dark:from-slate-800/30 dark:to-slate-700/20 blur-3xl" />

            {/* Middle Area Elements - Softer gradients */}
            <div className="absolute top-1/3 -left-10 w-80 h-80 rounded-full bg-gradient-to-r from-blue-100/15 to-indigo-200/10 dark:from-slate-950/25 dark:to-slate-900/15 blur-3xl" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-gradient-to-l from-violet-100/15 to-purple-200/10 dark:from-slate-700/25 dark:to-slate-600/15 blur-3xl" />

            {/* Bottom Area - Softer Centered Glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75rem] h-[40rem] 
                      bg-gradient-to-t from-teal-200/25 via-cyan-100/15 to-transparent 
                      blur-3xl rounded-t-full 
                      dark:opacity-0"
            />

            {/* Dark Mode Bottom Glow - Slate-focused */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75rem] h-[40rem] 
                      bg-gradient-to-t from-teal-700/40 via-blue-800/15 to-transparent
                      blur-3xl rounded-t-full opacity-0 
                      dark:opacity-100"
            />

            {/* Ambient Light Effect - Light Mode (softer) */}
            <div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-[25rem] 
                      bg-gradient-to-b from-sky-50/40 to-transparent 
                      blur-3xl dark:opacity-0"
            />

            {/* Ambient Light Effect - Dark Mode (slate toned) */}
            <div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-[25rem] 
                      bg-gradient-to-b from-slate-900/30 to-transparent 
                      blur-3xl opacity-0 dark:opacity-100"
            />

            {/* Refined Particles with Motion - Light Mode (more pastel) */}
            <div className="absolute top-1/3 left-1/5 w-5 h-5 rounded-full bg-gradient-to-br from-sky-300/30 to-cyan-400/20 blur-sm dark:opacity-0 animate-float-slow" />
            <div className="absolute top-2/3 right-1/4 w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-300/30 to-violet-400/20 blur-sm dark:opacity-0 animate-float-slower" />
            <div className="absolute bottom-1/4 left-1/3 w-6 h-6 rounded-full bg-gradient-to-bl from-emerald-300/30 to-teal-400/20 blur-sm dark:opacity-0 animate-float" />
            <div className="absolute bottom-1/2 right-1/3 w-3 h-3 rounded-full bg-gradient-to-tl from-purple-300/30 to-pink-400/20 blur-sm dark:opacity-0 animate-float-slow" />

            {/* Refined Particles with Motion - Dark Mode (slate toned) */}
            <div className="absolute top-1/3 left-1/5 w-5 h-5 rounded-full bg-gradient-to-br from-slate-600/30 to-slate-500/20 blur-sm opacity-0 dark:opacity-100 animate-float-slow" />
            <div className="absolute top-2/3 right-1/4 w-4 h-4 rounded-full bg-gradient-to-tr from-slate-700/30 to-slate-600/20 blur-sm opacity-0 dark:opacity-100 animate-float-slower" />
            <div className="absolute bottom-1/4 left-1/3 w-6 h-6 rounded-full bg-gradient-to-bl from-slate-500/30 to-slate-400/20 blur-sm opacity-0 dark:opacity-100 animate-float" />
            <div className="absolute bottom-1/2 right-1/3 w-3 h-3 rounded-full bg-gradient-to-tl from-slate-600/30 to-slate-500/20 blur-sm opacity-0 dark:opacity-100 animate-float-slow" />

            {/* Additional Subtle Light Elements - Light Mode Only */}
            <div className="absolute top-2/3 left-2/3 w-32 h-32 rounded-full bg-gradient-to-br from-rose-100/15 to-pink-200/10 blur-3xl dark:opacity-0 animate-pulse-slower" />
            <div className="absolute bottom-1/3 right-1/6 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-100/10 to-yellow-200/5 blur-2xl dark:opacity-0" />

            {/* Additional Subtle Dark Elements - Dark Mode Only */}
            <div className="absolute top-2/3 left-2/3 w-32 h-32 rounded-full bg-gradient-to-br from-slate-800/25 to-slate-700/15 blur-3xl opacity-0 dark:opacity-100 animate-pulse-slower" />
            <div className="absolute bottom-1/3 right-1/6 w-24 h-24 rounded-full bg-gradient-to-tr from-slate-700/20 to-slate-600/10 blur-2xl opacity-0 dark:opacity-100" />
          </div>

          {/* Main Content Container */}
          <div className="relative z-10">
            {/* <Header></Header> */}
            {children}
          </div>
          <Toaster richColors></Toaster>
          <Analytics></Analytics>
          <SpeedInsights></SpeedInsights>
        </div>
      </body>
    </html>
  );
}
