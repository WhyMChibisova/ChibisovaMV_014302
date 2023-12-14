import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { MdUpload } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { fetchAllDocuments } from "../../services/documentService";

function DocumentsList({ loggedIn }) {
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
            <div className="text-right">
              <p className="icon"><Link to={`/documents/${document.id}`}><FaInfoCircle /></Link></p>
            </div>
            <h2 className="text-bold">Владелец: {document.student_id}</h2>
            <div className="item-footer">
            </div>
          </div>
        ))}
      </div>
      { loggedIn.account.role === "student" &&
      <Link to={'/documents/new'} className="button button-main mt"><MdUpload />Загрузить документ</Link>
      }
    </div>
  )
}

export default DocumentsList;
