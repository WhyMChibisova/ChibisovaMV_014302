import { useState } from "react";
import PropTypes from "prop-types";

function PracticeForm({ practice, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    practice || {
      kind: "",
      duratation: "",
      hours_per_student: 0,
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
          <label htmlFor="kind">Вид:</label>
          <input
            id="kind"
            type="text"
            value={formData.kind}
            onChange={(e) => setFormData({ ...formData, kind: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="duratation">Продолжительность:</label>
          <input
            id="duratation"
            type="text"
            value={formData.duratation}
            onChange={(e) => setFormData({ ...formData, duratation: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="hours_per_student">Количество часов на студента:</label>
          <input
            id="hours_per_student"
            type="number"
            value={formData.hours_per_student}
            onChange={(e) => setFormData({ ...formData, hours_per_student: e.target.value })}
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

PracticeForm.propTypes = {
  practice: PropTypes.shape({
    kind: PropTypes.string.isRequired,
    duratation: PropTypes.string.isRequired,
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
