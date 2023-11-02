import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createAccount } from "../../services/accountService";
import AccountForm from "./AccountForm";

function NewAccountForm() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (formData) => {
    try {
      const response = await createAccount(formData);
      navigate("sessions/new");
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

  return (
    <AccountForm
      headerText="Регистрация"
      onSubmit={handleCreateSubmit}
      buttonText="Зарегистрироваться" />
  );
}

export default NewAccountForm;
