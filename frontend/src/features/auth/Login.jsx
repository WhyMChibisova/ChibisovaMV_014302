import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const account = {
      email: formData.email,
      password: formData.password,
    }

    axios.post('http://localhost:3000/sessions', {account}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        handleLogin(response.data)
        navigate(`/accounts/${response.data.account.id}`);
      } else {
        console.error("An error occured: ", e);
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  return (
    <div className="container">
      <h2 className="title-lg mb mt">Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt">
          <label htmlFor="email">Email: </label>
          <input
            className="form-text-field"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="password">Пароль: </label>
          <input
            className="form-text-field"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit" className="button button-main mt">Войти</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
