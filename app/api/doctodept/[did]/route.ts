import prisma from "@/lib/db";
import { verifyHospitalDetails } from "@/lib/hospitallucia";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
   const id = params.id;
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
  try {
    const values = await req.json();
    const isDoctorAvailable = await prisma.doctor.findUnique({
      where: {
        licenceNo: values.licenceNo,
      },
    });
    if (!isDoctorAvailable) {
      return new Response(
        JSON.stringify({ success: false, message: "Doctor is not available" })
      );
    }
    const addToDept = await prisma.doctorinDept.create({
      data: {
        doctorId: isDoctorAvailable.id,
        deptId: id,
      },
    });
    const doctor = await prisma.doctorinDept.findMany({
      where: {
        deptId: id,
      },
      include: {
        doctor: true,
      },
    });
    return new Response(JSON.stringify({ success: true, doctor }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false }));
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
   const id = params.id;
   let user = await verifyHospitalDetails();
   if (!user || user.id === undefined) {
     return new Response(JSON.stringify({ success: false }), {
       headers: { "Content-Type": "application/json" },
     });
   }
   if (user && id !== user.id) {
     return new Response(JSON.stringify({ success: false }), {
       headers: { "Content-Type": "application/json" },
     });
   }
  try {
    const values = await req.json();
    const doctor = await prisma.doctorinDept.findMany({
      where: {
        deptId: id,
      },
      include: {
        doctor: true,
      },
    });
    return new Response(JSON.stringify({ success: true, doctor }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false }));
  }
}