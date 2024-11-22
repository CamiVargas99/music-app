import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token'); // Verifica el token directamente

  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
