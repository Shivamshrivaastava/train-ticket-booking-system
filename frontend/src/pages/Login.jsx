import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; 

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(form);
      console.log('API response:', response);

      const token = response.token;
      if (!token) {
        throw new Error('Token not found in response');
      }

      localStorage.setItem('token', token);
      navigate('/booking');
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2018/05/09/08/15/train-3384786_1280.jpg')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Login
        </h2>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="block w-full mb-4 p-3 border rounded"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="block w-full mb-6 p-3 border rounded"
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
