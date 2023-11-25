import { useState, useEffect} from 'react';
import { fetchAllStudents, searchStudents } from "../services/studentService";

function useStudentsData(searchTerm) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        let data
        if (searchTerm) {
          data = await searchStudents(searchTerm);
        } else {
          data = await fetchAllStudents();
        }
        setStudents(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch organizations: ", e);
      }
    }
    loadStudents();
  }, [searchTerm]);

  return { students, loading, error };
}

export default useStudentsData;
