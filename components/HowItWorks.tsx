"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Video,
  FileText,
  Users,
  BarChart2,
  Activity,
  Clock,
  Stethoscope,
  FileX,
} from "lucide-react";

type UserType = "Patient" | "Hospital" | "Doctor";

interface StepData {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HowItWorks: React.FC = () => {
  const [userType, setUserType] = useState<UserType>("Patient");
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const userTypes: UserType[] = ["Patient", "Hospital", "Doctor"];

  // Define steps for each user type
  const steps: Record<UserType, StepData[]> = {
    Patient: [
      {
        title: "Find & Book Appointments",
        description:
          "Search for doctors and hospitals based on specialty, availability, and location. Book appointments instantly.",
        icon: <Calendar className="w-12 h-12" />,
      },
      {
        title: "Seamless Consultation",
        description:
          "Visit the hospital or consult online with the doctor through integrated video calls.",
        icon: <Video className="w-12 h-12" />,
      },
      {
        title: "Manage Health Records",
        description:
          "Access prescriptions, lab reports, and medical history anytime through your dashboard.",
        icon: <FileText className="w-12 h-12" />,
      },
    ],
    Hospital: [
      {
        title: "Smart Patient Management",
        description:
          "Manage OPD queues, bed availability, and emergency cases efficiently.",
        icon: <Users className="w-12 h-12" />,
      },
      {
        title: "Streamlined Operations",
        description:
          "Automate appointments, billing, and inventory management for seamless hospital workflow.",
        icon: <Activity className="w-12 h-12" />,
      },
      {
        title: "Data-Driven Insights",
        description:
          "Monitor hospital performance with real-time analytics and reports.",
        icon: <BarChart2 className="w-12 h-12" />,
      },
    ],
    Doctor: [
      {
        title: "Effortless Scheduling",
        description:
          "Set availability, manage appointments, and reduce patient wait time.",
        icon: <Clock className="w-12 h-12" />,
      },
      {
        title: "Instant Consultations",
        description:
          "Provide in-person or telehealth consultations via secure video calls.",
        icon: <Stethoscope className="w-12 h-12" />,
      },
      {
        title: "Digital Prescription & Records",
        description:
          "Easily generate and share prescriptions while accessing patient history.",
        icon: <FileX className="w-12 h-12" />,
      },
    ],
  };

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Detect when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="py-16 mx-auto px-4 md:px-8 max-w-7xl">
      <div className="relative overflow-hidden bg-gradient-to-br from-white to-teal-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl shadow-xl">
        <div className="relative z-10 py-16 px-4 md:px-12">
          {/* Section heading */}
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl md:text-5xl pb-2 font-bold bg-gradient-to-r from-teal-600 to-cyan-500 dark:from-teal-400 dark:to-cyan-300 inline-block text-transparent bg-clip-text">
              How HealthSync Works
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Designed to streamline healthcare for everyone - patients,
              hospitals, and doctors alike.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-16">
            <div className="bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-lg inline-flex">
              {userTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setUserType(type);
                  }}
                  className={`relative px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    userType === type
                      ? "text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {userType === type && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-400 dark:from-teal-600 dark:to-cyan-500 rounded-full"
                      initial={false}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content - All steps shown simultaneously */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={userType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {steps[userType].map((step, index) => (
                    <motion.div
                      key={`${userType}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        y: isVisible ? 0 : 20,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15, // Stagger the animations
                      }}
                      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                      <div className="p-6">
                        {/* Step Number Badge */}
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-lg font-semibold bg-teal-500 text-white dark:bg-teal-600 rounded-full w-8 h-8 flex items-center justify-center">
                            {index + 1}
                          </span>

                          {/* Mobile-optimized icon */}
                          <div
                            className={`${
                              isMobile ? "w-10 h-10" : "w-16 h-16"
                            } flex-shrink-0 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400`}
                          >
                            {React.cloneElement(
                              step.icon as React.ReactElement,
                              {
                                className: isMobile ? "w-6 h-6" : "w-8 h-8",
                              }
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
