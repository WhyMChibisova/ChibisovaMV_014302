import { useState } from "react";
import PropTypes from "prop-types";

function PracticeForm({ practice, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    practice || {
      kind: "",
      duration: 0,
      hours_per_student: 0,
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
          <label htmlFor="kind">Вид: </label>
          <input
            className="form-text-field"
            id="kind"
            type="text"
            value={formData.kind}
            onChange={(e) => setFormData({ ...formData, kind: e.target.value })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="duration" className="mt">Продолжительность: </label>
          <input
            className="form-text-field"
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="hours_per_student">Часов на студента: </label>
          <input
            className="form-text-field"
            id="hours_per_student"
            type="number"
            value={formData.hours_per_student}
            onChange={(e) => setFormData({ ...formData, hours_per_student: e.target.value })}
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

PracticeForm.propTypes = {
  practice: PropTypes.shape({
    kind: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    hours_per_student: PropTypes.number.isRequired,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

PracticeForm.defaultProps = {
  practice: null,
};

export default PracticeForm;
