import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function TeacherForm({ account, teacher, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    account || {
      account: {
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        photo: "",
      }
    }
  );

  const [teacherData, setTeacherData] = useState(
    teacher || {
      teacher: {
        last_name: "",
        first_name: "",
        patronymic: "",
        quantity_of_hours: "",
      }
    }
  );

  return (
    <div className="container">
      <p className="icon"><Link to="/teachers"><FaArrowLeft /></Link></p>
      <h2 className="title-lg mb mt">{headerText}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData, teacherData);
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
        <div className="mt">
          <label htmlFor="role">Роль: </label>
          <select className="form-text-field"
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, account: { ...formData.account, role: e.target.value} })}
          required>
            <option value="teacher" className="mt-sm">Ответственный преподаватель</option>
            <option value="teacher_report" className="mt-sm">Преподаватель</option>
          </select>
        </div>
        <h2 className="title-lg mb mt-lg">Личные данные</h2>
        <div className="mt">
          <label htmlFor="last_name">Фамилия: </label>
          <input
            className="form-text-field"
            id="last_name"
            type="text"
            value={teacherData.last_name}
            onChange={(e) => setTeacherData({ ...teacherData, teacher: { ...teacherData.teacher, last_name: e.target.value} })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="first_name">Имя: </label>
          <input
            className="form-text-field"
            id="first_name"
            type="text"
            value={teacherData.first_name}
            onChange={(e) => setTeacherData({ ...teacherData, teacher: { ...teacherData.teacher, first_name: e.target.value} })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="patronymic">Отчество: </label>
          <input
            className="form-text-field"
            id="patronymic"
            type="text"
            value={teacherData.patronymic}
            onChange={(e) => setTeacherData({ ...teacherData, teacher: { ...teacherData.teacher, patronymic: e.target.value} })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="quantity_of_hours">Количество часов: </label>
          <input
            className="form-text-field"
            id="quantity_of_hours"
            type="number"
            value={teacherData.quantity_of_hours}
            onChange={(e) => setTeacherData({ ...teacherData, teacher: { ...teacherData.teacher, quantity_of_hours: e.target.value} })}
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

TeacherForm.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password_confirmation: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
  teacher: PropTypes.shape({
    last_name: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    patronymic: PropTypes.string.isRequired,
    quantity_of_hours: PropTypes.number.isRequired,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

TeacherForm.defaultProps = {
  account: null,
  teacher: null,
};

export default TeacherForm;
