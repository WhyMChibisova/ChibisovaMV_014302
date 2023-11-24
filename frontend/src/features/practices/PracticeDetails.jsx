import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deletePractice, fetchPractice } from "../../services/practiceService";

function PracticeDetails() {
  const [practice, setPractice] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPractice = async () => {
      try {
        const json = await fetchPractice(id);
        setPractice(json);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentPractice();
  }, [id]);

  const deletePracticeHandler = async () => {
    try {
      await deletePractice(practice.id);
      navigate("/practices");
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

if(!practice) return <h2>Загрузка...</h2>;

  return (
    <div>
      <p>{practice.kind}</p>
      <p>{practice.duratation}</p>
      <h2>{practice.hours_per_student}</h2>
      <h2>Список студентов</h2>
      {practice.students.map((student) => (
        <div key={student.id} className="organization-container">
          <h2>
            <Link to={`/students`} className="title">
              {student.id}
            </Link>
          </h2>
          <p>{student.last_name}</p>
          <p>{student.first_name}</p>
        </div>
      ))}
      <div className="button">
        <button onClick={() => deletePracticeHandler()}>Удалить</button>
      </div>
      <Link to={`/practices/${practice.id}/edit`}>Редактировать</Link>
      <Link to="/practices">Назад</Link>
    </div>
  );
}

export default PracticeDetails;
