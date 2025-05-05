import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_URL = `${BASE_URL}/movie/popular?language=en-US&page=1`;
const SEARCH_URL = `${BASE_URL}/search/movie?language=en-US&page=1&query=`;

function MovieContext() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const fetchMovies = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
        },
      });
      setMovies(res.data.results);
    } catch (err) {
      setError(err.message || "Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert("Please login to search for movies");
      return;
    }

    if (searchTerm.trim() === "") {
      fetchMovies(POPULAR_URL);
    } else {
      fetchMovies(`${SEARCH_URL}${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleMovieClick = (movieId) => {
    if (!currentUser) {
      navigate('/login', { 
        state: { 
          from: `/details/${movieId}` // Make sure this matches your detail route
        } 
      });
    } else {
      navigate(`/details/${movieId}`);
    }
  };

  useEffect(() => {
    fetchMovies(POPULAR_URL);
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <form className="flex justify-center p-2 my-5" onSubmit={handleSearch}>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 h-11 mr-2 block bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search movies..."
        />
        <button 
          className="border-2 border-red-600 text-red-600 px-4 h-11 rounded-lg hover:bg-red-800 hover:text-white transition"
          disabled={loading}
          type="submit"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
            <p>Error: {error}</p>
            <button
              onClick={() => fetchMovies(POPULAR_URL)}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
            >
              Retry
            </button>
          </div>
        )}

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id}
          movie={movie}
          onClick={() => handleMovieClick(movie.id)}
          showRating={!!currentUser}
        />
      ))}
    </div>

        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No movies found. Try another search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieContext;