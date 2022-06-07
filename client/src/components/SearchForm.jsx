import React from "react";
import Spinner from "./Spinner";
import MovieIcon from "../assets/movies-icon.jpg";

function SearchForm({ input, setInput, handleSubmit, loading }) {
  return (
    <div className="container flex-col px-5 py-20 mx-auto">
      <div className="flex py-7 items-center text-center w-full justify-center">
        <img
          src={MovieIcon}
          alt=""
          fill="none"
          className="w-10 h-10"
          viewBox="0 0 24 24"
        />
        <h2 className="ml-3 text-2xl font-semibold text-gray-900">
          Movie Sentiment Analysis
        </h2>
      </div>
      <div className="container px-5 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-center mx-auto gap-4"
          // className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-center mx-auto"
        >
          <input
            type="text"
            placeholder="Enter movie name"
            className="w-full h-12 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ${
              loading && "cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? <Spinner color="white" size={5} /> : "Let's Go"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
