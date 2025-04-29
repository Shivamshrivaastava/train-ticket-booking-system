import React, { useState } from 'react';

export default function SeatGrid() {
  const [seats, setSeats] = useState(() => {
    // Generate 80 seats (Assuming 80 seats in total)
    const allSeats = [];
    for (let i = 1; i <= 80; i++) {
      allSeats.push({ seatNumber: i, isBooked: false });
    }
    return allSeats;
  });
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isCoachFull = seats.every(seat => seat.isBooked);  // Check if all seats are booked

  // Handle booking a seat
  const handleBook = () => {
    setError('');
    setMessage('');

    if (count < 1 || count > 7) {
      setError('You can book between 1 and 7 seats only');
      return;
    }

    if (isCoachFull) {
      setError('The coach is full. No more bookings allowed.');
      return;
    }

    let bookedSeats = [];
    let updatedSeats = [...seats];

    // Try to book the seats in the same row first
    let bookedCount = 0;
    let startIndex = -1;
    
    // Try to find consecutive empty seats in one row
    for (let i = 0; i < 12; i++) { // There are 12 rows in total
      const rowSeats = updatedSeats.slice(i * 7, i * 7 + (i === 11 ? 3 : 7)); // Last row has only 3 seats
      const emptySeats = rowSeats.filter(seat => !seat.isBooked);
      if (emptySeats.length >= count) {
        startIndex = rowSeats.findIndex(seat => !seat.isBooked);
        for (let j = startIndex; j < startIndex + count; j++) {
          updatedSeats[i * 7 + j].isBooked = true;
          bookedSeats.push(updatedSeats[i * 7 + j].seatNumber);
        }
        break;
      }
    }

    // If not enough consecutive seats in one row, book across rows
    if (bookedSeats.length === 0) {
      bookedCount = 0;
      for (let i = 0; i < updatedSeats.length; i++) {
        if (!updatedSeats[i].isBooked) {
          updatedSeats[i].isBooked = true;
          bookedSeats.push(updatedSeats[i].seatNumber);
          bookedCount++;
          if (bookedCount === count) break;
        }
      }
    }

    // If we were able to book the required number of seats
    if (bookedSeats.length === count) {
      setSeats(updatedSeats);
      setMessage(`Booked seats: ${bookedSeats.join(', ')}`);
    } else {
      setError('Not enough available seats to book');
    }
  };

  // Reset all seats to unbooked
  const handleReset = () => {
    const resetSeats = seats.map(seat => ({ ...seat, isBooked: false }));
    setSeats(resetSeats);
    setMessage('All seats have been reset.');
  };

  // Row structure: 11 rows of 7, 1 row of 3 (Total 80 seats)
  const rowPattern = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
  const rows = [];
  let index = 0;
  for (let i = 0; i < rowPattern.length; i++) {
    rows.push(seats.slice(index, index + rowPattern[i]));
    index += rowPattern[i];
  }

  return (
    <div>
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
                ${seat.isBooked ? 'bg-red-400 text-white' : 'bg-green-200 hover:bg-green-400'} 
                border border-gray-500 cursor-pointer`}
              onClick={() => {
                if (!seat.isBooked) {
                  seat.isBooked = true;
                  setSeats([...seats]);
                }
              }}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      ))}

      <div className="text-center mt-6">
        <button onClick={handleBook} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Book Seats</button>
        <button onClick={handleReset} className="bg-gray-600 text-white px-4 py-2 rounded">Reset All</button>
      </div>

      {error && <div className="text-red-600 text-center mt-4">{error}</div>}
      {message && <div className="text-green-600 text-center mt-4">{message}</div>}
    </div>
  );
}
