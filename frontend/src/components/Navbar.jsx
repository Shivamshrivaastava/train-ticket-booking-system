import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')) || { firstName: '', lastName: '' };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/signup');
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold">Train Booking</Link>

        <div className="space-x-4 flex items-center relative">
          {location.pathname === '/signup' && (
            <Link to="/login" className="text-white font-medium">Login</Link>
          )}
          {location.pathname === '/login' && (
            <Link to="/signup" className="text-white font-medium">Signup</Link>
          )}
          {location.pathname === '/booking' && (
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:shadow-lg transition"
              >
                <UserCircleIcon className="h-8 w-8 text-indigo-600" />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50 py-2">
                  <div className="px-4 py-2 text-gray-700 font-medium border-b">{user.firstName} {user.lastName}</div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {location.pathname !== '/login' &&
            location.pathname !== '/signup' &&
            location.pathname !== '/booking' && (
              <>
                <Link to="/login" className="text-white font-medium">Login</Link>
                <Link to="/signup" className="text-white font-medium">Signup</Link>
                <Link to="/booking" className="text-white font-medium">Booking</Link>
              </>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
