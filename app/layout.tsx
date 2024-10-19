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
    "HealthSync, healthcare platform, real-time healthcare solution, hospital management software, patient care system, pharmacy inventory management, doctor-patient communication, OPD tracking software, bed availability tracker, healthcare technology, health dashboard, modern healthcare ecosystem,OPD queuing, patient history management, patient care optimization",
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
        <link rel="canonical" href="https://healthsync-alpha.vercel.app/" />
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
