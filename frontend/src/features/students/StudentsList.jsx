import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { fetchAllStudents } from "../../services/studentService";

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await fetchAllStudents();
        setStudents(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    loadStudents();
  }, []);

  return (
    <div className="container">
      <h2 className="title-lg mb">Студенты</h2>
      <div className="item-container">
        {students.map((student) => (
          <div key={student.id} className="item mb">
            <h2 className="text-bold">
              <Link to={`/students/${student.id}`}>
                {student.last_name}
              </Link>
            </h2>
            <div className="item-footer">
              <p className="mt-sm">Имя: {student.first_name}</p>
              <p className="mt-sm">Отчество: {student.patronymic}</p>
              <p className="mt-sm">Номер группы: {student.group_number}</p>
              <p className="mt-sm">Статус: {student.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentsList
