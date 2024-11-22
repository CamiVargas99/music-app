import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones en el frontend
    if (!formData.firstName || formData.firstName.length < 3) {
      setError('Por favor proporciona un nombre válido (al menos 3 caracteres).');
      return;
    }
    if (!formData.lastName || formData.lastName.length < 3) {
      setError('Por favor proporciona un apellido válido (al menos 3 caracteres).');
      return;
    }
    if (!formData.email) {
      setError('Por favor ingresa un correo válido.');
      return;
    }
    if (!formData.password || formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/session/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Guardar el token
        navigate('/'); // Redirigir a la página de inicio
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error desconocido');
      }
    } catch (error) {
      console.error("Error en el cliente:", error);
      setError('Error en la conexión al servidor');
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-box">
        <h2 className="register-title">Registro</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            name="firstName"
            className="register-input"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            className="register-input"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="register-input"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="register-input"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            className="register-input"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="register-error">{error}</p>}
          <button type="submit" className="register-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
