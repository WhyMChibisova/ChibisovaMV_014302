import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import OrganizationsList from "../features/organizations/OrganizationsList";
import OrganizationDetails from "../features/organizations/OrganizationDetails";
import NewOrganizationForm from "../features/organizations/NewOrganizationForm";
import EditOrganizationForm from "../features/organizations/EditOrganizationForm";
import NewAccountForm from "../features/accounts/NewAccountForm";
import AccountDetails from "../features/accounts/AccountDetails";
import EditAccountForm from "../features/accounts/EditAccountForm";
import Login from "../features/auth/Login";
import Home from "./Home";

function AppRoutes() {
  const [loggedIn, setLoggedIn] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    account: {}
  });

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    axios.get("http://localhost:3000/logged_in",
   {withCredentials: true})
.then(response => {
      if (response.data.logged_in) {
        handleLogin(response)
      } else {
        handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  const handleLogin = (data) => {
    setLoggedIn({...loggedIn, loggedInStatus: "LOGGED_IN", account: data.account});
  }

  const handleLogout = () => {
    setLoggedIn({...loggedIn, loggedInStatus: "NOT_LOGGED_IN", account: {}});
  }

  return (
    <Routes>
      <Route path="/" element={<Home loggedIn={loggedIn} handleLogout={handleLogout} />} />
      <Route path="/organizations" element={<OrganizationsList loggedIn={loggedIn} />} />
      <Route path="/organizations/:id" element={<OrganizationDetails />} />
      <Route path="/organizations/:id/edit" element={<EditOrganizationForm />} />
      <Route path="/organizations/new" element={<NewOrganizationForm />} />
      <Route path="/accounts/new" element={<NewAccountForm />} />
      <Route path="/accounts/:id" element={<AccountDetails />} />
      <Route path="/accounts/:id/edit" element={<EditAccountForm />} />
      <Route path="/sessions/new" element={<Login handleLogin={handleLogin} />} />
    </Routes>
  );
}
export default AppRoutes;
