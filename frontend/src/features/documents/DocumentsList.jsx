import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { MdUpload } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import useDocumentsData from "../../hooks/useDocumentsData";
import useURLSearchParam from "../../hooks/useURLSearchParam";

function DocumentsList({ loggedIn }) {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("search");

  const {
    documents: fetchedDocuments,
    loading,
    error,
  } = useDocumentsData(debouncedSearchTerm);

  useEffect(() => {
    if (fetchedDocuments) {
      setDocuments(fetchedDocuments);
    }
  }, [fetchedDocuments]);

  const handleImmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleDebouncedSearchChange = (searchValue) => {
    setDebouncedSearchTerm(searchValue);
  };

  return (
    <div className="container">
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      <h2 className="title-lg mb">Документы</h2>
      <div className="item-container">
        {documents.map((document) => (
          <div key={document.id} className="item mb">
            <div className="text-right">
              <p className="icon"><Link to={`/documents/${document.id}`}><FaInfoCircle /></Link></p>
            </div>
            <h2 className="text-bold">Владелец: {document.student.last_name}</h2>
            <div className="item-footer">
            <p className="mt-sm">Отметка: {document.mark}</p>
            </div>
          </div>
        ))}
      </div>
      { loggedIn.account.role === "student" &&
      <Link to={'/documents/new'} className="button button-main mt"><MdUpload /></Link>
      }
    </div>
  )
}

export default DocumentsList;
