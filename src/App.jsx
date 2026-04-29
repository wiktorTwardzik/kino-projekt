import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from './Auth';
import MovieList from './MovieList';
import CinemaHall from './CinemaHall';
import Profile from './Profile';
import Navbar from './Navbar';

import { Toaster } from 'react-hot-toast';

function App() {
  const [page, setPage] = useState('movies');
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState('booking');

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const goToHall = (movie) => {
    setSelectedMovie(movie);
    setStep(2);
  };

  if (!user)
    return (
      <div className="min-h-screen bg-gray-900 text-white p-10">
        <Auth />
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar user={user} setView={setView} setStep={setStep} />

      {view === 'booking' && step === 1 && (
        <div className="pt-32 pb-16 px-6 text-center bg-gradient-to-b from-red-900/20 to-zinc-950">
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            POCZUJ EMOCJE
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto italic">
            Najlepsze premiery, niesamowity dźwięk i Twoje ulubione miejsce –
            wszystko w zasięgu jednego kliknięcia.
          </p>
        </div>
      )}

      <main
        className={`max-w-7xl mx-auto px-6 ${
          view === 'booking' && step === 1 ? 'pb-20' : 'pt-32 pb-20'
        }`}
      >
        {view === 'booking' && user && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center bg-zinc-900 p-1 rounded-full border border-white/5">
              <button
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  step === 1
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-zinc-500'
                }`}
                onClick={() => setStep(1)}
              >
                1. Wybierz Film
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  step === 2
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-zinc-500'
                }`}
                disabled={!selectedMovie}
              >
                2. Wybierz Miejsce
              </button>
            </div>
          </div>
        )}

        {!user ? (
          <Auth />
        ) : (
          <div className="animate-in fade-in duration-700">
            {view === 'profile' ? (
              <Profile />
            ) : (
              <>
                {step === 1 && <MovieList onSelect={goToHall} />}
                {step === 2 && (
                  <CinemaHall
                    movie={selectedMovie}
                    onBack={() => setStep(1)}
                    onSuccess={() => {
                      setView('profile');
                      setStep(1); // Resetujemy krok na przyszłość
                    }}
                  />
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
