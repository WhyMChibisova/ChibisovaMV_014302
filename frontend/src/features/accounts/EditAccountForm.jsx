import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateAccount, fetchAccount } from "../../services/accountService";
import { updateStudent } from "../../services/studentService";
import EditForm from "./EditForm";

function EditAccountForm() {
  const [account, setAccount] = useState(null);
  const [student, setStudent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      try {
        const json = await fetchAccount(id);
        setAccount(json.account);
        setStudent(json.student);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentAccount();
  }, [id]);

  const handleUpdateSubmit = async (formData, studentData) => {
    const accountData = new FormData();

    accountData.append("account[email]", formData.email);
    accountData.append("account[photo]", formData.photo);

    try {
      const response = await updateAccount(id, accountData);
      const response2 = await updateStudent(student.id, studentData);
      navigate(`/accounts/${response.id}`);
    } catch (e) {
        console.error("An error occured: ", e);
    } finally {

    }
  };

  if(!account) return <h2>Загрузка...</h2>;

  return (
    <EditForm
      account={ account }
      student={ student }
      headerText="Редактирование аккаунта"
      onSubmit={handleUpdateSubmit}
      buttonText="Редактировать" />
  );
}

export default EditAccountForm;
