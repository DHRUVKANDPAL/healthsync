import React from "react";

type Props = {};

const Header = async (props: Props) => {
  var isLoggedIn;
  if (1) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
  <div className="container mx-auto px-4">
    <nav className="flex justify-between items-center py-4">
      <a href="#" className="flex items-center space-x-3">
        <img
          src="https://via.placeholder.com/50"
          alt="HealthSync logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-2xl font-bold">HealthSync</span>
      </a>

      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="hover:text-blue-200 transition-colors duration-300">Home</a>
        <a href="#" className="hover:text-blue-200 transition-colors duration-300">About</a>
        <a href="#" className="hover:text-blue-200 transition-colors duration-300">Services</a>
        <a href="#" className="hover:text-blue-200 transition-colors duration-300">Contact</a>
        {isLoggedIn ? (
          <>
            <a href="#" className="hover:text-blue-200 transition-colors duration-300">Dashboard</a>
            <a href="#" className="hover:text-blue-200 transition-colors duration-300">Logout</a>
          </>
        ) : (
          <>
            <a href="#" className="hover:text-blue-200 transition-colors duration-300">Login</a>
            <a href="#" className="hover:text-blue-200 transition-colors duration-300">Register</a>
          </>
        )}
      </div>

      <button className="md:hidden">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  </div>
</header>
  );
};

export default Header;
