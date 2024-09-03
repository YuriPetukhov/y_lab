import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    if (id === 'password') {
      const minLength = 8;
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*]/.test(value);
      const isLatin = /^[A-Za-z\d!@#$%^&*]+$/.test(value);

      if (value.length < minLength) {
        setPasswordError(`Пароль должен содержать минимум ${minLength} символов.`);
      } else if (!hasNumber) {
        setPasswordError('Пароль должен содержать хотя бы одну цифру.');
      } else if (!hasSpecialChar) {
        setPasswordError('Пароль должен содержать хотя бы один специальный символ (!@#$%^&*).');
      } else if (!isLatin) {
        setPasswordError('Пароль должен содержать только латинские буквы.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordError) {
      alert('Пожалуйста, исправьте ошибки в пароле перед отправкой формы.');
      return;
    }

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="registration-form">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@example.com"
            autoComplete="new-email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            pattern="(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}"
            title="Пароль должен содержать минимум 8 символов, включая одну цифру, один специальный символ (!@#$%^&*), и использовать только латинские буквы."
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
