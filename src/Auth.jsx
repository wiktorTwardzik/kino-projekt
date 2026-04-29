import React, { useState } from 'react';
import { auth } from './firebase';
import toast from 'react-hot-toast';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Udało się zarejestrować!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Witaj z powrotem!');
      }
    } catch (err) {
      toast.error('Błędny email lub hasło');
      const errorMsg =
        err.code === 'auth/weak-password'
          ? 'Hasło musi mieć min. 6 znaków.'
          : 'Błąd logowania/rejestracji. Sprawdź dane.';
      setError(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        {isRegistering ? 'Stwórz konto' : 'Witaj z powrotem'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            placeholder="twoj@email.com"
            className="w-full p-3 rounded bg-gray-900 border border-gray-600 focus:border-red-500 outline-none text-white transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Hasło</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded bg-gray-900 border border-gray-600 focus:border-red-500 outline-none text-white transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg mt-2 transition-colors"
        >
          {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          {isRegistering ? 'Masz już konto?' : 'Nie masz konta?'}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-red-500 font-bold ml-2 hover:underline"
          >
            {isRegistering ? 'Zaloguj się' : 'Załóż je tutaj'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
