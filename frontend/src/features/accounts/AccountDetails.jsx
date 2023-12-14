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
        <p className="mt mb text-lg">{account.role}</p>
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

    </div>
  );
}

export default AccountDetails;
