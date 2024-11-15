import prisma from "@/lib/db";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function POST(req: NextRequest) {
  try {
   const values = await req.json();
   const fb=await prisma.feedback.create({
      data:{
        name:values.name,
        email:values.email,
        message:values.message,
        subject:values.subject
      }
   });
 
   return new Response(JSON.stringify({ success: true }));
  } catch (error) {
   return new Response(JSON.stringify({ success: false }));
  }
}

export async function GET(req: NextRequest) {
  try {
   const fb=await prisma.feedback.findMany({
    relationLoadStrategy: 'join',
    include:{
      reply:true
    }
   });
   return new Response(JSON.stringify({ success: true,fb }));
  } catch (error) {
   return new Response(JSON.stringify({ success: false }));
  }
}