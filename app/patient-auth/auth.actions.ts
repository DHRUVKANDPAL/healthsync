"use server";
import { SignUpSchema } from "@/components/Signup";
import { Argon2id } from "oslo/password";
import prisma from "@/lib/db";
import { z } from "zod";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    const existingpatient = await prisma.patient.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingpatient) {
      return { error: "patient already exists", success: false };
    }
    const hashedPassword = await new Argon2id().hash(values.password);

    const patient = await prisma.patient.create({
      data: {
        email: values.email.toLowerCase(),
        hashedPassword: hashedPassword,
        name: values.username,
      },
    });
    const session = await lucia.createSession(patient.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, id: patient.id };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};
// export const signIn = async (values: z.infer<typeof SignInSchema>) => {
//   const patient = await prisma.patient.findUnique({
//     where: {
//       email: values.email,
//     },
//   });
//   if (!patient || !patient.hashedPassword) {
//     return { success: false, error: "Invalid Credentials!" };
//   }
//   const passwordMatch = await new Argon2id().verify(
//     patient.hashedPassword,
//     values.password
//   );
//   if (!passwordMatch) {
//     return { success: false, error: "Invalid Credentials!" };
//   }

//   const session = await lucia.createSession(patient.id, {});
//   const sessionCookie = await lucia.createSessionCookie(session.id);
//   cookies().set(
//     sessionCookie.name,
//     sessionCookie.value,
//     sessionCookie.attributes
//   );
//   return { success: true, id: patient.id };
// };

// export const logout=async(id:string )=>{
//    try {
//       const sessionCookie = await lucia.createBlankSessionCookie()
//       cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      
//       const deleteSession=await prisma.patientSession.deleteMany({
//          where:{
//             patientId:id
//          }
//       })
//       redirect('/authenticate')
//    } catch (error) {
//     redirect('/authenticate')
//    }

// }

