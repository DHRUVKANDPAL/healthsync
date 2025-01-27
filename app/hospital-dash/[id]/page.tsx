"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Area,
  AreaChart,
} from "recharts";
import {
  BedIcon,
  ActivityIcon,
  UsersIcon,
  TrendingUpIcon,
  PercentIcon,
  BuildingIcon,
} from "lucide-react";
import RadialChart from "./radial-charts";
import { pusherClient } from "@/lib/pusher";
import BeatLoader from "@/components/BeatLoader";

interface HospitalDashboardProps {
  params?: {
    id?: string;
  };
}

const COLORS = ["#06b6d4", "#8b5cf6", "#f59e0b", "#ec4899", "#10b981"];
const GRADIENTS = ["#0ea5e9", "#8b5cf6", "#f59e0b", "#ec4899", "#10b981"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.fill }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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

  if (!id || userExists === null || !userData || !totalRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <BeatLoader className="w-[200px] h-[80px]" />
      </div>
    );
  }

  const chartData = [
    {
      name: "Single Room",
      total: totalRoom.singleRoom,
      available: userData.bedsAvailable,
      fill: COLORS[0],
      gradient: GRADIENTS[0],
    },
    {
      name: "ICU",
      total: totalRoom.ICU,
      available: userData.icuAvailable,
      fill: COLORS[1],
      gradient: GRADIENTS[1],
    },
    {
      name: "General Ward",
      total: totalRoom.GeneralWard,
      available: userData.generalWardAvailable,
      fill: COLORS[2],
      gradient: GRADIENTS[2],
    },
    {
      name: "Shared Room",
      total: totalRoom.SharedRoom,
      available: userData.sharedAvailable,
      fill: COLORS[3],
      gradient: GRADIENTS[3],
    },
  ];

  const totalRooms = chartData.reduce((sum, item) => sum + item.total, 0);
  const availableRooms = chartData.reduce(
    (sum, item) => sum + item.available,
    0
  );
  const occupancyRate = ((totalRooms - availableRooms) / totalRooms) * 100;

  return (
    <div className=" h-max bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <BuildingIcon className="h-10 w-10 text-blue-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {`${userData.City}, ${userData.State}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Contact: {userData.contactno}</p>
                <a
                  href={`https://${userData.Website}`}
                  className="hover:text-blue-500"
                  target="_blank"
                >
                  {userData.Website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-500/20 dark:to-blue-600/20 border border-white/10 shadow-lg">
            <div className="absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-xl" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-white">
                Total Capacity
              </CardTitle>
              <BedIcon className="h-5 w-5 text-white/75" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-white">{totalRooms}</div>
              <p className="text-white/80 text-sm mt-1">
                Total available rooms
              </p>
              <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-blue-500/20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-blue-400/20 blur-xl" />
            </CardContent>
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          </Card>

          <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white dark:from-purple-500/20 dark:to-purple-600/20 border border-white/10 shadow-lg">
            <div className="absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-xl" />
            <CardHeader className=" relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                Available Now
              </CardTitle>
              <ActivityIcon className="h-5 w-5 opacity-75" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold">{availableRooms}</div>
              <p className="text-white/80 text-sm mt-1">Currently available</p>
              <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-purple-500/20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-purple-400/20 blur-xl" />
            </CardContent>
            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          </Card>

          <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white dark:from-emerald-500/20 dark:to-emerald-600/20 border border-white/10 shadow-lg">
            <div className="absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-xl" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                Occupancy Rate
              </CardTitle>
              <PercentIcon className="h-5 w-5 opacity-75" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold">
                {occupancyRate.toFixed(1)}%
              </div>
              <p className="text-emerald-100 text-sm mt-1">Current occupancy</p>
              <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-emerald-500/20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-emerald-400/20 blur-xl" />
            </CardContent>

            <div className="absolute inset-px rounded-lg bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Modern Bar Chart */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl">Room Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] md:h-[400px]">
                {" "}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 10, left: -10, bottom: 20 }}
                  >
                    <defs>
                      {chartData.map((entry, index) => (
                        <linearGradient
                          key={`gradient-${index}`}
                          id={`gradient-${index}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={entry.gradient}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor={entry.gradient}
                            stopOpacity={0.3}
                          />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      axisLine={{ stroke: "#6b7280" }}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="total"
                      name="Total Capacity"
                      radius={[8, 8, 0, 0]}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#gradient-${index})`}
                        />
                      ))}
                    </Bar>
                    <Bar
                      dataKey="available"
                      name="Available"
                      radius={[8, 8, 0, 0]}
                      fill="#9333ea"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Modern Pie Chart */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl">Room Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] md:h-[400px]">
                {" "}
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    {" "}
                    <defs>
                      {COLORS.map((color, index) => (
                        <linearGradient
                          key={`pieGradient-${index}`}
                          id={`pieGradient-${index}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={color}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor={color}
                            stopOpacity={0.3}
                          />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={window.innerWidth < 768 ? 20 : 50}
                      outerRadius={window.innerWidth < 768 ? 50 : 120}
                      paddingAngle={5}
                      dataKey="total"
                      label={({ name, percent }) =>
                        window.innerWidth < 768
                          ? `${(percent * 100).toFixed(0)}%`
                          : `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#pieGradient-${index})`}
                          stroke={COLORS[index]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Room Type Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {chartData.map((item, index) => (
              <Card key={item.name} className="bg-white dark:bg-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base md:text-lg flex items-center justify-between">
                    {item.name}
                    <div
                      className="h-2 w-2 md:h-3 md:w-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        {item.available}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500">
                        of {item.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 md:h-2">
                      <div
                        className="h-1.5 md:h-2 rounded-full"
                        style={{
                          width: `${(item.available / item.total) * 100}%`,
                          backgroundColor: item.fill,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
