import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function Predict() {
  const { movieId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/predict/" + movieId);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [movieId]);

  return (
    <section className="text-gray-600 body-font">
      {loading ? (
        <Spinner size={10} />
      ) : (
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
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
            <p className="mb-8 leading-relaxed"> Rating: {data.rating}</p>
            <p className="text-sm mt-2 text-gray-500 mb-8 w-full">
              Positive Reviews: {data.pos_percentage} %
              <br />
              Negative Reviews: {data.neg_percentage} %
              <br />
              Sentiment: {data.sentiment}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Predict;
