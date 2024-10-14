"use client";
import React from "react";
import { Calendar, Clock } from "lucide-react";
import { PatientData } from "@/components/SamplePatientData";
const appointments = PatientData.appointments;
const AppointmentList = () => {
  return (
    <ul className="space-y-4 min-h-[calc(100vh-200px)]">
      {appointments.map(({ appointment, index }: any) => (
        <li
          key={index}
          className="flex items-center justify-between border-b pb-2"
        >
          <div>
            <p className="font-semibold">{appointment.doctorName}</p>
            <p className="text-sm text-gray-600">{appointment.specialty}</p>
          </div>
          <div className="text-right">
            <p className="flex items-center text-sm text-gray-600">
              <Calendar className="mr-1 w-4 h-4" />
              {appointment.date}
            </p>
            <p className="flex items-center text-sm text-gray-600">
              <Clock className="mr-1 w-4 h-4" />
              {appointment.time}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AppointmentList;
