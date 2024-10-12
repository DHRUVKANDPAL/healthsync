import prisma from "@/lib/db";
import { getHospital } from "@/lib/hospitallucia";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const roomCounts = await prisma.room.groupBy({
      by: ["typeof"],
      where: { userId: id },
      _count: {
        typeof: true,
      },
    });

    // Organize room counts into the respective categories
    const roomData = {
      singleRoom:
        roomCounts.find((room) => room.typeof === "Single Room")?._count
          .typeof || 0,
      ICU: roomCounts.find((room) => room.typeof === "ICU")?._count.typeof || 0,
      GeneralWard:
        roomCounts.find((room) => room.typeof === "General Ward")?._count
          .typeof || 0,
      SharedRoom:
        roomCounts.find((room) => room.typeof === "Shared Room")?._count
          .typeof || 0,
    };

    // Calculate the total rooms
    const total =
      roomData.singleRoom +
      roomData.ICU +
      roomData.GeneralWard +
      roomData.SharedRoom;

    // Return a success response with room data
    return createResponse(
      { total: { ...roomData, total }, success: true },
      200
    );
  } catch (error) {
    console.error("Error fetching room data:", error);

    // Return a failure response in case of an error
    return createResponse(
      { success: false, error: "Internal server error" },
      500
    );
  }
}

// Helper function to create a standardized response
function createResponse(data: object, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
