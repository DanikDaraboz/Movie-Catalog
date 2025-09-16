"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import axios from "axios";
import {Star} from "lucide-react";
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const [moviesRes, genresRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/popular`,{
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              language: 'en-US',
              page: 1
            }
          }),
          axios.get(`https://api.themoviedb.org/3/genre/movie/list`,{
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              language: 'en-US'
            }     
          })
        ]);
        const genresMap = {};
        genresRes.data.genres.forEach((genre)=>{
          genresMap[genre.id] = genre.name;
        });
        setMovies(moviesRes.data.results);
        setGenres(genresMap);
      }
      catch(error){
        console.error("Error fetching data:", error);
      } 
    };
    fetchData();
  },[]);


  return (
    <div className="flex justify-center">
      <div className="max-w-6xl max-h-6xl grid grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <div key={movie.id}>
            <Link key={movie.id} href={`${movie.id}`}>
              <div className="p-3 bg-gray-600 hover:bg-gray-500 dark:bg-gray-800 rounded-lg hover:scale-105 dark:hover:bg-gray-700 transition-all duration-300">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-auto rounded-lg"/>
              </div>
            </Link>
              <div className="flex flex-col items-center p-2">
                <h2 className="text-lg font-bold text-black dark:text-white">{movie.title}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-400">{movie.genre_ids.map(id => (genres[id])).join(', ')}</p>
                <p className="text-sm text-gray-700 dark:text-gray-400">Release Date: {movie.release_date}</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm text-gray-700 dark:text-gray-400">Rating: {movie.vote_average}</p>
                  <Star className="text-yellow-500 scale-70" />
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
