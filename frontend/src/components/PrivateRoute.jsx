import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // If no token found, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children; // If token exists, render the children (the protected component)
};

export default PrivateRoute;
