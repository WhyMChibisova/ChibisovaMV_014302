import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaPen, FaTrash } from "react-icons/fa";
import { deleteOrganization, fetchOrganization } from "../../services/organizationService";

function OrganizationDetails({ loggedIn }) {
  const [organization, setOrganization] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentOrganization = async () => {
      try {
        const json = await fetchOrganization(id);
        setOrganization(json);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentOrganization();
  }, [id]);

  const deleteOrganizationHandler = async () => {
    try {
      await deleteOrganization(organization.id);
      navigate("/organizations");
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

if(!organization) return <h2>Загрузка...</h2>;

  return (
    <div className="container">
      <p className="icon"><Link to="/organizations"><FaArrowLeft /></Link></p>
      { loggedIn.account.role === "teacher" &&
      <div className="text-right">
        <p className="mt icon"><Link to={`/organizations/${organization.id}/edit`}><FaPen /></Link></p>
        <p className="mt ml icon">
            <button onClick={() => deleteOrganizationHandler()}><FaTrash /></button>
        </p>
      </div>}
      <h2 className="title mt">Название: {organization.name}</h2>

      <div className="item-footer">
        <p className="mt text-lg">Email: {organization.email}</p>
        <p className="mt mb text-lg">Адрес: {organization.address}</p>
        <label className="mt text-lg">Описание</label>
        <textarea className="form-text-area mt-sm" disabled>{organization.description}</textarea>
      </div>

      { loggedIn.account.role === "student" &&
      <button onClick={() => deleteOrganizationHandler()} className="button button-main mt">Получить договор</button>}

    </div>
  );
}

export default OrganizationDetails;
