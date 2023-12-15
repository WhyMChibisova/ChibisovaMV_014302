import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createDocument } from "../../services/documentService";
import DocumentForm from "./DocumentForm";

function NewDocumentForm({ loggedIn }) {
  const navigate = useNavigate();

  const handleCreateSubmit = async (formData) => {
    const documentData = new FormData();

    documentData.append("document[mark]", formData.mark);
    documentData.append("document[comment]", formData.comment);
    documentData.append("document[student_id]", loggedIn.account.id);
    documentData.append("document[document]", formData.document);

    try {
      const response = await createDocument(documentData);
      navigate(`/documents/${response.id}`);
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

  return (
    <DocumentForm
      loggedIn={ loggedIn }
      headerText="Добавление документа"
      onSubmit={handleCreateSubmit}
      buttonText="Добавить" />
  );
}

export default NewDocumentForm;
