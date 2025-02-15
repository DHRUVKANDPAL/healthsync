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

     },
  })
  
  let onlineFee = user?.departments[0]?.consulatationFees;

  if (onlineFee) {
    onlineFee = parseFloat((onlineFee / 100 / 3).toFixed(2)) * 200;
  }

  const data={
   id:user?.id,
   name:user?.name,
   imageUrl:user?.imageUrl,
   contactNo:user?.contactno,
   email:user?.email,
   ratings:user?.ratings,

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


