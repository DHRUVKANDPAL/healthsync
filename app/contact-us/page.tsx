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
        </div>
      </main>
      <Footer />
    </>
  )
}