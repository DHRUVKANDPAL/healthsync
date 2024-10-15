import prisma from "@/lib/db";
import { getHospital, verifyHospitalDetails } from "@/lib/hospitallucia";
import { pusherServer } from "@/lib/pusher";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { text } from "stream/consumers";
import { number } from "zod";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { values, roomId } = await req.json();
    console.log(values);
    const existingRooms = await prisma.room.findMany({
      take: 2,
      where: {
        roomno: values.roomno,
      },
    });

    if (existingRooms.length != 1) {
      return new Response(JSON.stringify({ success: false }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    let val = existingRooms[0].isAvailabel;
    console.log("value", val);
    let change;
    if (val) {
      if (values.isavailabel) {
        change = 0;
      } else {
        change = -1;
      }
    } else {
      if (values.isavailabel) {
        change = 1;
      } else {
        change = 0;
      }
    }
    console.log("change", change);
    const room = await prisma.room.update({
      where: {
        id: values.id,
      },
      data: {
        roomno: values.roomno,
        isAvailabel: values.isavailabel,
        typeof: values.typeof,
        userId: id,
        bookedby: values.bookedby,
        aadhar: values.aadhar,
      },
    });

    const latestHistoryToBeUpdated = await prisma.hospitalRoomHistory.findFirst(
      {
        where: {
          userId: id,
          roomId: values.id,
        },
        orderBy: {
          bookedAt: "desc",
        },
      }
    );
    if (latestHistoryToBeUpdated && !latestHistoryToBeUpdated.checkout) {
      const update = await prisma.hospitalRoomHistory.update({
        where: {
          id: latestHistoryToBeUpdated.id,
          bookedAt: latestHistoryToBeUpdated.bookedAt,
        },
        data: {
          checkout: new Date(Date.now()),
        },
      });
      const message = await prisma.hospital.findUnique({
        where: {
          id: id,
        },
        include: {
          roomHistory: true,
        },
      });
      await pusherServer.trigger("rooms", "room-history", {
        message: message,
      });
    }

    if (!values.isavailabel) {
      const roomHistory = await prisma.hospitalRoomHistory.create({
        data: {
          roomId: room.id,
          roomno: values.roomno,
          typeof: values.typeof,

          bookedBy: values.bookedby,
          aadhar: values.aadhar,
          bookedAt: new Date(Date.now()),
          userId: id,
        },
      });
      const message = await prisma.hospital.findUnique({
        where: {
          id: id,
        },
        include: {
          roomHistory: true,
        },
      });
      await pusherServer.trigger("rooms", "room-history", {
        message: message,
      });
    }

    console.log(values.isavailabel, " ", values.typeof);
    if (values.typeof === "Single Room") {
      const update = await prisma.hospital.update({
        where: {
          id: id,
        },
        data: {
          bedsAvailable:
            change > 0
              ? { increment: change }
              : { decrement: Math.abs(change) },
        },
        include: {
          room: true, // Include the room data in the response
        },
      });
      console.log("here");
      await pusherServer.trigger("rooms", "beds-available", {
        message: update,
      });
    } else if (values.typeof === "Shared Room") {
      const update = await prisma.hospital.update({
        where: {
          id: id,
        },
        data: {
          sharedAvailable:
            change > 0
              ? { increment: change }
              : { decrement: Math.abs(change) },
        },
        include: {
          room: true, // Include the room data in the response
        },
      });

      console.log("Here shared ");
      await pusherServer.trigger("rooms", "beds-available", {
        message: update,
      });
    } else if (values.typeof === "ICU") {
      const update = await prisma.hospital.update({
        where: {
          id: id,
        },
        data: {
          icuAvailable:
            change > 0
              ? { increment: change }
              : { decrement: Math.abs(change) },
        },
        include: {
          room: true, // Include the room data in the response
        },
      });

      await pusherServer.trigger("rooms", "beds-available", {
        message: update,
      });
    } else if (values.typeof === "OPD") {
      const update = await prisma.hospital.update({
        where: {
          id: id,
        },
        data: {
          opdsAvailable:
            change > 0
              ? { increment: change }
              : { decrement: Math.abs(change) },
        },
        include: {
          room: true, // Include the room data in the response
        },
      });

      await pusherServer.trigger("rooms", "beds-available", {
        message: update,
      });
    } else if (values.typeof === "General Ward") {
      const update = await prisma.hospital.update({
        where: {
          id: id,
        },
        data: {
          generalWardAvailable:
            change > 0
              ? { increment: change }
              : { decrement: Math.abs(change) },
        },
        include: {
          room: true, // Include the room data in the response
        },
      });

      await pusherServer.trigger("rooms", "beds-available", {
        message: update,
      });
    } else if (values.typeof === "LAB") {
      const update = await prisma.hospital.update({
        where: {
          id: id,
        },
        data: {
          labsAvailable:
            change > 0
              ? { increment: change }
              : { decrement: Math.abs(change) },
        },
        include: {
          room: true, // Include the room data in the response
        },
      });

      await pusherServer.trigger("rooms", "beds-available", {
        message: update,
      });
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
