import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  IoNotifications,
  IoQrCode,
  IoCalendar,
  IoDocumentText,
  IoSearch,
  IoMedkit,
  IoShieldCheckmark,
  IoSparkles,
  IoAccessibility,
  IoBusinessOutline,
} from "react-icons/io5";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Beat from "@/components/Beat";

const features = [
  {
    icon: <IoNotifications className="w-8 h-8 md:w-12 md:h-12" />,
    title: "Notifications System",
    description:
      "Stay updated with real-time alerts about appointments, prescriptions, and health tips.",
  },
  {
    icon: <IoQrCode className="w-8 h-8 md:w-12 md:h-12" />,
    title: "OPD Queuing",
    description:
      "Efficient queue management for outpatient departments, reducing wait times.",
  },
  {
    icon: <IoCalendar className="w-8 h-8 md:w-12 md:h-12" />,
    title: "Bed Booking",
    description:
      "Easy-to-use system for booking and managing hospital bed occupancy.",
  },
  {
    icon: <IoDocumentText className="w-8 h-8 md:w-12 md:h-12" />,
    title: "Patient History Dashboard",
    description:
      "Comprehensive view of patient medical history, treatments, and progress.",
  },
  {
    icon: <IoSearch className="w-8 h-8 md:w-12 md:h-12" />,
    title: "Hospitals Search",
    description:
      "Find and compare hospitals based on services, ratings, and proximity.",
  },
  {
    icon: <IoMedkit className="w-8 h-8 md:w-12 md:h-12" />,
    title: "Pharmacy Inventory Management",
    description:
      "Streamlined inventory control for pharmacies, ensuring medication availability.",
  },
];

const approaches = [
  {
    icon: <IoNotifications className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Collaboration",
    description:
      "We collaborate with healthcare professionals to tailor solutions that meet the needs of hospitals, patients, and pharmacies alike.",
  },
  {
    icon: <IoSparkles className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Automation",
    description:
      "We harness AI and machine learning to reduce manual tasks, improving efficiency and accuracy in healthcare operations.",
  },
  {
    icon: <IoCalendar className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Scalability",
    description:
      "Our platform is designed to scale alongside the growing demands of the healthcare industry, ensuring future readiness.",
  },
  {
    icon: <IoShieldCheckmark className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Security",
    description:
      "Security is a priority at HealthSync. We employ cutting-edge encryption and privacy measures to protect sensitive health data.",
  },
  {
    icon: <IoAccessibility className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Accessibility",
    description:
      "We design intuitive interfaces that ensure healthcare services are accessible to all, regardless of location or technological expertise.",
  },
  {
    icon: <IoBusinessOutline className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Management",
    description:
      "Optimizing healthcare operations and resource allocation and maximizing efficiency.",
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4 py-16">
          <nav className="flex justify-between items-center mb-12">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center"
            >
              <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6 mr-2" />
              <span className="text-base sm:text-lg font-semibold">Home</span>
            </Link>
          </nav>

          <header className="text-center mb-20 select-none">
            <div className="flex flex-col sm:flex-row justify-center items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="text-4xl sm:text-6xl md:text-7xl font-bold text-indigo-600 dark:text-indigo-400 mr-2">
                  About
                </span>
                <Logo className="text-4xl sm:text-6xl md:text-7xl inline-block" />
              </div>
              <div className="w-20 sm:ml-4">
                <Beat />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mt-6">
              Revolutionizing healthcare management by unifying hospitals,
              patients, ambulances, blood banks, and pharmacies on a single,
              integrated platform.
            </p>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {["Our Vision", "Our Mission"].map((title, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 transform hover:scale-105 transition-transform duration-300"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
                  {title}
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  {title === "Our Vision"
                    ? "We envision a future where healthcare is seamlessly connected, universally accessible, and patient-centric. HealthSync aims to create an ecosystem where:"
                    : "HealthSync's mission is to transform healthcare delivery through innovative technology solutions. We are committed to:"}
                </p>
                <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                  {(title === "Our Vision"
                    ? [
                        "Every individual has instant access to quality healthcare services",
                        "Healthcare providers collaborate effortlessly to deliver optimal patient care",
                        "Data-driven insights lead to better health outcomes and preventive care",
                        "Technology bridges the gap between patients and healthcare resources",
                      ]
                    : [
                        "Developing user-friendly tools that simplify healthcare management",
                        "Enhancing communication between patients and healthcare providers",
                        "Optimizing resource allocation in healthcare facilities",
                        "Ensuring data security and privacy in all our solutions",
                        "Continuously innovating to address evolving healthcare challenges",
                      ]
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <IoShieldCheckmark className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 my-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-8 text-center">
              Our Approach
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-center max-w-4xl mx-auto mb-12">
              At HealthSync, our approach revolves around creating a seamless,
              secure, and efficient healthcare management experience. We focus
              on delivering user-centered solutions by leveraging cutting-edge
              technology.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {approaches.map((approach, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-indigo-50 dark:bg-slate-800 rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-4">
                    {React.cloneElement(approach.icon, {
                      className:
                        "w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-200",
                    })}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-200 mb-3">
                    {approach.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center">
                    {approach.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-12">
              Our Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-indigo-500 dark:text-indigo-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center bg-indigo-800 dark:bg-indigo-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Join Us in Revolutionizing Healthcare
            </h2>
            <p className="text-base sm:text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
              At HealthSync, we're always looking for passionate individuals to
              join our mission. Together, we can create a healthier, more
              connected world.
            </p>
            <button className="bg-white text-indigo-600 font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-indigo-100 transition-colors duration-300">
              Explore Careers
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
