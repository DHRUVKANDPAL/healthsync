"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Users,
  FileText,
  BellRing,
  Building2,
  Clock,
  Stethoscope,
  Award,
  Activity,
  Ambulance,
  Bed,
  Pencil,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";

interface Department {
  deptId: string;
  name: string;
  doctorCount: number;
}

interface OperatingHours {
  day: string;
  hours: string;
}

interface Hospital {
  id: string;
  name: string;
  imageUrl?: string;
  contactno?: string;
  email?: string;
  address?: string;
  estyear?: string;
  hospitaldep: Department[];
  // noofbeds?: number;
  alternatecontactno?: string;
  accreditations?: string[];
  operatingHours?: OperatingHours[];
  stats?: {
    monthlyPatients?: number;
    surgeries?: number;
    satisfaction?: number;
  };
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  isEditing,
  onValueChange,
}: {
  icon: any;
  label: string;
  value: string | number;
  isEditing?: boolean;
  onValueChange?: (value: string) => void;
}) => (
  <Card className="bg-white dark:bg-gray-800">
    <CardContent className="p-4 flex items-center gap-4">
      <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900">
        <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        {isEditing && onValueChange ? (
          <Input
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="mt-1"
          />
        ) : (
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {value}
          </p>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function HospitalProfilePage({
  hospital: initialHospital,
}: {
  hospital: Hospital;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [hospital, setHospital] = useState(initialHospital);
  const [tempHospital, setTempHospital] = useState(initialHospital);

  const handleEdit = () => {
    setIsEditing(true);
    setTempHospital({ ...hospital });
  };

  const handleSave = () => {
    setHospital(tempHospital);
    setIsEditing(false);
    // Here you would typically make an API call to save the changes
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempHospital(hospital);
  };

  const updateTempHospital = (field: string, value: any) => {
    setTempHospital((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 hover:dark:bg-gray-700"
        >
          <CalendarDays className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <span className="text-sm">Appointments</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 hover:dark:bg-gray-700"
        >
          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm">Patients</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 hover:dark:bg-gray-700"
        >
          <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <span className="text-sm">Records</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 hover:dark:bg-gray-700"
        >
          <BellRing className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm">Notifications</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 hover:dark:bg-gray-700"
        >
          <Ambulance className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-sm">Emergency</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 hover:dark:bg-gray-700"
        >
          <Stethoscope className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span className="text-sm">Doctors</span>
        </Button>
      </div>

      {/* Hospital Profile Card */}
      <Card className="bg-white dark:bg-gray-900 shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-auto flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32 rounded-lg border-4 border-teal-100 dark:border-teal-800">
                <AvatarImage
                  src={tempHospital.imageUrl || "/placeholder-hospital.png"}
                  alt={tempHospital.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-teal-500 to-blue-500 text-white">
                  {tempHospital.name[0]}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full md:w-auto"
                >
                  Change Photo
                </Button>
              )}
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={tempHospital.name}
                      onChange={(e) =>
                        updateTempHospital("name", e.target.value)
                      }
                      className="text-2xl font-bold"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {tempHospital.name}
                    </h1>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <Button
                      onClick={handleEdit}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {tempHospital.alternatecontactno && (
                <div className="mt-4">
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1 w-fit pb-1"
                  >
                    <Phone className="w-4 h-4" />
                    Emergency:{" "}
                    {isEditing ? (
                      <Input
                        value={tempHospital.alternatecontactno}
                        onChange={(e) =>
                          updateTempHospital("alternatecontactno", e.target.value)
                        }
                        className="w-32"
                      />
                    ) : (
                      tempHospital.alternatecontactno
                    )}
                  </Badge>
                </div>
              )}

              <div className="mt-4 text-gray-700 dark:text-gray-300 space-y-2">
                {(isEditing || tempHospital.contactno) && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-teal-500" />
                    {isEditing ? (
                      <Input
                        value={tempHospital.contactno || ""}
                        onChange={(e) =>
                          updateTempHospital("contactno", e.target.value)
                        }
                        placeholder="Contact Number"
                      />
                    ) : (
                      tempHospital.contactno
                    )}
                  </div>
                )}
                {(isEditing || tempHospital.email) && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-teal-500" />
                    {isEditing ? (
                      <Input
                        value={tempHospital.email || ""}
                        onChange={(e) =>
                          updateTempHospital("email", e.target.value)
                        }
                        placeholder="Email"
                      />
                    ) : (
                      tempHospital.email
                    )}
                  </div>
                )}
                {(isEditing || tempHospital.address) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-500" />
                    {isEditing ? (
                      <Textarea
                        value={tempHospital.address || ""}
                        onChange={(e) =>
                          updateTempHospital("address", e.target.value)
                        }
                        placeholder="Address"
                      />
                    ) : (
                      tempHospital.address
                    )}
                  </div>
                )}
                {(isEditing || tempHospital.estyear) && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-teal-500" />
                    Established in{" "}
                    {isEditing ? (
                      <Input
                        value={tempHospital.estyear || ""}
                        onChange={(e) =>
                          updateTempHospital("estyear", e.target.value)
                        }
                        placeholder="Year"
                        className="w-24"
                      />
                    ) : (
                      tempHospital.estyear
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Key Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Users}
              label="Monthly Patients"
              value={
                tempHospital.stats?.monthlyPatients?.toLocaleString() || "N/A"
              }
              isEditing={isEditing}
              onValueChange={(value) =>
                updateTempHospital("stats", {
                  ...tempHospital.stats,
                  monthlyPatients: parseInt(value),
                })
              }
            />
            <StatCard
              icon={Activity}
              label="Surgeries Performed"
              value={tempHospital.stats?.surgeries?.toLocaleString() || "N/A"}
              isEditing={isEditing}
              onValueChange={(value) =>
                updateTempHospital("stats", {
                  ...tempHospital.stats,
                  surgeries: parseInt(value),
                })
              }
            />
            {/* <StatCard
              icon={Bed}
              label="Total Beds"
              value={tempHospital.noofbeds?.toLocaleString() || "N/A"}
              isEditing={isEditing}
              onValueChange={(value) =>
                updateTempHospital("noofbeds", parseInt(value))
              }
            /> */}
            <StatCard
              icon={Award}
              label="Patient Satisfaction"
              value={`${tempHospital.stats?.satisfaction || "N/A"}%`}
              isEditing={isEditing}
              onValueChange={(value) =>
                updateTempHospital("stats", {
                  ...tempHospital.stats,
                  satisfaction: parseInt(value),
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Operating Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Operating Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tempHospital.operatingHours?.map((oh, index) => (
              <div
                key={oh.day}
                className="flex justify-between items-center p-2 border-b"
              >
                {isEditing ? (
                  <>
                    <Input
                      value={oh.day}
                      onChange={(e) => {
                        const newHours = [
                          ...(tempHospital.operatingHours || []),
                        ];
                        newHours[index] = { ...oh, day: e.target.value };
                        updateTempHospital("operatingHours", newHours);
                      }}
                      className="w-32"
                    />
                    <Input
                      value={oh.hours}
                      onChange={(e) => {
                        const newHours = [
                          ...(tempHospital.operatingHours || []),
                        ];
                        newHours[index] = { ...oh, hours: e.target.value };
                        updateTempHospital("operatingHours", newHours);
                      }}
                      className="w-48"
                    />
                  </>
                ) : (
                  <>
                    <span className="font-medium">{oh.day}</span>
                    <span>{oh.hours}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Departments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Departments & Specialties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tempHospital?.hospitaldep?.map((dept) => (
              <Card key={dept.deptId} className="bg-white dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {dept.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <Stethoscope className="w-4 h-4 text-teal-500" />
                        {dept.doctorCount} Doctors
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {tempHospital.hospitaldep.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No departments available.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Accreditations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Accreditations & Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {isEditing ? (
              <Textarea
                value={tempHospital.accreditations?.join(", ") || ""}
                onChange={(e) =>
                  updateTempHospital(
                    "accreditations",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
                placeholder="Enter accreditations separated by commas"
                className="w-full"
              />
            ) : (
              tempHospital.accreditations?.map((accreditation) => (
                <Badge
                  key={accreditation}
                  variant="secondary"
                  className="text-sm"
                >
                  {accreditation}
                </Badge>
              ))
            )}
            {!isEditing &&
              (!tempHospital.accreditations ||
                tempHospital.accreditations.length === 0) && (
                <div className="text-gray-500 dark:text-gray-400">
                  No accreditations listed.
                </div>
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
