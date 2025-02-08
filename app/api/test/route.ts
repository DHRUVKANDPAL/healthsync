import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { values } = await req.json();
    console.log(values);
    // const dep = await prisma.department.create({
    //   data: {
    //     name: values.name,
    //     hod: values.hod,
    //     userId: "cm6mhpijc000213ynwp7813bz",
    //   },
    // });
    const feesArray = [
      200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 1000,
      1200, 1500, 2000,
    ];
    const randomFee = feesArray[Math.floor(Math.random() * feesArray.length)];

    const addToDept = await prisma.doctorinDept.create({
      data: {
        doctorId: values.doctorId,
        deptId: values.deptId,
        consulatationFees: randomFee,
      },
    });
    // console.log(dep);
    console.log(addToDept);
    return new Response(
      JSON.stringify({ data: addToDept, success: true})
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false }));
  }
   
}


export async function GET(req: NextRequest) {
  try {
    
    const docId=await prisma.doctor.findMany({
       select: {
          id:true,
       }
    })
    const depId=await prisma.department.findMany({
       select: {
          id:true,
       }
    })
    return new Response(
      JSON.stringify({ success: true, data:{doctorIds:docId,departmentIds:depId}})
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false }));
  }
}