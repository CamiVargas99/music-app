import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    // que los campos no estén vacíos
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/session/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token en localStorage y actualizar el estado de autenticación
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/'); // Redirigir a la página de inicio
      } else {
        setError(data.message || 'Credenciales incorrectas'); // Mostrar error si las credenciales son incorrectas
      }
    } catch (error) {
      setError('Error en la conexión con el servidor'); // Error de conexión
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            className="login-input"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="login-error">{error}</p>} {/* Mostrar error si existe */}
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
