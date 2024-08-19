import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/patient-dash")) {
    let isLoggedin=request.cookies.get("user-auth-cookie")
    if(isLoggedin){
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/patient-auth",request.url))
  }
  
}
