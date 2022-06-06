import React, { useState } from "react";
import axios from "../axios";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

function Home() {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await axios
      .get(`/search/${input}`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setsearchTerm(input);
    setInput("");
    setLoading(false);
  };

  return (
    <div>
      <SearchForm
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      {/* <Link
        to="/"
        className="list-group-item list-group-item-action"
        aria-current="true"
      >
        {movies.map((movie) => (
          <MovieListItem key={movie.movie_id} movie={movie} />
        ))}
      </Link> */}
      {movies.length > 0 && (
        <SearchResults searchTerm={searchTerm} movies={movies} />
      )}
    </div>
  );
}

export default Home;
