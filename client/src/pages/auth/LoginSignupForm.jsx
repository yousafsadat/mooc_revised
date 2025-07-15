// client/src/pages/auth/LoginSignupForm.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom';

const LoginSignupForm = () => {
  // Destructure functions and state from useAuth
  const { login, register, currentUser, loading, error } = useAuth();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState(''); // State for success/error messages

  // Login state and handlers
  const [loginData, setLoginData] = useState({
    email: '', // Backend login uses email
    password: '',
    role: '', // Role is selected, but not sent for login itself
  });

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (!loginData.email || !loginData.password) {
      setMessage('Please enter your email and password.');
      return;
    }

    const res = await login({ email: loginData.email, password: loginData.password });

    if (res.success) {
      setMessage('Login successful!');
      // Access the user from the response, not currentUser directly yet, as state update is async
      const userToRedirect = res.user || currentUser;
      const redirectTo = userToRedirect?.role === 'admin' ? '/admin/dashboard' :
                         userToRedirect?.role === 'instructor' ? '/instructor/dashboard' :
                         '/dashboard'; // Default dashboard for student or if role is missing
      navigate(redirectTo);
    } else {
      setMessage(res.error || 'Login failed. Please check your credentials.');
    }
  };

  // Register state and handlers
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const handleRegisterChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (!registerData.username || !registerData.email || !registerData.password || !registerData.role) {
      setMessage('Please fill in all registration fields.');
      return;
    }

    const res = await register(registerData);

    if (res.success) {
      setMessage('Registration successful! You are now logged in.');
      // Access the user from the response
      const userToRedirect = res.user || currentUser;
      const redirectTo = userToRedirect?.role === 'admin' ? '/admin/dashboard' :
                         userToRedirect?.role === 'instructor' ? '/instructor/dashboard' :
                         '/dashboard'; // Default dashboard for student
      navigate(redirectTo);
    } else {
      setMessage(res.error || 'Registration failed. Please try again.');
    }
  };

  // Effect to show backend errors from AuthContext's error state
  useEffect(() => {
    if (error) {
      setMessage(error);
      // Optionally clear error after a delay if it's transient
      // const timer = setTimeout(() => setError(null), 5000);
      // return () => clearTimeout(timer);
    }
  }, [error]);

  // If currentUser already exists and not in a loading state, redirect them immediately
  useEffect(() => {
    if (currentUser && !loading) {
      const redirectTo = currentUser.role === 'admin' ? '/admin/dashboard' :
                         currentUser.role === 'instructor' ? '/instructor/dashboard' :
                         '/dashboard';
      navigate(redirectTo);
    }
  }, [currentUser, loading, navigate]); // Add navigate to dependency array

  // Optionally, show a loading spinner or message when auth operations are in progress
  if (loading) {
    // This `if (loading)` block catches the initial load from localStorage AND API call loading.
    // You can render a simple spinner or a full-page loader here.
    // For the form itself, it just disables buttons.
  }

  // This prevents rendering the form momentarily if already logged in and redirecting
  if (currentUser && !loading) {
     return null;
  }

  return (
    <div
      className={`relative w-full max-w-4xl h-[550px] bg-white mx-auto my-8 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center
      ${isActive ? "login-active" : ""}`}
      style={{ minWidth: 320 }}
    >
      {/* Background transition bubble (Existing code) */}
      <div className="absolute w-full h-full pointer-events-none">
        <div
          className={`absolute bg-blue-400 rounded-[150px] transition-all duration-[1800ms] ease-in-out z-10
            ${isActive ? "left-1/2 -translate-x-1/2 w-[300%] h-full" : "-left-[250%] w-[300%] h-full"}`}
        ></div>
      </div>

      {/* Panels (Existing code) */}
      <div className="absolute w-full h-full flex">
        {/* Left Panel */}
        <div
          className={`flex flex-col justify-center items-center text-white w-1/2 h-full z-20 transition-all duration-700 absolute top-0 bg-transparent
          ${isActive ? "-left-1/2 opacity-0 pointer-events-none" : "left-0 opacity-100"}`}
          style={{ transitionDelay: isActive ? "600ms" : "1200ms" }}
        >
          <h1 className="text-3xl font-bold mb-2">Hello, Welcome!</h1>
          <p className="mb-5 text-[15px]">Don't have an account?</p>
          <button
            className="w-40 h-12 border-2 border-white text-white font-semibold rounded-lg transition bg-transparent hover:bg-white hover:text-blue-600"
            type="button"
            onClick={() => setIsActive(true)}
          >
            Register
          </button>
        </div>

        {/* Right Panel */}
        <div
          className={`flex flex-col justify-center items-center text-white w-1/2 h-full z-20 transition-all duration-700 absolute top-0 bg-transparent
          ${isActive ? "right-0 opacity-100" : "-right-1/2 opacity-0 pointer-events-none"}`}
          style={{ transitionDelay: isActive ? "1200ms" : "600ms" }}
        >
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="mb-5 text-[15px]">Already have an account?</p>
          <button
            className="w-40 h-12 border-2 border-white text-white font-semibold rounded-lg transition bg-transparent hover:bg-white hover:text-blue-600"
            type="button"
            onClick={() => setIsActive(false)}
          >
            Login
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-white flex flex-col items-center justify-center p-10 z-30 transition-all duration-700
        ${isActive ? "translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}`}
      >
        <form className="w-full max-w-sm mx-auto space-y-5" onSubmit={handleLoginSubmit}>
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          {message && <p className={`text-sm mb-2 ${error ? 'text-red-500' : 'text-green-500'}`}>{message}</p>} {/* Display messages */}
          <select
            name="role"
            value={loginData.role}
            onChange={handleLoginChange}
            required
            className="w-full py-3 px-5 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-700 font-medium focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          {/* Changed input name to email for login */}
          <input
            type="email" // Changed type to email
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            className="w-full py-3 px-5 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-700 font-medium focus:ring-2 focus:ring-blue-300"
            placeholder="Email" // Changed placeholder to Email
            required
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            className="w-full py-3 px-5 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-700 font-medium focus:ring-2 focus:ring-blue-300"
            placeholder="Password"
            required
          />
          <div className="text-right">
            <a href="#" className="text-sm text-gray-500 hover:text-blue-500">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition font-semibold text-white text-lg"
            disabled={loading} // Disable button when loading
          >
            {loading && !error ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>

      {/* Register Form */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-white flex flex-col items-center justify-center p-10 z-30 transition-all duration-700
        ${isActive ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
      >
        <form className="w-full max-w-sm mx-auto space-y-5" onSubmit={handleRegisterSubmit}>
          <h1 className="text-3xl font-bold mb-2">Registration</h1>
          {message && <p className={`text-sm mb-2 ${error ? 'text-red-500' : 'text-green-500'}`}>{message}</p>} {/* Display messages */}
          <select
            name="role"
            value={registerData.role}
            onChange={handleRegisterChange}
            required
            className="w-full py-3 px-5 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-700 font-medium focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            name="username"
            value={registerData.username}
            onChange={handleRegisterChange}
            className="w-full py-3 px-5 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-700 font-medium focus:ring-2 focus:ring-blue-300"
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleRegisterChange}
            className="w-full py-3 px-5 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-700 font-medium focus:ring-2 focus:ring-blue-300"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleRegisterChange}
            className="w-full py-3 px-5 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-700 font-medium focus:ring-2 focus:ring-blue-300"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full h-12 bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition font-semibold text-white text-lg"
            disabled={loading} // Disable button when loading
          >
            {loading && !error ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Toggle to Login (Existing code) */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 mb-2">Already have an account?</p>
          <button
            onClick={() => setIsActive(false)}
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;