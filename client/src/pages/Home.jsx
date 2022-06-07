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
    </div>
  );
}

export default Home;
