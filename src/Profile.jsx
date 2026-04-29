import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

const Profile = () => {
  const [myTickets, setMyTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', auth.currentUser.uid)
      );
      const snap = await getDocs(q);
      setMyTickets(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };
    fetchTickets();
  }, []);

  const deleteBooking = async (id) => {
    if (window.confirm('Czy na pewno chcesz anulować tę rezerwację?')) {
      try {
        await deleteDoc(doc(db, 'bookings', id));
        setMyTickets(myTickets.filter((t) => t.id !== id));
        toast.success('Rezerwacja została anulowana.');
      } catch (error) {
        console.error(error);
        toast.error('Nie udało się usunąć biletu.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Twoje Bilety</h2>
      {myTickets.length === 0 ? (
        <p className="text-center text-gray-500">Brak zakupionych biletów.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {myTickets.map((t) => (
            <div
              key={t.id}
              className="bg-gray-800 p-6 rounded-lg border-l-4 border-red-500 flex justify-between items-center group"
            >
              <div>
                <h4 className="text-xl font-bold">{t.movieTitle}</h4>
                <p className="text-gray-400">
                  Miejsce: {t.seat} ({t.type})
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right text-2xl font-mono text-yellow-500">
                  {t.price} PLN
                </div>

                <button
                  onClick={() => deleteBooking(t.id)}
                  className="p-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-md transition-colors"
                  title="Usuń bilet"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
