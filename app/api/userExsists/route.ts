import { verifyUser } from "@/lib/lucia";

export async function GET(req: Request) {
  let user = await verifyUser();
  if (!user || user.id === undefined) {
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
