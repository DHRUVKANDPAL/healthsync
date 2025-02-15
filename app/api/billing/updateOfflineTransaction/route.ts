import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    data,
    amount,
    patientId: userId,
    doctorId,
    to,
    from,
    depId,
  } = await request.json();
  await prisma.transaction.create({
    data: {
      orderCreationId: data.orderCreationId,
      razorpayPaymentId: data.razorpayPaymentId,
      razorpayOrderId: data.razorpayOrderId,
      razorpaySignature: data.razorpaySignature,
      credits: amount,
      userId: userId,
    },
  });
  //TODO: Create Offline Meet
  await prisma.offlineMeet.create({
    data: {
      deptId: depId,
      doctorId: doctorId,
      patientId: userId,
      to: to,
      from: from,
      
    },
  });



  return NextResponse.json({ status: 200 });
}
