import React, { useState, useEffect } from "react";
import { ChevronDown, Stethoscope, Hospital } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      id: 1,
      src: "https://i.imghippo.com/files/12v761724049730.jpg",
      alt: "Modern healthcare facility",
    },
    {
      id: 2,
      src: "https://i.imghippo.com/files/uKlNc1729324077.jpg",
      alt: "Medical professionals collaborating",
    },
    {
      id: 3,
      src: "https://i.imghippo.com/files/Rz1xY1729325434.jpg",
      alt: "Advanced medical technology",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    return () => clearInterval(slideInterval);
  }, []);

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
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Image Slider */}
      {heroImages.map((image, index) => (
        <div
          key={image.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            className="object-cover w-full h-full"
            width={1920}
            height={1080}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 dark:from-black/80 dark:via-black/70 dark:to-black/90" />
        </div>
      ))}

      {/* Content */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center text-center"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto" variants={staggerChildren}>
            <motion.h2
              className="text-sm sm:text-lg font-semibold text-amber-200 dark:text-amber-100 mb-4 uppercase tracking-wider"
              variants={fadeInUp}
            >
              Seamless Healthcare Management
            </motion.h2>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white dark:text-white mb-6 drop-shadow-2xl"
              variants={fadeInUp}
            >
              Your <span className="text-orange-400">Health</span>, Our{" "}
              <span className="text-teal-400">Priority</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-100 dark:text-gray-200 mb-8 mx-auto max-w-2xl"
              variants={fadeInUp}
            >
              Bringing hospitals, doctors, and patients together on a single
              platform for better healthcare coordination.
            </motion.p>

            <motion.div
              className="flex flex-col items-center gap-4"
              variants={fadeInUp}
            >
              {isLoggedIn ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Go to Dashboard
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/patient-auth">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 dark:from-teal-800 dark:to-teal-700 dark:hover:from-teal-900 dark:hover:to-teal-800 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Patient Login
                      </Button>
                    </Link>
                  </motion.div>

                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-2 bg-emerald-300/10 border-emerald-300 dark:border-emerald-400 text-emerald-300 dark:text-emerald-400 hover:bg-emerald-300/20 dark:hover:bg-emerald-400/10 text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-300"
                        >
                          Professional Login
                          <ChevronDown className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-emerald-300 dark:border-emerald-400 "
                    >
                      <DropdownMenuItem className="hover:bg-emerald-800 dark:hover:bg-emerald-900/30">
                        <Link
                          href="/doctor-auth"
                          className="flex items-center w-full text-emerald-800 dark:text-emerald-300"
                        >
                          <Stethoscope className="mr-2 h-4 w-4" />
                          <span>Doctor Login</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-emerald-800 dark:hover:bg-emerald-900/30">
                        <Link
                          href="/hospital-auth"
                          className="flex items-center w-full text-emerald-800 dark:text-emerald-300"
                        >
                          <Hospital className="mr-2 h-4 w-4" />
                          <span>Hospital Login</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
