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
    <div className="container">
      <h2 className="title mt">Владелец: {document.student_id}</h2>

      <div className="item-footer">
        <p className="mt text-lg">Отметка: {document.mark}</p>
        <label class="mt text-lg">Комментарий</label>
        <textarea class="form-text-area mt-sm" disabled>{document.comment}</textarea>
      </div>

      <button onClick={() => deleteDocumentHandler()} className="button button-main mt">Удалить</button>

      <Link to={`/documents/${document.id}/edit`} className="button button-main mt ml">Редактировать</Link>
      <Link to="/documents" className="button button-main mt ml">Назад</Link>
    </div>
  );
}

export default DocumentDetails;
