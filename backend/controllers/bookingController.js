const Seat = require('../models/Seat');
const { allocateSeats } = require('../utils/seatAllocator');


exports.bookSeats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { count } = req.body;

    if (count < 1 || count > 7)
      return res.status(400).json({ msg: "Book between 1 and 7 seats" });

    const availableSeats = await Seat.find({ isBooked: false }).sort('seatNumber');

    const allocation = allocateSeats(availableSeats, count);

    if (!allocation || allocation.seats.length !== count)
      return res.status(400).json({ msg: "Not enough seats available" });

    // Save booking
    for (let seat of allocation.seats) {
      await Seat.findByIdAndUpdate(seat._id, {
        isBooked: true,
        bookedBy: userId
      });
    }

    res.json({
      msg: allocation.isConsecutive
        ? "Seats booked together in one row"
        : "Seats booked (not in same row but nearby)",
      seats: allocation.seats.map(s => s.seatNumber),
      isConsecutive: allocation.isConsecutive
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetSeats = async (req, res) => {
  try {
    await Seat.updateMany({}, { isBooked: false, bookedBy: null });
    res.json({ msg: "All seats reset" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAvailableSeats = async (req, res) => {
  try {
    const seats = await Seat.find({}, 'seatNumber isBooked').sort('seatNumber');
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getRemainingSeatsCount = async (req, res) => {
  try {
    const count = await Seat.countDocuments({ isBooked: false });
    res.json({ remainingSeats: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


