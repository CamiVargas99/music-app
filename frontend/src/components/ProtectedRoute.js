import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, component: Component }) => {
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;