import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUser, lucia } from "./lib/lucia";
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/patient-dash")) {
    let isLoggedin = request.cookies.get("user-auth-cookie");
    let value = isLoggedin?.value || null;
    if(!value){
      return NextResponse.redirect(new URL("/patient-auth", request.url));
    }
    if (isLoggedin ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/patient-auth", request.url));
  }
}
