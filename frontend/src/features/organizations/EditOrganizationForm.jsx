import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateOrganization, fetchOrganization } from "../../services/organizationService";

function EditOrganizationForm() {
  const [organization, setOrganization] = useState(null);
  const { id } = useParams();
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentOrganization = async () => {
      try {
        const json = await fetchOrganization(id);
        setOrganization(json);
      } catch (e) {
        console.error("An error occured: ", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentOrganization();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOrganization = {
      name: organization.name,
      email: organization.email,
      address: organization.address,
      description: organization.description,
    }
    try {
      const response = await updateOrganization(id, updatedOrganization);
      navigate(`/organizations/${response.id}`);
    } catch (e) {
        console.error("An error occured: ", e);
    } finally {

    }
  };

  if(!organization) return <h2>Загрузка...</h2>;

  return (
    <div>
    <h2>Редактирование предприятия</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nameInput">Название:</label>
        <input
          id="nameInput"
          type="text"
          value={organization.name}
          onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="emailInput">Email:</label>
        <input
          id="emailInput"
          type="text"
          value={organization.email}
          onChange={(e) => setOrganization({...organization, email: e.target.value})}
          required
        />
      </div>
      <div>
        <label htmlFor="addressInput">Адрес:</label>
        <input
          id="addressInput"
          type="text"
          value={organization.address}
          onChange={(e) => setOrganization({...organization, address: e.target.value})}
          required
        />
      </div>
      <div>
        <label htmlFor="descriptionInput">Описание:</label>
        <textarea
          id="descriptionInput"
          value={organization.description}
          onChange={(e) => setOrganization({...organization, description: e.target.value})}
          required
        />
      </div>
      <div>
        <button type="submit">Редактировать</button>
      </div>
    </form>
    </div>
  );
}

export default EditOrganizationForm;
