import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteDocument, fetchDocument } from "../../services/documentService";

function DocumentDetails() {
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

  const deleteDocumentHandler = async () => {
    try {
      await deleteDocument(document.id);
      navigate("/documents");
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

if(!document) return <h2>Загрузка...</h2>;

  return (
    <div>
      <h2>{document.student_id}</h2>
      <p>{document.mark}</p>
      <p>{document.comment}</p>
      <div className="button">
        <button onClick={() => deleteDocumentHandler()}>Удалить</button>
      </div>
      <Link to={`/documents/${document.id}/edit`}>Редактировать</Link>
      <Link to="/documents">Назад</Link>
    </div>
  );
}

export default DocumentDetails;
