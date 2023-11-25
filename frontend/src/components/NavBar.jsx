import React from "react";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function NavBar({ loggedIn, handleLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    axios.delete('http://localhost:3000/logout', {withCredentials: true})
    .then(response => {
      handleLogout();
      navigate("/");
    })
    .catch(error => console.log('api errors:', error))
  };

  return (
    <nav className="navbar">
      <p className="title-sm text-bold"><Link to="/">practiceMe</Link></p>
      <div>
        <p><Link to="/organizations">Предприятия</Link></p>
        <p><Link to="/practices">Практики</Link></p>
        <p><Link to="/documents">Документы</Link></p>
      </div>
      <div>
        <p><Link to="/students">Студенты</Link></p>
        <p><Link to="/teachers">Преподаватели</Link></p>
      </div>
      {loggedIn.loggedInStatus === 'NOT_LOGGED_IN'
        ? <div>
          <p className="button button-main"><Link to="/accounts/new">Регистрация</Link></p>
          <p className="button button-main ml"><Link to="/sessions/new">Вход</Link></p>
        </div>
        : <div>
          <p><Link to={`/accounts/${loggedIn.account.id}`}>{loggedIn.account.email}</Link></p>
          <button onClick={() => handleLogoutClick()} className="button button-main">Выйти</button>
        </div> }
    </nav>
  )
}

export default NavBar;
