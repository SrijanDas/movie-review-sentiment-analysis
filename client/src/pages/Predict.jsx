import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import ShowError from "../components/ShowErrorPage";
import ImdbLogo from "../assets/IMDB_Logo.png";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function Predict() {
  const { movieId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showPlotting, setShowPlotting] = useState(false);

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
          <div className="container mx-auto px-5 py-6 md:py-12">
            <div className="flex md:flex-row flex-col items-center">
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
                <div className="mb-8 leading-relaxed flex items-center gap-2">
                  <div className="w-14 h-auto flex items-center justify-center">
                    <img
                      src={ImdbLogo}
                      className="object-contain"
                      alt="ImdbLogo"
                    />
                  </div>
                  <p className="text-lg font-semibold">Rating: {data.rating}</p>
                </div>
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
                        : data.sentiment === "Slightly Negative"
                        ? "bg-red-400"
                        : data.sentiment === "Positive"
                        ? "bg-green-900"
                        : data.sentiment === "Slightly Positive"
                        ? "bg-green-400"
                        : "bg-blue-900"
                    }`}
                  >
                    {data.sentiment}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowPlotting(!showPlotting);
                  }}
                  className="text-black mt-5 bg-gray-50 border border-gray-200 py-2 px-8 focus:outline-none hover:bg-gray-100 rounded-lg drop-shadow-md"
                >
                  Show Plotting
                </button>
              </div>
            </div>
            {showPlotting && (
              <div className="my-8">
                <Pie
                  data={{
                    labels: ["Negative Reviews", "Positive Reviews"],
                    datasets: [
                      {
                        label: "%",
                        data: [data.neg_percentage, data.pos_percentage],
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.2)",
                          "rgba(75, 192, 192, 0.2)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(75, 192, 192, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  width={200}
                  height={400}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}

export default Predict;
