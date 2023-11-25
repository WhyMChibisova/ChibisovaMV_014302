import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { fetchAllTeachers } from "../../services/teacherService";

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadTeachers() {
      try {
        const data = await fetchAllTeachers();
        setTeachers(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    loadTeachers();
  }, []);

  return (
    <div className="container">
      <h2 className="title-lg mb">Преподаватели</h2>
      <div className="item-container">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="item mb">
            <h2 className="text-bold">
              <Link to={`/teachers/${teacher.id}`}>
                {teacher.last_name}
              </Link>
            </h2>
            <div className="item-footer">
              <p className="mt-sm">Имя: {teacher.first_name}</p>
              <p className="mt-sm">Отчество: {teacher.patronymic}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeachersList
