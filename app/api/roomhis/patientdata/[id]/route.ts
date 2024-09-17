import prisma from "@/lib/db";
import { getHospital } from "@/lib/hospitallucia";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";


export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let user = await getHospital();
  if (user && id !== user.id) {
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
//   console.log("Values are ehere wfdbnkml",values)
  const values=await req.json();
  console.log("Values are ehere wfdbnkml",values)
  const data=await prisma.patient.findUnique({
   where:{
      aadharno:values.amount,
   }
  })
  const data2=await prisma.hospitalRoomHistory.findMany({
    where:{
      userId:id,
      aadhar:values.amount
    }
  })
  if(data || data2){
   return new Response(JSON.stringify({data2, data,success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  
  else{
   return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}