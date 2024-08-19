// app/patient-dashboard/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { logout } from "../../patient-auth/auth.actions";

const PatientDashboard = ({ params }: { params: { id: string } }) => {
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`/api/patient/${id}`);
        const data = await res.json();
        if (!data.success) {
          router.push("/patient-auth");
        } else {
          setUserExists(true); 
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

  if (userExists === null) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Patient Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default PatientDashboard;
