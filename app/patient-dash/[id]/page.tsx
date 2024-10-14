import React from "react";
import ProfilePage from "@/components/Profile"; // Adjust the import path as needed
import { PatientData } from "@/components/SamplePatientData"; // Adjust the import path as needed
import BeatLoader from "@/components/BeatLoader";

const PatientProfilePage: React.FC = () => {
  return (
    <div className="h-[calc(100vh)]">
      <ProfilePage patient={PatientData} />
    </div>
  );
};

export default PatientProfilePage;
