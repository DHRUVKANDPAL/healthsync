import { Lucia, TimeSpan } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./db";


const adapter = new PrismaAdapter(prisma.hospitalSession, prisma.hospital);

export const hospitallucia = new Lucia(adapter, {
  sessionCookie: {
    name: "hospital-auth-cookie",
    expires: true,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  sessionExpiresIn: new TimeSpan(1, "h"),
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
    };
  },
});
declare module "lucia" {
  interface Register {
    Lucia: typeof hospitallucia;
    DatabaseUserAttributes: {
      id: string;
    };
  }
}
