"use client";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ExternalLink,
  MessageSquareMore,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z
    .union([z.literal("Message Support"), z.literal("Public Feedback")])
    .refine(
      (value) => value === "Message Support" || value === "Public Feedback",
      {
        message:
          "Please select a valid type: 'Message Support' or 'Public Feedback'.",
      }
    ),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

const ContactCard = ({ icon: Icon, title, content }: any) => (
  <Card className="bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-lg">
    <CardContent className="flex items-center p-6">
      <Icon className="w-10 h-10 text-indigo-500 dark:text-indigo-400 mr-4" />
      <div>
        <h2 className="font-semibold text-gray-800 dark:text-slate-100 mb-1">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-slate-300">{content}</p>
      </div>
    </CardContent>
  </Card>
);

export default function ContactUs() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "anonymous@healthsync.com",
      name: "Anonymous-Healer",
      subject: "Feedback",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      if (values.type === "Public Feedback") {
        console.log(values);
        const res = await fetch("/api/contact/feedback", {
          method: "POST",
          body: JSON.stringify(values),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          toast.success("Feedback sent successfully");
        } else {
          toast.error("Unable to send feedback");
        }
      }
    });
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent justify-center items-center py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <Card className="bg-white dark:bg-slate-800 mb-12 overflow-hidden shadow-xl">
            <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between relative">
              <div className="absolute inset-0 bg-gradient-to-r dark:from-slate-950/50 dark:to-slate-900" />
              <div className="relative z-10 text-center sm:text-left mb-4 sm:mb-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-slate-100">
                  Get in Touch
                </h1>
                <p className="text-gray-600 dark:text-slate-300 mt-2 max-w-md">
                  We&apos;re here to help with any questions you might have.
                </p>
              </div>
              <Button
                asChild
                variant="secondary"
                className="relative z-10 bg-indigo-500 text-indigo-50 hover:bg-indigo-700 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-50"
              >
                <Link
                  href="#contact-form"
                  className="inline-flex items-center "
                >
                  Contact Us
                  <Send className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ContactCard
              icon={Mail}
              title="Email Us"
              content="support@healthsync.com"
            />
            <ContactCard
              icon={Phone}
              title="Call Us"
              content="+91 12345 67890"
            />
            <ContactCard
              icon={MapPin}
              title="Visit Us"
              content="123 Healthcare Blvd, New Delhi"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card
              className="bg-white dark:bg-slate-900 shadow-lg"
              id="contact-form"
            >
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-100">
                    Send us a Message / Feedback
                  </h2>
                  <Link href="/discuss">
                    <Button className="bg-indigo-500 text-indigo-50 hover:bg-indigo-700 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-50 flex items-center">
                      <p>View Feedbacks</p>{" "}
                      <MessageSquareMore className=" h-8 w-8" />
                    </Button>
                  </Link>
                </div>

                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select type of Message</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the type of Message" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Message Support">
                              Message Support
                            </SelectItem>
                            <SelectItem value="Public Feedback">
                              Public Feedback
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-slate-200">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your Name"
                                {...field}
                                className="bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-gray-300 dark:border-slate-600"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-slate-200">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Your Email"
                                {...field}
                                className="bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-gray-300 dark:border-slate-600"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-slate-200">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Message Subject"
                              {...field}
                              className="bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-gray-300 dark:border-slate-600"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-slate-200">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your message here"
                              className="min-h-[120px] bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-gray-300 dark:border-slate-600"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <div className="space-y-8">
              <Card className="bg-white dark:bg-slate-900 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value="item-1"
                      className="border-gray-200 dark:border-slate-700"
                    >
                      <AccordionTrigger className="text-gray-700 dark:text-slate-200">
                        What services does HealthSync offer?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-slate-300">
                        HealthSync offers a comprehensive suite of digital
                        health solutions, including telemedicine, electronic
                        health records, and health monitoring tools.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                      value="item-2"
                      className="border-gray-200 dark:border-slate-700"
                    >
                      <AccordionTrigger className="text-gray-700 dark:text-slate-200">
                        How can I schedule an appointment?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-slate-300">
                        You can schedule an appointment through our mobile app,
                        website, or by calling our customer support line.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                      value="item-3"
                      className="border-gray-200 dark:border-slate-700"
                    >
                      <AccordionTrigger className="text-gray-700 dark:text-slate-200">
                        Is my health data secure with HealthSync?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-slate-300">
                        Yes, we use state-of-the-art encryption and security
                        measures to ensure your health data is always protected
                        and compliant with international standards.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 shadow-lg">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
                    Our Office Hours
                  </h2>
                  <div className="flex items-center justify-center text-gray-600 dark:text-slate-300 mb-4">
                    <Clock className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" />
                    <p>Monday to Friday, 5 AM - 11 PM IST</p>
                  </div>
                  <Button
                    variant="outline"
                    asChild
                    className="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-600 border-indigo-300 dark:border-slate-500"
                  >
                    <Link
                      href="/book-appointment"
                      className="inline-flex items-center dark:text-slate-100"
                    >
                      Book an Appointment
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
