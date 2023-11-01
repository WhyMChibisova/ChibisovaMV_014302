import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteOrganization, fetchOrganization } from "../../services/organizationService";

function OrganizationDetails() {
  const [organization, setOrganization] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentOrganization = async () => {
      try {
        const json = await fetchOrganization(id);
        setOrganization(json);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentOrganization();
  }, [id]);

  const deleteOrganizationHandler = async () => {
    try {
      await deleteOrganization(organization.id);
      navigate("/organizations");
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

if(!organization) return <h2>Загрузка...</h2>;

  return (
    <div>
      <h2>{organization.name}</h2>
      <p>{organization.email}</p>
      <p>{organization.address}</p>
      <p>{organization.description}</p>
      <div className="button">
        <button onClick={() => deleteOrganizationHandler()}>Удалить</button>
      </div>
      <Link to={`/organizations/${organization.id}/edit`}>Редактировать</Link>
      <Link to="/organizations">Назад</Link>
    </div>
  );
}

export default OrganizationDetails;
