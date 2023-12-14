import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BiSolidDownload } from "react-icons/bi";
import { FaArrowLeft, FaPen, FaTrash } from "react-icons/fa";
import { deleteDocument, fetchDocument } from "../../services/documentService";

function DocumentDetails({ loggedIn }) {
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
      <p className="icon"><Link to="/documents"><FaArrowLeft /></Link></p>
      { (loggedIn.account.role === "teacher" || loggedIn.account.id === document.student_id) &&
      <div className="text-right">
        <p className="mt icon"><Link to={`/documents/${document.id}/edit`}><FaPen /></Link></p>
        <p className="mt ml icon">
            <button onClick={() => deleteDocumentHandler()}><FaTrash /></button>
        </p>
      </div>
      }
      <h2 className="title mt">Владелец: {document.student_id}</h2>

      <div className="item-footer">
        <p className="mt text-lg">Отметка: {document.mark}</p>
        <label className="mt text-lg">Комментарий</label>
        <textarea className="form-text-area mt-sm" disabled>{document.comment}</textarea>
      </div>

    </div>
  );
}

export default DocumentDetails;
