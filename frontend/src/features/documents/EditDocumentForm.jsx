import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateDocument, fetchDocument } from "../../services/documentService";
import DocumentForm from "./DocumentForm";

function EditDocumentForm() {
  const [document, setDocument] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentDocument = async () => {
      try {
        const json = await fetchDocument(id);
        setDocument(json);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentDocument();
  }, [id]);

  const handleUpdateSubmit = async (formData) => {
    try {
      const response = await updateDocument(id, formData);
      navigate(`/documents/${response.id}`);
    } catch (e) {
        console.error("An error occured: ", e);
    } finally {

    }
  };

  if(!document) return <h2>Загрузка...</h2>;

  return (
    <DocumentForm
      document={ document }
      headerText="Редактирование документа"
      onSubmit={handleUpdateSubmit}
      buttonText="Редактировать" />
  );
}

export default EditDocumentForm;
