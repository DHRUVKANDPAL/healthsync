import prisma from "@/lib/db";
import { getDoctor } from "@/lib/doctorlucia";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const user=await prisma.doctor.findUnique({
     where: {
       id: id,
     },
     include: {
       departments: true,
       queue:true,
     },
  })
  if(!user ) return new Response(JSON.stringify({ success: false }), {
    headers: { "Content-Type": "application/json" },
  })
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
  let onlineFee = user?.departments[0]?.consulatationFees;

  if (onlineFee) {
    onlineFee = parseFloat((onlineFee / 100 / 3).toFixed(2)) * 100;
  }

  const data={
   id:user?.id,
   name:user?.name,
   imageUrl:user?.imageUrl,
   contactNo:user?.contactno,
   email:user?.email,
   ratings:user?.ratings,
   queue:user?.queue,
   offlineConsultationFees:user?.departments[0]?.consulatationFees,
   onlineConsultationFees:onlineFee,
   isAvailable:user?.departments[0]?.isAvailable,
  }
  
  if (data) {
    return new Response(JSON.stringify({ data, success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ success: false }), {
    headers: { "Content-Type": "application/json" },
  });
}


