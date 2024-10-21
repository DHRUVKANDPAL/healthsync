"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BellIcon,
  SettingsIcon,
  BedIcon,
  ActivityIcon,
  UsersIcon,
} from "lucide-react";
import RadialChart from "./radial-charts";
import { pusherClient } from "@/lib/pusher";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import BeatLoader from "@/components/BeatLoader";

interface HospitalDashboardProps {
  params?: {
    id?: string;
  };
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
const chartConfig = {
  singleRoom: {
    label: "Single Room",
    color: COLORS[0],
  },
  ICU: {
    label: "ICU",
    color: COLORS[1],
  },
  GeneralWard: {
    label: "General Ward",
    color: COLORS[2],
  },
  SharedRoom: {
    label: "Shared Room",
    color: COLORS[3],
  },
  OPD: {
    label: "OPD",
    color: COLORS[4],
  },
} satisfies ChartConfig;

export default function HospitalDashboard({ params }: HospitalDashboardProps) {
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const router = useRouter();
  const id = params?.id;
  const [userData, setUserData] = useState<any>(null);
  const [totalRoom, setTotalRooms] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      if (!id) {
        toast.error("Hospital ID is missing.");
        router.push("/hospital-auth");
        return;
      }

      try {
        try {
          // Run both fetch requests in parallel using Promise.all
          const [res1, res2] = await Promise.all([
            fetch(`/api/essentialHospitalDetails/${id}`),
            fetch(`/api/totalrooms/${id}`),
          ]);

          // Parse both responses
          const data1 = await res1.json();
          const data2 = await res2.json();

          // Handle first API response
          if (!data1.success) {
            router.push("/hospital-auth");
          } else {
            setUserExists(true);
            setUserData(data1.user);
          }

          // Handle second API response
          if (!data2.success) {
            router.push("/hospital-auth");
          } else {
            setTotalRooms(data2.total);
          }
        } catch (error) {
          toast.error("Error checking Hospital.");
          router.push("/hospital-auth");
        }
      } catch (error) {
        toast.error("Error checking Hospital.");
        router.push("/hospital-auth");
      }
    };
    checkUser();
  }, [id, router]);

  const totalRoomsget = async () => {
    try {
      const res = await fetch(`/api/totalrooms/${id}`);
      const data = await res.json();
      if (!data.success) {
        router.push("/hospital-auth");
      } else {
        setTotalRooms(data.total);
      }
    } catch (error) {}
  };

  useEffect(() => {
    pusherClient.subscribe("rooms");

    pusherClient.bind("beds-available", (data: { message: any }) => {
      setUserData(data.message);
      totalRoomsget();
    });

    return () => pusherClient.unsubscribe("rooms");
  }, []);

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-800 dark:text-gray-200 text-2xl">
          Error: Hospital ID is missing
        </div>
      </div>
    );
  }

  if (userExists === null || !userData || !totalRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <BeatLoader className="w-[200px] h-[80px]"></BeatLoader>
      </div>
    );
  }

  const chartData = [
    {
      name: "Single Room",
      value: totalRoom.singleRoom,
      available: userData.bedsAvailable,
      fill: COLORS[0],
    },
    {
      name: "ICU",
      value: totalRoom.ICU,
      available: userData.icuAvailable,
      fill: COLORS[1],
    },
    {
      name: "General Ward",
      value: totalRoom.GeneralWard,
      available: userData.generalWardAvailable,
      fill: COLORS[2],
    },
    {
      name: "Shared Room",
      value: totalRoom.SharedRoom,
      available: userData.sharedAvailable,
      fill: COLORS[3],
    },
  ];

  const totalRooms = chartData.reduce((sum, item) => sum + item.value, 0);
  const availableRooms = chartData.reduce(
    (sum, item) => sum + item.available,
    0
  );
  const occupancyRate = ((totalRooms - availableRooms) / totalRooms) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="max-w-80 md:max-w-xl">
            <h1 className="text-3xl font-bold">
              {userData.name + " "} Dashboard
            </h1>
          </div>
          {/* <div className="flex flex-col items-end space-y-2 text-black text-end">
            <span className="text-gray-500 dark:text-gray-400 font-semibold">
              {userData.address +
                " / " +
                userData.City +
                " / " +
                userData.State}
            </span>
            <span className="text-gray-500 dark:text-gray-400 font-semibold">
              {"Website : "}
              <a href={`https://${userData.Website}`} target="_blank">
                {userData.Website}
              </a>
            </span>
            <span className="text-gray-500 dark:text-gray-400 font-semibold">
              {"Contact no : " + userData.contactno}
            </span>
            <span className="text-gray-500  dark:text-gray-400 font-semibold">
              {"Zipcode : " + userData.Zipcode}
            </span>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <BedIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRooms}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Rooms
              </CardTitle>
              <ActivityIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableRooms}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Occupancy Rate
              </CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {occupancyRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Room Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bar" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                  <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                </TabsList>
                <TabsContent value="pie" className="pt-7">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="bar" className="pt-7">
                  <ChartContainer
                    config={chartConfig}
                    className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="value"
                          fill="#06b6d4"
                          name="Total"
                          radius={[8, 8, 0, 0]}
                        />
                        <Bar
                          dataKey="available"
                          fill="#9333ea"
                          name="Available"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {chartData.map((item) => (
              <RadialChart
                key={item.name}
                title={item.name}
                value={item.available}
                total={item.value}
                trend={0}
                timeframe="Current Status"
                color={item.fill}
              />
            ))}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Room Availability Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <RadialChart
                  title="Total Room Availability"
                  value={availableRooms}
                  total={totalRooms}
                  trend={0}
                  timeframe="Current Status"
                  color={COLORS[0]}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
