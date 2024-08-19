import { getUser } from "@/lib/lucia";

export async function GET(req:Request,{params}:{params:{id:string}}){
  const id=params.id
  let user=await getUser();
  if(user){
    return new Response(
      JSON.stringify({ success: true }),
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