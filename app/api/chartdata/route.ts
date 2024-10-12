import prisma from "@/lib/db";

type Chart = {
  month: string;
  count: number;
};
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currDate = new Date(Date.now());
    let chartData: Chart[] = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(
        currDate.getFullYear(),
        currDate.getMonth() - i,
        1
      );
      const newMonthDate = new Date(
        currDate.getFullYear(),
        monthDate.getMonth() + 1,
        1
      );
      const userCount = await prisma.patientSession.count({
        where: {
          expiresAt: {
            gte: monthDate,
            lt: newMonthDate,
          },
        },
      });
      //  console.log(userCount)
      chartData.push({
        month: monthDate.toLocaleString("default", { month: "long" }),
        count: userCount,
      });
    }

    return new Response(JSON.stringify({ chartData, success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {}
}
