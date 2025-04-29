import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Booking from './pages/Booking';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protect the booking route using PrivateRoute */}
        <Route 
          path="/booking" 
          element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          } 
        />
        
        <Route path="/" element={<h1 className="text-center p-6 text-3xl">Welcome to Train Booking System</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
