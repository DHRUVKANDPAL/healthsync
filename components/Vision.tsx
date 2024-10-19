//vision.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Vision = () => {
  return (
    <div className="flex justify-center items-center pb-10 ">
      <section className="bg-gradient-to-r from-blue-50 via-white to-teal-50 pt-10 sm:pt-16  lg:pb-10 overflow-hidden dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-3xl max-w-screen-2xl w-[86%] mb-10  ">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:flex lg:items-center lg:gap-12 xl:gap-20">
            <div className="lg:w-1/2 mb-12 lg:mb-0 relative z-10">
              <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 sm:mb-8 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400 dark:from-teal-300 dark:to-blue-300">
                  Revolutionizing
                </span>
                <span className="block text-blue-900 mt-2 dark:text-slate-100">
                  Healthcare
                </span>
              </h2>
              <div className="line-clamp-[15] sm:line-clamp-[18] space-y-4 sm:space-y-6 text-md sm:text-lg text-gray-700 dark:text-slate-300">
                <p>
                  At HealthSync, we envision a future where healthcare is
                  seamlessly integrated, accessible, and patient-centric. Our
                  mission is to leverage cutting-edge technology to bridge gaps
                  in healthcare delivery, ensuring quality medical services for
                  all.
                </p>
                <p>
                  We're creating a connected ecosystem where patients, doctors,
                  and providers collaborate effortlessly. By streamlining
                  processes from appointments to records, we're enhancing the
                  healthcare experience for everyone.
                </p>
                <p>
                  Our commitment goes beyond convenience. We empower individuals
                  to take charge of their health through informed decisions and
                  easy access to medical information, contributing to better
                  outcomes and a more efficient system.
                </p>
              </div>
              <div className="mt-8 sm:mt-10 lg:mt-12">
                <Link
                  href="/about-us"
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full text-white bg-gradient-to-r from-blue-600 to-teal-600 dark:text-slate-900 dark:bg-gradient-to-r dark:from-teal-400 dark:to-blue-400 hover:from-blue-700 hover:to-teal-700 dark:hover:from-teal-500 dark:hover:to-blue-500 transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore Our Approach
                  <svg
                    className="ml-2 sm:ml-3 -mr-1 h-5 w-5 sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 to-teal-300 dark:from-slate-600 dark:to-slate-700 rounded-3xl transform rotate-3 scale-105 z-0 opacity-30 dark:opacity-70"></div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl hidden lg:block">
                <Image
                  src="https://i.imghippo.com/files/GqGSf1724064367.jpg"
                  alt="Our Vision for Healthcare"
                  width={1024}
                  height={768}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-3xl">
            <div className="w-full h-full border-2 border-blue-200 rounded-full animate-pulse opacity-30 dark:border-slate-600"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vision;
