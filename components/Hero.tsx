import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SymptomSearchBar from "./SymptomsSearchBar";

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="relative min-h-[600px] w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light Mode Background Elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-teal-200/30 dark:bg-teal-900/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-amber-200/30 dark:bg-amber-900/20 blur-3xl" />

        {/* New Centered Teal Glow from Bottom - Light Mode */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] 
                      bg-gradient-to-t from-teal-300/50 to-teal-200/10 
                      blur-3xl rounded-t-full 
                      dark:opacity-0"
        />

        {/* Dark Mode Version of Bottom Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] 
                      bg-gradient-to-t from-teal-800/60 to-teal-700/5
                      blur-3xl rounded-t-full opacity-0 
                      dark:opacity-100"
        />

        {/* Additional Ambient Elements */}
        <div className="absolute -bottom-32 left-1/4 w-64 h-64 rounded-full bg-emerald-200/30 dark:bg-emerald-900/20 blur-3xl" />

        {/* Subtle Light Mode Particles */}
        <div className="absolute bottom-24 left-1/4 w-4 h-4 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />
        <div className="absolute bottom-36 left-2/3 w-3 h-3 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />
        <div className="absolute bottom-48 left-1/3 w-2 h-2 rounded-full bg-teal-400/40 blur-sm dark:opacity-0" />

        {/* Subtle Dark Mode Particles */}
        <div className="absolute bottom-24 left-1/4 w-4 h-4 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />
        <div className="absolute bottom-36 left-2/3 w-3 h-3 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />
        <div className="absolute bottom-48 left-1/3 w-2 h-2 rounded-full bg-teal-600/40 blur-sm opacity-0 dark:opacity-100" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-start text-center pt-20 px-4"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto" variants={staggerChildren}>
            <motion.h2
              className="text-sm sm:text-lg font-semibold text-amber-600 dark:text-amber-300 mb-4 uppercase tracking-wider"
              variants={fadeInUp}
            >
              Seamless Healthcare Management
            </motion.h2>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6 drop-shadow-sm"
              variants={fadeInUp}
            >
              Your{" "}
              <span className="text-orange-500 dark:text-orange-400">
                Health
              </span>
              , Our{" "}
              <span className="text-teal-600 dark:text-teal-400">Priority</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 mx-auto max-w-2xl"
              variants={fadeInUp}
            >
              Bringing hospitals, doctors, and patients together on a single
              platform for better healthcare coordination.
            </motion.p>

            {/* Search & CTA Section */}
            <motion.div
              className="w-full max-w-3xl mx-auto mt-12 flex flex-col md:flex-row md:items-start justify-center gap-2"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden"
              >
                <Link href="/patient-auth">
                  <Button
                    size="lg"
                    className="h-14 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 dark:from-teal-600 dark:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started / Login
                  </Button>
                </Link>
              </motion.div>
              {/* Search Bar - hidden on small devices */}
              <div className="hidden md:block w-full max-w-md">
                <SymptomSearchBar className="" variant="hero" />
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 text-left">
                  Search for symptoms or health concerns
                </p>
              </div>
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-l-md overflow-hidden hidden md:block"
              >
                <Button
                  size="lg"
                  className="h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg  rounded-e-full rounded-tl-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Search
                </Button>
              </motion.div> */}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
