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
    <div>
      <nav className="flex justify-start items-center px-5 py-2 text-xl gap-40 bg-gradient-to-br from-blue-700 to bg-teal-300 h-24 font-ubuntu-font">
        <a
          href="#"
          className="logo flex justify-between items-center gap-2 cursor-pointer"
        >
          <img src="https://via.placeholder.com/60" alt="logo" />
          <h1 className="text-3xl">HealthSync</h1>
        </a>
        <div className="nav-links flex justify-between items-center gap-12 text-slate-950">
          <a
            href="#"
            className="hover:text-orange-900 hover:scale-110 transition-transform duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-orange-900 hover:scale-110 transition-transform duration-300"
          >
            About
          </a>
          <a
            href="#"
            className="hover:text-orange-900 hover:scale-110 transition-transform duration-300"
          >
            Contact Us
          </a>
          {isLoggedIn ? (
            <>
              <a
                href="#"
                className="hover:text-orange-900 hover:scale-110 transition-transform duration-300"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="hover:text-orange-900 hover:scale-110 transition-transform duration-300"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <a
                href="#"
                className="hover:text-orange-900 hover:scale-110 transition-transform duration-300"
              >
                Login
              </a>
              <a
                href="#"
                className="hover:text-orange-900 hover:scale-110 transition-transform duration-300"
              >
                Register
              </a>
            </>
          )}
          <a
            href="#"
            className="hover:text-orange-900 hover:scale-110 transition-transform duration-300"
          >
            Complaints
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
