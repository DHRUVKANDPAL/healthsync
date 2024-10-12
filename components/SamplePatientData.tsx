"use client";
import { logout } from "@/app/(main)/patient-auth/auth.actions";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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

const samplePatientData: Patient = {
  id: "c123456",
  name: "Dewansh Mishra",
  email: "dewansh.mishra@example.com",
  gender: "Male",
  dob: "1979-08-15",
  aadharno: "1234-5678-9012",
  bloodgroup: "O+",
  hashedPassword: "hashedpassword123",
  contactno: "9876543210",
  alternatecontactno: "9123456789",
  address: "123 Main Street, New Delhi, India",
  emergencycontact: "9933221100",
  prevHis: "No significant history",
  imageUrl: "https://via.placeholder.com/50",
  isVerified: true,
  medHis: [
    {
      title: "Blood Test Report",
      date: "2023-09-10",
    },
    {
      title: "MRI Scan Results",
      date: "2023-08-15",
    },
  ],
  session: [
    {
      sessionDetails: "Session 1 details here",
      time: "2023-09-10",
    },
    {
      sessionDetails: "Session 2 details here",
      time: "2023-09-12",
    },
  ],
  queue: [
    {
      queueDetails: "Queue 1 details here",
      time: "2023-09-15",
    },
  ],
  createdAt: "2023-01-01T10:00:00Z",
  updatedAt: "2023-09-18T15:30:00Z",

  // New Fields
  age: 45,
  healthStatus: "Good",
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
  healthRecords: [
    {
      title: "Blood Test Report",
      date: "2023-09-10",
    },
    {
      title: "MRI Scan Results",
      date: "2023-08-15",
    },
  ],
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
      {
        achieved: false,
        description: "Lose 2 kg by end of September",
      },
      {
        achieved: true,
        description: "Reduce blood pressure to 120/80",
      },
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
    {
      document: { id: 2, name: "Lab Results - May 2023", date: "2023-05-20" },
    },
    {
      document: {
        id: 3,
        name: "Prescription - April 2023",
        date: "2023-04-10",
      },
    },
  ],
};

export const useUserExists = () => {
  const [userExists, setUserExists] = useState<boolean | null>(null);
  return { userExists, setUserExists };
};

export const PatientComponent = () => {
  const { userExists, setUserExists } = useUserExists();
  const [activeSection, setActiveSection] = useState("dashboard");
  const router = useRouter();
  const { id } = useParams();
  const [userData, setUserData] = useState<Patient | null>(null);

  const checkUser = async () => {
    try {
      const res = await fetch(`/api/patient/${id}`);
      const data = await res.json();
      if (!data.success) {
        router.push("/patient-auth");
      } else {
        setUserExists(true);
        setUserData(data.user);
      }
    } catch (error) {
      toast.error("Error checking user.");
      router.push("/patient-auth");
    }
  };

  useEffect(() => {
    checkUser();
  }, [id, router]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/patient-auth");
    } catch (error) {
      toast.error("Error logging out. Try again!");
    }
  };

  if (userExists === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <></>;
};

export const PatientData = samplePatientData;
