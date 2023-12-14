import React from "react";
import { Link } from "react-router-dom";

function NotFound() {

  return (
    <div className="container text-center">
      <h2 className="title-lg mb-lg mt">Ошибка 404</h2>
      <p className="mt-lg mb-lg text-lg">Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует. <br />
      Возможно она устарела, была удалена, или был введен неверный адрес в адресной строке</p>
      <Link to={'/'} className="button button-main mt mb">Перейти на главную</Link>
    </div>
  );
}

export default NotFound;
