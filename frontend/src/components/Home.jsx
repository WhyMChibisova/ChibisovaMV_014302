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
      <div className="container">
        <h2 className="title-lg mb mt">Добро пожаловать!</h2>
      </div>
      <div className="container">
        <h2 className="title mb mt">practiceMe - сайт для управления практикой в учебных заведениях</h2>
        <h2 className="title mb mt"><a href={"https://www.bsuir.by/ru/kaf-piks/praktika"} target="_blank">Нормативные документы</a> по практике БГУИР</h2>
      </div>
    </div>
  );
}

export default Home;
