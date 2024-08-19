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
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
export const HospitalSignUpSchema = z
  .object({
    email: z.string().email("This is not a valid email"),
    username: z.string().min(2).max(50),
    gender: z.string(),
    dob: z.string(),
    aadharno: z.string().length(12,"This is not a valid Aadhar no"),
    bloodgroup: z.string(),
    contactno: z.string().length(10,"This is not a valid Contact no"),
    alternatecontactno: z.string(),
    address: z.string(),
    emregencycontact: z.string(),
    prevHis: z.string(),
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
    defaultValues: {
      email: "",
      username: "",
      gender: "",
      aadharno: "",
      dob: "",
      bloodgroup: "",
      contactno: "",
      alternatecontactno: "",
      prevHis: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof HospitalSignUpSchema>) {
   //  const res = await HospitalSignUp(values);
   //  if (res.success) {
   //    toast.success("Account created successfully");
   //    router.push(`/patient-dash/${res.id}`);
   //  } else {
   //    toast.error(res.error);
   //  }
  }
  return (
    <Card className="w-[300px] sm:w-[430px] md:w-[720px] lg:w-[800px]">
      <CardHeader>
        <CardTitle>Register Hospital</CardTitle>
        <CardDescription>Register Hospital here.</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:grid grid-cols-2 gap-4 md:space-y-0">
            <FormField 
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Username </FormLabel>
                  <FormControl>
                    <Input placeholder="Suraj" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOB</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="25 Aug 2004"
                      type="datetime"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodgroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified Blood Group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact No</FormLabel>
                  <FormControl>
                    <Input placeholder="9999988888" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alternatecontactno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternate Contact No </FormLabel>
                  <FormControl>
                    <Input placeholder="7777755555" type="text" {...field} />
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
                    <Input placeholder="Rajiv Chowk , New Delhi , India" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emregencycontact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact No</FormLabel>
                  <FormControl>
                    <Input placeholder="7777755555" type="text" {...field} />
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
                      placeholder="suraj@gmail.com"
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
              name="aadharno"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Aadhar no</FormLabel>
                  <FormControl>
                    <Input placeholder="123456784321" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prevHis"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Previous Medical History</FormLabel>
                  <FormControl>
                    <Input placeholder="Diabetes" type="text" {...field} />
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
            <Button type="submit" className="col-span-2">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HospitalSignUp;
