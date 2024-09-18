"use client";
import { Inter } from "next/font/google";
import { toast, Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import Sidebar from "@/components/SideBar";
import { logout } from "@/app/patient-auth/auth.actions";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

interface PatientData {
  id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  aadharno: string;
  address: string;
  alternatecontactno: string;
  bloodgroup: string;
  contactno: string;
  emergencycontact: string;
  prevHis: string;
  createdAt: string;
  updatedAt: string;
  medHis: any[];
  imageUrl?: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [activeSection, setActiveSection] = useState("profile");
  const router = useRouter();
  const { id } = useParams();
  const [userData, setUserData] = useState<PatientData | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`/api/patient/${id}`);
        const data = await res.json();
        if (!data.success) {
          router.push("/patient-auth");
        } else {
          setUserExists(true);
          setUserData(data.user);
        }
      } catch (error) {
        toast.error("Error checking user.");
        router.push("/patient-auth");
      }
    };

    checkUser();
  }, [id, router]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/patient-auth");
    } catch (error) {
      toast.error("Error logging out. Try again!");
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (section === "profile") router.push(`/patient-dash/${id}`);
    else router.push(`/patient-dash/${id}/${section}`);
  };

  if (userExists === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-slate-100 dark:bg-slate-900 overflow-auto">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        handleLogout={handleLogout}
        userData={userData}
      />
      <main className="flex-1">
        <div className="h-full overflow-auto p-8">{children}</div>
      </main>
    </div>
  );
}
