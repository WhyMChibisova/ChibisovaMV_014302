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
    <div>
      <p>{teacher.last_name}</p>
      <p>{teacher.first_name}</p>
      <p>{teacher.patronymic}</p>
      <p>{teacher.quantity_of_hours}</p>
      <Link to="/teachers">Назад</Link>
    </div>
  );
}

export default TeacherDetails;
