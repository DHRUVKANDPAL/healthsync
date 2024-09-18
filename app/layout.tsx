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
  const headersList = headers();
  const referer = headersList.get("referer");

  let pathname = "";
  if (referer) {
    pathname = new URL(referer).pathname;
  }

  const isHospitalDash = pathname.startsWith("/hospital-dash");
  const isPatientDash = pathname.startsWith("/patient-dash");
  if (isHospitalDash ) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <main className="max-h-screen overflow-hidden">
            <Header></Header>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            <Toaster richColors></Toaster>
          </main>
        </body>
      </html>
    );
  }
  if (isPatientDash ) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <main className="max-h-screen overflow-hidden">
            <Header></Header>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            <Toaster richColors></Toaster>
          </main>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
        <Footer></Footer>
        <Toaster richColors></Toaster>
      </body>
    </html>
  );
}
