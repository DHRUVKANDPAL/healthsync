import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PatientImageEdit from "@/components/PatientImageEdit";
import {
  Phone,
  Mail,
  MapPin,
  Activity,
  AlertCircle,
  User,
  Calendar,
  Droplet,
  CreditCard,
  Heart,
} from "lucide-react";

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
  imageUrl?: string;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 dark:bg-gradient-to-r dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-900/20 dark:to-slate-900/20 text-white p-8">
          <h1 className="text-4xl font-bold">Patient Dashboard</h1>
        </div>
        <div className="p-8 bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white dark:border-indigo-500 transition-all duration-300">
                <Image
                  src={userData.imageUrl || "https://via.placeholder.com/150"}
                  alt={userData.name}
                  width={192}
                  height={192}
                  className="rounded-full object-cover"
                />
              </div>
              <PatientImageEdit id={userData.id} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">
                {userData.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm">
                  <Mail size={16} /> {userData.email}
                </span>
                <span className="flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm">
                  <Phone size={16} /> {userData.contactno}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Section
                  title="Personal Information"
                  icon={<User size={24} className="text-indigo-500" />}
                >
                  <InfoItem
                    label="Gender"
                    value={userData.gender}
                    icon={<User size={16} />}
                  />
                  <InfoItem
                    label="Date of Birth"
                    value={userData.dob}
                    icon={<Calendar size={16} />}
                  />
                  <InfoItem
                    label="Blood Group"
                    value={userData.bloodgroup}
                    icon={<Droplet size={16} />}
                  />
                  <InfoItem
                    label="Aadhar Number"
                    value={userData.aadharno}
                    icon={<CreditCard size={16} />}
                  />
                </Section>
                <Section
                  title="Emergency Contact"
                  icon={<AlertCircle size={24} className="text-red-500" />}
                >
                  <InfoItem
                    label="Emergency Contact"
                    value={userData.emergencycontact}
                    icon={<Phone size={16} />}
                  />
                  <InfoItem
                    label="Alternate Contact"
                    value={userData.alternatecontactno}
                    icon={<Phone size={16} />}
                  />
                  <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white transition duration-300 ease-in-out transform hover:scale-105 dark:bg-green-600 dark:hover:bg-green-500">
                    Add Emergency Contact
                  </Button>
                </Section>
              </div>
              <Section
                title="Additional Information"
                icon={<Heart size={24} className="text-pink-500" />}
                className="mt-8"
              >
                <InfoItem
                  label="Address"
                  value={userData.address}
                  icon={<MapPin size={16} />}
                />
                <InfoItem
                  label="Previous History"
                  value={userData.prevHis}
                  icon={<Activity size={16} />}
                />
              </Section>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800 flex justify-between items-center">
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white transition duration-300 ease-in-out transform hover:scale-105 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Logout
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last updated: {new Date(userData.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
  className = "",
  icon,
}: {
  title: any;
  children: any;
  className?: any;
  icon: any;
}) => (
  <div
    className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-all duration-300 ${className}`}
  >
    <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400 border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
      {icon}
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-start">
    <span className="mr-3 mt-1 p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-400">
      {icon}
    </span>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-gray-800 dark:text-gray-200">{value}</p>
    </div>
  </div>
);

export default PatientDashboardContent;
