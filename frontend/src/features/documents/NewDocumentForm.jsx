import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createDocument } from "../../services/documentService";
import DocumentForm from "./DocumentForm";

function NewDocumentForm() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (formData) => {
    try {
      const response = await createDocument(formData);
      navigate(`/documents/${response.id}`);
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

  return (
    <DocumentForm
      headerText="Добавление документа"
      onSubmit={handleCreateSubmit}
      buttonText="Добавить" />
  );
}

export default NewDocumentForm;
