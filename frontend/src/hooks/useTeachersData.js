import { useState, useEffect} from 'react';
import { fetchAllTeachers, searchTeachers } from "../services/teacherService";

function useTeachersData(searchTerm) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTeachers() {
      try {
        let data
        if (searchTerm) {
          data = await searchTeachers(searchTerm);
        } else {
          data = await fetchAllTeachers();
        }
        setTeachers(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch organizations: ", e);
      }
    }
    loadTeachers();
  }, [searchTerm]);

  return { teachers, loading, error };
}

export default useTeachersData;
