import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUser, lucia } from "./lib/lucia";
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/patient-dash")) {
    let isLoggedin = request.cookies.get("user-auth-cookie");
    // const pathSegments = request.nextUrl.pathname.split('/');
    // const id = pathSegments[2];
    // const getPat=async()=>{
    //   const res=await fetch(`http://localhost:3000/api/patient/${id}`)
    //   const data=await res.json();
    //   return data;
      
     
    // }
    // const data=await getPat()
    if (isLoggedin ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/patient-auth", request.url));
  }
}
