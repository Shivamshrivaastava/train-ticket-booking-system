exports.allocateSeats = (availableSeats, count) => {
  const ROW_SIZE = 7;
  const MAX_SEATS = 80;

  // Step 1: Group available seats by rows
  const rows = {};
  for (let seat of availableSeats) {
    const row = seat.seatNumber <= 77 ? Math.ceil(seat.seatNumber / ROW_SIZE) : 12; // 12th row = seat 78–80
    if (!rows[row]) rows[row] = [];
    rows[row].push(seat);
  }

  // Step 2: Try to find `count` consecutive seats in the same row (Sliding Window Approach)
  for (let rowSeats of Object.values(rows)) {
    rowSeats.sort((a, b) => a.seatNumber - b.seatNumber);
    for (let i = 0; i <= rowSeats.length - count; i++) {
      let group = rowSeats.slice(i, i + count); // Sliding window of `count` seats
      // Check if the seats are consecutive
      if (group[group.length - 1].seatNumber - group[0].seatNumber + 1 === count) {
        return group;
      }
    }
  }

  // Step 3: If not enough consecutive seats in one row, try to book nearest available seats
  let bookedSeats = [];
  let remainingSeats = count;

  // Sort seats by seat number
  availableSeats.sort((a, b) => a.seatNumber - b.seatNumber);

  // Loop to find nearest seats across rows (fallback approach)
  for (let seat of availableSeats) {
    if (remainingSeats > 0) {
      bookedSeats.push(seat);
      remainingSeats--;
    }
    if (remainingSeats === 0) break;
  }

  return bookedSeats;
};
