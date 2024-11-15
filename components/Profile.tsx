"use client";
import React, { useState } from "react";
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
  Menu,
  X,
  ArrowRight,
  Target,
  File,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
interface Patient {
  id?: string;
  email?: string;
  name?: string;
  gender?: string;
  dob?: string;
  aadharno?: string;
  bloodgroup?: string;
  hashedPassword?: string;
  contactno?: string;
  alternatecontactno?: string;
  address?: string;
  emergencycontact?: string;
  prevHis?: string;
  imageUrl?: string;
  isVerified?: boolean;
  medHis?: any[]; // Replace 'any' with the appropriate type if available
  session?: any[]; // Replace 'any' with the appropriate type for PatientSession
  queue?: any[]; // Replace 'any' with the appropriate type for Queue
  createdAt?: string;
  updatedAt?: string;

  // New Fields
  age?: number;
  healthStatus?: string;
  notifications?: Notification[];
  healthRecords?: HealthRecord[];
  healthMetrics?: HealthMetrics;
  appointments?: Appointment[];
  documents?: Document[];
}

interface Notification {
  title?: string;
  message?: string;
  time?: string;
}

interface HealthRecord {
  title?: string;
  date?: string;
}

interface HealthMetrics {
  bloodPressure?: string;
  heartRate?: number;
  weight?: number;
  progressData?: ProgressData[];
  healthGoals?: HealthGoal[];
}

interface ProgressData {
  date?: string;
  weight?: number;
  bloodPressure?: number;
}

interface HealthGoal {
  achieved?: boolean;
  description?: string;
}

interface Appointment {
  appointment?: {
    doctorName?: string;
    specialty?: string;
    date?: string;
    time?: string;
  };
}

interface Document {
  document?: {
    id?: number;
    name?: string;
    date?: string;
  };
}
const ProfileHeader = ({ patient }: { patient: Patient |null }) => (
  <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-900 dark:to-slate-800 text-white rounded-lg shadow-lg mb-6">
    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0 0 L100 100 L100 0 Z" fill="currentColor" />
      </svg>
    </div>
    <div className="relative p-4 sm:px-6 flex flex-col items-center sm:items-center sm:flex-row  gap-4">
      <div className="relative shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/30 overflow-hidden">
          <img
            src={patient?.imageUrl || "/api/placeholder/96/96"}
            alt={patient?.name}
            className="w-full h-full object-cover"
          />
        </div>
        {patient?.isVerified && (
          <CheckCircle
            className="absolute -bottom-1 -right-1 text-white bg-teal-500 rounded-full p-0.5"
            size={20}
          />
        )}
      </div>
      <div className="text-center flex flex-col  sm:text-left flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 truncate">
          {patient?.name}
        </h1>
        <div className="flex flex-nowrap justify-center sm:justify-start gap-2 w-full">
          <span className="bg-black/20 backdrop-blur px-3 py-1 rounded-full text-xs">
            {patient?.age} yrs
          </span>
          <span className="bg-black/20 backdrop-blur px-3 py-1 rounded-full text-xs">
            {patient?.gender}
          </span>
          <span className="bg-black/20 backdrop-blur px-3 py-1 rounded-full text-xs">
            Blood: {patient?.bloodgroup}
          </span>
        </div>
      </div>
    </div>
  </div>
);
const MetricCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <Card className="hover:shadow-md transition-all duration-300">
    <CardContent className="p-4">
      <div className="space-y-3">
        {/* Icon and trend row */}
        <div className="flex items-center justify-between">
          <div className={`${color} p-2 rounded-lg bg-opacity-10`}>
            <Icon className={color} size={20} />
          </div>
          {trend && (
            <span
              className={`text-xs font-medium ${
                trend > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
          )}
        </div>

        {/* Label and value stack */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-lg font-semibold truncate">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const AppointmentCard = ({ appointment }: { appointment: any }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
    <div className="bg-blue-500/10 p-2 rounded-lg shrink-0">
      <Calendar className="text-blue-500" size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm truncate">{appointment.doctorName}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {appointment.specialty}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-xs font-medium">{appointment.time}</p>
        <span className="text-gray-300">•</span>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {appointment.date}
        </p>
      </div>
    </div>
  </div>
);

const NotificationCard = ({ notification }: { notification: any }) => (
  <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
    <div className="bg-indigo-500/10 p-2 rounded-lg shrink-0 h-min">
      <Bell className="text-indigo-500" size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm truncate">{notification.title}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-0.5">
        {notification.message}
      </p>
      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
    </div>
  </div>
);

const GoalCard = ({ goal, index }: { goal: HealthGoal; index: number }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
    <div
      className={`${
        goal.achieved ? "bg-green-500/10" : "bg-yellow-500/10"
      } p-2 rounded-lg shrink-0`}
    >
      <Target
        className={goal.achieved ? "text-green-500" : "text-yellow-500"}
        size={20}
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{goal.description}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {goal.achieved ? "Achieved" : "In Progress"}
      </p>
    </div>
    {goal.achieved && (
      <CheckCircle className="text-green-500 shrink-0" size={16} />
    )}
  </div>
);

const DocumentCard = ({ document }: { document: any }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
    <div className="bg-blue-500/10 p-2 rounded-lg shrink-0">
      <File className="text-blue-500" size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm truncate">{document.name}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {document.date}
      </p>
    </div>
    <button className="shrink-0 text-blue-500 hover:text-blue-600">
      <ArrowRight size={16} />
    </button>
  </div>
);

const ProfilePage = ({ patient }: { patient: Patient | null}) => {
  const upcomingAppointments = patient?.appointments?.slice(0, 3);
  const recentNotifications = patient?.notifications?.slice(0, 3);
  const healthGoals = patient?.healthMetrics?.healthGoals?.slice(0, 3);
  const recentDocuments = patient?.documents?.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <ProfileHeader patient={patient} />

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          icon={Heart}
          label="Blood Pressure"
          value={patient?.healthMetrics?.bloodPressure}
          trend={2.5}
          color="text-red-500"
        />
        <MetricCard
          icon={Activity}
          label="Heart Rate"
          value={`${patient?.healthMetrics?.heartRate} BPM`}
          trend={-1.2}
          color="text-blue-500"
        />
        <MetricCard
          icon={User}
          label="Weight"
          value={`${patient?.healthMetrics?.weight} kg`}
          trend={-0.5}
          color="text-green-500"
        />
        <MetricCard
          icon={Clock}
          label="Health Status"
          value={patient?.healthStatus}
          color="text-yellow-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column  */}
        <div className="lg:col-span-2 space-y-6">
          {/* - Health Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-lg">Health Progress</CardTitle>
              <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                View All <ArrowRight size={14} />
              </button>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {patient?.healthMetrics?.progressData?.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <span className="text-sm font-medium">{data.date}</span>
                    <div className="flex gap-4 mt-1 sm:mt-0">
                      <span className="text-xs">Weight: {data.weight} kg</span>
                      <span className="text-xs">BP: {data.bloodPressure}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-lg">Upcoming</CardTitle>
              <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                View All <ArrowRight size={14} />
              </button>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              {upcomingAppointments?.map((app, index) => (
                <AppointmentCard key={index} appointment={app.appointment} />
              ))}
            </CardContent>
          </Card>
        </div>
        {/* Right Column - Cards Stack */}
        <div className="space-y-6">
          {/* Recent Notifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                View All <ArrowRight size={14} />
              </button>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              {recentNotifications?.map((notification, index) => (
                <NotificationCard key={index} notification={notification} />
              ))}
            </CardContent>
          </Card>

          {/* Health Goals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-lg">Health Goals</CardTitle>
              <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
                View All <ArrowRight size={14} />
              </button>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              {healthGoals?.map((goal, index) => (
                <GoalCard key={index} goal={goal} index={index} />
              ))}
            </CardContent>
          </Card>
        </div>
        {/* Recent Documents */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-lg">Recent Documents</CardTitle>
            <button className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            {recentDocuments?.map((doc, index) => (
              <DocumentCard key={index} document={doc.document} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
