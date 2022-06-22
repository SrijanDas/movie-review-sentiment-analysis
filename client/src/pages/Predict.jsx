import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import ShowError from "../components/ShowErrorPage";

function Predict() {
  const { movieId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    const fetchData = async () => {
      try {
        const res = await axios.get("/predict/" + movieId);
        setData(res.data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        {error ? (
          <ShowError />
        ) : loading ? (
          <Spinner size={10} />
        ) : (
          <div className="container mx-auto flex px-5 py-6 md:py-12 md:flex-row flex-col items-center">
            <div className="lg:w-1/4 md:w-1/2 w-1/2 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={data.cover_url}
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {data.title}
              </h1>
              <p className="mb-8 leading-relaxed">IMDB Rating: {data.rating}</p>
              <p className="leading-relaxed mb-4 text-lg">Reviews:</p>
              <div className="flex flex-row h-16 items-center gap-4">
                <div
                  className={`w-32 h-full bg-green-200 text-center flex flex-col justify-center text-green-900 font-semibold text-lg`}
                >
                  Positive
                  <br /> {data.pos_percentage} %
                </div>
                <div
                  className={`w-32 h-full bg-red-200 text-center flex flex-col justify-center text-red-900 font-semibold text-lg`}
                >
                  Negative
                  <br /> {data.neg_percentage} %
                </div>
              </div>
              <div className="text-lg mt-4 text-gray-500 mb-8 flex flex-col gap-2 items-center md:flex-row">
                Sentiment:
                <div
                  className={`font-semibold text-center p-2 rounded text-white ${
                    data.sentiment === "Negative"
                      ? "bg-red-500"
                      : data.sentiment === "Positive"
                      ? "bg-green-900"
                      : "bg-blue-900"
                  }`}
                >
                  {data.sentiment}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Predict;
