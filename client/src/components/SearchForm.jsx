import React from "react";
import Spinner from "./Spinner";

function SearchForm({ input, setInput, handleSubmit, loading }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-20 mx-auto">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Search for a movie
          </h1>
        </div>
        <div className="container px-5 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-center mx-auto"
          >
            <input
              type="text"
              placeholder="Enter movie name"
              className="w-full h-12 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mr-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-4 sm:mt-0 ${
                loading && "cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading ? <Spinner color="white" size={7} /> : "Let's Go"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
