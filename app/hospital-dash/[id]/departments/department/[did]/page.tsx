"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const doctors = [
  {
    id: "doc1",
    name: "Dr. Arjun Sharma",
    imageUrl: "https://via.placeholder.com/150",
    licenceNo: "MCI123456",
    contactno: "+91 9876543210",
    email: "arjun.sharma@hospital.com",
    isAvailable: true,
  },
  {
    id: "doc2",
    name: "Dr. Priya Verma",
    imageUrl: "https://via.placeholder.com/150",
    licenceNo: "MCI654321",
    contactno: "+91 8765432109",
    email: "priya.verma@hospital.com",
    isAvailable: false,
  },
  {
    id: "doc3",
    name: "Dr. Rohan Mehta",
    imageUrl: "https://via.placeholder.com/150",
    licenceNo: "MCI112233",
    contactno: "+91 9988776655",
    email: "rohan.mehta@hospital.com",
    isAvailable: true,
  },
];

export default function DepartmentDetails() {
  const { id, did } = useParams(); // Extract hospital and department IDs from URL
  const [searchTerm, setSearchTerm] = useState("");

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-teal-700">Department Details</h1>
      <p className="mt-2 text-gray-700">
        Showing details for department{" "}
        <span className="font-semibold">{did}</span> in hospital{" "}
        <span className="font-semibold">{id}</span>.
      </p>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search doctors..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Doctors List</h2>
        <div className="mt-4 space-y-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm flex items-center space-x-4"
              >
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600">
                    Licence No: {doctor.licenceNo}
                  </p>
                  <p className="text-gray-600">Contact: {doctor.contactno}</p>
                  <p className="text-gray-600">Email: {doctor.email}</p>
                  <p
                    className={`text-sm font-semibold ${
                      doctor.isAvailable ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {doctor.isAvailable ? "Available" : "Unavailable"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
