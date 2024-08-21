"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
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
  if (chartData.length === 0) return <></>;
  const desktopData: InteractData[] = chartData.map((item: ChartData) => ({
    month: item.month.toLowerCase(),
    desktop: item.count,
    fill: "var(--color-january)",
  }));
  // console.log(chartData[0].month);

  return (
    <div className="w-11/12 space-y-5 md:space-y-0 md:w-5/6 md:max-w-[1100px] mx-auto md:grid grid-cols-2 gap-10 pt-10 md:pt-20 relative">
      <div className="col-span-2 flex justify-center text-2xl md:text-4xl font-poppins-font font-extrabold text-center text-teal-500 relative overflow-hidden">
        <div className="absolute w-full h-full bg-transparent blur-[70px]">
          <div className="absolute hidden md:block bg-teal-600 h-10 w-32 top-0 left-20"></div>
          <div className="absolute hidden md:block bg-sky-500 h-6 w-64 bottom-0 right-20"></div>
        </div>
        <p className="bg-[#ffffff10] p-5">
          <span className="text-blue-800">Empowering Patient Connections  </span>{" "}
          Watch HealthSync Thrive with Numbers That Prove It
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Patient Engagement Over the Last 6 Months</CardTitle>
          <CardDescription>
            {chartData[0].month} - {chartData[5].month}{" "}
            {new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
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
              <Bar dataKey="count" fill="#1e40af" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {/* <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div> */}
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Interactive data={desktopData}></Interactive>
    </div>
  );
}
