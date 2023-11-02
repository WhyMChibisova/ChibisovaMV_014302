import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateAccount, fetchAccount } from "../../services/accountService";
import AccountForm from "./AccountForm";

function EditAccountForm() {
  const [account, setAccount] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      try {
        const json = await fetchAccount(id);
        setAccount(json);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentAccount();
  }, [id]);

  const handleUpdateSubmit = async (formData) => {
    try {
      const response = await updateAccount(id, formData);
      navigate(`/accounts/${response.id}`);
    } catch (e) {
        console.error("An error occured: ", e);
    } finally {

    }
  };

  if(!account) return <h2>Загрузка...</h2>;

  return (
    <AccountForm
      account={ account }
      headerText="Редактирование аккаунта"
      onSubmit={handleUpdateSubmit}
      buttonText="Редактировать" />
  );
}

export default EditAccountForm;
