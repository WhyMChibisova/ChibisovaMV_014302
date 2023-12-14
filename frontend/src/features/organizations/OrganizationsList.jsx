import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import SearchBar from "../../components/SearchBar";
import useOrganizationsData from "../../hooks/useOrganizationsData";
import useURLSearchParam from "../../hooks/useURLSearchParam";

function OrganizationsList({ loggedIn }) {
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
    <div className="container">
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      <h2 className="title-lg mb">Предприятия</h2>
      <div className="item-container">
        {organizations.map((organization) => (
          <div key={organization.id} className="item mb">
            <div className="text-right">
              <p className="icon"><Link to={`/organizations/${organization.id}`}><FaInfoCircle /></Link></p>
            </div>
            <h2 className="text-bold">Название: {organization.name}</h2>
            <div className="item-footer">
              <p className="mt-sm">Email: {organization.email}</p>
              <p className="mt-sm">Адрес: {organization.address}</p>
            </div>
          </div>
        ))}
      </div>
      { loggedIn.account.role === "teacher" &&
      <Link to={'/organizations/new'} className="button button-main mt">Добавить предприятие</Link>}
    </div>
  )
}

export default OrganizationsList;
