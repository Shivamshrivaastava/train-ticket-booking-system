const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { bookSeats, resetSeats,   getAvailableSeats } = require('../controllers/bookingController');

router.post('/book', auth, bookSeats);
router.post('/reset', auth, resetSeats);
router.get('/available', getAvailableSeats);
module.exports = router;
