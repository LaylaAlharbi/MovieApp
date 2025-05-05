import React from "react";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

function MovieCard({ movie, onClick, showRating }) {
  if (!movie) return null;
  const { title, poster_path, overview, vote_average } = movie;

  const getRatingColor = (rating) => {
    if (rating >= 8) return '#1B5E20';
    if (rating >= 6) return '#F57F17';
    return '#7F0000';
  };

  const ratingColor = getRatingColor(vote_average);
  const formattedRating = vote_average ? vote_average.toFixed(1) : 'N/A';

  return (
    <div
      className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-80">
        <img
          src={poster_path ? `${IMG_API}${poster_path}` : defaultImage}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
      </div>

      <div className="p-4 bg-[#080F36] flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white truncate flex-grow mr-2">
          {title}
        </h3>
        {showRating && (
          <div 
            className="w-10 h-10 flex items-center justify-center rounded text-white font-bold"
            style={{ backgroundColor: ratingColor }}
          >
            {formattedRating}
          </div>
        )}
      </div>

      <div className="absolute right-0 bottom-0 left-0 bg-white bg-opacity-80 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out flex flex-col justify-end items-center text-center p-4">
        <h4 className="text-black text-lg font-semibold">Overview</h4>
        <p className="text-black text-sm">
          {overview || "No overview available."}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;