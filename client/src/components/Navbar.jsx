import React from "react";
import MovieIcon from "../assets/movies-icon.jpg";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="text-white body-font bg-indigo-500">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center mb-4 md:mb-0"
        >
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
          <Link to="/about" className="mr-5 hover:text-gray-900">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
