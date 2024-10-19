"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactUs() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    })
    console.log(values)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-center text-slate-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 text-center leading-relaxed mb-12 max-w-2xl mx-auto">
            We're here to help and answer any question you might have. We look forward to hearing from you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardContent className="flex items-center p-6">
                <Mail className="w-10 h-10 text-blue-500 mr-4" />
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-1">Email Us</h2>
                  <p className="text-slate-600 dark:text-slate-400">support@healthsync.com</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardContent className="flex items-center p-6">
                <Phone className="w-10 h-10 text-green-500 mr-4" />
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-1">Call Us</h2>
                  <p className="text-slate-600 dark:text-slate-400">+91 12345 67890</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardContent className="flex items-center p-6">
                <MapPin className="w-10 h-10 text-red-500 mr-4" />
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-1">Visit Us</h2>
                  <p className="text-slate-600 dark:text-slate-400">123 Healthcare Blvd, New Delhi</p>
                </div>
              </CardContent>
            </Card>
          </div>


          <Card className="bg-white dark:bg-slate-800 shadow-lg">
            <CardContent className="p-0">
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="w-full grid grid-cols-2 h-auto">
                  <TabsTrigger value="contact" className="text-lg  data-[state=active]:bg-background">Contact Form</TabsTrigger>
                  <TabsTrigger value="faq" className="text-lg  data-[state=active]:bg-background">FAQ</TabsTrigger>
                </TabsList>
                <TabsContent value="contact" className="p-6 bg-background">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} />
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
                                <Input type="email" placeholder="Your Email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Message Subject" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write your message here" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                <TabsContent value="faq" className="p-6 bg-background">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">What services does HealthSync offer?</h3>
                      <p className="text-slate-600 dark:text-slate-400">HealthSync offers a comprehensive suite of digital health solutions, including telemedicine, electronic health records, and health monitoring tools.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">How can I schedule an appointment?</h3>
                      <p className="text-slate-600 dark:text-slate-400">You can schedule an appointment through our mobile app, website, or by calling our customer support line.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Is my health data secure with HealthSync?</h3>
                      <p className="text-slate-600 dark:text-slate-400">Yes, we use state-of-the-art encryption and security measures to ensure your health data is always protected and compliant with international standards.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Our Office Hours</h2>
            <div className="flex items-center justify-center text-slate-600 dark:text-slate-400">
              <Clock className="w-5 h-5 mr-2" />
              <p>Monday to Friday, 9 AM - 6 PM IST</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}