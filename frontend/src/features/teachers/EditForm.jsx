import { useState } from "react";
import PropTypes from "prop-types";

function EditForm({ account, teacher, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    account || {
      account: {
        email: "",
        photo: ""
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
            onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
          />
        </div>
        <div className="mt">
          <label htmlFor="email">Email: </label>
          <input
            className="form-text-field"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            value={teacherData.last_name}
            onChange={(e) => setTeacherData({ ...teacherData, last_name: e.target.value })}
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
            onChange={(e) => setTeacherData({ ...teacherData, first_name: e.target.value })}
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
            onChange={(e) => setTeacherData({ ...teacherData, patronymic: e.target.value })}
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
            onChange={(e) => setTeacherData({ ...teacherData, quantity_of_hours: e.target.value })}
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

EditForm.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password_confirmation: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
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

EditForm.defaultProps = {
  account: null,
  teacher: null,
};

export default EditForm;
