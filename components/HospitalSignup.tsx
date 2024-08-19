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
import { hospitalsignup } from "@/app/hospital-auth/authhos.actions";
import { toast } from "sonner";

export const HospitalSignUpSchema = z
  .object({
    email: z.string().email("This is not a valid email"),
    name: z.string().min(2).max(50),
    licenceno:z.string(),
    estyear:z.number(),
    Website:z.string(),
    contactno:z.string().length(10,"This is not a valid Contact no"),
    alternatecontactno:z.string().length(10,"This is not a valid Contact no"),
    address:z.string(),
    city:z.string(),
    state:z.string(),
    zipcode:z.string(),
    noofbeds:z.number(),
    noofopds:z.number(),
    nooficu:z.number(),
    nooflabs:z.number(),
    noofdoctorsregistered:z.number(),
    anyotherdetails:z.string(),
    idToLogin:z.string().min(6,"Must be minimum 6 character"),
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
      
    },
  });
  async function onSubmit(values: z.infer<typeof HospitalSignUpSchema>) {
    const res = await hospitalsignup(values);
    if (res.success) {
      toast.success("Hospital registered successfully");
      router.push(`/hospital-dash`);
    } else {
      toast.error(res.error);
    }
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
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Manas Hospital" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="licenceno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Licence No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="NIN2HFI"
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
              name="estyear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1987"
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
              name="Website"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.manshospital.com"
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
              name="contactno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="7531594862"
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
              name="alternatecontactno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternate Contact No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="7531594332"
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
                      placeholder="manash@gmail.com"
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
                      placeholder="Uttar Pradesh"
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
              name="address"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Near Rajendra Nagar"
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
                      placeholder="Noida"
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
                      placeholder="Uttar Pradesh"
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
              name="noofbeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of Beds</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="200"
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
              name="noofopds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of OPDs</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10"
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
              name="nooficu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of ICU</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="7"
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
              name="nooflabs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of Labs</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="2"
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
              name="noofdoctorsregistered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No of Doctors Registerd</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="50"
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
              name="idToLogin"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Unique Id to Login</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mh127a"
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
              name="anyotherdetails"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Any Other Details</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                    />
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
