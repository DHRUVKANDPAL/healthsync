"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";

type Props = {};

const Header = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleSearch = () => {
    if (window.innerWidth < 640) {
      setIsSearchOpen(!isSearchOpen);
    }
  };

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
      const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 640);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);

      return () => window.removeEventListener("resize", checkScreenSize);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
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
        });
      } else {
        setLocation("Geolocation not supported");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header>
        <section className="flex flex-col sm:flex-row sm:justify-around sm:items-center py-4">
          <h1 className="text-3xl sm:text-4xl font-poppins-font font-semibold text-teal-500 text-center sm:text-left">
            Health<span className="text-teal-700 font-bold">Sync</span>
          </h1>
          <ul className="md:flex justify-around items-center gap-2 sm:gap-10 mt-2 sm:mt-0 sm:ml-6 w-full sm:w-auto sm:text-sm text-xs hidden ">
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
            <li className="flex items-center justify-center gap-1 sm:gap-4">
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
        <nav className="bg-blue-900 text-teal-50 flex flex-col sm:flex-row justify-around items-center h-auto sm:h-16 py-4 sm:py-0 px-6 relative z-10">
          <div className="flex justify-between items-center w-full sm:w-auto">
            <button
              onClick={toggleMenu}
              className="sm:hidden focus:outline-none"
            >
              <IoMenu className="text-teal-50 h-8 w-8" />
            </button>
            <div
              ref={searchRef}
              className="search flex items-center ml-4 sm:ml-0"
            >
              {/* Search button only visible on smaller screens */}
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
                      isSearchOpen ? "w-56" : "w-0"
                    }`}
                  >
                    <input
                      type="search"
                      className="bg-blue-800 text-teal-50 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500 w-48 sm:w-64"
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
                    className="bg-blue-800 text-teal-50 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500 w-32 sm:w-64"
                    placeholder="Search..."
                  />
                </div>
              )}
            </div>
          </div>
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full w-64 bg-blue-900 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } sm:relative sm:transform-none sm:w-auto sm:bg-transparent sm:h-auto`}
          >
            <ul className="nav-links flex flex-col sm:flex-row justify-center sm:justify-between gap-4 sm:gap-8 w-full sm:w-auto mt-16 sm:mt-0 p-4 sm:p-0">
              <a href="#" className="hover:underline" onClick={closeMenu}>
                Home
              </a>
              <a href="#" className="hover:underline" onClick={closeMenu}>
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
                  <a href="#" className="hover:underline" onClick={closeMenu}>
                    Login
                  </a>
                  <a href="#" className="hover:underline" onClick={closeMenu}>
                    Register
                  </a>
                </>
              )}
            </ul>
          </div>
        </nav>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-0"
            onClick={closeMenu}
          ></div>
        )}
      </header>
    </>
  );
};

export default Header;
