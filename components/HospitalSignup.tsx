"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { hospitalsignup } from "@/app/(main)/hospital-auth/authhos.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const HospitalSignUpSchema = z
  .object({
    name: z.string().min(2).max(50),
    licence: z.string(),
    estyear: z.coerce.number(),
    website: z.string(),
    contactNo: z.string(),
    alternateContactNo: z.string(),
    email: z.string().email(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
    // noOfBeds: z.coerce.number(),
    // noOfOpds: z.coerce.number(),
    // noOfIcu: z.coerce.number(),
    // noOfLabs: z.coerce.number(),
    // noOfDoctorsRegistered: z.coerce.number(),
    idToLogin: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const HospitalSignUp = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof HospitalSignUpSchema>>({
    resolver: zodResolver(HospitalSignUpSchema),
    defaultValues: {},
  });
  const [isPending, startTransition] = useTransition();
  async function onSubmit(values: z.infer<typeof HospitalSignUpSchema>) {
    startTransition(async () => {
      console.log(values);
      const res = await hospitalsignup(values);
      if (res.success) {
        toast.success("Hospital registered successfully");
        router.push(`/hospital-dash/${res.id}`);
      } else {
        toast.error(res.error);
      }
    });
  }
  return (
    <Card className="w-[300px] sm:w-[430px] md:w-[720px] lg:w-[800px] dark:bg-[rgba(31,41,55,0.5)] backdrop-blur-3xl">
      <CardHeader>
        <CardTitle>Register Hospital</CardTitle>
        <CardDescription>Register here.</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 md:grid md:grid-cols-2 md:space-y-0 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Licence no</FormLabel>
                  <FormControl>
                    <Input placeholder="NIN2HFIH" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estyear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alternateContactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternate Contact No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="noOfBeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of Beds</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="noOfOpds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of OPDs</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="noOfIcu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of ICUs</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="noOfLabs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of Labs</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="noOfDoctorsRegistered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of Doctors Registered</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="idToLogin"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Unique Id to Login</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manas Hospital"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              type="submit"
              className="col-span-2 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {isPending && <Loader2 className="animate-spin px-1"></Loader2>}
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HospitalSignUp;
