import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPractice } from "../../services/practiceService";
import PracticeForm from "./PracticeForm";

function NewPracticeForm() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (formData) => {
    try {
      const response = await createPractice(formData);
      navigate(`/practices/${response.id}`);
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

  return (
    <PracticeForm
      headerText="Добавление практики"
      onSubmit={handleCreateSubmit}
      buttonText="Добавить" />
  );
}

export default NewPracticeForm;
