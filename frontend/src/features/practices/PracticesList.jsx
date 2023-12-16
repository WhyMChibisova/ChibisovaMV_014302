import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { Alert, AlertTitle, AlertIcon, AlertDescription } from "@chakra-ui/alert"
import { distributeLoad, fetchAllPractices } from "../../services/practiceService";

function PracticesList({ loggedIn }) {
  const [practices, setPractices] = useState([]);
  const [, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    async function loadPractices() {
      try {
        const data = await fetchAllPractices();
        setPractices(data.practices);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    loadPractices();
  }, []);

  const distributeLoadHandler = async () => {
    try {
      await distributeLoad();
      setNotice("Студенты успешно распределены!")
    } catch (e) {
      setError("Количество часов преподавателей не хватает!")
      console.error("An error occured: ", e);
    }
  };

  return (
    <div>
      {error && <Alert status='error' position='absolute' className="message-container message-right message message-alert">
        <AlertIcon className="message-icon"/>
        <AlertDescription className="ml"> {error}</AlertDescription>
      </Alert>}
      {notice && <Alert position='absolute' className="message-container message-right message message-notice">
        <AlertIcon className="message-icon"/>
        <AlertDescription className="ml"> {notice}</AlertDescription>
      </Alert>}
      <div className="container">
        <h2 className="title-lg mb">Практики</h2>
        <div className="item-container">
          {practices.map((practice) => (
            <div key={practice.id} className="item mb">
              <div className="text-right">
                <p className="icon"><Link to={`/practices/${practice.id}`}><FaInfoCircle /></Link></p>
              </div>
              <h2 className="text-bold">Группа: {practice.group_number}</h2>
              <div className="item-footer">
                <p className="mt-sm">Вид: {practice.kind}</p>
                <p className="mt-sm">Продолжительность: {practice.duration} недели</p>
                <p className="mt-sm">Часов на студента: {practice.hours_per_student}</p>
              </div>
            </div>
          ))}
        </div>
        { loggedIn.account.role === "teacher" &&
        <Link to={'/practices/new'} className="button button-main mt">Добавить практику</Link>}
        { loggedIn.account.role === "admin" &&
          <button onClick={() => distributeLoadHandler()} className="button button-main mt ml" >Распределить нагрузку</button>}
      </div>
    </div>
  )
}

export default PracticesList;
