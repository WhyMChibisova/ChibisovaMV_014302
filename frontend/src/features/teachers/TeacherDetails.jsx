import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchTeacher } from "../../services/teacherService";

function TeacherDetails() {
  const [teacher, setTeacher] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentTeacher = async () => {
      try {
        const json = await fetchTeacher(id);
        setTeacher(json);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentTeacher();
  }, [id]);

if(!teacher) return <h2>Загрузка...</h2>;

  return (
    <div className="container">
      <h2 className="title mt">Фамилия: {teacher.last_name}</h2>

      <div className="item-footer">
        <p className="mt text-lg">Имя: {teacher.first_name}</p>
        <p className="mt text-lg">Отчество: {teacher.patronymic}</p>
        <p className="mt mb text-lg">Количество часов: {teacher.quantity_of_hours}</p>
      </div>

      <Link to="/teachers" className="button button-main mt ml">Назад</Link>
    </div>
  );
}

export default TeacherDetails;
