'use client'
import React, { useEffect, useState } from "react";
import HospitalProfilePage from "@/components/HospitalProfilePage";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
const hospitalData1 = {
  id: "1",
  name: "City Hospital",
  email: "contact@cityhospital.com",
  contactNo: "9876543210",
  address: "123 Main Street, New Delhi, India",
  emergencyNumber: "2611",
  departments: [
    { deptId: "d1", name: "Cardiology", doctorCount: 15 },
    { deptId: "d2", name: "Orthopedics", doctorCount: 10 },
  ],
  bedCount: 200,
  establishedYear: "1995",
  imageUrl: "/hospital-image.jpg",
  stats: {
    monthlyPatients: 1000,
    surgeries: 150,
    satisfaction: 92,
  },
  operatingHours: [
    { day: "Monday-Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  accreditations: ["JCI", "NABH", "ISO 9001:2015"],
};

export default function Page() {
  const [hospitalData,setHospitalData]=useState();
  const {id}=useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/hospital/${id}`);
        const data = await response.json();
        console.log(data.user);
        setHospitalData(data.user);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    }
    fetchData();
  },[])
  if(hospitalData===undefined || hospitalData===null){
    return <Loader2 className="animate-spin"></Loader2>
  }
  return (
    <div className="p-4 md:p-6">
      <HospitalProfilePage hospital={hospitalData} />
    </div>
  );
}
