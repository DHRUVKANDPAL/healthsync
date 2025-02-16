import { Lucia, TimeSpan } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./db";
import { cookies } from "next/headers";
const adapter = new PrismaAdapter(prisma.patientSession, prisma.patient);
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "user-auth-cookie",
    expires: true,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  sessionExpiresIn: new TimeSpan(1, "h"),
});

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  console.log("Session Id : ",sessionId);
  const { session, user } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

    const dbUser = await prisma?.patient?.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender:true,
        dob:true,
        aadharno:true,
        bloodgroup:true,
        contactno:true,
        alternatecontactno:true,
        address:true,
        emergencycontact:true,
        prevHis:true,
        medHis:true,
        createdAt:true,
        updatedAt:true,
        imageUrl:true,
        
      },
    });
    return dbUser;

};


export const verifyUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }
  const { session, user } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

    
    return {id:user?.id};

};
