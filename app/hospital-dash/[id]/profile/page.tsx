import React from "react";
import HospitalProfilePage from "@/components/HospitalProfilePage";
const hospitalData = {
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
  return (
    <div className="p-4 md:p-6">
      <HospitalProfilePage hospital={hospitalData} />
    </div>
  );
}
