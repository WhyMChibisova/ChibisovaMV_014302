import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import SearchBar from "../../components/SearchBar";
import useOrganizationsData from "../../hooks/useOrganizationsData";
import useURLSearchParam from "../../hooks/useURLSearchParam";

function OrganizationsList() {
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("search");

  const {
    organizations: fetchedOrganizations,
    loading,
    error,
  } = useOrganizationsData(debouncedSearchTerm);

  useEffect(() => {
    if (fetchedOrganizations) {
      setOrganizations(fetchedOrganizations);
    }
  }, [fetchedOrganizations]);

  const handleImmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleDebouncedSearchChange = (searchValue) => {
    setDebouncedSearchTerm(searchValue);
  };

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
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
