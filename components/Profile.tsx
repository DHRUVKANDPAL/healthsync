"use client";
import React from "react";
import {
  User,
  Heart,
  Activity,
  Calendar,
  FileText,
  Bell,
  CheckCircle,
  Clock,
  ChevronRight,
} from "lucide-react";

interface Patient {
  id: string;
  email?: string;
  name: string;
  gender: string;
  dob: string;
  aadharno: string;
  bloodgroup: string;
  hashedPassword?: string;
  contactno: string;
  alternatecontactno?: string;
  address: string;
  emergencycontact?: string;
  prevHis?: string;
  imageUrl?: string;
  isVerified?: boolean;
  medHis: any[]; // Replace 'any' with the appropriate type if available
  session: any[]; // Replace 'any' with the appropriate type for PatientSession
  queue: any[]; // Replace 'any' with the appropriate type for Queue
  createdAt: string;
  updatedAt: string;

  // New Fields
  age: number;
  healthStatus: string;
  notifications: Notification[];
  healthRecords: HealthRecord[];
  healthMetrics: HealthMetrics;
  appointments: Appointment[];
  documents: Document[];
}

interface Notification {
  title: string;
  message: string;
  time: string;
}

interface HealthRecord {
  title: string;
  date: string;
}

interface HealthMetrics {
  bloodPressure: string;
  heartRate: number;
  weight: number;
  progressData: ProgressData[];
  healthGoals: HealthGoal[];
}

interface ProgressData {
  date: string;
  weight: number;
  bloodPressure: number;
}

interface HealthGoal {
  achieved: boolean;
  description: string;
}

interface Appointment {
  appointment: {
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
  };
}

interface Document {
  document: {
    id: number;
    name: string;
    date: string;
  };
}
const ProfileHeader = ({ patient }: { patient: Patient }) => (
  <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-900 dark:to-slate-800 text-white p-8 rounded-lg shadow-lg mb-8 transition-all duration-300 hover:shadow-xl">
    <div className="flex items-center">
      <img
        src={patient.imageUrl}
        alt={patient.name}
        className="w-24 h-24 rounded-full border-4 border-white mr-6 hover:scale-105 transition-transform"
      />
      <div>
        <h1 className="text-3xl font-bold">{patient.name}</h1>
        <p className="text-xl opacity-80">
          {patient.age} years • {patient.gender}
        </p>
      </div>
    </div>
    <span className="absolute right-4 top-4 px-3 py-1 bg-white dark:bg-teal-500 text-teal-600 dark:text-blue-950 rounded-lg text-sm font-semibold">
      Verified
    </span>
  </div>
);

const HealthSummary = ({ patient }: { patient: Patient }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[
      {
        icon: User,
        label: "Blood Type",
        value: patient.bloodgroup,
        color: "text-blue-500",
      },
      {
        icon: Activity,
        label: "Health Status",
        value: patient.healthStatus,
        color: "text-green-500",
      },
      {
        icon: Heart,
        label: "Blood Pressure",
        value: patient.healthMetrics.bloodPressure,
        color: "text-red-500",
      },
      {
        icon: Clock,
        label: "Heart Rate",
        value: `${patient.healthMetrics.heartRate} BPM`,
        color: "text-yellow-500",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md p-6 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:scale-105"
      >
        <item.icon className={`mr-4 ${item.color}`} size={32} />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {item.label}
          </p>
          <p className="text-xl font-semibold">{item.value}</p>
        </div>
      </div>
    ))}
  </div>
);

const HealthProgress = ({ patient }: { patient: Patient }) => (
  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Health Progress</h2>
    <div className="space-y-4">
      {patient.healthMetrics.progressData.map((data, index) => (
        <div key={index} className="flex items-center justify-between">
          <span>{data.date}</span>
          <div className="flex items-center space-x-6">
            <span className="text-sm">Weight: {data.weight} kg</span>
            <span className="text-sm">BP: {data.bloodPressure}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HealthGoals = ({ patient }: { patient: Patient }) => (
  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Health Goals</h2>
    <ul className="space-y-2">
      {patient.healthMetrics.healthGoals.map((goal, index) => (
        <li key={index} className="flex items-center">
          {goal.achieved ? (
            <CheckCircle className="text-green-500 mr-2" />
          ) : (
            <Clock className="text-yellow-500 mr-2" />
          )}
          <span>{goal.description}</span>
        </li>
      ))}
    </ul>
  </div>
);

const UpcomingAppointments = ({ patient }: { patient: Patient }) => (
  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
    <ul className="space-y-4">
      {patient.appointments.map((app, index) => (
        <li
          key={index}
          className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <div>
            <p className="font-semibold">{app.appointment.doctorName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {app.appointment.specialty}
            </p>
          </div>
          <div className="text-right">
            <p>{app.appointment.date}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {app.appointment.time}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const RecentDocuments = ({ patient }: { patient: Patient }) => (
  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Recent Documents</h2>
    <ul className="space-y-2">
      {patient.documents.map((doc) => (
        <li
          key={doc.document.id}
          className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-all duration-300"
        >
          <div className="flex items-center">
            <FileText
              className="text-gray-400 dark:text-gray-500 mr-2"
              size={20}
            />
            <span>{doc.document.name}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{doc.document.date}</span>
            <ChevronRight size={16} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Notifications = ({ patient }: { patient: Patient }) => (
  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4">Recent Notifications</h2>
    <ul className="space-y-4">
      {patient.notifications.map((notification, index) => (
        <li
          key={index}
          className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <Bell className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold">{notification.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {notification.message}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {notification.time}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const ProfilePage = ({ patient }: { patient: Patient }) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <ProfileHeader patient={patient} />
      <HealthSummary patient={patient} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <HealthProgress patient={patient} />
          <HealthGoals patient={patient} />
        </div>
        <div>
          <UpcomingAppointments patient={patient} />
          <RecentDocuments patient={patient} />
        </div>
      </div>
      <Notifications patient={patient} />
    </div>
  );
};

export default ProfilePage;
