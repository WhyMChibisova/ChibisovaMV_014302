import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateDocument, fetchDocument } from "../../services/documentService";
import DocumentForm from "./DocumentForm";

function EditDocumentForm({ loggedIn }) {
  const [document, setDocument] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentDocument = async () => {
      try {
        const json = await fetchDocument(id);
        setDocument(json.document);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentDocument();
  }, [id]);

  const handleUpdateSubmit = async (formData) => {
    const documentData = new FormData();

    documentData.append("document[mark]", formData.mark);
    documentData.append("document[comment]", formData.comment);
    if (formData.document) {
      documentData.append("document[document]", formData.document);
    }

    try {
      const response = await updateDocument(id, documentData, loggedIn.account.id);
      navigate(`/documents/${response.id}`);
    } catch (e) {
        console.error("An error occured: ", e);
    } finally {

    }
  };

  if(!document) return <h2>Загрузка...</h2>;

  return (
    <DocumentForm
      loggedIn={ loggedIn }
      document={ document }
      headerText="Редактирование документа"
      onSubmit={handleUpdateSubmit}
      buttonText="Редактировать" />
  );
}

export default EditDocumentForm;
