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
    <div className="container">
      <h2 className="title-lg mb">Документы</h2>
      <div className="item-container">
        {documents.map((document) => (
          <div key={document.id} className="item mb">
            <h2 className="text-bold">Владелец: 
              <Link to={`/documents/${document.id}`}>
                {document.student_id}
              </Link>
            </h2>
            <div className="item-footer">
            </div>
          </div>
        ))}
      </div>
      <Link to={'/documents/new'} className="button button-main mt">Добавить документ</Link>
    </div>
  )
}

export default DocumentsList;
