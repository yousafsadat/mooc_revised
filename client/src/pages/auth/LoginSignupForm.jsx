// client/src/pages/auth/LoginSignupForm.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginSignupForm = () => {
  const { login, register, currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password || !loginData.role) {
      setMessage("Please enter all login fields including role.");
      return;
    }
    const res = await login(loginData);
    if (res.success) {
      setMessage("Login successful!");
      const redirectTo =
        res.user.role === "admin"
          ? "/admin/dashboard"
          : res.user.role === "instructor"
          ? "/instructor/dashboard"
          : "/student/dashboard";
      navigate(redirectTo);
    }
  };

  // Register state
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password ||
      !registerData.role
    ) {
      setMessage("Please fill in all registration fields.");
      return;
    }
    const res = await register(registerData);
    if (res.success) {
      setMessage("Registration successful!");
      const redirectTo =
        res.user.role === "admin"
          ? "/admin/dashboard"
          : res.user.role === "instructor"
          ? "/instructor/dashboard"
          : "/student/dashboard";
      navigate(redirectTo);
    }
  };

  // Auto redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      const redirectTo =
        currentUser.role === "admin"
          ? "/admin/dashboard"
          : currentUser.role === "instructor"
          ? "/instructor/dashboard"
          : "/student/dashboard";
      navigate(redirectTo);
    }
  }, [currentUser, navigate]);

  if (currentUser) return null;

  return (
    <div className="relative w-full max-w-4xl h-[550px] bg-white mx-auto my-8 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center">
      {/* Background bubble */}
      <div className="absolute w-full h-full pointer-events-none">
        <div
          className={`absolute bg-blue-400 rounded-[150px] transition-all duration-[1800ms] ease-in-out z-10
            ${isActive ? "left-1/2 -translate-x-1/2 w-[300%] h-full" : "-left-[250%] w-[300%] h-full"}`}
        ></div>
      </div>

      {/* Login Form */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-white flex flex-col items-center justify-center p-10 z-30 transition-all duration-700
        ${isActive ? "translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}`}
      >
        <form
          className="w-full max-w-sm mx-auto space-y-5"
          onSubmit={handleLoginSubmit}
        >
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          {message && <p className="text-sm text-green-500">{message}</p>}
          <select
            name="role"
            value={loginData.role}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, role: e.target.value }))
            }
            required
            className="w-full py-3 px-5 bg-gray-100 rounded-lg"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full py-3 px-5 bg-gray-100 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full py-3 px-5 bg-gray-100 rounded-lg"
          />
          <button
            type="submit"
            className="w-full h-12 bg-blue-500 rounded-lg shadow text-white"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>

      {/* Register Form */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-white flex flex-col items-center justify-center p-10 z-30 transition-all duration-700
        ${isActive ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
      >
        <form
          className="w-full max-w-sm mx-auto space-y-5"
          onSubmit={handleRegisterSubmit}
        >
          <h1 className="text-3xl font-bold mb-2">Register</h1>
          {message && <p className="text-sm text-green-500">{message}</p>}
          <select
            name="role"
            value={registerData.role}
            onChange={(e) =>
              setRegisterData((prev) => ({ ...prev, role: e.target.value }))
            }
            required
            className="w-full py-3 px-5 bg-gray-100 rounded-lg"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) =>
              setRegisterData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="w-full py-3 px-5 bg-gray-100 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full py-3 px-5 bg-gray-100 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full py-3 px-5 bg-gray-100 rounded-lg"
          />
          <button
            type="submit"
            className="w-full h-12 bg-blue-500 rounded-lg shadow text-white"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignupForm;
