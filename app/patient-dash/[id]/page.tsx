// app/patient-dashboard/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { logout } from "../../patient-auth/auth.actions";
import Image from "next/image";

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        </div>
        {userData && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="w-48 h-48 mx-auto bg-gray-300 rounded-full overflow-hidden">
                  <Image
                    src="https://via.placeholder.com/150"
                    alt=""
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="text-xl font-semibold text-center mt-4">
                  {userData.name}
                </h2>
              </div>
              <div className="md:w-2/3 md:pl-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Email" value={userData.email} />
                  <InfoItem label="Gender" value={userData.gender} />
                  <InfoItem label="Date of Birth" value={userData.dob} />
                  <InfoItem label="Blood Group" value={userData.bloodgroup} />
                  <InfoItem label="Aadhar Number" value={userData.aadharno} />
                  <InfoItem label="Contact Number" value={userData.contactno} />
                  <InfoItem
                    label="Alternate Contact"
                    value={userData.alternatecontactno}
                  />
                  <InfoItem
                    label="Emergency Contact"
                    value={userData.emergencycontact}
                  />
                  <InfoItem label="Address" value={userData.address} span={2} />
                  <InfoItem
                    label="Previous History"
                    value={userData.prevHis}
                    span={2}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="p-4 bg-gray-50 border-t">
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
const InfoItem = ({
  label,
  value,
  span = 1,
}: {
  label: any;
  value: any;
  span?: any;
}) => (
  <div className={`col-span-${span}`}>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1">{value}</p>
  </div>
);

export default PatientDashboard;
