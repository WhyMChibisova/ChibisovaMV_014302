import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
    <Link to="/">practiceMe</Link>
      <Link to="/organizations">Предприятия</Link>
      <Link to="/practices">Практики</Link>
      <Link to="/students">Студенты</Link>
      <Link to="/teachers">Преподаватели</Link>
      <Link to="/documents">Документы</Link>
      <Link to="/accounts/new">Регистрация</Link>
      <Link to="/sessions/new">Авторизация</Link>
    </nav>
  )
}

export default NavBar;
