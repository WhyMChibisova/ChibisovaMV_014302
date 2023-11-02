import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Home({ loggedIn, handleLogout }) {
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
    <div>
      <p>{loggedIn.loggedInStatus}</p>
      <button onClick={() => handleLogoutClick()}>Выйти</button>
    </div>
  );
}

export default Home;
