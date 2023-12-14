import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updatePractice, fetchPractice } from "../../services/practiceService";
import PracticeForm from "./PracticeForm";

function EditPracticeForm() {
  const [practice, setPractice] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPractice = async () => {
      try {
        const json = await fetchPractice(id);
        setPractice(json.practice);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentPractice();
  }, [id]);

  const handleUpdateSubmit = async (formData) => {
    try {
      const response = await updatePractice(id, formData);
      navigate(`/practices/${response.id}`);
    } catch (e) {
        console.error("An error occured: ", e);
    } finally {

    }
  };

  if(!practice) return <h2>Загрузка...</h2>;

  return (
    <PracticeForm
      practice={ practice }
      headerText="Редактирование практики"
      onSubmit={handleUpdateSubmit}
      buttonText="Редактировать" />
  );
}

export default EditPracticeForm;
