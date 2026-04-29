import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

const CinemaHall = ({ movie, onBack, onSuccess }) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, 'bookings'),
      where('movieId', '==', movie.id)
    );
    return onSnapshot(q, (snapshot) => {
      setBookedSeats(snapshot.docs.map((doc) => doc.data().seat));
    });
  }, [movie.id]);

  const handleBooking = async () => {
    const isVip = selectedSeat >= 17 && selectedSeat <= 24;
    await addDoc(collection(db, 'bookings'), {
      movieId: movie.id,
      movieTitle: movie.title,
      seat: selectedSeat,
      userId: auth.currentUser.uid,
      price: isVip ? 40 : 25,
      type: isVip ? 'VIP' : 'Standard',
    });
    toast.success('Bilet zarezerwowany! Miłego seansu 🍿', {
      icon: '🎬',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    if (onSuccess) {
      onSuccess();
    }
    setSelectedSeat(null);
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={onBack} className="mb-4 text-gray-400 hover:text-white">
        ← Wróć do filmów
      </button>
      <h2 className="text-2xl mb-6">
        Film: <span className="text-red-500 font-bold">{movie.title}</span>
      </h2>

      <div className="grid grid-cols-8 gap-2 mb-8">
        {Array.from({ length: 40 }).map((_, i) => {
          const id = i + 1;
          const isVip = id >= 17 && id <= 24;
          const isBooked = bookedSeats.includes(id);
          return (
            <button
              key={id}
              disabled={isBooked}
              onClick={() => setSelectedSeat(id)}
              className={`w-10 h-10 rounded ${
                isBooked
                  ? 'bg-gray-700'
                  : selectedSeat === id
                  ? 'bg-yellow-500'
                  : isVip
                  ? 'bg-purple-600'
                  : 'bg-green-600'
              }`}
            >
              {id}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 text-sm mb-6">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-600"></div> Standard (25zł)
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-600"></div> VIP (40zł)
        </div>
      </div>

      {selectedSeat && (
        <button
          onClick={handleBooking}
          className="bg-red-600 px-8 py-3 rounded-full font-bold"
        >
          Kupuję bilet na miejsce {selectedSeat}
        </button>
      )}
    </div>
  );
};

export default CinemaHall;
