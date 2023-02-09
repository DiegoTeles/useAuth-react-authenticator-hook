import { useState } from 'react';
// Validate token
import jwtDecoder from '../utils/token-decoder';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if a session token is stored in local storage
    const token = localStorage.getItem('token');
    const isValid = jwtDecoder(token);
    return !!isValid;
  });

  const [token, setToken] = useState(() => {
    // Retrieve the session token from local storage
    return localStorage.getItem('token') || null;
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username, password) => {
    // Store the new session token in local storage
    try {
      // Example API call to retrieve a session token
      const response = await fetch('https://my-api.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const { token } = await response.json();

      if (token) {
        // Store the session token in local storage
        localStorage.setItem('token', token);
        setToken(token);
        setIsAuthenticated(true);
      } else {
        setError('Failed to retrieve session token');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove the session token from local storage
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, token, isLoading, error, login, logout };
}

export default useAuth;
