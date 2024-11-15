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
import { format, subYears } from "date-fns";
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
import { toast } from "sonner";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { doctorsignup } from "@/app/(main)/doctor-auth/authdoc.action";

export const DoctorSignUpSchema = z
  .object({
    userId: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    licenceNo: z.string(),
    dob: z.date(),
    aadharNo: z.string().length(12, "This is not a valid Aadhar no"),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    contactno: z.string().length(10, "This is not a valid Contact no"),
    email: z.string().email("This is not a valid email"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const DoctorSignUp = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof DoctorSignUpSchema>>({
    resolver: zodResolver(DoctorSignUpSchema),
    defaultValues: {},
  });
  const [isPending, startTransition] = useTransition();
  async function onSubmit(values: z.infer<typeof DoctorSignUpSchema>) {
    startTransition(async () => {
      console.log(values);
      const res = await doctorsignup(values);
      if (res.success) {
        toast.success("Doctor registered successfully");
        router.push(`/doctor-dash/${res.id}`);
      } else {
        toast.error(res.error);
      }
    });
  }
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  return (
    <Card className="w-[300px] sm:w-[430px] md:w-[720px] lg:w-[800px] dark:bg-[rgba(31,41,55,0.5)] backdrop-blur-3xl">
      <CardHeader>
        <CardTitle>Register Doctor</CardTitle>
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
              name="userId"
              render={({ field }) => (
                <FormItem className="col-span-1">
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
              name="aadharNo"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Aadhar no</FormLabel>
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
              name="licenceNo"
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
              name="contactno"
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

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="pb">Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal p-0 py-2 px-3",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="flex items-center justify-between p-2 border-b">
                        <Select
                          onValueChange={(value) => {
                            const year = parseInt(value);
                            setSelectedYear(year);
                            const currentDate = field.value || new Date();
                            field.onChange(
                              new Date(
                                year,
                                currentDate?.getMonth(),
                                currentDate.getDate()
                              )
                            );
                          }}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setSelectedYear(date ? date.getFullYear() : null);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        month={
                          selectedYear ? new Date(selectedYear, 0) : undefined
                        }
                      />
                    </PopoverContent>
                  </Popover>
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

export default DoctorSignUp;
