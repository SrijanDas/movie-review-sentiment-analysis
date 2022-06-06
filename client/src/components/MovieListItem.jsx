import React from "react";
import { useNavigate } from "react-router-dom";

function MovieListItem({ movie }) {
  const navigate = useNavigate();

  const handClick = () => {
    navigate("/predict/" + movie.movie_id);
  };

  return (
    <div className="p-4 lg:w-1/4 md:w-1/2 ">
      <div
        onClick={handClick}
        className="h-full text-gray-900 flex flex-col items-center text-center rounded-lg  shadow-lg hover:cursor-pointer hover:bg-indigo-500 hover:text-white "
      >
        <img
          alt="..."
          className="flex-shrink-0 rounded-t-lg w-full h-56 object-cover object-center mb-4 "
          src={movie.cover_url}
        />
        <div className="w-full px-2 pb-4">
          <h2 className="title-font font-medium text-lg">{movie.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default MovieListItem;
