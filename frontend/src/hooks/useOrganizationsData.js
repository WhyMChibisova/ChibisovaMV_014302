import { useState, useEffect} from 'react';
import { fetchAllOrganizations, searchOrganizations } from "../services/organizationService";

function useOrganizationsData(searchTerm) {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadOrganizations() {
      try {
        let data
        if (searchTerm) {
          data = await searchOrganizations(searchTerm);
        } else {
          data = await fetchAllOrganizations();
        }
        setOrganizations(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch organizations: ", e);
      }
    }
    loadOrganizations();
  }, [searchTerm]);

  return { organizations, loading, error };
}

export default useOrganizationsData;
