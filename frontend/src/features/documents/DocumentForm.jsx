import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function DocumentForm({ document, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    document || {
      student_id: null,
      mark: null,
      comment: "",
    }
  );

  return (
    <div className="container">
      <p className="icon"><Link to="/documents"><FaArrowLeft /></Link></p>
      <h2 className="title-lg mb mt">{headerText}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        <div className="mt">
          <label htmlFor="mark">Отметка: </label>
          <input
            className="form-text-field"
            id="mark"
            type="number"
            value={formData.mark}
            onChange={(e) => setFormData({ ...formData, mark: e.target.value })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="comment" className="mt">Комментарий: </label>
          <textarea
            className="form-text-area"
            id="comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
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
