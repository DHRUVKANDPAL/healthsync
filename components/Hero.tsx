"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const Hero = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLoginDropdownOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLoginDropdown = () =>
    setIsLoginDropdownOpen(!isLoginDropdownOpen);

  return (
    <div className="relative h-[550px] flex items-center overflow-hidden">
      <Image
        src="https://i.imghippo.com/files/12v761724049730.jpg"
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover sm:max-h-[550px] max-h-[500px] transition-opacity duration-300"
        width={5184}
        height={3456}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-700/40 via-transparent to-slate-700/40 dark:from-slate-900/80 dark:to-transparent transition-colors duration-300"></div>
      <div className="relative z-10 text-left px-4 sm:px-6 lg:px-8 max-w-2xl ml-4 sm:ml-8 lg:ml-16">
        <p className="text-sm sm:text-base uppercase tracking-wider mb-2 sm:mb-4 text-teal-900 dark:text-teal-300 transition-colors duration-300">
          CARING FOR LIFE
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-teal-900 dark:text-teal-100 transition-colors duration-300">
          Leading Our Way in Healthy Life
        </h1>
        {isLoggedIn ? (
          <button className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-teal-50 font-bold py-4 px-6 rounded-md transition duration-300 flex items-center gap-2 group">
            Dashboard
            <IoIosArrowDown className="transform transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleLoginDropdown}
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-blue-50 font-bold py-4 px-6 rounded-md transition duration-300 flex items-center justify-between gap-2 group w-48"
            >
              <span>Login/Register</span>
              {isLoginDropdownOpen ? (
                <IoClose className="w-5 h-5" />
              ) : (
                <IoIosArrowDown
                  className={`transform transition-transform duration-300 ${
                    isLoginDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
            {isLoginDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-teal-600 dark:bg-teal-700 rounded-md shadow-lg z-50 overflow-hidden">
                <Link
                  href="/patient-auth"
                  className="block px-4 py-2 text-sm text-teal-50 hover:bg-teal-700 dark:hover:bg-teal-600 transition duration-300"
                >
                  Patient Login
                </Link>
                <Link
                  href="/hospital-auth"
                  className="block px-4 py-2 text-sm text-teal-50 hover:bg-teal-700 dark:hover:bg-teal-600 transition duration-300"
                >
                  Hospital Login
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
