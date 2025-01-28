import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DoctorProfileShimmer = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 bg-gray-50 dark:bg-slate-900/40">
      {/* Status Bar Shimmer */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm backdrop-blur-sm animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="w-8 h-4 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>

      {/* Quick Actions Grid Shimmer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 rounded-md bg-white dark:bg-slate-800/50 animate-pulse flex flex-col items-center justify-center gap-2">
            <div className="w-5 h-5 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="w-20 h-4 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        ))}
      </div>

      {/* Main Profile Card Shimmer */}
      <Card className="bg-white dark:bg-slate-800/50 animate-pulse">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-auto flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-lg bg-gray-200 dark:bg-slate-700" />
              <div className="w-32 h-8 bg-gray-200 dark:bg-slate-700 rounded" />
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <div className="h-8 w-48 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
                  <div className="flex gap-2">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="h-6 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-10 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-slate-700/40">
                    <div className="w-5 h-5 rounded bg-gray-200 dark:bg-slate-600" />
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-slate-600 rounded mb-2" />
                      <div className="h-4 w-32 bg-gray-200 dark:bg-slate-600 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section Shimmer */}
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-3 dark:bg-slate-800/50">
          {['Schedule', 'Personal Details', 'Documents'].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(' ', '-')}
              className="dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100"
              disabled
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="schedule">
          <Card className="dark:bg-slate-800/50 animate-pulse">
            <CardContent className="pt-6 space-y-4">
              <div className="h-6 w-48 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-20 bg-gray-200 dark:bg-slate-700 rounded" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorProfileShimmer;