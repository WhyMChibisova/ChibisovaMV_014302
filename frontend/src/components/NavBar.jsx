import React, { useState, useRef, useEffect } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { FaRegUserCircle, FaSignInAlt } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function NavBar({ loggedIn, handleLogout }) {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    axios.delete('http://localhost:3000/logout', {withCredentials: true})
    .then(response => {
      handleLogout();
      navigate("/");
    })
    .catch(error => console.log('api errors:', error))
  };

  useClickOutside(menuRef, () => {
    if (isOpen) setTimeout(() => setOpen(false), 50);
  });

  if (!loggedIn) return <h2>Загрузка</h2>

  return (
    <nav className="navbar">
      <p className="title-sm text-bold"><Link to="/">practiceMe</Link></p>
      { loggedIn.loggedInStatus === 'LOGGED_IN' &&
      <div className="menu-container">
        <button className="title-lg menu-button" onClick={() => setOpen(!isOpen)}><MdMenuOpen /></button>
        <div className={`menu ${isOpen ? "active" : ""}`} ref={menuRef}>
          <ul className="menu-list">
            <li className="mt"><Link to="/organizations">Предприятия</Link></li>
            <li className="mt"><Link to="/practices">Практики</Link></li>
            <li className="mt"><Link to="/documents">Документы</Link></li>
          </ul>
        </div>
      </div>}
      {  loggedIn.account.role === "admin" &&
      <div>
        <p><Link to="/students">Студенты</Link></p>
        <p><Link to="/teachers">Преподаватели</Link></p>
      </div> }
      {loggedIn.loggedInStatus === 'NOT_LOGGED_IN'
        ? <div>
          <p className="button button-main"><Link to="/accounts/new">Регистрация</Link></p>
          <p className="button button-main ml"><Link to="/sessions/new">Вход</Link></p>
        </div>
        : <div>
          <span><Link to={`/accounts/${loggedIn.account.id}`}><FaRegUserCircle />  {loggedIn.account.email}</Link></span>
          <button onClick={() => handleLogoutClick()} className="button button-main ml"><FaSignInAlt /></button>
        </div> }
    </nav>
  )
}

export default NavBar;
