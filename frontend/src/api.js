import axios from 'axios';

const API = axios.create({
  baseURL: 'https://train-ticket-booking-system-v94x.onrender.com/api',
});

// Login function
export const login = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

// Register function
export const signup = async (credentials) => {
    const response = await API.post('/auth/signup', credentials);  // Correct route
    return response.data;
  };

// Booking function
export const bookSeats = async (seatNumbers) => {
  const response = await API.post('/seats/book', { seats: seatNumbers });
  return response.data;
};

// Function to check available seats
export const getAvailableSeats = async () => {
  const response = await API.get('/seats/available');
  return response.data;
};
