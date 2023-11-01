import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createOrganization } from "../../services/organizationService";

function NewOrganizationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const organizationData = { name, email, address, description};
    try {
      const response = await createOrganization(organizationData);
      navigate(`/organizations/${id}`);
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

  return (
    <div>
      <h2>Добавление предприятия</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput">Название:</label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="emailInput">Email:</label>
          <input
            id="emailInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="addressInput">Адрес:</label>
          <input
            id="addressInput"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descriptionInput">Описание:</label>
          <textarea
            id="descriptionInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Добавить</button>
        </div>
      </form>
    </div>
  );
}

export default NewOrganizationForm;
