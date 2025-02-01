import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   try {
      const {values,id} = await req.json();
      const dep=await prisma.department.create({
         data:{
            name:values.name,
            hod:values.hod,
            userId:id,
         }
      })
      const getDept = await prisma.department.findMany({
        include: {
          doctors: {
            select: {
              doctor: true,
              isAvailable: true,
            },
          },
        },
      });
       const processedDept = getDept.map((department) => {
         const noOfDoctors = department.doctors.length;
         const doctorsAvailable = department.doctors.filter(
           (doc) => doc.isAvailable
         ).length;

         return {
           ...department,
           noOfDoctors,
           doctorsAvailable,
         };
       });

      return new Response(JSON.stringify({ success: true ,getDept:processedDept}));
   } catch (error) {
      return new Response(JSON.stringify({ success: false }));
   }
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log(id);
   try {
      const getDept = await prisma.department.findMany({
        where:{
          userId:id!,
        },
        include: {
          doctors: {
            select: {
              doctor: true,
              isAvailable: true,
            },
          },
        },
      });
       const processedDept = getDept.map((department) => {
         const noOfDoctors = department.doctors.length;
         const doctorsAvailable = department.doctors.filter(
           (doc) => doc.isAvailable
         ).length;

         return {
           ...department,
           noOfDoctors,
           doctorsAvailable,
         };
       });
       console.log(processedDept);
      return new Response(JSON.stringify({ success: true ,getDept:processedDept}));
   } catch (error) {
      return new Response(JSON.stringify({ success: false }));
   }
}