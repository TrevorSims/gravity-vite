// src/components/StaffLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffLogin = ({ setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy credentials for staff login
    const adminEmail = 'admin@example.com';
    const adminPassword = 'password123';

    if (email === adminEmail && password === adminPassword) {
      setIsAdmin(true);
      navigate('/'); // Redirect to home page
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-customBlue text-white">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Staff Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded hover:bg-purple-500 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;
