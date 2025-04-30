exports.allocateSeats = (availableSeats, count) => {
  const ROW_SIZE = 7;
  const TOTAL_SEATS = 80;

  // Group available seats by row
  const rowPattern = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
  const rows = {};
  let index = 1;

  rowPattern.forEach((length, rowIndex) => {
    rows[rowIndex + 1] = [];
    for (let i = 0; i < length; i++) {
      const seat = availableSeats.find(s => s.seatNumber === index);
      if (seat) {
        rows[rowIndex + 1].push(seat);
      }
      index++;
    }
  });

  // 1. Try to find consecutive seats in the same row
  for (const row of Object.values(rows)) {
    row.sort((a, b) => a.seatNumber - b.seatNumber);
    for (let i = 0; i <= row.length - count; i++) {
      const group = row.slice(i, i + count);
      const isConsecutive = group.every((seat, idx) =>
        idx === 0 || seat.seatNumber === group[idx - 1].seatNumber + 1
      );
      if (isConsecutive) {
        return { seats: group, isConsecutive: true };
      }
    }
  }

  // 2. Fallback: find nearest available seats globally
  availableSeats.sort((a, b) => a.seatNumber - b.seatNumber);

  let minSpread = Infinity;
  let bestGroup = [];

  for (let i = 0; i <= availableSeats.length - count; i++) {
    const group = availableSeats.slice(i, i + count);
    const spread = group[count - 1].seatNumber - group[0].seatNumber;
    if (spread < minSpread) {
      minSpread = spread;
      bestGroup = group;
    }
  }

  return { seats: bestGroup, isConsecutive: false };
};
