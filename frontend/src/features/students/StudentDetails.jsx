import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchStudent } from "../../services/studentService";

function StudentDetails() {
  const [student, setStudent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentStudent = async () => {
      try {
        const json = await fetchStudent(id);
        setStudent(json);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentStudent();
  }, [id]);

if(!student) return <h2>Загрузка...</h2>;

  return (
    <div className="container">
      <h2 className="title mt">Фамилия: {student.last_name}</h2>

      <div className="item-footer">
        <p className="mt text-lg">Имя: {student.first_name}</p>
        <p className="mt text-lg">Отчество: {student.patronymic}</p>
        <p className="mt text-lg">Номер группы: {student.group_number}</p>
        <p className="mt mb text-lg">Статус: {student.status}</p>
      </div>

      <Link to="/students" className="button button-main mt ml">Назад</Link>
    </div>
  );
}

export default StudentDetails;
