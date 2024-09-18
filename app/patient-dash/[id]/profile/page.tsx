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
import { PatientData } from "@/components/SamplePatientData";

const patient = {
  id: "c123456",
  name: "Dewansh Mishra",
  email: "dewansh.mishra@example.com",
  gender: "Male",
  age: 45,
  bloodgroup: "O+",
  healthStatus: "Good",
  imageUrl: "/api/placeholder/100/100", // Using a placeholder image
  healthMetrics: {
    bloodPressure: "120/80",
    heartRate: 72,
    weight: 68,
    progressData: [
      { date: "2023-09-01", weight: 68, bloodPressure: 120 },
      { date: "2023-09-05", weight: 67.5, bloodPressure: 118 },
      { date: "2023-09-10", weight: 67, bloodPressure: 119 },
    ],
    healthGoals: [
      { achieved: false, description: "Lose 2 kg by end of September" },
      { achieved: true, description: "Reduce blood pressure to 120/80" },
    ],
  },
  appointments: [
    {
      appointment: {
        doctorName: "Dr. Jane Smith",
        specialty: "Cardiology",
        date: "2023-09-20",
        time: "10:30 AM",
      },
    },
    {
      appointment: {
        doctorName: "Dr. Robert Lee",
        specialty: "Dentistry",
        date: "2023-10-10",
        time: "2:00 PM",
      },
    },
  ],
  documents: [
    {
      document: {
        id: 1,
        name: "Medical Report - June 2023",
        date: "2023-06-15",
      },
    },
    { document: { id: 2, name: "Lab Results - May 2023", date: "2023-05-20" } },
    {
      document: {
        id: 3,
        name: "Prescription - April 2023",
        date: "2023-04-10",
      },
    },
  ],
  notifications: [
    {
      title: "Upcoming Appointment",
      message: "You have an appointment with Dr. Jane Smith.",
      time: "2 hours ago",
    },
    {
      title: "Medication Reminder",
      message: "Take your blood pressure medicine.",
      time: "5 hours ago",
    },
  ],
};

const ProfileHeader = () => (
  <div className="bg-gradient-to-r from-blue-500 to-teal-600 text-white p-8 rounded-lg shadow-lg mb-8">
    <div className="flex items-center">
      <img
        src={patient.imageUrl}
        alt={patient.name}
        className="w-24 h-24 rounded-full border-4 border-white mr-6"
      />
      <div>
        <h1 className="text-3xl font-bold">{patient.name}</h1>
        <p className="text-xl opacity-80">
          {patient.age} years • {patient.gender}
        </p>
      </div>
    </div>
  </div>
);

const HealthSummary = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
        className="bg-white rounded-lg shadow-md p-4 flex items-center"
      >
        <item.icon className={`mr-3 ${item.color}`} size={24} />
        <div>
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="text-lg font-semibold">{item.value}</p>
        </div>
      </div>
    ))}
  </div>
);

const HealthProgress = () => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Health Progress</h2>
    <div className="space-y-4">
      {patient.healthMetrics.progressData.map((data, index) => (
        <div key={index} className="flex items-center justify-between">
          <span>{data.date}</span>
          <div className="flex items-center space-x-4">
            <span>Weight: {data.weight} kg</span>
            <span>BP: {data.bloodPressure}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HealthGoals = () => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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

const UpcomingAppointments = () => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
    <ul className="space-y-4">
      {patient.appointments.map((app, index) => (
        <li
          key={index}
          className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
        >
          <div>
            <p className="font-semibold">{app.appointment.doctorName}</p>
            <p className="text-sm text-gray-500">{app.appointment.specialty}</p>
          </div>
          <div className="text-right">
            <p>{app.appointment.date}</p>
            <p className="text-sm text-gray-500">{app.appointment.time}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const RecentDocuments = () => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4">Recent Documents</h2>
    <ul className="space-y-2">
      {patient.documents.map((doc) => (
        <li
          key={doc.document.id}
          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
        >
          <div className="flex items-center">
            <FileText className="text-gray-400 mr-2" size={20} />
            <span>{doc.document.name}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>{doc.document.date}</span>
            <ChevronRight size={16} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Notifications = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold mb-4">Recent Notifications</h2>
    <ul className="space-y-4">
      {patient.notifications.map((notification, index) => (
        <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
          <Bell className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold">{notification.title}</p>
            <p className="text-sm text-gray-600">{notification.message}</p>
            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const ProfilePage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <ProfileHeader />
      <HealthSummary />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <HealthProgress />
          <HealthGoals />
        </div>
        <div>
          <UpcomingAppointments />
          <RecentDocuments />
        </div>
      </div>
      <Notifications />
    </div>
  );
};

export default ProfilePage;
