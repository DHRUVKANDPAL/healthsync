"use client";
import React from "react";
import { useState } from "react";
import { Button } from "react-day-picker";
import { IoIosArrowForward } from "react-icons/io";

type Props = {};

const Hero = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="relative h-[550px] flex items-center overflow-hidden">
      <img
        src="https://res-console.cloudinary.com/djhehoyxl/media_explorer_thumbnails/d0c197dc3fc4e75c0e92f06182561233/detailed"
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover max-h-[550px]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-transparent"></div>
      <div className="relative z-10 text-left px-4 sm:px-6 lg:px-8 max-w-2xl ml-4 sm:ml-8 lg:ml-16">
        <p className="text-sm sm:text-base uppercase tracking-wider mb-2 sm:mb-4 text-teal-800">
          CARING FOR LIFE
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-teal-900">
          Leading Our Way in Healthy Life
        </h1>
        {isLoggedIn ? (
          <button className="bg-teal-600 hover:bg-teal-700 text-teal-50 font-bold py-4 px-6 rounded-md transition duration-300 flex items-center gap-2 group">
            Dashboard
            <IoIosArrowForward className="transform transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        ) : (
          <button className="bg-teal-600 hover:bg-teal-700 text-teal-50 font-bold py-4 px-6 rounded-md transition duration-300 flex items-center gap-2 group">
            Login/Register
            <IoIosArrowForward className="transform transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
