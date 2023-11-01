import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { fetchAllOrganizations } from "../../services/organizationService";

function OrganizationsList() {
  const [organizations, setOrganizations] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadOrganizations() {
      try {
        const data = await fetchAllOrganizations();
        setOrganizations(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    loadOrganizations();
  }, []);

  return (
    <div>
    <h2>Предприятия</h2>
      {organizations.map((organization) => (
        <div key={organization.id} className="organization-container">
          <h2>
            <Link to={`/organizations/${organization.id}`} className="title">
              {organization.name}
            </Link>
          </h2>
          <p>{organization.email}</p>
          <p>{organization.address}</p>
          <p>{organization.description}</p>
        </div>
      ))}
      <Link to={'/organizations/new'} className="button">Добавить предприятие</Link>
    </div>
  )
}

export default OrganizationsList;
