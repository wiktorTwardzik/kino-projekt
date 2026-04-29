import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const MovieList = ({ onSelect }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'movies'));
        const moviesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesList);
      } catch (error) {
        console.error('Błąd podczas pobierania filmów: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Ładowanie filmów...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {movies.length === 0 ? (
        <p className="text-center col-span-3 text-gray-400">
          Brak filmów w bazie danych.
        </p>
      ) : (
        movies.map((movie) => (
          <div
            key={movie.id}
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 shadow-2xl"
            onClick={() => onSelect(movie)}
          >
            <div className="relative h-[400px]">
              <img
                src={
                  movie.img?.startsWith('http')
                    ? movie.img
                    : `https://image.tmdb.org/t/p/w500${movie.img}`
                }
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            </div>

            <div className="p-6 absolute bottom-0 left-0 right-0">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                {movie.genre}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-red-500 transition-colors">
                {movie.title}
              </h3>
              <button className="mt-4 w-full bg-white text-black py-2 rounded-lg font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                Rezerwuj bilet
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieList;
