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
    <div>
    <h2>Студенты</h2>
      {students.map((student) => (
        <div key={student.id} className="organization-container">
          <h2>
            <Link to={`/students/${student.id}`} className="title">
              {student.last_name}
            </Link>
          </h2>
          <p>{student.first_name}</p>
          <p>{student.patronymic}</p>
          <p>{student.group_number}</p>
          <p>{student.status}</p>
        </div>
      ))}
    </div>
  )
}

export default StudentsList
