import { getUser } from "@/lib/lucia";

export async function GET() {
   const user=await getUser();
   console.log(user);
   if(user===null || user.id===undefined){
    return new Response(JSON.stringify({user:null, success: false }), {
      headers: { "Content-Type": "application/json" },
    },
    )
   }
   return new Response(JSON.stringify({user,success:true}), {
      headers: { "Content-Type": "application/json" },
    },
    )
}