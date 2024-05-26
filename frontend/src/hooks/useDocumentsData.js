import { useState, useEffect} from 'react';
import { fetchAllDocuments, searchDocuments } from "../services/documentService";

function useDocumentsData(searchTerm) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDocuments() {
      try {
        let data
        if (searchTerm) {
          data = await searchDocuments(searchTerm);
        } else {
          data = await fetchAllDocuments();
        }
        setDocuments(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch documents: ", e);
      }
    }
    loadDocuments();
  }, [searchTerm]);

  return { documents, loading, error };
}

export default useDocumentsData;
