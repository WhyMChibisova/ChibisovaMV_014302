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
    <div>
      <p>{student.last_name}</p>
      <p>{student.first_name}</p>
      <p>{student.patronymic}</p>
      <p>{student.group_number}</p>
      <p>{student.status}</p>
      <Link to="/students">Назад</Link>
    </div>
  );
}

export default StudentDetails;
