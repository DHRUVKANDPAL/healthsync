// components/PatientDashboardContent.tsx
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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

interface PatientDashboardContentProps {
  userData: PatientData | null;
  handleLogout: () => Promise<void>;
}

const PatientDashboardContent: React.FC<PatientDashboardContentProps> = ({
  userData,
  handleLogout,
}) => {
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Patient Dashboard</h1>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 mb-6 lg:mb-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-gray-300 rounded-full overflow-hidden shadow-lg mb-4">
                <Image
                  src={`https://via.placeholder.com/150`}
                  alt={userData.name}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800">
                {userData.name}
              </h2>
              <p className="text-center text-gray-600 mt-2">{userData.email}</p>
            </div>
            <div className="lg:w-2/3 lg:pl-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-indigo-600 border-b pb-2">
                Patient Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                <InfoItem label="Previous History" value={userData.prevHis} />
                <InfoItem
                  label="Address"
                  value={userData.address}
                  className="sm:col-span-2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </Button>
          <p className="text-sm text-gray-600">
            Last updated: {new Date(userData.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div
    className={`bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out ${className}`}
  >
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1 sm:mt-2 text-gray-800">{value}</p>
  </div>
);

export default PatientDashboardContent;
