// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
// No useNavigate here, as AuthContext should be framework-agnostic.
// Redirection logic belongs in components that use the context.

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage to persist login
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true); // To manage initial load and API call loading
  const [error, setError] = useState(null); // For storing API errors

  // Axios instance for authenticated requests
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/auth', // Your backend auth API base URL
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add a request interceptor to attach the token for every request
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor for global error handling (e.g., token expiration)
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (err) => {
      // If error is 401 (Unauthorized) and it's not the login/register route
      // and it hasn't been retried, it might be an expired token
      if (err.response && err.response.status === 401 && !err.config._retry) {
        err.config._retry = true; // Mark as retried
        // For now, if 401, it means the token is bad, so force logout.
        // In a more complex app, you might try a refresh token flow here.
        console.error("Unauthorized: Token might be expired or invalid. Forcing client-side logout.");
        // We will call the client-side logout, which also removes the token.
        // We don't call the server-side /logout endpoint here to avoid
        // an infinite loop if the /logout endpoint itself requires a token.
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setError("Your session has expired. Please log in again.");
      }
      return Promise.reject(err);
    }
  );

  // Effect to handle initial loading and token persistence on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setToken(storedToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`; // Set header for initial instance
    }
    setLoading(false); // Finished initial loading check
  }, []); // Run only once on mount

  // Effect to persist token and user to localStorage whenever they change
  useEffect(() => {
    if (currentUser && token) {
      localStorage.setItem('user', JSON.stringify(currentUser));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization']; // Clear header on logout
    }
  }, [currentUser, token]);


  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post('/register', userData);
      setCurrentUser(res.data.user);
      setToken(res.data.token);
      return { success: true, user: res.data.user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      console.error('Registration error:', err.response?.data || err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post('/login', credentials);
      setCurrentUser(res.data.user);
      setToken(res.data.token);
      return { success: true, user: res.data.user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      console.error('Login error:', err.response?.data || err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      // Hit the backend logout endpoint (if it clears server-side cookies/sessions)
      // This is generally a GET request for logout, as it's an idempotent action.
      // We are sending the token in the header, as handled by the interceptor.
      await axiosInstance.get('/logout');
    } catch (err) {
      // Log error but proceed with client-side logout as token is cleared locally anyway
      console.error('Server-side logout error (proceeding with client-side logout):', err.response?.data || err);
    } finally {
      setCurrentUser(null);
      setToken(null);
      // localStorage items are removed by the useEffect hook
      setLoading(false);
      // No navigation here. Components using useAuth will handle redirection.
    }
  };

  // Function to fetch current user data (e.g., for profile page refresh)
  const fetchCurrentUser = async () => {
    if (!token) { // Can't fetch if no token
        setCurrentUser(null);
        return { success: false, error: "No token found." };
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get('/me');
      setCurrentUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch user data';
      setError(errorMessage);
      console.error('Fetch user error:', err.response?.data || err);
      // The interceptor might already handle 401, but a direct logout here is a fallback
      if (err.response && err.response.status === 401) {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };


  const value = {
    currentUser,
    token,
    loading,
    error,
    register,
    login,
    logout,
    fetchCurrentUser,
    axiosInstance // Expose axios instance for other authenticated calls outside auth context
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};