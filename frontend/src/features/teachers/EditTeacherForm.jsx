import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateAccount, fetchAccount } from "../../services/accountService";
import { updateTeacher } from "../../services/teacherService";
import EditForm from "./EditForm";

function EditAccountForm({ loggedIn }) {
  const [account, setAccount] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      try {
        const json = await fetchAccount(id);
        setAccount(json.account);
        setTeacher(json.teacher);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentAccount();
  }, [id]);

  const handleUpdateSubmit = async (formData, teacherData) => {
    const accountData = new FormData();

    accountData.append("account[email]", formData.email);
    if (formData.photo) {
      accountData.append("account[photo]", formData.photo);
    }

    try {
      const response = await updateAccount(id, accountData);
      const response2 = await updateTeacher(teacher.id, teacherData);
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
      teacher={ teacher }
      headerText="Редактирование аккаунта"
      onSubmit={handleUpdateSubmit}
      buttonText="Редактировать" />
  );
}

export default EditAccountForm;
