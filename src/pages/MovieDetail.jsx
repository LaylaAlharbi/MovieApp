import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoSection from "../components/VideoSection";

const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState("");
  const [videoId, setvideoId] = useState();
  const { id } = useParams();
  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
  } = movieDetails;
  const API_KEY = import.meta.env.VITE_TMDB_KEY;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos`;
  useEffect(() => {
    axios
      .get(movieDetailBaseUrl, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: "application/json",
        },
      })
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));

    axios
      .get(videoUrl, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: "application/json",
        },
      })
      .then((res) => setvideoId(res.data.results?.[0]?.key))
      .catch((err) => console.log(err));
  }, [movieDetailBaseUrl, videoUrl]);
  return (
    <div className="md:container px-10 mx-auto py-5 ">
      <h1 class="text-center text-3xl dark:text-slate-200">{title}</h1>{" "}
      {videoId && <VideoSection videoKey={videoId} />}
      <div className="flex justify-center px-10">
        <div class="flex flex-col lg:flex-row w-2/3 rounded-lg bg-gray-100 shadow-lg dark:bg-gray-700">
          <img
            className="lg:w-1/3 h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={poster_path ? baseImageUrl + poster_path : defaultImage}
            alt="poster"
          />
          <div className="p-6 flex flex-col justify-between ">
            <div>
              <h5 className="text-gray-900 dark:text-white text-xl font-medium mb-2">
                Overview
              </h5>
              <p className="text-gray-700 dark:text-white text-base mb-4">
                {overview}
              </p>
            </div>
            <ul className="bg-gray-100 rounded-lg border border-gray-400 text-gray-900">
              <li className="px-6 py-2 border-b border-gray-400">
                Release Date: {release_date}
              </li>
              <li className="px-6 py-2 border-b border-gray-400">
                Rate: {vote_average}
              </li>
              <li className="px-6 py-2 border-b border-gray-400">
                Total Vote: {vote_count}
              </li>
              <center>
              <li className="px-6 py-2">
                <Link
                  to={-1}
                  className="text-blue-600 hover:text-blue-700 transition"
                >
                  Go Back
                </Link>
              </li>
              </center>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;