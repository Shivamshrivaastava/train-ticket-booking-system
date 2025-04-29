const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Seat = require('./models/Seat');

dotenv.config();
const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/seats', bookingRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB connected");

  // Initialize 80 seats once
  const seatCount = await Seat.countDocuments();
  if (seatCount === 0) {
    const seats = [];
    for (let i = 1; i <= 80; i++) {
      seats.push({ seatNumber: i });
    }
    await Seat.insertMany(seats);
    console.log("Initialized 80 seats");
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));
