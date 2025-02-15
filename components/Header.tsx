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
import DarkModeToggle from "./DarkModeToggle";
import GoogleTranslate from "./GoogleTranslate";
import SearchResults from "./SearchResults";

type Props = {
  onSearchStateChange?: (isSearching: boolean) => void;
};

const Header = ({ onSearchStateChange }: Props) => {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  // let latitude = 19.0760;
  // let longitude = 72.8777;
  const[latitude, setLatitude] = useState(19.0760);
  const[longitude, setLongitude] = useState(72.8777);
  const [accuracy, setAccuracy] = useState<number | null>(null); // Store accuracy
  const [status, setStatus] = useState<string>("Getting location..."); // Status message
  const [watchId, setWatchId] = useState<number | null>(null);
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
        throw new Error(`HTTP error! Status: ${response.status}`); // More robust error checking
      }

      const data = await response.json();

      // Check if the response has the expected data before accessing it
      if (data && data.display_name) {
        setLocation(data.display_name.split(",")[0]);
      } else {
        setLocation("Location name not found");
      }
    } catch (error: any) {
      //added type any since we dont know what type of error
      console.error("Error fetching location:", error);
      setLocation(`Error fetching location: ${error.message}`);
    }
  };

  useEffect(() => {
    let currentWatchId: number | null = null; // Store watchId in a local variable

    if ("geolocation" in navigator) {
      // 1. Try to get an initial, potentially cached, position
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
          console.log(latitude, longitude, status);
          // 2. Start watching for position changes
          setStatus("Refining location...");
          currentWatchId = navigator.geolocation.watchPosition(
            // Store the watchId
            (newPosition) => {
              const {
                latitude: newLat,
                longitude: newLng,
                accuracy: newAccuracy,
              } = newPosition.coords;

              // Update if more accurate or if no previous position
              if (!accuracy || newAccuracy < accuracy) {
                setLatitude(newLat);
                setLongitude(newLng);
                setAccuracy(newAccuracy);
                setStatus(
                  `Location updated (accuracy: ±${newAccuracy.toFixed(
                    2
                  )} meters)`
                );
                console.log(latitude, longitude, status);
                fetchLocation({ latitude: newLat, longitude: newLng });
              }
              // Stop watching when sufficient accuracy is achieved
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
              maximumAge: 0,
              timeout: 20000,
            }
          );
          setWatchId(currentWatchId); //store the watchId
        },
        (error) => {
          console.error("getCurrentPosition error:", error);
          setStatus(`Error getting location: ${error.message}`);
          // Start watchPosition if the initial getCurrentPosition fails
          currentWatchId = navigator.geolocation.watchPosition(
            // Store the watchId
            (newPosition) => {
              const {
                latitude: newLat,
                longitude: newLng,
                accuracy: newAccuracy,
              } = newPosition.coords;

              // Update if more accurate or if no previous position
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
              // Stop watching when sufficient accuracy is achieved
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
          maximumAge: 3000,
          timeout: 6000,
        }
      );
    } else {
      setStatus("Geolocation not supported");
    }

    // Cleanup function to stop watching when the component unmounts
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

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
    setShowResults(!!searchQuery);
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
      <header className="sticky sm:-top-[72px] top-0 z-30">
        <section className="sm:flex sm:relative hidden flex-col sm:flex-row sm:justify-around sm:items-center py-4 bg-white dark:bg-slate-800 transition-colors duration-300">
          <Logo></Logo>
          <ul className="flex justify-around items-center gap-2 sm:gap-10 mt-2 sm:mt-0 sm:ml-6 w-full sm:w-auto sm:text-sm text-xs">
            <li className="flex items-center justify-center gap-1 sm:gap-4">
              <FiPhoneCall className="text-teal-500 dark:text-teal-400 h-4 w-4 sm:h-6 sm:w-6" />
              <div className="text-center sm:text-left">
                <p className="text-teal-700 dark:text-teal-300">Emergency</p>
                <p className="text-teal-500 dark:text-teal-400">11111-22222</p>
              </div>
            </li>
            <li className="flex items-center justify-center gap-1 sm:gap-4">
              <FaRegClock className="text-teal-500 dark:text-teal-400 h-4 w-4 sm:h-6 sm:w-6" />
              <div className="text-center sm:text-left">
                <p className="text-teal-700 dark:text-teal-300">Work Hour</p>
                <p className="text-teal-500 dark:text-teal-400">24x7</p>
              </div>
            </li>
            <li className="sm:flex hidden items-center justify-center gap-1 sm:gap-4">
              <GrLocation className="text-teal-500 dark:text-teal-400 h-5 w-5 sm:h-7 sm:w-7" />
              <div className="text-center sm:text-left">
                <p className="text-teal-700 dark:text-teal-300">Location</p>
                <p className="text-teal-500 dark:text-teal-400">
                  {location ? location : "Fetching location..."}
                </p>
              </div>
            </li>
            <li>
              <div className="fixed top-5 right-5 z-20">
                <DarkModeToggle />
              </div>
            </li>
          </ul>
        </section>
        <nav className="bg-blue-900 dark:bg-slate-900 text-teal-50 flex flex-col sm:flex-row justify-around items-center h-auto sm:h-16 py-4 sm:py-0 px-6 transition-colors duration-300">
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
                        className="bg-blue-800 dark:bg-slate-800 text-teal-50 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500 w-44 m-1 sm:w-56 md:w-64"
                        placeholder="Search..."
                      />
                    </form>
                  </div>
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
                      className="bg-blue-800 dark:bg-slate-800 text-teal-50 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500 w-44 m-1 sm:w-56 md:w-64"
                      placeholder="Search..."
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full w-64 text-lg sm:text-sm lg:text-lg bg-blue-950 dark:bg-slate-900 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } sm:relative sm:transform-none sm:w-auto sm:bg-transparent sm:h-auto z-50`}
          >
            <div className="absolute right-4 top-4 sm:hidden">
              <DarkModeToggle />
            </div>
            <ul className="nav-links flex flex-col sm:flex-row justify-start sm:justify-between gap-3 sm:gap-8 w-full sm:w-auto mt-20 sm:mt-0 p-6  sm:p-0">
              <li className="flex absolute top-8 left-6 items-center justify-between w-5/6 gap-4  sm:hidden">
                <GrLocation className="text-teal-300 h-6 w-6" />
                <div className="text-left flex-grow">
                  <p className="text-teal-300  text-md">Location</p>
                  <p className="text-teal-100 font-light text-sm mt-1">
                    {location ? location : "Fetching location..."}
                  </p>
                </div>
              </li>
              <div className="h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent my-2 sm:hidden"></div>

              <Link
                href="/."
                className="hover:text-teal-300 md:p-2"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className="hover:text-teal-300 md:p-2"
                onClick={closeMenu}
              >
                About Us
              </Link>
              <Link
                href="/discuss"
                className="hover:text-teal-300 md:p-2"
                onClick={closeMenu}
              >
                Discuss
              </Link>
              <Link
                href="/contact-us"
                className="hover:text-teal-300 md:p-2"
                onClick={closeMenu}
              >
                Contact Us
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="#"
                    className="hover:text-teal-300"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-teal-300"
                    onClick={closeMenu}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className="relative"
                    onMouseLeave={() => setIsLoginDropdownOpen(false)}
                  >
                    <div
                      className="relative login-dropdown"
                      onMouseEnter={() => {
                        if (!isSmallScreen) setIsLoginDropdownOpen(true);
                      }}
                      onMouseLeave={() => {
                        setIsLoginDropdownOpen(false);
                      }}
                      onClick={() => toggleLoginDropdown()}
                    >
                      <div
                        className="hover:text-teal-300 flex justify-center items-center"
                        onClick={() => toggleLoginDropdown()}
                      >
                        <div className="flex justify-between items-center md:p-2 w-full">
                          Login
                          <IoIosArrowDown
                            className={`transform inline transition-transform duration-300 ${
                              isLoginDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>
                      {isLoginDropdownOpen && (
                        <div
                          className="absolute w-full sm:w-40 top-6 left-0 mt-4 bg-blue-800 dark:bg-slate-800 rounded-md shadow-lg z-50 text-nowrap overflow-hidden"
                          // onMouseLeave={() => {
                          //   setIsLoginDropdownOpen(false);
                          // }}
                        >
                          <Link
                            href="/patient-auth"
                            className="block px-4 py-2 text-sm text-teal-50 hover:bg-blue-600 dark:hover:bg-slate-700"
                            onClick={() => {
                              closeMenu();
                            }}
                          >
                            Patient Login
                          </Link>
                          <Link
                            href="/doctor-auth"
                            className="block px-4 py-2 text-sm text-teal-50 hover:bg-blue-600 dark:hover:bg-slate-700"
                            onClick={() => {
                              closeMenu();
                            }}
                          >
                            Doctor Login
                          </Link>
                          <Link
                            href="/hospital-auth"
                            className="block px-4 py-2 text-sm text-teal-50 hover:bg-blue-600 dark:hover:bg-slate-700"
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
                </>
              )}
            </ul>
            <div
              className="h-full flex items-center flex-col justify-end pb-[21rem] sm:hidden "
              onClick={() => {
                closeMenu();
              }}
            >
              <Logo className="flex-grow sm:hidden flex items-end justify-center"></Logo>
              <p className="text-teal-100 sm:hidden text-sm flex text-center justify-center">
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
        {showResults && searchQuery && (
          <div className="w-full bg-white dark:bg-slate-900 shadow-lg z-20">
            <SearchResults searchQuery={searchQuery} latitude={latitude} longitude={longitude}/>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
