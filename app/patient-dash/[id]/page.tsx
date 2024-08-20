// app/patient-dashboard/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { logout } from "../../patient-auth/auth.actions";

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
}

const PatientDashboard = ({ params }: { params: { id: string } }) => {
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const router = useRouter();
  const id = params.id;
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

  if (userExists === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
      {userData && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Gender:</strong> {userData.gender}
              </p>
              <p>
                <strong>Date of Birth:</strong> {userData.dob}
              </p>
              <p>
                <strong>Blood Group:</strong> {userData.bloodgroup}
              </p>
              <p>
                <strong>Aadhar Number:</strong> {userData.aadharno}
              </p>
            </div>
            <div>
              <p>
                <strong>Contact Number:</strong> {userData.contactno}
              </p>
              <p>
                <strong>Alternate Contact:</strong>{" "}
                {userData.alternatecontactno}
              </p>
              <p>
                <strong>Emergency Contact:</strong> {userData.emergencycontact}
              </p>
              <p>
                <strong>Address:</strong> {userData.address}
              </p>
              <p>
                <strong>Previous History:</strong> {userData.prevHis}
              </p>
            </div>
          </div>
        </div>
      )}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default PatientDashboard;
