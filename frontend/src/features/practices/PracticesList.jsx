import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { fetchAllPractices } from "../../services/practiceService";

function PracticesList() {
  const [practices, setPractices] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadPractices() {
      try {
        const data = await fetchAllPractices();
        setPractices(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    loadPractices();
  }, []);

  return (
    <div>
    <h2>Практики</h2>
      {practices.map((practice) => (
        <div key={practice.id} className="organization-container">
          <h2>
            <Link to={`/practices/${practice.id}`} className="title">
              {practice.kind}
            </Link>
          </h2>
          <p>{practice.duratation}</p>
          <p>{practice.hours_per_student}</p>
        </div>
      ))}
      <Link to={'/practices/new'} className="button">Добавить практику</Link>
    </div>
  )
}

export default PracticesList;
