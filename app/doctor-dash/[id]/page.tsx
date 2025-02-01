"use client";
import DoctorProfilePage from "@/components/DoctorProfilePage";
import DoctorProfileShimmer from "@/components/DoctorProfileShimmer";
import type { Doctor } from "@/types/doctor";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const doctorData1: Doctor = {
  id: "1",
  userId: "doc123",
  name: "Mashoor Gulati",
  imageUrl: "/doctor-image.jpg",
  dob: "1980-05-15",
  aadharNo: "1234-5678-9101",
  licenceNo: "LIC12345",
  contactno: "9876543210",
  email: "mashooor@gulati.com",
  createdAt: "2022-01-01",
  departments: [
    { deptId: "1", dept: { name: "Cardiology" } },
    { deptId: "2", dept: { name: "Neurology" } },
  ],
};

export default function Page() {
  const { id } = useParams();
  const [doctorData, setDoctorData] = useState<Doctor>();
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`/api/doctor/${id}`);
        const data = await response.json();
        console.log(data.user);
        setDoctorData(data.user);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchDoctorData();
  },[]);
  if (doctorData === undefined || doctorData === null) {
    return <DoctorProfileShimmer/>;
    ;
  }
  return (
    <div className="">
      <DoctorProfilePage doctor={doctorData} id={id} />
    </div>
  );
}
