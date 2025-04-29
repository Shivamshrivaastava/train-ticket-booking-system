import React from 'react';
import SeatGrid from '../components/SeatGrid';

const Booking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-200 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 shadow-xl rounded-3xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 drop-shadow">
          🚆 Reserve Your Seat
        </h2>
        <div className="border-t-4 border-indigo-500 rounded-full mb-8 w-24 mx-auto"></div>
        <SeatGrid />
      </div>
    </div>
  );
};

export default Booking;
