'use client'
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
  FormDescription,
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
import { toast } from "sonner";
import { signup } from "@/app/patient-auth/auth.actions";
export const SignUpSchema = z.object({
  email: z.string().email("This is not a valid email"),
  username: z.string().min(2).max(50),
  gender:z.string(),
  dob:z.string().datetime(),
  aadharno:z.string(),
  bloodgroup:z.string(),
  contactno:z.string(),
  alternatecontactno:z.string(),
  address:z.string(),
  emregencycontact:z.string(),
  prevHis:z.string(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine(data => data.password === data.confirmPassword, {
   message: 'Passwords do not match',
   path: ['confirmPassword']
});
const Signup = () => {
   const router=useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email:"nil@gmail.com",
      username: "",
      gender:"",
      aadharno:"",
      dob:"",
      bloodgroup:"",
      contactno:"",
      alternatecontactno:"",
      prevHis:"",
      password:"",
      confirmPassword:"",
    },
  });
  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
      const res=await signup(values);
      if(res.success){
         toast.success('Account created successfully')
         router.push('/patient-dash')
      }
      else{
         toast.error(res.error)
      }
    
  }
  return (
    <Card className="w-[300px] sm:w-[500px] md:w-[600px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up here.</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
                    <Input placeholder="shadcn" type="datetime" {...field} />
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
                  <FormControl>
                    <Input placeholder="Male" type="text" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input placeholder="B-" type="text" {...field} />
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
                    <Input placeholder="8756680899" type="text" {...field} />
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
                    <Input placeholder="9999888877" type="text" {...field} />
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
                    <Input placeholder="suraj@gmail.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aadharno"
              render={({ field }) => (
                <FormItem>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Signup;
