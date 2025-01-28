import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HospitalProfileShimmer = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Quick Action Buttons Shimmer */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-md bg-white dark:bg-gray-800 animate-pulse flex flex-col items-center justify-center gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>

      {/* Hospital Profile Card Shimmer */}
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-auto flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between">
                <div className="w-64 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="flex-1 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid Shimmer */}
      <Card>
        <CardHeader>
          <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-white dark:bg-gray-800">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Operating Hours Shimmer */}
      <Card>
        <CardHeader>
          <div className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex justify-between items-center p-2 border-b">
                <div className="w-24 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Departments Shimmer */}
      <Card>
        <CardHeader>
          <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-white dark:bg-gray-800">
                <CardContent className="p-4 space-y-3">
                  <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accreditations Shimmer */}
      <Card>
        <CardHeader>
          <div className="w-56 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalProfileShimmer;