import React from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const Navbar = ({ user, setView, setStep }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => {
            setView('booking');
            setStep(1);
          }}
        >
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white font-black text-xl"></span>
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-white">
            SkibidiKino
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <button
            onClick={() => {
              setView('booking');
              setStep(1);
            }}
            className="text-gray-300 hover:text-white font-medium transition-colors"
          >
            Repertuar
          </button>

          {user && (
            <>
              <button
                onClick={() => setView('profile')}
                className="text-gray-300 hover:text-white font-medium transition-colors"
              >
                Moje Bilety
              </button>

              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-500">Zalogowany jako</p>
                  <p className="text-sm font-semibold text-white">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={() => signOut(auth)}
                  className="bg-zinc-800 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-all"
                >
                  Wyloguj
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
