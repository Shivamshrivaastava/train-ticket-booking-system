import React, { useEffect, useState } from 'react';

const SeatGrid = () => {
  const [seats, setSeats] = useState([]);
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  // Load seat data from backend
  const loadSeats = async () => {
    try {
      const response = await fetch('https://train-ticket-booking-system-v94x.onrender.com/api/seats/available');
      const data = await response.json();
      setSeats(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load seat data');
    }
  };

  useEffect(() => {
    loadSeats();
  }, []);

  // Book seats
  const handleBook = async () => {
    setError('');
    setMessage('');

    if (count < 1 || count > 7) {
      setError('You can book between 1 and 7 seats only');
      return;
    }

    if (!token) {
      setError('You must be logged in to book seats');
      return;
    }

    try {
      const response = await fetch('https://train-ticket-booking-system-v94x.onrender.com/api/seats/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ count }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Booking failed');

      setMessage(`Booked seats: ${data.seats.join(', ')}`);
      await loadSeats();
    } catch (err) {
      setError(err.message);
    }
  };

  // Reset all seats
  const handleReset = async () => {
    setError('');
    setMessage('');

    if (!token) {
      setError('You must be logged in to reset seats');
      return;
    }

    try {
      const response = await fetch('https://train-ticket-booking-system-v94x.onrender.com/api/seats/reset', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Reset failed');

      setMessage(data.msg);
      await loadSeats();
    } catch (err) {
      setError(err.message);
    }
  };

  // Calculate remaining (unbooked) seats
  const remainingSeats = seats.filter(seat => !seat.isBooked).length;

  // Build rows for UI
  const rowPattern = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
  const rows = [];
  let index = 0;
  for (let i = 0; i < rowPattern.length; i++) {
    rows.push(seats.slice(index, index + rowPattern[i]));
    index += rowPattern[i];
  }

  return (
    <div className="p-6">
      <div className="mb-4 text-center">
        <label htmlFor="count" className="font-semibold">Number of seats to book:</label>
        <input
          type="number"
          id="count"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          min={1}
          max={7}
          className="ml-2 border p-1 w-16"
        />
      </div>

      {rows.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.map((seat) => (
            <div
              key={seat.seatNumber}
              title={`Seat ${seat.seatNumber}`}
              className={`w-10 h-10 m-1 flex items-center justify-center text-sm rounded 
                ${seat.isBooked ? 'bg-red-400 text-white' : 'bg-green-200'} 
                border border-gray-500`}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      ))}

      <div className="text-center mt-6 space-x-2">
        <button
          onClick={handleBook}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Book Seats
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Reset All
        </button>
        <button
          disabled
          className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold cursor-default"
        >
          Remaining Seats: {remainingSeats}
        </button>
      </div>

      {error && <div className="text-red-600 text-center mt-4">{error}</div>}
      {message && <div className="text-green-600 text-center mt-4">{message}</div>}
    </div>
  );
};

export default SeatGrid;
