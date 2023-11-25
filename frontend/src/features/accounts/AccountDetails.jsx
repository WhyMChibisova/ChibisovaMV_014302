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
    <div className="container">
      {account.photo_url &&
        <img src={account.photo_url} alt={account.email} className="image" />
      }
      <h2 className="title mt-lg">Email: {account.email}</h2>

      <div className="item-footer">
        <p className="mt mb text-lg">{account.role}</p>
      </div>

      <button onClick={() => deleteAccountHandler()} className="button button-main mt">Удалить</button>

      <Link to={`/accounts/${account.id}/edit`} className="button button-main mt ml">Редактировать</Link>
    </div>
  );
}

export default AccountDetails;
