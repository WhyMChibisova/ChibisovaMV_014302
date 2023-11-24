import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { fetchAllDocuments } from "../../services/documentService";

function DocumentsList() {
  const [documents, setDocuments] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadDocuments() {
      try {
        const data = await fetchAllDocuments();
        setDocuments(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    loadDocuments();
  }, []);

  return (
    <div>
    <h2>Документы</h2>
      {documents.map((document) => (
        <div key={document.id} className="organization-container">
          <h2>
            <Link to={`/documents/${document.id}`} className="title">
              {document.student_id}
            </Link>
          </h2>
        </div>
      ))}
      <Link to={'/documents/new'} className="button">Добавить документ</Link>
    </div>
  )
}

export default DocumentsList;
