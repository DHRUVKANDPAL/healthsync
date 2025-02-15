import prisma from "@/lib/db";
import { reverse } from "dns";

type Chart = {
  month: string;
  count: number;
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currDate = new Date();
    let chartData: Chart[] = [];

    // Prepare month ranges
    const months = Array.from({ length: 6 }, (_, i) => {
      const monthDate = new Date(
        currDate.getFullYear(),
        currDate.getMonth() - i,
        1
      );
      const newMonthDate = new Date(
        currDate.getFullYear(),
        currDate.getMonth() - i + 1,
        1
      );

      return { monthDate, newMonthDate };
    });

    const results = await Promise.allSettled(
      months.map(({ monthDate, newMonthDate }) =>
        prisma.patientSession.count({
          where: {
            expiresAt: {
              gte: monthDate,
              lt: newMonthDate,
            },
          },
        })
      )
    );

    // Process results
    chartData = months.map(({ monthDate }, index) => ({
      month: monthDate.toLocaleString("default", { month: "long" }),
      count: results[index].status === "fulfilled" ? results[index].value : 0,
    }));
    chartData.reverse();
    // console.log(chartData);
    return new Response(JSON.stringify({ chartData, success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
