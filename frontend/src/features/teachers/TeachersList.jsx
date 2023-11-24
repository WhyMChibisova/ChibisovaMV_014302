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
    <div>
    <h2>Преподаватели</h2>
      {teachers.map((teacher) => (
        <div key={teacher.id} className="organization-container">
          <h2>
            <Link to={`/teachers/${teacher.id}`} className="title">
              {teacher.last_name}
            </Link>
          </h2>
          <p>{teacher.first_name}</p>
          <p>{teacher.patronymic}</p>
        </div>
      ))}
    </div>
  )
}

export default TeachersList
