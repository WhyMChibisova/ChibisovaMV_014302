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
import NavBar from "./NavBar";

import PracticesList from "../features/practices/PracticesList";
import PracticeDetails from "../features/practices/PracticeDetails";
import NewPracticeForm from "../features/practices/NewPracticeForm";
import EditPracticeForm from "../features/practices/EditPracticeForm";

import StudentsList from "../features/students/StudentsList";
import StudentDetails from "../features/students/StudentDetails";

import TeachersList from "../features/teachers/TeachersList";
import TeacherDetails from "../features/teachers/TeacherDetails";
import NewTeacherForm from "../features/teachers/NewTeacherForm";

import DocumentsList from "../features/documents/DocumentsList";
import DocumentDetails from "../features/documents/DocumentDetails";
import NewDocumentForm from "../features/documents/NewDocumentForm";
import EditDocumentForm from "../features/documents/EditDocumentForm";

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
    <div>
    <NavBar loggedIn={loggedIn} handleLogout={handleLogout} />
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

      <Route path="/practices" element={<PracticesList loggedIn={loggedIn} />} />
      <Route path="/practices/:id" element={<PracticeDetails />} />
      <Route path="/practices/:id/edit" element={<EditPracticeForm />} />
      <Route path="/practices/new" element={<NewPracticeForm />} />

      <Route path="/students" element={<StudentsList loggedIn={loggedIn} />} />
      <Route path="/students/:id" element={<StudentDetails />} />

      <Route path="/teachers" element={<TeachersList loggedIn={loggedIn} />} />
      <Route path="/teachers/:id" element={<TeacherDetails />} />
      <Route path="/teachers/new" element={<NewTeacherForm />} />

      <Route path="/documents" element={<DocumentsList loggedIn={loggedIn} />} />
      <Route path="/documents/:id" element={<DocumentDetails />} />
      <Route path="/documents/:id/edit" element={<EditDocumentForm />} />
      <Route path="/documents/new" element={<NewDocumentForm />} />
    </Routes>
    </div>
  );
}
export default AppRoutes;
