import React from "react";
import MovieListItem from "./MovieListItem";

function SearchResults({ movies }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {movies.length} search results. Please select the correct on from
            the list
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {movies.map((movie) => (
            <MovieListItem key={movie.movie_id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SearchResults;
