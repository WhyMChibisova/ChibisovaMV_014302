import React, { useState, useEffect} from 'react';

function OrganizationsList() {
  const [organizations, setOrganizations] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadOrganizations() {
      try {
        const response = await fetch('http://localhost:3000/organizations');
        if (response.ok) {
          const json = await response.json();
          setOrganizations(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occured.Awkward...");
        console.log("An error occured: ", e);
      } finally {
        setLoading(false);
      }
    }
    loadOrganizations();
  }, []);

  return (
    <div>
      {organizations.map((organization) => (
        <div key={organization.id} className="organization-container">
          <h2>{organization.name}</h2>
          <p>{organization.email}</p>
          <p>{organization.address}</p>
          <p>{organization.description}</p>
        </div>
      ))}
    </div>
  )
}

export default OrganizationsList;
