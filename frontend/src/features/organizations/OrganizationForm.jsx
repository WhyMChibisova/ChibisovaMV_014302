import { useState } from "react";
import PropTypes from "prop-types";

function OrganizationForm({ organization, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    organization || {
      name: "",
      email: "",
      address: "",
      description: "",
    }
  );

  return (
    <div>
      <h2>{headerText}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        <div>
          <label htmlFor="name">Название:</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Адрес:</label>
          <input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit">{buttonText}</button>
        </div>
      </form>
    </div>
  );
}

OrganizationForm.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

OrganizationForm.defaultProps = {
  organization: null,
};

export default OrganizationForm;
