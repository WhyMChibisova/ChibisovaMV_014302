import { useState } from "react";
import PropTypes from "prop-types";

function AccountForm({ account, student, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    account || {
      account: {
        email: "",
        password: "",
        password_confirmation: "",
        photo: "",
      }
    }
  );

  const [studentData, setStudentData] = useState(
    student || {
      student: {
        last_name: "",
        first_name: "",
        patronymic: "",
        group_number: "",
      }
    }
  );

  return (
    <div>
      <h2>{headerText}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData, studentData);
      }}>
      <div>
        <label htmlFor="photo">Фото профиля:</label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, account: { ...formData.account, photo: e.target.files[0]} })}
        />
      </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, account: { ...formData.account, email: e.target.value} })}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, account: { ...formData.account, password: e.target.value} })}
            required
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">Подтверждение пароля:</label>
          <input
            id="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, account: { ...formData.account, password_confirmation: e.target.value} })}
            required
          />
        </div>
        <h2>Личные данные</h2>
        <div>
          <label htmlFor="last_name">Фамилия:</label>
          <input
            id="last_name"
            type="text"
            value={studentData.last_name}
            onChange={(e) => setStudentData({ ...studentData, student: { ...studentData.student, last_name: e.target.value} })}
            required
          />
        </div>
        <div>
          <label htmlFor="first_name">Имя:</label>
          <input
            id="first_name"
            type="text"
            value={studentData.first_name}
            onChange={(e) => setStudentData({ ...studentData, student: { ...studentData.student, first_name: e.target.value} })}
            required
          />
        </div>
        <div>
          <label htmlFor="patronymic">Отчество:</label>
          <input
            id="patronymic"
            type="text"
            value={studentData.patronymic}
            onChange={(e) => setStudentData({ ...studentData, student: { ...studentData.student, patronymic: e.target.value} })}
            required
          />
        </div>
        <div>
          <label htmlFor="group_number">Номер группы:</label>
          <input
            id="group_number"
            type="text"
            value={studentData.group_number}
            onChange={(e) => setStudentData({ ...studentData, student: { ...studentData.student, group_number: e.target.value} })}
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
  student: PropTypes.shape({
    last_name: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    patronymic: PropTypes.string.isRequired,
    group_number: PropTypes.string.isRequired,
    status: PropTypes.string,
    account_id: PropTypes.number,
    practice_id: PropTypes.number,
    teacher_id: PropTypes.number,
    organization_id: PropTypes.number,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

AccountForm.defaultProps = {
  account: null,
  student: null,
};

export default AccountForm;
