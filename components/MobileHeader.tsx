"use client";
import React, { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiX, FiUser } from "react-icons/fi";
import {
  IoMdHome,
  IoMdPerson,
  IoMdCalendar,
  IoMdSettings,
} from "react-icons/io";
import Link from "next/link";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";

const MobileHeader: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isUserMenuOpen && !(event.target as Element).closest(".user-menu")) {
        setIsUserMenuOpen(false);
      }
      if (
        isSearchOpen &&
        !(event.target as Element).closest(".search-container")
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isUserMenuOpen, isSearchOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900 dark:bg-slate-900 text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={toggleUserMenu} className="focus:outline-none">
            <FiUser className="h-6 w-6" />
          </button>
          <Logo className="text-xl font-bold" />
          <div className="w-6" /> {/* Placeholder for symmetry */}
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="search-container absolute top-full left-0 right-0 bg-blue-800 dark:bg-slate-800 p-4 shadow-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={toggleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                <FiX className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}

        {/* User Menu */}
        {isUserMenuOpen && (
          <nav className="user-menu fixed top-0 left-0 bottom-0 w-64 bg-blue-800 dark:bg-slate-800 shadow-md overflow-y-auto z-50">
            <div className="p-4 border-b border-blue-700 dark:border-slate-700">
              <FiUser className="h-12 w-12 mx-auto mb-2" />
              <p className="text-center font-semibold">
                {isLoggedIn ? "John Doe" : "Guest User"}
              </p>
            </div>
            <ul className="py-2">
              <MenuItem
                href="/dashboard"
                icon={<IoMdHome className="h-5 w-5" />}
                text="Dashboard"
              />
              <MenuItem
                href="/profile"
                icon={<IoMdPerson className="h-5 w-5" />}
                text="Profile"
              />
              <MenuItem
                href="/appointments"
                icon={<IoMdCalendar className="h-5 w-5" />}
                text="Appointments"
              />
              <MenuItem
                href="/settings"
                icon={<IoMdSettings className="h-5 w-5" />}
                text="Settings"
              />
              <li className="px-4 py-3">
                <DarkModeToggle />
              </li>
              <li>
                <button
                  onClick={() => setIsLoggedIn(!isLoggedIn)}
                  className="w-full text-left px-4 py-3 hover:bg-blue-700 dark:hover:bg-slate-700"
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-blue-900 dark:bg-slate-900 text-white z-50">
        <ul className="flex justify-around items-center py-2">
          <NavItem
            href="/dashboard"
            icon={<IoMdHome className="h-6 w-6" />}
            text="Home"
          />
          <NavItem
            href="/profile"
            icon={<IoMdPerson className="h-6 w-6" />}
            text="Profile"
          />
          <NavItem
            href="#"
            icon={<FiSearch className="h-6 w-6" />}
            text="Search"
            onClick={toggleSearch}
          />
          <NavItem
            href="/appointments"
            icon={<IoMdCalendar className="h-6 w-6" />}
            text="Appointments"
          />
        </ul>
      </nav>
    </>
  );
};

const MenuItem: React.FC<{
  href: string;
  icon: React.ReactNode;
  text: string;
}> = ({ href, icon, text }) => (
  <li>
    <Link
      href={href}
      className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-700 dark:hover:bg-slate-700"
    >
      {icon}
      <span>{text}</span>
    </Link>
  </li>
);

const NavItem: React.FC<{
  href: string;
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}> = ({ href, icon, text, onClick }) => (
  <li>
    {onClick ? (
      <button onClick={onClick} className="flex flex-col items-center p-2">
        {icon}
        <span className="text-xs mt-1">{text}</span>
      </button>
    ) : (
      <Link href={href} className="flex flex-col items-center p-2">
        {icon}
        <span className="text-xs mt-1">{text}</span>
      </Link>
    )}
  </li>
);

export default MobileHeader;
