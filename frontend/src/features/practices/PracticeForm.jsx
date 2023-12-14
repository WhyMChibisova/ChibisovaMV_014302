import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { fetchAllPractices } from "../../services/practiceService";

function PracticeForm({ practice, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    practice || {
      kind: "",
      group_number: "",
      duration: 0,
      hours_per_student: 0,
      start_date: "",
      end_date: "",
    }
  );

  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const fetchPracticeGroups = async () => {
      try {
        const json = await fetchAllPractices();
        setGroups(json.groups);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchPracticeGroups();
  }, []);

  if(!groups) return <h2>Загрузка...</h2>;

  return (
    <div className="container">
      <p className="icon"><Link to="/practices"><FaArrowLeft /></Link></p>
      <h2 className="title-lg mb mt">{headerText}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        <div className="mt">
          <label htmlFor="kind">Вид: </label>
          <select className="form-text-field"
          id="kind"
          value={formData.kind}
          onChange={(e) => setFormData({ ...formData, kind: e.target.value })}
          required>
            <option className="mt-sm">Учебная</option>
            <option className="mt-sm">Производственная</option>
            <option className="mt-sm">Преддипломная</option>
          </select>
        </div>
        <div className="mt">
          <label htmlFor="group_number">Номер группы: </label>
          <select className="form-text-field"
          id="group_number"
          value={formData.group_number}
          onChange={(e) => setFormData({ ...formData, group_number: e.target.value })}
          required>
           {groups.map((group, index) => (
              <option key={index} value={group} className="mt-sm">{group}</option>
           ))}
          </select>
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
        <div className="mt">
          <label htmlFor="start_date">Дата начала: </label>
          <input
            className="form-text-field"
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            required
          />
        </div>
        <div className="mt">
          <label htmlFor="end_date">Дата окончания: </label>
          <input
            className="form-text-field"
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
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
    group_number: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    hours_per_student: PropTypes.number.isRequired,
    start_date: PropTypes.instanceOf(Date).isRequired,
    end_date: PropTypes.instanceOf(Date).isRequired,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

PracticeForm.defaultProps = {
  practice: null,
};

export default PracticeForm;
