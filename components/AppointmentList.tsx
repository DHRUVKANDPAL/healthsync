import React from "react";
import { Calendar, Clock } from "lucide-react";

const AppointmentList = ({ appointments }: any) => {
  return (
    <ul className="space-y-4">
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
