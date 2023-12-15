import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import { generateReport, deletePractice, fetchPractice } from "../../services/practiceService";

function PracticeDetails({ loggedIn }) {
  const [practice, setPractice] = useState(null);
  const [students, setStudents] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPractice = async () => {
      try {
        const json = await fetchPractice(id);
        setPractice(json.practice);
        setStudents(json.students);
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

  const generateReportHandler = async () => {
    try {
      await generateReport(practice.id, loggedIn.account.id);
      navigate("/practices");
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

if(!practice) return <h2>Загрузка...</h2>;

  return (
    <div className="container">
      <p className="icon"><Link to="/practices"><FaArrowLeft /></Link></p>
      { loggedIn.account.role === "teacher" &&
      <div className="text-right">
        <p className="mt icon"><Link to={`/practices/${practice.id}/edit`}><FaPen /></Link></p>
        <p className="mt ml icon">
            <button onClick={() => deletePracticeHandler()}><FaTrash /></button>
        </p>
      </div>}
      <h2 className="title mt">Группа: {practice.group_number}</h2>

      <div className="item-footer">
        <p className="mt text-lg">Вид: {practice.kind}</p>
        <p className="mt mb text-lg">Продолжительность: {practice.duration} недели</p>
        <p className="mt mb text-lg">Часов на студента: {practice.hours_per_student}</p>
        <p className="mt mb text-lg">Дата начала: {practice.start_date}</p>
        <p className="mt mb text-lg">Дата окончания: {practice.end_date}</p>
      </div>

      <div className="item-footer">
        <h2 className="title mb mt">Список студентов</h2>
        <div className="item-container">
          {students.map((student) => (
            <div key={student.id} className="item mb">
            <div className="text-right">
              <p className="icon"><Link to={`/students/${student.id}`}><FaInfoCircle /></Link></p>
            </div>
              <h2 className="text-bold">Фамилия: {student.last_name}</h2>
              <div className="item-footer">
                <p className="mt-sm">Имя: {student.first_name}</p>
                <p className="mt-sm">Отчество: {student.patronymic}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      { loggedIn.account.role === "teacher" &&
      <a href={`http://localhost:3000/practices/report/?id=${practice.id}&user_id=${loggedIn.account.id}`} target="_blank" rel="noreferrer noopener"
        onClick={() => generateReportHandler()} className="button button-main mt">Получить записку</a>}

    </div>
  );
}

export default PracticeDetails;
