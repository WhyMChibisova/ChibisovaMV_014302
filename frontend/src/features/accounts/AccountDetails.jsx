import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import { deleteAccount, fetchAccount } from "../../services/accountService";

function AccountDetails() {
  const [account, setAccount] = useState(null);
  const [student, setStudent] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      try {
        const json = await fetchAccount(id);
        setAccount(json.account);
        setStudent(json.student);
        setTeacher(json.teacher);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentAccount();
  }, [id]);

  const deleteAccountHandler = async () => {
    try {
      await deleteAccount(account.id);
      navigate("/");
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

if(!account) return <h2>Загрузка...</h2>;

  return (
    <div className="container">
      <div className="text-right">
        <p className="mt icon"><Link to={`/accounts/${account.id}/edit`}><FaPen /></Link></p>
        <p className="mt ml icon">
            <button onClick={() => deleteAccountHandler()}><FaTrash /></button>
        </p>
      </div>
      {account.photo_url &&
        <img src={account.photo_url} alt={account.email} className="image" />
      }
      <h2 className="title mt-lg">Email: {account.email}</h2>

      <div className="item-footer">
        <p className="mt mb text-lg">Роль: {account.role}</p>
      </div>


        <h2 className="title mt-lg">Личные данные</h2>
        {student === null
          ? <div className="item-footer">
              <p className="mt mb text-lg">Фамилия: {teacher.last_name}</p>
              <p className="mt mb text-lg">Имя: {teacher.first_name}</p>
              <p className="mt mb text-lg">Отчество: {teacher.patronymic}</p>
              <p className="mt mb text-lg">Количество часов: {teacher.quantity_of_hours}</p>
            </div>
          : <div className="item-footer">
              <p className="mt mb text-lg">Фамилия: {student.last_name}</p>
              <p className="mt mb text-lg">Имя: {student.first_name}</p>
              <p className="mt mb text-lg">Отчество: {student.patronymic}</p>
              <p className="mt mb text-lg">Группа: {student.group_number}</p>
              <p className="mt mb text-lg">Статус: {student.status}</p>
            </div>
        }

        { teacher && teacher.students &&
          <div>
            <h2 className="title mt-lg">Мои студенты</h2>
            <div className="item-footer">
            <div className="item-container">
              {teacher.students.map((student) => (
                <div key={student.id} className="item mb">
                  <div className="text-right">
                    <p className="icon"><Link to={`/students/${student.id}`}><FaInfoCircle /></Link></p>
                  </div>
                  <h2 className="text-bold">Фамилия: {student.last_name}</h2>
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
          </div>
        }

        { student && student.organization &&
          <div>
            <h2 className="title mt-lg">Предприятие</h2>
            <div className="item-footer">
              <p className="mt mb text-lg">Предприятие: {student.organization.name}</p>
            </div>
          </div>
        }

        { student && student.teacher &&
          <div>
            <h2 className="title mt-lg">Преподаватель</h2>
            <div className="item-footer">
              <p className="mt mb text-lg">Преподаватель: {student.teacher.last_name}</p>
            </div>
          </div>
        }
        { student && student.documents &&
          <div>
            <h2 className="title mt-lg">Мои документы</h2>
            <div className="item-footer">
              <div className="item-container">
                {student.documents.map((document) => (
                  <div key={document.id} className="item mb">
                    <div className="text-right">
                      <p className="icon"><Link to={`/documents/${document.id}`}><FaInfoCircle /></Link></p>
                    </div>
                    <h2 className="text-bold">Владелец: {student.last_name}</h2>
                    <div className="item-footer">
                    <p className="mt-sm">Отметка: {document.mark}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

    </div>
  );
}

export default AccountDetails;
