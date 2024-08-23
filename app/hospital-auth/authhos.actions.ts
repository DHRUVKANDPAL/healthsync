"use server";
import { Argon2id } from "oslo/password";
import prisma from "@/lib/db";
import { z } from "zod";
import { hospitallucia } from "@/lib/hospitallucia";
import { cookies } from "next/headers";

import { HospitalSignUpSchema } from "@/components/HospitalSignup";

export const hospitalsignup = async (values: z.infer<typeof HospitalSignUpSchema>) => {
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
        noofbeds: values.noOfBeds,
        noofopds: values.noOfOpds,
        nooficu: values.noOfIcu,
        nooflabs: values.noOfLabs,
        noofdoctorsregistered: values.noOfDoctorsRegistered,
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
    console.log(error)
    return { error: "Something went wrong", success: false };
  }
};
