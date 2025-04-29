import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // Update input values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit signup form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!form.name || !form.email || !form.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Use the signup function to make the API request
      const res = await signup(form);

      // Display success or error message based on the response
      alert(res?.msg || 'Signup successful!');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      // Handle error, display the error message from the backend
      const msg = err.response?.data?.msg || err.response?.data?.message || 'Signup failed';
      alert(msg);  // Show the error message in an alert
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2018/05/09/08/15/train-3384786_1280.jpg')", // Train image
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-105 bg-opacity-80"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Create Your Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={form.name}
          className="block w-full mb-4 p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="block w-full mb-4 p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="block w-full mb-6 p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
