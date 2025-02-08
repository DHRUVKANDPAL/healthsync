"use server";
import { Argon2id } from "oslo/password";
import prisma from "@/lib/db";
import { z } from "zod";
import { hospitallucia } from "@/lib/hospitallucia";
import { cookies } from "next/headers";

import { HospitalSignUpSchema } from "@/components/HospitalSignup";
import { HospitalSigninSchema } from "@/components/Hospitalsignin";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const hospitalsignup = async (
  values: z.infer<typeof HospitalSignUpSchema>
) => {
  try {
    const existinghospital = await prisma.hospital.findUnique({
      where: {
        idToLogin: values.idToLogin,
      },
    });
    if (existinghospital) {
      return { error: "hospital already exists", success: false };
    }
    const hashedPassword = await new Argon2id().hash(values.password);

    const hospital = await prisma.hospital.create({
      data: {
        email: values.email.toLowerCase(),
        hashedPassword: hashedPassword,
        name: values.name,
        licenceno: values.licence,
        estyear: values.estyear,
        Website: values.website,
        contactno: values.contactNo,
        alternatecontactno: values.alternateContactNo,
        address: values.address,
        City: values.city,
        State: values.state,
        Zipcode: values.zipcode,
        // noofbeds: values.noOfBeds,
        // noofopds: values.noOfOpds,
        // nooficu: values.noOfIcu,
        // nooflabs: values.noOfLabs,
        // noofdoctorsregistered: values.noOfDoctorsRegistered,
        idToLogin: values.idToLogin,
      },
    });
    const session = await hospitallucia.createSession(hospital.id, {});
    const sessionCookie = await hospitallucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, id: hospital.id };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", success: false };
  }
};

export const hospitalSignIn = async (
  values: z.infer<typeof HospitalSigninSchema>
) => {
  try {
    const hospital = await prisma.hospital.findUnique({
      where: {
        idToLogin: values.uniqueIdToLogin,
      },
    });
    if (!hospital || !hospital.hashedPassword) {
      return { success: false, error: "Invalid Credentials!" };
    }
    const passwordMatch = await new Argon2id().verify(
      hospital.hashedPassword,
      values.password
    );
    if (!passwordMatch) {
      return { success: false, error: "Invalid Credentials!" };
    }

    const session = await hospitallucia.createSession(hospital.id, {});
    const sessionCookie = await hospitallucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, id: hospital.id };
  } catch (error) {
    console.log("Error in auth.actions.ts", error);
    return { success: false };
  }
};

export const hospitalLogout = async () => {
  try {
    const sessionCookie = await hospitallucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    redirect("/hospital-dash");
  } catch (error) {
    console.log("Error");
  }
  //  location.reload();
  revalidatePath("/hospital-dash");
};
