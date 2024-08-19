"use server";
import { Argon2id } from "oslo/password";
import prisma from "@/lib/db";
import { z } from "zod";
import { lucia } from "@/lib/lucia";
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
        licenceno: values.licenceno,
        estyear: values.estyear,
        Website: values.Website,
        contactno: values.contactno,
        alternatecontactno: values.alternatecontactno,
        address: values.address,
        City: values.city,
        State: values.state,
        Zipcode: values.zipcode,
        noofbeds: values.noofbeds,
        noofopds: values.noofopds,
        nooficu: values.nooficu,
        nooflabs: values.nooflabs,
        noofdoctorsregistered: values.noofdoctorsregistered,
        anyotherdetails: values.anyotherdetails,
        idToLogin: values.idToLogin,
      },
    });
    const session = await lucia.createSession(hospital.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true, id: hospital.id };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};
