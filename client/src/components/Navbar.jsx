import React from "react";
import MovieIcon from "../assets/movies-icon.jpg";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="text-gray-600 body-font shadow-md">
      <div className="container flex mx-auto py-3 items-center justify-between max-w-[1400px]">
        <Link to="/" className="flex title-font font-medium items-center">
          <img
            src={MovieIcon}
            alt=""
            fill="none"
            className="w-10 h-10"
            viewBox="0 0 24 24"
          />
          <span className="ml-3 text-xl">Movie Sentiment Analysis</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/about" className="hover:text-gray-900">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
