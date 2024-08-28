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
  FormDescription,
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
import { toast } from "sonner";
import { signIn } from "@/app/patient-auth/auth.actions";
import { Loader2 } from "lucide-react";
export const SigninSchema = z.object({
  aadharno: z.string().length(12, "This is not a valid Aadhar no"),
  password: z.string().min(6),
});
const Signin = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      aadharno: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof SigninSchema>) {
    startTransition(async() => {
      console.log(values);
      const res = await signIn(values);
      if (res.success) {
        toast.success("Logged in successfully");
        router.push(`/patient-dash/${res.id}`);
      } else {
        toast.error(res.error);
      }
    });
  }
  return (
    <Card className="w-[300px] sm:w-[430px] md:w-[540px]">
      <CardHeader>
        <CardTitle>Sign in as Patient</CardTitle>
        <CardDescription>Sign in here.</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
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
            <Button
              disabled={isPending}
              type="submit"
              className="w-full dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {isPending && <Loader2 className="animate-spin px-1 h-8 w-8"></Loader2>}Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Signin;
