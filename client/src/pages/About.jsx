import React from "react";
import Navbar from "../components/Navbar";
import GithubIcon from "../assets/icons8-github.svg";

function About() {
  return (
    <>
      <Navbar />
      <div className="p-10 text-center flex flex-col items-center mx-auto max-w-[1400px]">
        Made with love❤ by Srijan
        <br />
        <button
          onClick={() => {
            window.open(
              "https://github.com/SrijanDas/movie-review-sentiment-analysis",
              "_blank"
            );
          }}
          className="text-black flex items-center gap-2 mt-5 bg-gray-50 border-0 py-2 px-8 focus:outline-none hover:bg-gray-100 rounded-lg drop-shadow-md"
        >
          <img src={GithubIcon} alt="Github" />
          Project Repo
        </button>
      </div>
    </>
  );
}

export default About;
