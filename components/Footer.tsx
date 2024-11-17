"use client";
import React from "react";
import Logo from "./Logo";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full  bg-blue-950 dark:bg-slate-900 text-teal-50 py-10 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-center sm:items-start">
            <Logo />
            <p className="mt-4 text-sm text-teal-100 dark:text-teal-200 text-center sm:text-left ">
              Leading the way in Medical and Healthy Life Services
            </p>
          </div>

          <div>
            <h2 className="text-teal-300 dark:text-teal-200 font-semibold mb-4">
              Important Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/discuss"
                  className="hover:text-teal-300 transition-colors"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-teal-300 transition-colors">
                  Doctors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-300 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-300 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-teal-300 dark:text-teal-200 font-semibold mb-4">
              Contact Us
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <FiPhoneCall className="text-teal-400 dark:text-teal-300 h-4 w-4 mr-2" />
                <span>11111-22222</span>
              </li>
              <li className="flex items-center">
                <MdEmail className="text-teal-400 dark:text-teal-300 h-4 w-4 mr-2" />
                <span>HealthSync@gmail.com</span>
              </li>
              {/* <li className="flex items-center">
                <GrLocation className="text-teal-400 dark:text-teal-300 h-4 w-4 mr-2" />
                <span>On your phone</span>
              </li> */}
              <li className="flex items-center text-sm ">
                <FaRegClock className="text-teal-400 dark:text-teal-300 h-4 w-4 mr-2" />
                <span>24/7 Available</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-teal-300 dark:text-teal-200 font-semibold mb-4">
              Translate Page
            </h2>
            <GoogleTranslate />
          </div>
        </div>

        <div className="border-t text-sm border-slate-700 dark:border-slate-600 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-teal-100 dark:text-teal-200 mb-4 sm:mb-0">
            © 2024 HealthSync. All rights reserved.
          </p>
          <a
            href="#"
            className="text-teal-100 dark:text-teal-200 hover:text-teal-300 hover:underline transition-colors"
          >
            Terms & Conditions
          </a>
          <a
            href="#"
            className="text-teal-100 dark:text-teal-200 hover:text-teal-300 hover:underline transition-colors"
          >
            Privacy Policy
          </a>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-teal-300 dark:text-teal-200 hover:text-teal-400 transition-colors"
            >
              <BsLinkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-teal-300 dark:text-teal-200 hover:text-teal-400 transition-colors"
            >
              <BsGithub className="h-5 w-5" />
            </a>

            <a
              href="#"
              className="text-teal-300 dark:text-teal-200 hover:text-teal-400 transition-colors"
            >
              <BsInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
    //  <></>
  );
};

export default Footer;
