import { useState } from "react";
import PropTypes from "prop-types";

function DocumentForm({ document, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    document || {
      student_id: "",
      mark: 0,
      comment: "",
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
          <label htmlFor="mark">Отметка:</label>
          <input
            id="mark"
            type="number"
            value={formData.mark}
            onChange={(e) => setFormData({ ...formData, mark: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Комментарий:</label>
          <textarea
            id="comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
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

DocumentForm.propTypes = {
  document: PropTypes.shape({
    student_id: PropTypes.number.isRequired,
    mark: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

DocumentForm.defaultProps = {
  document: null,
};

export default DocumentForm;
