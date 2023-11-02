import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/organizations">Предприятия</Link>
      <Link to="/accounts/new">Регистрация</Link>
    </nav>
  )
}

export default NavBar;