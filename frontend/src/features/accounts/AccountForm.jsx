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
    <div className="container">
      <h2 className="title-lg mb mt">{headerText}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData, studentData);
      }}>
        <div className="mt">
          <label htmlFor="photo">Фото профиля: </label>
          <input
            className="form-file-field"
            id="photo"
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, account: { ...formData.account, photo: e.target.files[0]} })}
          />
        </div>
        <div className="mt">
          <label htmlFor="email">Email: </label>
          <input
            className="form-text-field"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, account: { ...formData.account, email: e.target.value} })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="password">Пароль: </label>
          <input
            className="form-text-field"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, account: { ...formData.account, password: e.target.value} })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="password_confirmation">Подтверждение пароля: </label>
          <input
            className="form-text-field"
            id="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, account: { ...formData.account, password_confirmation: e.target.value} })}
            required
          />
        </div>
        <h2 className="title-lg mb mt-lg">Личные данные</h2>
        <div className="mt">
          <label htmlFor="last_name">Фамилия: </label>
          <input
            className="form-text-field"
            id="last_name"
            type="text"
            value={studentData.last_name}
            onChange={(e) => setStudentData({ ...studentData, student: { ...studentData.student, last_name: e.target.value} })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="first_name">Имя: </label>
          <input
            className="form-text-field"
            id="first_name"
            type="text"
            value={studentData.first_name}
            onChange={(e) => setStudentData({ ...studentData, student: { ...studentData.student, first_name: e.target.value} })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="patronymic">Отчество: </label>
          <input
            className="form-text-field"
            id="patronymic"
            type="text"
            value={studentData.patronymic}
            onChange={(e) => setStudentData({ ...studentData, student: { ...studentData.student, patronymic: e.target.value} })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="group_number">Номер группы: </label>
          <input
            className="form-text-field"
            id="group_number"
            type="text"
            value={studentData.group_number}
            onChange={(e) => setStudentData({ ...studentData, student: { ...studentData.student, group_number: e.target.value} })}
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
