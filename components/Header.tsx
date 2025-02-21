"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { Menu, X, Search } from "lucide-react";
import {
  Phone,
  Clock,
  Mail,
  MapPin,
  Award,
  Ambulance,
  Heart,
} from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import GoogleTranslate from "./GoogleTranslate";
import SearchResults from "./SearchResults";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SymptomSearchBar from "./SymptomsSearchBar";

type Props = {
  onSearchStateChange?: (isSearching: boolean) => void;
  input?: string | "";
  lat?: number | 23.0225;
  long?: number | 78.4888;
};

const Header = ({ onSearchStateChange, input, lat, long }: Props) => {
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
  const [searchQuery, setSearchQuery] = useState(input);
  const [showResults, setShowResults] = useState(false);
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(long);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("Getting location...");
  const [watchId, setWatchId] = useState<number | null>(null);
  const router = useRouter();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSearch = () => {
    if (window.innerWidth < 768) {
      setIsSearchOpen(!isSearchOpen);
    }
  };

  const toggleLoginDropdown = () => {
    if (isSmallScreen) {
      setActiveSubmenu(activeSubmenu === "login" ? null : "login");
    } else {
      setIsLoginDropdownOpen(!isLoginDropdownOpen);
    }
  };

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
    const handleResize = () => {
      const smallScreen = window.innerWidth < 768;
      setIsSmallScreen(smallScreen);
      if (!smallScreen && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLoginDropdownOpen]);

  const fetchLocation = async ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.display_name) {
        setLocation(data.display_name.split(",")[0]);
      } else {
        setLocation("Location name not found");
      }
    } catch (error: any) {
      console.error("Error fetching location:", error);
      setLocation(`Error fetching location: ${error.message}`);
    }
  };

  useEffect(() => {
    let currentWatchId: number | null = null;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setAccuracy(accuracy);

          setStatus(
            `Location found (accuracy: ±${accuracy.toFixed(2)} meters)`
          );
          fetchLocation({ latitude, longitude });
          console.log(latitude, longitude, accuracy);
          setStatus("Refining location...");
          currentWatchId = navigator.geolocation.watchPosition(
            (newPosition) => {
              const {
                latitude: newLat,
                longitude: newLng,
                accuracy: newAccuracy,
              } = newPosition.coords;

              if (!accuracy || newAccuracy < accuracy) {
                setLatitude(newLat);
                setLongitude(newLng);
                setAccuracy(newAccuracy);
                setStatus(
                  `Location updated (accuracy: ±${newAccuracy.toFixed(
                    2
                  )} meters)`
                );
                console.log(latitude, longitude, accuracy);
                fetchLocation({ latitude: newLat, longitude: newLng });
              }
              if (newAccuracy <= 100) {
                navigator.geolocation.clearWatch(currentWatchId!);
                setStatus(
                  `Final location (accuracy: ±${newAccuracy.toFixed(2)} meters)`
                );
              }
            },
            (error) => {
              console.error("watchPosition error:", error);
              setStatus(`Error refining location: ${error.message}`);
              if (currentWatchId !== null) {
                navigator.geolocation.clearWatch(currentWatchId);
              }
            },
            {
              enableHighAccuracy: true,
              maximumAge: 2000,
              timeout: 45000,
            }
          );
          setWatchId(currentWatchId);
        },
        (error) => {
          console.error("getCurrentPosition error:", error);
          setStatus(`Error getting location: ${error.message}`);
          currentWatchId = navigator.geolocation.watchPosition(
            (newPosition) => {
              const {
                latitude: newLat,
                longitude: newLng,
                accuracy: newAccuracy,
              } = newPosition.coords;

              if (!accuracy || newAccuracy < accuracy) {
                setLatitude(newLat);
                setLongitude(newLng);
                setAccuracy(newAccuracy);
                setStatus(
                  `Location updated (accuracy: ±${newAccuracy.toFixed(
                    2
                  )} meters)`
                );
                fetchLocation({ latitude: newLat, longitude: newLng });
              }
              if (newAccuracy <= 10) {
                navigator.geolocation.clearWatch(currentWatchId!);
                setStatus(
                  `Final location (accuracy: ±${newAccuracy.toFixed(2)} meters)`
                );
              }
            },
            (error) => {
              console.error("watchPosition error:", error);
              setStatus(`Error refining location: ${error.message}`);
              if (currentWatchId !== null) {
                navigator.geolocation.clearWatch(currentWatchId);
              }
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              timeout: 20000,
            }
          );
          setWatchId(currentWatchId);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 2000,
          timeout: 10000,
        }
      );
    } else {
      setStatus("Geolocation not supported");
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [searchQuery]);

  const handleStopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setStatus("Location tracking stopped.");
      setWatchId(null);
    }
  };

  useEffect(() => {
    if (onSearchStateChange) {
      onSearchStateChange(showResults && !!searchQuery);
    }
  }, [showResults, searchQuery, onSearchStateChange]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/search?searchQuery=${encodeURIComponent(
        searchQuery!!
      )}&latitude=${latitude}&longitude=${longitude}`
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) {
      setShowResults(false);
    }
  };

  return (
    <>
      <header className="sticky md:-top-[72px] top-0 z-30">
        {/* Top info section for desktop */}
        <section className="md:flex md:relative hidden flex-col md:flex-row md:justify-around md:items-center py-4 bg-white dark:bg-slate-800 transition-colors duration-300">
          <Logo></Logo>

          <ul className="flex justify-around items-center gap-2 md:gap-20 mt-2 md:mt-0 md:ml-6 w-full md:w-auto md:text-sm text-xs">
            <li className="hidden lg:flex items-center justify-center gap-1 md:gap-4">
              <Phone className="text-teal-500 dark:text-teal-400 h-4 w-4 md:h-6 md:w-6" />
              <div className="text-center md:text-left">
                <p className="text-teal-700 dark:text-teal-300">Emergency</p>
                <p className="text-teal-500 dark:text-teal-400">11111-22222</p>
              </div>
            </li>
            {/* 
            <li className="flex items-center justify-center gap-1 md:gap-4">
              <Ambulance className="text-teal-500 dark:text-teal-400 h-4 w-4 md:h-6 md:w-6" />
              <div className="text-center md:text-left">
                <p className="text-teal-700 dark:text-teal-300">Ambulance</p>
                <p className="text-teal-500 dark:text-teal-400">22222-33333</p>
              </div>
            </li> */}

            <li className="items-center justify-center gap-1 md:gap-4 lg:flex hidden">
              <Clock className="text-teal-500 dark:text-teal-400 h-4 w-4 md:h-6 md:w-6" />
              <div className="text-center md:text-left">
                <p className="text-teal-700 dark:text-teal-300">Work Hour</p>
                <p className="text-teal-500 dark:text-teal-400">24x7</p>
              </div>
            </li>

            {/* <li className="flex items-center justify-center gap-1 md:gap-4">
              <Mail className="text-teal-500 dark:text-teal-400 h-4 w-4 md:h-6 md:w-6" />
              <div className="text-center md:text-left">
                <p className="text-teal-700 dark:text-teal-300">Email Us</p>
                <p className="text-teal-500 dark:text-teal-400">
                  care@healthcare.com
                </p>
              </div>
            </li> */}

            <li className="md:flex hidden items-center justify-center gap-1 md:gap-4">
              <MapPin className="text-teal-500 dark:text-teal-400 h-5 w-5 md:h-7 md:w-7" />
              <div className="text-center md:text-left">
                <p className="text-teal-700 dark:text-teal-300">Location</p>
                <p className="text-teal-500 dark:text-teal-400">
                  {location ? location : "Fetching location..."}
                </p>
              </div>
            </li>

            <li>
              <div className="fixed top-5 right-5 z-[100]">
                <DarkModeToggle />
              </div>
            </li>
          </ul>
        </section>

        {/* Main navigation */}
        <nav className="text-teal-950 dark:text-teal-50 flex flex-col md:flex-row justify-around items-center h-auto md:h-16 py-4 md:py-0 px-3 sm:px-6 transition-colors duration-300 z-[1000]">
          <div className="md:bg-transparent backdrop-blur-2xl md:backdrop-blur-none flex justify-between items-center w-full md:w-auto md:hidden rounded-full sm:px-4 gap-2">
            {/* Mobile menu trigger using shadcn/ui Sheet */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden focus:outline-none z-50"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  <IoMenu className="text-teal-800 dark:text-teal-200 h-8 w-8" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 bg-blue-50 dark:bg-slate-900 p-0 flex flex-col "
              >
                <SheetHeader className="px-6 pt-6 pb-2 flex justify-start items-center">
                  <Logo className="" />
                  <div className="absolute right-4 top-4">
                    <DarkModeToggle />
                  </div>
                </SheetHeader>

                {/* Location display for mobile */}
                <div className="px-6 flex flex-col justify-start items-start w-full gap-2 bg-blue-50 dark:bg-slate-900">
                  <p className="text-teal-800 dark:text-teal-300 text-sm font-medium flex items-center gap-1">
                    <GrLocation className="text-teal-800 dark:text-teal-300 h-5 w-5 flex-shrink-0" />
                    <span>Location:</span>
                  </p>
                  <span className="text-teal-600 dark:text-teal-400 font-light text-xs">
                    {location ?? "Fetching location..."}
                  </span>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>

                {/* Navigation links */}
                <div className="flex-grow overflow-y-auto">
                  <ul className="nav-links bg-blue-50 dark:bg-slate-900 flex flex-col justify-start w-full px-6 text-md">
                    <SheetClose asChild>
                      <Link
                        href="/."
                        className="hover:text-teal-600 dark:hover:text-teal-400 px-2 py-2 border-b border-teal-100 dark:border-slate-800"
                      >
                        Home
                      </Link>
                    </SheetClose>

                    {isLoggedIn ? (
                      <>
                        <SheetClose asChild>
                          <Link
                            href="#"
                            className="hover:text-teal-600 dark:hover:text-teal-400 px-2 py-2 border-b border-teal-100 dark:border-slate-800"
                          >
                            Dashboard
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="#"
                            className="hover:text-teal-600 dark:hover:text-teal-400 px-2 py-2"
                          >
                            Logout
                          </Link>
                        </SheetClose>
                      </>
                    ) : (
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full border-none"
                      >
                        <AccordionItem
                          value="login"
                          className="border-b border-teal-100 dark:border-slate-800"
                        >
                          <AccordionTrigger className="hover:text-teal-600 dark:hover:text-teal-400 px-2 py-2 no-underline">
                            Login
                          </AccordionTrigger>
                          <AccordionContent className="bg-teal-100 dark:bg-slate-800 rounded-xl">
                            <SheetClose asChild>
                              <Link
                                href="/patient-auth"
                                className="block px-6 py-2 text-teal-950 dark:text-teal-50 hover:bg-teal-100 dark:hover:bg-slate-700"
                              >
                                Patient Login
                              </Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link
                                href="/doctor-auth"
                                className="block px-6 py-2 text-teal-950 dark:text-teal-50 hover:bg-teal-100 dark:hover:bg-slate-700"
                              >
                                Doctor Login
                              </Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link
                                href="/hospital-auth"
                                className="block px-6 py-2 text-teal-950 dark:text-teal-50 hover:bg-teal-100 dark:hover:bg-slate-700"
                              >
                                Hospital Login
                              </Link>
                            </SheetClose>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}

                    <SheetClose asChild>
                      <Link
                        href="/pricing"
                        className="hover:text-teal-600 dark:hover:text-teal-400 px-2 py-2 border-b border-teal-100 dark:border-slate-800"
                      >
                        Pricing
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/about-us"
                        className="hover:text-teal-600 dark:hover:text-teal-400 px-2 py-2 border-b border-teal-100 dark:border-slate-800"
                      >
                        About Us
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/discuss"
                        className="hover:text-teal-600 dark:hover:text-teal-400 px-2 py-2 border-b border-teal-100 dark:border-slate-800"
                      >
                        Discuss
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/contact-us"
                        className="hover:text-teal-600 dark:hover:text-teal-400 px-2 py-2 border-b border-teal-100 dark:border-slate-800"
                      >
                        Contact Us
                      </Link>
                    </SheetClose>
                  </ul>
                </div>

                {/* Mobile footer */}
                <SheetFooter className="mt-auto px-6 pb-6 pt-12 bg-blue-50 dark:bg-slate-900 w-full border-t border-teal-100 dark:border-slate-800">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">Emergency: 11111-22222</span>
                      </div>
                      <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300">
                        <Ambulance className="h-4 w-4" />
                        <span className="text-sm">Ambulance: 22222-33333</span>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>

                    <p className="text-teal-800 dark:text-teal-300 text-xs text-center">
                      © 2024 HealthSync. All rights reserved.
                    </p>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {!isSearchOpen && showLogo && <Logo className="md:hidden" />}
            <div ref={searchRef} className="search flex items-center md:ml-0">
              {isSmallScreen ? (
                <>
                  <button
                    onClick={toggleSearch}
                    className="focus:outline-none mr-2"
                    aria-label={isSearchOpen ? "Close search" : "Open search"}
                  >
                    {isSearchOpen ? (
                      <X className="text-teal-800 dark:text-teal-200 h-6 w-6" />
                    ) : (
                      <CiSearch className="text-teal-800 dark:text-teal-200 h-6 w-6" />
                    )}
                  </button>
                  <SymptomSearchBar
                    variant="header"
                    isSearchOpen={isSearchOpen}
                    onSearchSubmit={handleSearchSubmit}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    containerWidth="sm:w-64 "
                    inputClassName="bg-white w-[95%] sm:w-[90%] ring-1 dark:bg-slate-800 dark:text-teal-50"
                  />
                  {/* <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isSearchOpen ? "w-48" : "w-0"
                    }`}
                  >
                    <form onSubmit={handleSearchSubmit}>
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearchSubmit(e);
                          }
                        }}
                        className="bg-white ring-1 dark:bg-slate-800 dark:text-teal-50 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500 w-44 m-1 sm:w-56 md:w-64"
                        placeholder="Search..."
                      />
                    </form>
                  </div> */}
                </>
              ) : (
                <div className="flex items-center">
                  <label htmlFor="search" className="mr-2">
                    <CiSearch className="text-teal-50 h-6 w-6" />
                  </label>
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearchSubmit(e);
                        }
                      }}
                      className="bg-blue-800 dark:bg-slate-800 text-teal-50 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500 w-44 sm:w-56 md:w-64"
                      placeholder="Search..."
                    />
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Desktop menu content */}
          <div className="hidden md:flex md:justify-center md:items-center md:gap-52 md:p-0 md:w-full">
            <ul className="nav-links flex flex-row justify-between gap-4 lg:gap-8 w-auto mt-0 md:bg-teal-500/5 dark:md:bg-slate-600/20 md:rounded-full md:px-20 md:backdrop-blur-2xl font-semibold">
              <Link
                href="/."
                className="hover:text-teal-600 dark:hover:text-teal-400 p-2"
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className="hover:text-teal-600 dark:hover:text-teal-400 p-2"
              >
                Pricing
              </Link>
              <Link
                href="/about-us"
                className="hover:text-teal-600 dark:hover:text-teal-400 p-2"
              >
                About Us
              </Link>
              <Link
                href="/discuss"
                className="hover:text-teal-600 dark:hover:text-teal-400 p-2"
              >
                Discuss
              </Link>
              <Link
                href="/contact-us"
                className="hover:text-teal-600 dark:hover:text-teal-400 p-2"
              >
                Contact Us
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="#"
                    className="hover:text-teal-600 dark:hover:text-teal-400 p-2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-teal-600 dark:hover:text-teal-400 p-2"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className="relative login-dropdown"
                    onMouseEnter={() => setIsLoginDropdownOpen(true)}
                    onMouseLeave={() => setIsLoginDropdownOpen(false)}
                  >
                    <button
                      className="hover:text-teal-600 dark:hover:text-teal-400 p-2 flex items-center"
                      aria-expanded={isLoginDropdownOpen}
                    >
                      Login
                      <IoIosArrowDown
                        className={`transform transition-transform duration-300 ml-1 ${
                          isLoginDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isLoginDropdownOpen && (
                      <div className="absolute w-40 top-8 mt-1 bg-teal-50 dark:bg-slate-800 rounded-md shadow-lg z-50 overflow-hidden">
                        <Link
                          href="/patient-auth"
                          className="block px-4 py-2 text-sm text-teal-950 dark:text-teal-50 hover:bg-teal-200 dark:hover:bg-slate-700"
                          onClick={() => setIsLoginDropdownOpen(false)}
                        >
                          Patient Login
                        </Link>
                        <Link
                          href="/doctor-auth"
                          className="block px-4 py-2 text-sm text-teal-950 dark:text-teal-50 hover:bg-teal-200 dark:hover:bg-slate-700"
                          onClick={() => setIsLoginDropdownOpen(false)}
                        >
                          Doctor Login
                        </Link>
                        <Link
                          href="/hospital-auth"
                          className="block px-4 py-2 text-sm text-teal-950 dark:text-teal-50 hover:bg-teal-200 dark:hover:bg-slate-700"
                          onClick={() => setIsLoginDropdownOpen(false)}
                        >
                          Hospital Login
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </ul>
          </div>
        </nav>

        {/* Search results */}
        {location && showResults && searchQuery && (
          <div className="w-full bg-white dark:bg-slate-900 shadow-lg z-20">
            <SearchResults
              searchQuery={searchQuery}
              latitude={latitude!!}
              longitude={longitude!!}
            />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
