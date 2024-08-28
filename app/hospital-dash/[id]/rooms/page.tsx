"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
const formSchema = z.object({
  roomno: z.string().min(1),
  typeof: z.string(),
  isavailabel: z.boolean().default(false).optional(),
});

export default function Rooms() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomno: "",
      typeof: "",
      isavailabel: false,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-[500px] w-full max-w-screen-2xl flex justify-center py-10 mx-auto bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Card className="w-[300px] sm:w-[430px] md:w-[540px]">
        <CardHeader>
          <CardTitle>
            <span>Create Room</span>{" "}
          </CardTitle>
          <CardDescription>Create room here.</CardDescription>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="roomno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room no</FormLabel>
                    <FormControl>
                      <Input placeholder="A-101" {...field} />
                    </FormControl>
                    <FormDescription className="opacity-70">
                      This is your public display room name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="typeof"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Room</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified type to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ICU">ICU</SelectItem>
                        <SelectItem value="OPD">OPD</SelectItem>
                        <SelectItem value="General Ward">
                          General Ward
                        </SelectItem>
                        <SelectItem value="Single Room">Single Room</SelectItem>
                        <SelectItem value="Shared Room">Shared Room</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isavailabel"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-5 w-5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Is the room currently Availabel ? 
                      </FormLabel>
                      <FormDescription>
                        You can manage your room status while creating it.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}