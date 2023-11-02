import { useState } from "react";
import PropTypes from "prop-types";

function AccountForm({ account, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    account || {
      email: "",
      password: "",
      password_confirmation: "",
    }
  );

  const accountData = { account: {
    email: formData.email,
    password: formData.password,
    password_confirmation: formData.password_confirmation
  }}

  return (
    <div>
      <h2>{headerText}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(accountData);
      }}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">Подтверждение пароля:</label>
          <input
            id="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
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

AccountForm.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password_confirmation: PropTypes.string.isRequired,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

AccountForm.defaultProps = {
  account: null,
};

export default AccountForm;
