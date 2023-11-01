import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createOrganization } from "../../services/organizationService";
import OrganizationForm from "./OrganizationForm";

function NewOrganizationForm() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (formData) => {
    try {
      const response = await createOrganization(formData);
      navigate(`/organizations/${response.id}`);
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

  return (
    <OrganizationForm
      headerText="Добавление предприятия"
      onSubmit={handleCreateSubmit}
      buttonText="Добавить" />
  );
}

export default NewOrganizationForm;
