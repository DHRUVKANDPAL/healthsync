"use client";

import { Loader, Activity, Users, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import Interactive from "./Interactive";

import { Skeleton } from "./ui/skeleton";
import ECG from "./ECG";
type ChartData = {
  month: string;
  count: number;
};

type InteractData = {
  month: string;
  desktop: number;
  fill: string;
};
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  count: {
    label: "Count",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

const monthColors = {
  january: "#2dd4bf",
  february: "#0f766e",
  march: "#14b8a6",
  april: "#115e59",
  may: "#0d9488",
  june: "#134e4a",
  july: "#2dd4bf",
  august: "#0f766e",
  september: "#14b8a6",
  october: "#115e59",
  november: "#0d9488",
  december: "#134e4a",
};

export default function Chartstats() {
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      console.log("here");
      const response = await fetch("/api/chartdata");
      const data = await response.json();
      console.log(data);
      setChartData(data.chartData);
    }

    fetchData();
  }, []);
  if (chartData.length === 0)
    return (
      <div className="w-11/12 space-y-5 md:space-y-0 md:w-5/6 md:max-w-[1100px] mx-auto md:grid grid-cols-2 gap-10 pt-10 md:pt-20 relative">
        <div className="col-span-2 flex justify-center text-2xl md:text-4xl font-poppins-font font-extrabold text-center text-teal-500 relative overflow-hidden">
          {/* <div className="absolute w-full h-full bg-transparent blur-[70px]">
            <div className="absolute hidden md:block bg-teal-600 h-10 w-32 top-0 left-20"></div>
            <div className="absolute hidden md:block bg-sky-500 h-6 w-64 bottom-0 right-20"></div>
          </div> */}
          <p className="bg-[#ffffff10] p-5 rounded-lg shadow-md">
            <span className="text-blue-800">
              Empowering Patient Connections{" "}
            </span>{" "}
            Watch HealthSync Thrive with Numbers That Prove It
          </p>
        </div>
        <div className="col-span-2">
          <Skeleton className="h-[400px] w-full flex flex-col justify-center items-center rounded-lg shadow-lg">
            <Loader className="size-10 animate-spin text-teal-600" />
            <div className="hidden md:block pt-3 text-teal-700 font-semibold">
              Loading Patient Engagement Statistics ...
            </div>
          </Skeleton>
        </div>
      </div>
    );
  const desktopData: InteractData[] = chartData.map((item: ChartData) => ({
    month: item.month.toLowerCase(),
    desktop: item.count,
    fill: monthColors[item.month.toLowerCase() as keyof typeof monthColors],
  }));
  // console.log(chartData[0].month);

  const totalEngagement = chartData.reduce(
    (sum: any, item: any) => sum + item.count,
    0
  );

  return (
    <div className="w-11/12 space-y-8 md:space-y-0 md:w-5/6 md:max-w-[1100px] mx-auto md:grid grid-cols-2 gap-10 pt-10 md:pt-20 relative">
      <div className="col-span-2 flex justify-center text-2xl md:text-4xl font-poppins-font font-extrabold text-center text-teal-500 relative overflow-hidden">
        {/* <div className="absolute w-full h-full bg-transparent blur-[70px]">
          <div className="absolute hidden md:block bg-teal-600 h-10 w-32 top-0 left-20"></div>
          <div className="absolute hidden md:block bg-sky-500 h-6 w-64 bottom-0 right-20"></div>
        </div> */}
        <p className="p-5 rounded-lg shadow-md">
          <span className="text-blue-600">Empowering Patient Connections </span>{" "}
          Watch HealthSync Thrive with Numbers That Prove It
        </p>
      </div>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-slate-900 flex flex-col">
        <CardHeader
          className="bg-gradient-to-r 
        from-teal-500 to-blue-500 dark:from-blue-950 dark:to-slate-800 text-white rounded-t-lg"
        >
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Patient Engagement Over the Last 6 Months
          </CardTitle>
          <CardDescription className="text-teal-100">
            {chartData[0].month} - {chartData[5].month}{" "}
            {new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 flex-grow">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm bg-gray-50 rounded-b-lg pt-4 dark:bg-slate-800">
          {/* <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div> */}
          <div className="flex items-center gap-2 font-medium text-teal-700 dark:text-teal-300">
            <Users className="h-5 w-5" />
            Total Engagement: {totalEngagement}
          </div>
          <div className="flex items-center gap-2 font-medium text-blue-700 dark:text-slate-300">
            <TrendingUp className="h-5 w-5" />
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Interactive data={desktopData}></Interactive>
    </div>
  );
}
