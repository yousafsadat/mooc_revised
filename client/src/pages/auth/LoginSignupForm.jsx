import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext';

const LoginSignupForm = () => {
  const { login, currentUser } = useAuth();
  const [isActive, setIsActive] = useState(false);

  // Login state and handlers
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    role: '',
  });

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.username && loginData.role) {
      login({
        username: loginData.username,
        role: loginData.role,
      });
    }
  };

  // Register state and handlers (optional, for future use)
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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    // Example: register(registerData);
  };

  if (currentUser) {
    return null; // or a loading spinner (optional)
  }

  return (
    <div
      className={`relative w-full max-w-4xl h-[550px] bg-white mx-auto my-8 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center
      ${isActive ? "login-active" : ""}`}
      style={{ minWidth: 320 }}
    >
      {/* Background transition bubble */}
      <div className="absolute w-full h-full pointer-events-none">
        <div
          className={`absolute bg-blue-400 rounded-[150px] transition-all duration-[1800ms] ease-in-out z-10
            ${isActive ? "left-1/2 -translate-x-1/2 w-[300%] h-full" : "-left-[250%] w-[300%] h-full"}`}
        ></div>
      </div>

      {/* Panels */}
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
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleLoginChange}
            className="w-full py-3 px-5 bg-gray-100 rounded-lg border-none outline-none text-base text-gray-700 font-medium focus:ring-2 focus:ring-blue-300"
            placeholder="Username"
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
          >
            Login
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
          >
            Register
          </button>
        </form>

        {/* Toggle to Login */}
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
