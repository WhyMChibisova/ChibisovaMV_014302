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
    <div className="container">
      <h2 className="title-lg mb mt">Добро пожаловать!</h2>
    </div>
  );
}

export default Home;
