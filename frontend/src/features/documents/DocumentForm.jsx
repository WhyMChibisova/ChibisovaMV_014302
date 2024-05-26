import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function DocumentForm({ loggedIn, document, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    document || {
      student_id: null,
      mark: 0,
      comment: "",
      document: "",
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
      { loggedIn.account.role === "student" &&
        <div className="mt">
          <label htmlFor="document">Документ: </label>
          <input
            className="form-file-field"
            id="document"
            type="file"
            accept=".pdf"
            onChange={(e) => setFormData({ ...formData, document: e.target.files[0] })}
          />
        </div>}
        { (loggedIn.account.role === "teacher" || loggedIn.account.role === "teacher_report") &&
        <div className="mt">
          <label htmlFor="mark">Отметка: </label>
          <input
            className="form-text-field"
            id="mark"
            type="number"
            value={formData.mark}
            onChange={(e) => setFormData({ ...formData, mark: e.target.value })}
          />
        </div>}
        <div className="mt">
          <label htmlFor="comment" className="mt">Комментарий: </label>
          <textarea
            className="form-text-area"
            id="comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
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
