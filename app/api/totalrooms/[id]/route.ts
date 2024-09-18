import prisma from "@/lib/db";
import { getHospital } from "@/lib/hospitallucia";

export async function GET(req:Request,{params}:{params:{id:string}}){
  const id=params.id
  let user=await getHospital();
  if(user && id!==user.id){
    return new Response(
      JSON.stringify({ success: false }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  const singleRoom=await prisma.room.count({
   where:{
      userId:id,
      typeof:"Single Room"
   }
  })
  const ICU=await prisma.room.count({
   where:{
      userId:id,
      typeof:"ICU"
   }
  })
  const GeneralWard=await prisma.room.count({
   where:{
      userId:id,
      typeof:"General Ward"
   }
  })
  const SharedRoom=await prisma.room.count({
   where:{
      userId:id,
      typeof:"Shared Room"
   }
  })
  const total=singleRoom+ICU+GeneralWard+SharedRoom;
  if(user){
    return new Response(
      JSON.stringify({total:{singleRoom,ICU,GeneralWard,SharedRoom,total}, success: true }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  return new Response(
    JSON.stringify({ success: false }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}