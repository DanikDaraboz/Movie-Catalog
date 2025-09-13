"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
  }, []);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        const genreMap = {};
        data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      })
  }, []);
  console.log(movies);
  console.log(genres);
  return (
    <div className="flex justify-center">
      <div className="max-w-6xl max-h-6xl grid grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <Link key={movie.id} href={`${movie.id}`}>
            <div className="p-3 bg-gray-800 rounded-lg hover:scale-105 hover:bg-gray-700 transition-all duration-300">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto rounded-lg"/>
            </div>
            <div className="flex flex-col items-center p-2">
              <h2 className="text-lg font-bold text-white">{movie.title}</h2>
              <p className="text-sm text-gray-400">{movie.genre_ids.map(id => (genres[id])).join(', ')}</p>
              <p className="text-sm text-gray-400">Release Date: {movie.release_date}</p>
              <p className="text-sm text-gray-400">Rating: {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
