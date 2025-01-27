import DoctorProfilePage from "@/components/DoctorProfilePage";
import type { Doctor } from "@/types/doctor";

const doctorData: Doctor = {
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
  return (
    <div className="pb-10">
      <DoctorProfilePage doctor={doctorData} />
    </div>
  );
}
