import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Bell,
  QrCode,
  Bed,
  ClipboardList,
  Search,
  PillIcon,
  ArrowRight,
} from "lucide-react";
import { AnimatedListDemo } from "./magicui/animatedListDemo";
import HospitalCard from "./magicui/HospitalCardDemo";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const features = [
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description:
        "Receive personalized health alerts based on your appointments, medication schedule, and wellness goals. Our AI-driven system prioritizes what matters most to you.",
      gradient: "from-violet-600 to-indigo-600",
      textColor: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      image: "imageFeatureSearchDoctors.png",
      component: (
        <AnimatedListDemo className=" h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_50%)] group-hover:scale-90" />
      ),
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "Virtual Queue System",
      description:
        "Skip the physical waiting room. Scan, queue up virtually, and get real-time updates on your position. Arrive just when the doctor is ready to see you.",
      gradient: "from-blue-600 to-sky-500",
      textColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800",
      image: "imageFeatureSearchDoctors.png",
    },
    {
      icon: <Bed className="w-6 h-6" />,
      title: "Smart Bed Allocation",
      description:
        "Our predictive algorithm optimizes bed availability across departments. Reserve your space in advance with real-time visibility on amenities and care options.",
      gradient: "from-emerald-600 to-teal-500",
      textColor: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      image: "imageFeatureSearchDoctors.png",
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: "Interactive Health Timeline",
      description:
        "Visualize your complete medical journey on an interactive timeline. Track conditions, treatments, and recovery progress with detailed visual analytics.",
      gradient: "from-orange-600 to-amber-500",
      textColor: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      borderColor: "border-orange-200 dark:border-orange-800",
      image: "imageFeatureSearchDoctors.png",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Care Facility Finder",
      description:
        "Find the perfect hospital or clinic using our advanced filtering system. Compare by specialist availability, equipment, patient reviews, and insurance coverage.",
      gradient: "from-rose-600 to-pink-500",
      textColor: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-100 dark:bg-rose-900/30",
      borderColor: "border-rose-200 dark:border-rose-800",
      image: "imageFeatureSearchDoctors.png",
      component: (
        <div className=" h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_50%)] group-hover:scale-90">
          <HospitalCard />
        </div>
      ),
    },
    {
      icon: <PillIcon className="w-6 h-6" />,
      title: "Medication Management",
      description:
        "Track medications, receive dosage reminders, and get low-supply alerts. We'll even suggest the nearest pharmacy with your prescriptions in stock.",
      gradient: "from-fuchsia-600 to-purple-600",
      textColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      borderColor: "border-purple-200 dark:border-purple-800",
      image: "imageFeatureSearchDoctors.png",
    },
  ];

  useEffect(() => {
    let interval: any;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveFeature((current) => (current + 1) % features.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, features.length]);

  const handleFeatureClick = (index: any) => {
    setActiveFeature(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24  relative bg-transparent">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 dark:bg-blue-900/40 rounded-full opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-64 h-64 bg-purple-200 dark:bg-purple-900/40 rounded-full opacity-20"
          animate={{
            x: [0, -120, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/3 w-52 h-52 bg-emerald-200 dark:bg-emerald-900/40 rounded-full opacity-20"
          animate={{
            x: [0, 80, 0],
            y: [0, -70, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16 relative">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 pb-2 inline-block">
            Healthcare Reimagined
          </h2>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-slate-300 mx-auto">
            Discover how our innovative{" "}
            <span className="text-blue-600 dark:text-teal-400 font-semibold">
              features
            </span>{" "}
            transform patient experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-5 space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  p-4 rounded-xl cursor-pointer transition-all duration-300 border-2
                  ${
                    activeFeature === index
                      ? `${feature.borderColor} shadow-lg shadow-${feature.textColor}/10 bg-white dark:bg-slate-800`
                      : "border-transparent hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                  }
                `}
                onClick={() => handleFeatureClick(index)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${feature.gradient} text-white`}
                  >
                    <motion.div
                      animate={{
                        rotate:
                          activeFeature === index ? [0, 15, 0, -15, 0] : 0,
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: activeFeature === index ? Infinity : 0,
                        repeatDelay: 3,
                      }}
                      className="text-xl"
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <AnimatePresence>
                      {activeFeature === index && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 text-sm text-slate-600 dark:text-slate-400"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-7 relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] hidden lg:block">
            <div className="sticky top-8 w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
                >
                  <div
                    className={`h-full bg-gradient-to-br ${features[activeFeature].gradient} relative p-8 flex flex-col items-center justify-center`}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 50,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -top-32 -right-32 w-96 h-96  bg-white opacity-10 rounded-[4rem]"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 50,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -bottom-32 -left-32 w-64 h-64 bg-white opacity-10 rounded-3xl"
                      />
                    </div>

                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-lg border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.3)]"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          animate={{
                            rotate: [0, 10, 0, -10, 0],
                            scale: [1, 1.1, 1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                          className="text-4xl text-white"
                        >
                          {features[activeFeature].icon}
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white">
                          {features[activeFeature].title}
                        </h3>
                      </div>

                      {features[activeFeature].component || null}

                      <p className="text-lg text-white/90 leading-relaxed mb-8">
                        {features[activeFeature].description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => handleFeatureClick(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  activeFeature === index
                    ? `${feature.bgColor} scale-125`
                    : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                }
              `}
              aria-label={`View feature ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
