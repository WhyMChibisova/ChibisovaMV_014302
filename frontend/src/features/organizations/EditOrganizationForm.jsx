import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateOrganization, fetchOrganization } from "../../services/organizationService";
import OrganizationForm from "./OrganizationForm";

function EditOrganizationForm() {
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

  const handleUpdateSubmit = async (formData) => {
    try {
      const response = await updateOrganization(id, formData);
      navigate(`/organizations/${response.id}`);
    } catch (e) {
        console.error("An error occured: ", e);
    } finally {

    }
  };

  if(!organization) return <h2>Загрузка...</h2>;

  return (
    <OrganizationForm
      organization={ organization }
      headerText="Редактирование предприятия"
      onSubmit={handleUpdateSubmit}
      buttonText="Редактировать" />
  );
}

export default EditOrganizationForm;
