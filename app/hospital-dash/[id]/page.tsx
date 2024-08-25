"use client";
import { hospitalLogout } from "@/app/hospital-auth/authhos.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const HospitalDashboard = ({ params }: { params: { id: string } }) => {
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const router = useRouter();
  const id = params.id;
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`/api/hospital/${id}`);
        const data = await res.json();
        if (!data.success) {
          router.push("/hospital-auth");
        } else {
          setUserExists(true);
          setUserData(data.user);
        }
      } catch (error) {
        toast.error("Error checking Hospital.");
        router.push("/hospital-auth");
      }
    };

    checkUser();
  }, [id, router]);

  const handleLogout = async () => {
    try {
      await hospitalLogout();
      toast.success("Logged out successfully");
      router.push("/hospital-auth");
    } catch (error) {
      toast.error("Error logging out. Try again!");
    }
  };

  if (userExists === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  console.log(userData);
  return (
    <>
      <div className="font-2xl font-extrabold bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        Hospital Dashboard
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default HospitalDashboard;
