import { getDoctor } from "@/lib/doctorlucia";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let user = await getDoctor();
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
  if (user) {
    return new Response(JSON.stringify({ user, success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ success: false }), {
    headers: { "Content-Type": "application/json" },
  });
}


