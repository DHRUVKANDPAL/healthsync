"use server";
import { Argon2id } from "oslo/password";
import prisma from "@/lib/db";
import { z } from "zod";

import { cookies } from "next/headers";
import { doctorlucia } from "@/lib/doctorlucia";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DoctorSignUpSchema } from "@/components/Doctorsignup";
import { DoctorSigninSchema } from "@/components/Doctorsignin";

export const doctorsignup = async (
  values: z.infer<typeof DoctorSignUpSchema>
) => {
  try {
    const existingdoctor = await prisma.doctor?.findUnique({
      where: {
        userId: values?.userId,
      },
    });
    if (existingdoctor) {
      return { error: "doctor already exists", success: false };
    }
    const hashedPassword = await new Argon2id().hash(values.password);

    const doctor = await prisma.doctor.create({
      data: {
         userId: values.userId,
         name: values.name,
         dob: values.dob,
         aadharNo: values.aadharNo,
         licenceNo: values.licenceNo,
         contactno: values.contactno,
         email: values.email.toLowerCase(),
         hashedPassword: hashedPassword,
      },
    });
    const session = await doctorlucia.createSession(doctor.id, {});
    const sessionCookie = await doctorlucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, id: doctor.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", success: false };
  }
};

export const doctorSignIn = async (
  values: z.infer<typeof DoctorSigninSchema>
) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        userId: values.userId,
      },
    });
    if (!doctor || !doctor.hashedPassword) {
      return { success: false, error: "Invalid Credentials!" };
    }
    const passwordMatch = await new Argon2id().verify(
      doctor.hashedPassword,
      values.password
    );
    if (!passwordMatch) {
      return { success: false, error: "Invalid Credentials!" };
    }

    const session = await doctorlucia.createSession(doctor.id, {});
    const sessionCookie = await doctorlucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, id: doctor.id };
  } catch (error) {
    console.log("Error in auth.actions.ts", error);
    return { success: false };
  }
};

export const doctorLogout = async () => {
  try {
    const sessionCookie = await doctorlucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    redirect("/doctor-dash");
  } catch (error) {
    console.log("Error");
  }
  //  location.reload();
  revalidatePath("/doctor-dash");
};
