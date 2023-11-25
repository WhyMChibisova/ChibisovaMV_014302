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
    <div className="container">
      <h2 className="title-lg mb">Практики</h2>
      <div className="item-container">
        {practices.map((practice) => (
          <div key={practice.id} className="item mb">
            <h2 className="text-bold">
              <Link to={`/practices/${practice.id}`}>
                {practice.kind}
              </Link>
            </h2>
            <div className="item-footer">
              <p className="mt-sm">Продолжительность: {practice.duration}</p>
              <p className="mt-sm">Часов на студента: {practice.hours_per_student}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to={'/practices/new'} className="button button-main mt">Добавить практику</Link>
    </div>
  )
}

export default PracticesList;
