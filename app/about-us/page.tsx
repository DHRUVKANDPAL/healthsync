import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";
import {
  IoNotifications,
  IoQrCode,
  IoCalendar,
  IoDocumentText,
  IoSearch,
  IoMedkit,
} from "react-icons/io5";
import Logo from "@/components/Logo";

const features = [
  {
    icon: <IoNotifications className="w-12 h-12" />,
    title: "Notifications System",
    description:
      "Stay updated with real-time alerts about appointments, prescriptions, and health tips.",
  },
  {
    icon: <IoQrCode className="w-12 h-12" />,
    title: "OPD Queuing",
    description:
      "Efficient queue management for outpatient departments, reducing wait times.",
  },
  {
    icon: <IoCalendar className="w-12 h-12" />,
    title: "Bed Booking",
    description:
      "Easy-to-use system for booking and managing hospital bed occupancy.",
  },
  {
    icon: <IoDocumentText className="w-12 h-12" />,
    title: "Patient History Dashboard",
    description:
      "Comprehensive view of patient medical history, treatments, and progress.",
  },
  {
    icon: <IoSearch className="w-12 h-12" />,
    title: "Hospitals Search",
    description:
      "Find and compare hospitals based on services, ratings, and proximity.",
  },
  {
    icon: <IoMedkit className="w-12 h-12" />,
    title: "Pharmacy Inventory Management",
    description:
      "Streamlined inventory control for pharmacies, ensuring medication availability.",
  },
];

const AboutUs: React.FC = () => {
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
            About
          </h1>
          <Logo className="text-5xl sm:text-6xl inline-block" />
        </div>

        <p className="text-xl text-slate-700 dark:text-slate-300 text-center leading-relaxed mb-16 max-w-3xl mx-auto">
          HealthSync is revolutionizing healthcare management by unifying
          hospitals, patients, ambulances, blood banks, and pharmacies on a
          single, integrated platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white dark:bg-slate-950 rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-200 mb-4">
              Our Vision
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We envision a future where healthcare is seamlessly connected,
              universally accessible, and patient-centric. HealthSync aims to
              create an ecosystem where:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                Every individual has instant access to quality healthcare
                services
              </li>
              <li>
                Healthcare providers collaborate effortlessly to deliver optimal
                patient care
              </li>
              <li>
                Data-driven insights lead to better health outcomes and
                preventive care
              </li>
              <li>
                Technology bridges the gap between patients and healthcare
                resources
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-950 rounded-lg shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-200 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              HealthSync's mission is to transform healthcare delivery through
              innovative technology solutions. We are committed to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                Developing user-friendly tools that simplify healthcare
                management
              </li>
              <li>
                Enhancing communication between patients and healthcare
                providers
              </li>
              <li>Optimizing resource allocation in healthcare facilities</li>
              <li>Ensuring data security and privacy in all our solutions</li>
              <li>
                Continuously innovating to address evolving healthcare
                challenges
              </li>
            </ul>
          </div>
        </div>

        {/* Our Approach Section */}
        {/* Our Approach Section */}
        <div className="bg-white dark:bg-slate-950 rounded-lg shadow-xl p-10 md:p-12 my-12 transform  transition-transform duration-300">
          <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-8 text-center">
            Our Approach
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-center max-w-4xl mx-auto mb-8">
            At HealthSync, our approach revolves around creating a seamless,
            secure, and efficient healthcare management experience. We focus on
            delivering user-centered solutions by leveraging cutting-edge
            technology. Here's how we approach healthcare innovation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-4">
                <IoNotifications className="w-8 h-8 text-indigo-600 dark:text-indigo-200" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-200 mb-2">
                Collaboration
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center ">
                We collaborate with healthcare professionals to tailor solutions
                that meet the needs of hospitals, patients, and pharmacies
                alike.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-4">
                <IoQrCode className="w-8 h-8 text-indigo-600 dark:text-indigo-200" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-200 mb-2">
                Automation
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                We harness AI and machine learning to reduce manual tasks,
                improving efficiency and accuracy in healthcare operations.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-4">
                <IoCalendar className="w-8 h-8 text-indigo-600 dark:text-indigo-200" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-200 mb-2">
                Scalability
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Our platform is designed to scale alongside the growing demands
                of the healthcare industry, ensuring future readiness.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-4">
                <IoDocumentText className="w-8 h-8 text-indigo-600 dark:text-indigo-200" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-200 mb-2">
                Security
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Security is a priority at HealthSync. We employ cutting-edge
                encryption and privacy measures to protect sensitive health
                data.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-4">
                <IoSearch className="w-8 h-8 text-indigo-600 dark:text-indigo-200" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-200 mb-2">
                Accessibility
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                We design intuitive interfaces that ensure healthcare services
                are accessible to all, regardless of location or technological
                expertise.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-12">
          Our Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-950 rounded-lg shadow-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-indigo-500 dark:text-indigo-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
            Join Us in Revolutionizing Healthcare
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            At HealthSync, we're always looking for passionate individuals to
            join our mission. Together, we can create a healthier, more
            connected world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
