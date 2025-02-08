"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, Building2, Stethoscope, Users } from "lucide-react";
import { cn } from "@/lib/utils";
type Department = {
  id: string;
  name: string;
  hod: string;
  // noOfDoctors: string;
  doctorsAvailable: string;
};

export default function DepartmentCard({
  dept,
  id,
}: {
  dept: Department;
  id: string | string[];
}) {
  const router = useRouter();

  const handleRedirect = () => {
    
    router.push(`/hospital-dash/${id}/departments/department/${dept.id}`); // log the department ID on
  };
  console.log("Data is:", dept);
  return (
    <Card
      onClick={handleRedirect}
      className={cn(
        "w-full max-w-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer",
        "hover:scale-[1.02] hover:shadow-xl",
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700"
      )}
    >
      <div
        className={cn(
          "bg-gradient-to-r from-teal-800 to-teal-700 p-4",
          "flex items-center justify-between"
        )}
      >
        <div className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-white" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            {dept.name}
          </h3>
        </div>
        <Users className="w-6 h-6 text-white/80" />
      </div>

      <CardContent
        className={cn(
          "p-5 space-y-3 text-sm",
          "text-gray-700 dark:text-gray-300"
        )}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <UserCheck
              className={cn("w-5 h-5", "text-green-600 dark:text-green-400")}
            />
            <div>
              <div
                className={cn(
                  "font-medium text-gray-900 dark:text-gray-100",
                  "text-xs uppercase tracking-wider"
                )}
              >
                HOD
              </div>
              <div className="font-semibold">{dept.hod}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Stethoscope
              className={cn("w-5 h-5", "text-purple-600 dark:text-purple-400")}
            />
            <div>
              <div
                className={cn(
                  "font-medium text-gray-900 dark:text-gray-100",
                  "text-xs uppercase tracking-wider"
                )}
              >
                Doctors
              </div>
              {/* <div className="font-semibold">{dept.noOfDoctors}</div> */}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center space-x-2 p-3",
            "bg-gray-100 dark:bg-gray-700",
            "rounded-xl"
          )}
        >
          <Stethoscope
            className={cn("w-5 h-5", "text-teal-600 dark:text-teal-400")}
          />
          <div>
            <div
              className={cn(
                "font-medium text-gray-900 dark:text-gray-100",
                "text-xs uppercase tracking-wider"
              )}
            >
              Available Doctors
            </div>
            <div className="font-bold text-base">{dept.doctorsAvailable}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
