import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BiSolidDownload } from "react-icons/bi";
import { FaArrowLeft, FaPen, FaTrash } from "react-icons/fa";
import { deleteDocument, fetchDocument } from "../../services/documentService";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function DocumentDetails({ loggedIn }) {
  const [document, setDocument] = useState(null);
  const [student, setStudent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentDocument = async () => {
      try {
        const json = await fetchDocument(id);
        setDocument(json.document);
        setStudent(json.student);
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
      <div className="text-right">
      { (loggedIn.account.role === "teacher" || loggedIn.account.role === "teacher_report" || loggedIn.account.id === student.account_id) &&
        <p className="mt icon"><Link to={`/documents/${document.id}/edit`}><FaPen /></Link></p>}
      { (loggedIn.account.id === student.account_id) &&
        <p className="mt ml icon">
            <button onClick={() => deleteDocumentHandler()}><FaTrash /></button>
        </p>}
      </div>

      <h2 className="title mt">Владелец: {student.last_name}</h2>

      <div className="item-footer">
        <p className="mt text-lg">Отметка: {document.mark}</p>
        <label className="mt text-lg">Комментарий</label>
        <textarea className="form-text-area mt-sm" disabled>{document.comment}</textarea>
      </div>

      {document.document_url && <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                    <Viewer fileUrl={document.document_url} viewMode="ViewMode.DualPage" />
                                </Worker>}

    </div>
  );
}

export default DocumentDetails;
