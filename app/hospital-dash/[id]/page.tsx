"use client";
import { hospitalLogout } from "@/app/hospital-auth/authhos.actions";
import { Button } from "@/components/ui/button";
import { pusherClient } from "@/lib/pusher";
import { redirect, useRouter } from "next/navigation";
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

  useEffect(() => {
    
    
    pusherClient.subscribe("rooms");

    
    pusherClient.bind("beds-available", (data: { message: any }) => {
      setUserData(data.message)
    });

    return () => pusherClient.unsubscribe("rooms");
  }, []);

  const handleLogout = async () => {
    try {
      await hospitalLogout();
      toast.success("Logged out successfully");
      router.push("/hospital-auth");
    } catch (error) {
      toast.error("Error logging out. Try again!");
    }
  };
  const handleRooms = async () => {
    router.push(`/hospital-dash/${id}/rooms`);
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
      <div className="font-2xl font-extrabold bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-10">
        Hospital Dashboard
      </div>
      <div className="px-10 space-x-10">
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={handleRooms}>Create Rooms </Button>
      </div>
      <div className="p-10">No of single beds available = &nbsp; {userData.bedsAvailable} </div>
      <div className="p-10">No of icu available = &nbsp; {userData.icuAvailable} </div>
      <div className="p-10">No of opd available = &nbsp; {userData.opdsAvailable} </div>
      <div className="p-10">No of shared beds available = &nbsp; {userData.sharedAvailable} </div>
      <div className="p-10">No of general ward available = &nbsp; {userData.generalWardAvailable} </div>
      <div className="p-10">No of labs available = &nbsp; {userData.labsAvailable} </div>
    </>
  );
};

export default HospitalDashboard;
