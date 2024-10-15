import prisma from "@/lib/db";
import { getEssentialHospitalDetails, getHospital, verifyHospitalDetails } from "@/lib/hospitallucia";
import { pusherServer } from "@/lib/pusher";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // Fetch the current hospital/user
  let user = await verifyHospitalDetails();

  if(!user || user.id===undefined){
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  if (user && id !== user.id) {
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  // console.log(user?.id)
  // Get the data from the request
  const values = await req.json();
  // console.log("Received values:", values);

  // Query the database
  const data = await prisma.patient.findUnique({
    where: {
      aadharno: values.amount, // Assuming 'amount' holds the Aadhar number
    },
  });

  const data2 = await prisma.hospitalRoomHistory.findMany({
    where: {
      userId: id,
      aadhar: values.amount,
    },
  });

  // Log the data for debugging
  // console.log("Patient data:", data);
  // console.log("Hospital Room History data:", data2);

  // Trigger the pusher event if data is found
  if (data != null || data2.length != 0) {
    return new Response(JSON.stringify({ data2, data, success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    console.log("No data found for the given patient");
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
