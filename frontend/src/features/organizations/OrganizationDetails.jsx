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
    <div className="container">
      <h2 className="title mt">Название: {organization.name}</h2>

      <div className="item-footer">
        <p className="mt text-lg">Email: {organization.email}</p>
        <p className="mt mb text-lg">Адрес: {organization.address}</p>
        <label class="mt text-lg">Описание</label>
        <textarea class="form-text-area mt-sm" disabled>{organization.description}</textarea>
      </div>

      <button onClick={() => deleteOrganizationHandler()} className="button button-main mt">Удалить</button>

      <Link to={`/organizations/${organization.id}/edit`} className="button button-main mt ml">Редактировать</Link>
      <Link to="/organizations" className="button button-main mt ml">Назад</Link>
    </div>
  );
}

export default OrganizationDetails;
