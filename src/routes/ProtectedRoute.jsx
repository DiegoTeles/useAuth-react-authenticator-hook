import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import jwtDecoder from '../utils/token-decoder';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let navigate = useNavigate();
  const { isAuthenticated, loading, token } = useAuth();

  useEffect(() => {
    const tokenIsValid = jwtDecoder(token);
    if (!tokenIsValid) {
      return navigate('/login');
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
