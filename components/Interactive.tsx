"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity, TrendingUp, Users } from "lucide-react";
// const desktopData = [
//   { month: "january", desktop: 186, fill: "var(--color-january)" },
//   { month: "february", desktop: 305, fill: "var(--color-february)" },
//   { month: "march", desktop: 237, fill: "var(--color-march)" },
//   { month: "april", desktop: 173, fill: "var(--color-april)" },
//   { month: "may", desktop: 209, fill: "var(--color-may)" },
//   { month: "june", desktop: 209, fill: "var(--color-june)" },
// ];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "#2dd4bf",
  },
  february: {
    label: "February",
    color: "#0f766e",
  },
  march: {
    label: "March",
    color: "#14b8a6",
  },
  april: {
    label: "April",
    color: "#115e59",
  },
  may: {
    label: "May",
    color: "#0d9488",
  },
  june: {
    label: "June",
    color: "#134e4a",
  },
  july: {
    label: "July",
    color: "#2dd4bf",
  },
  august: {
    label: "August",
    color: "#0f766e",
  },
  september: {
    label: "September",
    color: "#14b8a6",
  },
  october: {
    label: "October",
    color: "#115e59",
  },
  november: {
    label: "November",
    color: "#0d9488",
  },
  december: {
    label: "December",
    color: "#134e4a",
  },
} satisfies ChartConfig;
interface InteractData {
  month: string;
  desktop: number;
}
interface InteractiveProps {
  data: InteractData[];
}

export default function Interactive({ data }: InteractiveProps) {
  // data = desktopData;
  console.log(data)
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(data[5].month);

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  );
  const totalEngagement = data.reduce(
    (sum: any, item: any) => sum + item.desktop,
    0
  );
  const months = React.useMemo(() => data.map((item) => item.month), []);

  return (
    <Card
      data-chart={id}
      className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-slate-900 dark:text-slate-100"
    >
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white dark:from-blue-950 dark:to-slate-800  rounded-t-lg pb-4">
        <div className="grid gap-1">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Patient Engagement Pie
          </CardTitle>
          <CardDescription className=" text-teal-100 capitalize">
            {data[0].month} - {data[5].month} {new Date().getFullYear()}
          </CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5 text-blue-950 dark:text-slate-200 dark:bg-slate-700"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-2">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
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
  );
}
