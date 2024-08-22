"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import Logo from "./Logo";

type Props = {};

const Header = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [showLogo, setShowLogo] = useState(true);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleSearch = () => {
    if (window.innerWidth < 640) {
      setIsSearchOpen(!isSearchOpen);
    }
  };
  const toggleLoginDropdown = () =>
    setIsLoginDropdownOpen(!isLoginDropdownOpen);

  useEffect(() => {
    if (!isSearchOpen) {
      const timer = setTimeout(() => {
        setShowLogo(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowLogo(false);
    }
  }, [isSearchOpen]);
  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 640);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        closeMenu();
      }
      if (
        searchRef.current &&
        event.target instanceof Node &&
        !searchRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
      if (isLoginDropdownOpen && event.target instanceof Element) {
        const clickedElement = event.target as Element;
        if (!clickedElement.closest(".login-dropdown")) {
          setIsLoginDropdownOpen(false);
        }
      }
    };

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoginDropdownOpen, closeMenu]);
  useEffect(() => {
    const fetchLocation = async ({
      latitude,
      longitude,
    }: {
      latitude: any;
      longitude: any;
    }) => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=35479a4fe2f641d9a9f24251f17c2bb8`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const city =
            data.results[0].components.city ||
            data.results[0].components.town ||
            data.results[0].components.village;
          setLocation(city || "Location not found");
        } else {
          setLocation("Location not found");
        }
      } catch (error) {
        setLocation("Error fetching location");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocation({ latitude, longitude });
        },
        (error) => {
          setLocation("Error getting location");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <>
      <header className="sticky sm:-top-[72px] top-0 z-30">
        <section className="sm:flex hidden flex-col sm:flex-row sm:justify-around sm:items-center py-4 bg-white">
          <Logo></Logo>
          <ul className="flex justify-around items-center gap-2 sm:gap-10 mt-2 sm:mt-0 sm:ml-6 w-full sm:w-auto sm:text-sm text-xs ">
            <li className="flex items-center justify-center gap-1 sm:gap-4">
              <FiPhoneCall className="text-teal-500 h-4 w-4 sm:h-6 sm:w-6" />
              <div className="text-center sm:text-left">
                <p className="text-teal-700">Emergency</p>
                <p className="text-teal-500">11111-22222</p>
              </div>
            </li>
            <li className="flex items-center justify-center gap-1 sm:gap-4">
              <FaRegClock className="text-teal-500 h-4 w-4 sm:h-6 sm:w-6" />
              <div className="text-center sm:text-left">
                <p className="text-teal-700">Work Hour</p>
                <p className="text-teal-500">24x7</p>
              </div>
            </li>
            <li className="sm:flex  hidden items-center justify-center gap-1 sm:gap-4">
              <GrLocation className="text-teal-500 h-5 w-5 sm:h-7 sm:w-7" />
              <div className="text-center sm:text-left">
                <p className="text-teal-700">Location</p>
                <p className="text-teal-500">
                  {location ? location : "Fetching location..."}
                </p>
              </div>
            </li>
          </ul>
        </section>
        <nav className=" bg-blue-900 text-teal-50 flex flex-col sm:flex-row justify-around items-center h-auto sm:h-16 py-4 sm:py-0 px-6 ">
          <div className="flex justify-between items-center w-full sm:w-auto">
            <button
              onClick={toggleMenu}
              className="sm:hidden focus:outline-none"
            >
              <IoMenu className="text-teal-50 h-8 w-8" />
            </button>
            {!isSearchOpen && showLogo && <Logo className="sm:hidden" />}
            <div
              ref={searchRef}
              className="search flex items-center ml-4 sm:ml-0"
            >
              {isSmallScreen ? (
                <>
                  <button
                    onClick={toggleSearch}
                    className="focus:outline-none mr-2"
                  >
                    <CiSearch className="text-teal-50 h-6 w-6" />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isSearchOpen ? "w-48" : "w-0"
                    }`}
                  >
                    <input
                      type="search"
                      className="bg-blue-800 text-teal-50 rounded-md px-2 py-1 m-1 outline-none focus:ring-2 focus:ring-teal-500 w-44 sm:w-64"
                      placeholder="Search..."
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center">
                  <label htmlFor="search" className="mr-2">
                    <CiSearch className="text-teal-50 h-6 w-6" />
                  </label>
                  <input
                    type="search"
                    className="bg-blue-800 text-teal-50 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500 w-44 m-1 sm:w-56 md:w-64"
                    placeholder="Search..."
                  />
                </div>
              )}
            </div>
          </div>
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full w-64 text-lg sm:text-sm md:text-lg bg-blue-900 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } sm:relative sm:transform-none sm:w-auto sm:bg-transparent sm:h-auto z-50`}
          >
            <ul className="nav-links flex flex-col sm:flex-row justify-center sm:justify-between gap-4 sm:gap-8 w-full sm:w-auto mt-16 sm:mt-0 p-6 sm:p-0 leading-[1rem] ">
              <li className="flex absolute top-8 items-center justify-center gap-1 sm:gap-4 sm:hidden">
                <GrLocation className="text-teal-500 h-7 w-7 sm:h-7 sm:w-7" />
                <div className="text-center sm:text-left">
                  <p className="text-teal-500 pb-2">Location</p>
                  <p className="text-teal-300">
                    {location ? location : "Fetching location..."}
                  </p>
                </div>
              </li>
              <Link href="/." className="hover:underline" onClick={closeMenu}>
                Home
              </Link>
              <a
                href="#"
                className="hover:underline sm:text-center"
                onClick={closeMenu}
              >
                Contact Us
              </a>
              <a href="#" className="hover:underline" onClick={closeMenu}>
                Complaints
              </a>
              {isLoggedIn ? (
                <>
                  <a href="#" className="hover:underline" onClick={closeMenu}>
                    Dashboard
                  </a>
                  <a href="#" className="hover:underline" onClick={closeMenu}>
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div
                      className="relative login-dropdown"
                      onMouseEnter={() => {
                        setIsLoginDropdownOpen(true);
                      }}
                      onClick={
                        () => setIsLoginDropdownOpen(true)
                        // e.preventDefault();
                      }
                    >
                      <div
                        className="hover:underline flex justify-center items-center "
                        onClick={() => toggleLoginDropdown()}
                      >
                        <p className="text-left w-full ">
                          Login
                          <IoIosArrowDown
                            className={`transform inline transition-transform duration-300 ${
                              isLoginDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </p>
                      </div>
                      {isLoginDropdownOpen && (
                        <div
                          className="absolute top-6 left-0 mt-2 bg-blue-800 rounded-md shadow-lg z-50 text-nowrap overflow-hidden"
                          onMouseLeave={() => {
                            setIsLoginDropdownOpen(false);
                          }}
                        >
                          <Link
                            href="/patient-auth"
                            className="block px-4 py-2 text-sm text-white hover:bg-blue-700"
                            onClick={() => {
                              closeMenu();
                            }}
                          >
                            Patient Login
                          </Link>
                          <Link
                            href="/hospital-auth"
                            className="block px-4 py-2 text-sm text-white hover:bg-blue-700"
                            onClick={() => {
                              closeMenu();
                            }}
                          >
                            Hospital Login
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <a href="#" className="hover:underline" onClick={closeMenu}>
                    Register
                  </a> */}
                </>
              )}
            </ul>
            <div
              className="h-full flex items-center flex-col justify-end pb-60"
              onClick={() => {
                closeMenu();
              }}
            >
              <Logo className="flex-grow sm:hidden flex items-end justify-center"></Logo>
              <p className=" text-teal-100 mb-4 sm:hidden text-sm flex text-center justify-center ">
                © 2024 HealthSync. All rights reserved.
              </p>
            </div>
          </div>
        </nav>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>
        )}
      </header>
    </>
  );
};

export default Header;
