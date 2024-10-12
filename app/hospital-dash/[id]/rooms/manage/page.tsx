"use client";
import { hospitalLogout } from "@/app/(main)/hospital-auth/authhos.actions";
import { Button } from "@/components/ui/button";
import { pusherClient } from "@/lib/pusher";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const ManageRooms = () => {
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const router = useRouter();
  const { id } = useParams();
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
      // if (data.message && Array.isArray(data.message.room)) {
      //   console.log(data.message)
      //   setUserData(data.message);
      // }  else {
      //   console.error("Unexpected data structure from Pusher:", data);
      // }

      setUserData(data.message);
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

  if (userExists === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const room = userData.room;
  const sortedData = room.sort(
    (a: any, b: any) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  return (
    <>
      <div className="px-10 space-x-10">
        {/* <Button onClick={handleLogout}>Logout</Button> */}
      </div>
      <div className="container mx-auto py-10  rounded-lg dark:bg-slate-900">
        <DataTable columns={columns} data={sortedData} />
      </div>
    </>
  );
};

export default ManageRooms;
