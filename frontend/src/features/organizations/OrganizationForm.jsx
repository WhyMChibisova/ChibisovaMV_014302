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
    <div className="container">
      <h2 className="title-lg mb mt">{headerText}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        <div className="mt">
          <label htmlFor="name">Название: </label>
          <input
            className="form-text-field"
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="email" className="mt">Email: </label>
          <input
            className="form-text-field"
            id="email"
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="address" className="mt">Адрес: </label>
          <input
            className="form-text-field"
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="description" className="mt">Описание: </label>
          <textarea
            className="form-text-area"
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit" className="button button-main mt">{buttonText}</button>
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
