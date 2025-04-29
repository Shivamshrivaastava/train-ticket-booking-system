const Seat = require('../models/Seat');
const { allocateSeats } = require('../utils/seatAllocator');

exports.bookSeats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { count } = req.body;

    if (count < 1 || count > 7) return res.status(400).json({ msg: "Book between 1 and 7 seats" });

    const availableSeats = await Seat.find({ isBooked: false }).sort('seatNumber');
    const allocated = allocateSeats(availableSeats, count);

    if (!allocated.length) return res.status(400).json({ msg: "Not enough contiguous seats" });

    for (let seat of allocated) {
      await Seat.findByIdAndUpdate(seat._id, { isBooked: true, bookedBy: userId });
    }

    res.json({ msg: "Seats booked", seats: allocated.map(s => s.seatNumber) });
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
