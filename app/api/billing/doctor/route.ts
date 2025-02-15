
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { off } from "process";

export async function POST(req:NextRequest) {
   const { id } = await req.json();
   // console.log(id);
   const doctor = await prisma.doctor.findUnique({
      where: {
         id:id
      },
      include:{
         departments:{
            include:{
               dept:{
                  select:{
                     name:true,
                     hospital:{
                        select:{
                           id:true,
                           name:true
                        }
                     }
                  }
               }
            }
         }
      }
   })
   // console.log(doctor);
   let onlineFee = doctor?.departments[0]?.consulatationFees;

   if (onlineFee) {
     onlineFee = parseFloat((onlineFee / 100 / 3).toFixed(2)) * 200;
   }

   const doctorData = {
     id: doctor?.id,
     name: doctor?.name,
     contact: doctor?.contactno,
     email: doctor?.email,
     image: doctor?.imageUrl,
     department: doctor?.departments[0]?.dept.name,
     consultationFee: onlineFee,
     depId: doctor?.departments[0]?.deptId,
     allDept:doctor?.departments
   };
   console.log(doctorData);
   return new Response(JSON.stringify({doctorData, success: true }), {
     headers: { "Content-Type": "application/json" },
   });
}