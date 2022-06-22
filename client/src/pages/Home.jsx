import React, { useState } from "react";
import axios from "../axios";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

function Home() {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [error, setError] = useState(false);

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
        setError(true);
        console.log(error);
      });

    if (movies.length > 0) {
      setsearchTerm(input);
      setInput("");
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-1 flex-col justify-center">
      <SearchForm
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      {movies.length > 0 && (
        <SearchResults searchTerm={searchTerm} movies={movies} />
      )}

      {error && (
        <div className="mx-auto text-center p-4 bg-red-200 text-red-900 text-lg font-semibold rounded">
          Something went wrong 😟
          <br />
          Please try searching again...
        </div>
      )}
    </div>
  );
}

export default Home;
