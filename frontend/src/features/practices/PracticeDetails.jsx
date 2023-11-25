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
    <div className="container">
      <h2 className="title mt">Вид: {practice.kind}</h2>

      <div className="item-footer">
        <p className="mt text-lg">Продолжительность: {practice.duration}</p>
        <p className="mt mb text-lg">Часов на студента: {practice.hours_per_student}</p>
      </div>

      <div className="container">
        <h2 className="title mb">Список студентов</h2>
        <div className="item-container">
          {practice.students.map((student) => (
            <div key={student.id} className="item mb">
              <h2 className="text-bold">
                <Link to={`/students/${student.id}`} className="title">
                  Фамилия: {student.id}
                </Link>
              </h2>
              <div className="item-footer">
                <p className="mt-sm">Имя :{student.last_name}</p>
                <p className="mt-sm">Отчество: {student.first_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => deletePracticeHandler()} className="button button-main mt">Удалить</button>

      <Link to={`/practices/${practice.id}/edit`} className="button button-main mt ml">Редактировать</Link>
      <Link to="/practices" className="button button-main mt ml">Назад</Link>
    </div>
  );
}

export default PracticeDetails;
