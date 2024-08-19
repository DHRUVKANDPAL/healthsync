"use client";

import Testimonial from "@/components/Testimonial";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
// import { deleteAllPatients } from '../patient-auth/auth.actions'; // Adjust the path
import { toast } from "sonner";
import { logout } from "../../patient-auth/auth.actions";
import prisma from "@/lib/db";
import { redirect, useParams } from "next/navigation";

export default async function PatientDashboard() {
  const handlelogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error("Error. Try Again!!!");
    }
    location.reload();
    toast.success("Logged out successfully");
  };
  const {id}=useParams<{id:string}>();
  const patient = await prisma.patient.findUnique({
    where: {
      id: id,
    },
  });
  if(!patient) redirect("/patient-auth")
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Patient Dashboard {id}</h1>
      <div className="w-5/6  mx-auto">
        <Testimonial></Testimonial>
      </div>
      <Button onClick={handlelogout}>Logout</Button>
    </div>
  );
}
