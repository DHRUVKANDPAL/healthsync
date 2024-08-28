import prisma from "@/lib/db";
import { getHospital } from "@/lib/hospitallucia";
import { pusherServer } from "@/lib/pusher";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { text } from "stream/consumers";
import { number } from "zod";

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
  try {
    const values = await req.json();
    console.log(values)
    const existingRooms = await prisma.room.findFirst({
      where: {
        roomno: values.roomno,
        userId: id,
      },
    });
    if (existingRooms) {
      return new Response(JSON.stringify({ success: false }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    const room=await prisma.room.create({
      data:{
        roomno:values.roomno,
        isAvailabel:values.isavailabel,
        typeof:values.typeof,
        userId:id
      }
    })
    if(values.isavailabel && values.typeof==="Single Room"){
      const update=await prisma.hospital.update({
        where:{
          id:id,
        },
        data:{
          bedsAvailable:{
            increment:1,
          }
        }
      })
      
      pusherServer.trigger("rooms","beds-available",{message:update})
      
    }
    else if(values.isavailabel && values.typeof==="Shared Room"){
      const update=await prisma.hospital.update({
        where:{
          id:id,
        },
        data:{
          sharedAvailable:{
            increment:1,
          }
        }
      })
      
      pusherServer.trigger("rooms","beds-available",{message:update})
      
    }
    else if(values.isavailabel && values.typeof==="ICU"){
      const update=await prisma.hospital.update({
        where:{
          id:id,
        },
        data:{
          icuAvailable:{
            increment:1,
          }
        }
      })
      
      pusherServer.trigger("rooms","beds-available",{message:update})
      
    }
    else if(values.isavailabel && values.typeof==="OPD"){
      const update=await prisma.hospital.update({
        where:{
          id:id,
        },
        data:{
          opdsAvailable:{
            increment:1,
          }
        }
      })
      
      pusherServer.trigger("rooms","beds-available",{message:update})
      
    }
    else if(values.isavailabel && values.typeof==="General Ward"){
      const update=await prisma.hospital.update({
        where:{
          id:id,
        },
        data:{
          generalWardAvailable:{
            increment:1,
          }
        }
      })
      
      pusherServer.trigger("rooms","beds-available",{message:update})
      
    }
    else if(values.isavailabel && values.typeof==="Lab"){
      const update=await prisma.hospital.update({
        where:{
          id:id,
        },
        data:{
          labsAvailable:{
            increment:1,
          }
        }
      })
      
      pusherServer.trigger("rooms","beds-available",{message:update})
      
    }
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  
}