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

    //For existing sessions
    const sessionId = cookies().get(doctorlucia.sessionCookieName)?.value || null;
    if (sessionId) {
      console.log("Logout session ID", sessionId);
      await doctorlucia.invalidateSession(sessionId);
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

    const sessionId = cookies().get(doctorlucia.sessionCookieName)?.value || null;
    if (!sessionId) {
      return null;
    }
    console.log("Logout session ID",sessionId);

    await doctorlucia.invalidateSession(sessionId);
    console.log("Invalidated session");
    const sessionCookie = await doctorlucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    console.log("Error");
  }
  redirect("/doctor-dash");
  //  location.reload();
  // revalidatePath("/doctor-dash");
};

export const doctorLogoutFromAllDevices = async () => {
  try {
    const sessionId = cookies().get(doctorlucia.sessionCookieName)?.value || null;
    if (!sessionId) {
      return null;
    }
    const { user } = await doctorlucia.validateSession(sessionId);
    console.log("Logout session ID", sessionId);
    console.log("user id ", user?.id);

    await doctorlucia.invalidateUserSessions(user?.id!!);

    const sessionCookie = await doctorlucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    
  } catch (error) {
    console.log("Error");
  }
  redirect("/doctor-dash");
  //  location.reload();
  revalidatePath("/doctor-dash");
};


export const imageEditDoctor= async ({
  url,
  id,
}: {
  url: string;
  id: any;
}) => {
  try {
    const updateUser = await prisma.doctor.update({
      where: {
        id: id,
      },
      data: {
        imageUrl: url,
      },
    });
    console.log("Edited");
    return { success: true };
  } catch (error) {
    console.error("Error updating patient:", error);
    return { success: false, error: "Failed to update patient" };
  }
};




export const doctorsignupDummy = async (
  values: any
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
        ratings:values.ratings,
        imageUrl:values.imageUrl,
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


export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.doctorSession.delete({ where: { id: sessionId } });
}

export async function invalidateUserSessions(userId: string): Promise<void> {
  await prisma.doctorSession.deleteMany({
    where: {
      userId: userId,
    },
  });
}