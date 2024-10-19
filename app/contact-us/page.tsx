import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <DarkModeToggle />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            Contact Us
          </h1>
        </div>

        <p className="text-xl text-slate-700 dark:text-slate-300 text-center leading-relaxed mb-16 max-w-3xl mx-auto">
          We would love to hear from you! Whether you have a question about our
          services, need support, or simply want to give feedback, feel free to
          reach out to us. Our team is here to assist you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-950 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-200 mb-6">
              Get in Touch
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-slate-700 dark:text-slate-300 mb-2"
                >
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  className="border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-slate-700 dark:text-slate-300 mb-2"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-slate-700 dark:text-slate-300 mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message here"
                  className="border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 dark:bg-slate-900 dark:hover:bg-slate-700 transition-colors"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-white dark:bg-slate-950 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-200 mb-6">
              Contact Details
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              You can also reach us via the following channels:
            </p>
            <ul className="space-y-4">
              <li className="text-lg text-slate-700 dark:text-slate-300">
                <span className="font-semibold">Email:</span>{" "}
                support@healthsync.com
              </li>
              <li className="text-lg text-slate-700 dark:text-slate-300">
                <span className="font-semibold">Phone:</span> +91 12345 67890
              </li>
              <li className="text-lg text-slate-700 dark:text-slate-300">
                <span className="font-semibold">Address:</span> HealthSync, 123
                Healthcare Blvd, New Delhi, India
              </li>
            </ul>

            <p className="text-slate-700 dark:text-slate-300 mt-6">
              We are available Monday to Friday, 9 AM - 6 PM IST.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
