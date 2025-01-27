import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  Clock,
  CreditCard,
  Edit,
  Settings,
  CalendarDays,
  Users,
  FileText,
  BellRing,
  Shield,
  ClipboardList,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

interface Department {
  deptId: string;
  dept: {
    name: string;
  };
}

interface Doctor {
  id: string;
  userId: string;
  name: string;
  imageUrl?: string;
  dob?: string;
  aadharNo?: string;
  licenceNo: string;
  contactno?: string;
  email?: string;
  createdAt?: string;
  departments: Department[];
}

export default function DoctorProfilePage({ doctor }: { doctor: Doctor }) {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 bg-gray-50 dark:bg-slate-900/40">
      {/* Status Bar */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium dark:text-slate-200">
            Available for Appointments
          </span>
        </div>
        <Switch />
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: CalendarDays,
            label: "Today's Schedule",
            color: "text-teal-600 dark:text-teal-400",
          },
          {
            icon: Users,
            label: "My Patients",
            color: "text-blue-600 dark:text-blue-400",
          },
          {
            icon: FileText,
            label: "Medical Records",
            color: "text-teal-600 dark:text-teal-400",
          },
          {
            icon: BellRing,
            label: "Notifications",
            color: "text-blue-600 dark:text-blue-400",
          },
        ].map((action, i) => (
          <Button
            key={i}
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-1 bg-white dark:bg-slate-800/50 dark:border-slate-700/50 dark:hover:bg-slate-700/50 backdrop-blur-sm"
          >
            <action.icon className={`w-5 h-5 ${action.color}`} />
            <span className="text-sm dark:text-slate-200">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Main Profile Card */}
      <Card className="bg-white dark:bg-slate-800/50 dark:border-slate-700/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-auto flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32 rounded-lg border-4 border-teal-100 dark:border-slate-700">
                <AvatarImage
                  src={doctor.imageUrl || "/placeholder-avatar.png"}
                  alt={doctor.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-teal-500 to-blue-500 text-white">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                className="w-full md:w-auto dark:border-slate-700 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                Change Photo
              </Button>
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                    Dr. {doctor.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doctor.departments.map((dept) => (
                      <Badge
                        key={dept.deptId}
                        className="bg-teal-100 dark:bg-slate-700 text-teal-800 dark:text-slate-200"
                      >
                        {dept.dept.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="gap-2 dark:border-slate-700 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                  <Button className="gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 dark:text-slate-200 dark:from-cyan-800 dark:to-cyan-700 dark:hover:from-cyan-700 dark:hover:to-cyan-600">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/40">
                  <Shield className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      License Number
                    </p>
                    <p className="font-medium dark:text-slate-200">
                      {doctor.licenceNo}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/40">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      Email
                    </p>
                    <p className="font-medium dark:text-slate-200">
                      {doctor.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-3 dark:bg-slate-800/50">
          <TabsTrigger
            value="schedule"
            className="dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100"
          >
            Schedule
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100"
          >
            Personal Details
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100"
          >
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card className="dark:bg-slate-800/50 dark:border-slate-700/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold dark:text-slate-100">
                  Today's Schedule
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="dark:border-slate-700 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  View Calendar
                </Button>
              </div>
              <div className="space-y-4">
                <Alert className="bg-teal-50/50 dark:bg-slate-700/40 border-teal-200 dark:border-slate-600">
                  <ClipboardList className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <AlertDescription className="dark:text-slate-200">
                    You have 8 appointments scheduled for today
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card className="dark:bg-slate-800/50 dark:border-slate-700/50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: User,
                    label: "Full Name",
                    value: `Dr. ${doctor.name}`,
                    color: "text-teal-600 dark:text-teal-400",
                  },
                  {
                    icon: Calendar,
                    label: "Date of Birth",
                    value: doctor.dob
                      ? new Date(doctor.dob).toLocaleDateString()
                      : "N/A",
                    color: "text-teal-600 dark:text-teal-400",
                  },
                  {
                    icon: Phone,
                    label: "Contact",
                    value: doctor.contactno || "N/A",
                    color: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    icon: Building2,
                    label: "Departments",
                    value: doctor.departments
                      .map((d) => d.dept.name)
                      .join(", "),
                    color: "text-blue-600 dark:text-blue-400",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/40"
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-slate-400">
                        {item.label}
                      </p>
                      <p className="font-medium dark:text-slate-200">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="dark:bg-slate-800/50 dark:border-slate-700/50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Alert className="bg-blue-50/50 dark:bg-slate-700/40 border-blue-200 dark:border-slate-600">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="dark:text-slate-200">
                    Keep your documents up to date for compliance
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
