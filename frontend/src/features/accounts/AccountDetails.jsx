import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteAccount, fetchAccount } from "../../services/accountService";

function AccountDetails() {
  const [account, setAccount] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      try {
        const json = await fetchAccount(id);
        setAccount(json.account);
      } catch (e) {
        console.error("An error occured: ", e);
      }
    };
    fetchCurrentAccount();
  }, [id]);

  const deleteAccountHandler = async () => {
    try {
      await deleteAccount(account.id);
      navigate("/");
    } catch (e) {
      console.error("An error occured: ", e);
    }
  };

if(!account) return <h2>Загрузка...</h2>;

  return (
    <div>
      {account.photo_url &&
        <img src={account.photo_url} alt={account.email} className="image" />
      }
      <h2>{account.email}</h2>
      <p>{account.password}</p>
      <p>{account.role}</p>
      <div className="button">
        <button onClick={() => deleteAccountHandler()}>Удалить</button>
      </div>
      <Link to={`/accounts/${account.id}/edit`}>Редактировать</Link>
    </div>
  );
}

export default AccountDetails;
