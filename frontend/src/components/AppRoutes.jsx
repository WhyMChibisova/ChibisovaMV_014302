import React from "react";
import { Route, Routes } from "react-router-dom";

import OrganizationsList from "../features/organizations/OrganizationsList";
import OrganizationDetails from "../features/organizations/OrganizationDetails";
import NewOrganizationForm from "../features/organizations/NewOrganizationForm";
import EditOrganizationForm from "../features/organizations/EditOrganizationForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/organizations" element={<OrganizationsList />} />
      <Route path="/organizations/:id" element={<OrganizationDetails />} />
      <Route path="/organizations/:id/edit" element={<EditOrganizationForm />} />
      <Route path="/organizations/new" element={<NewOrganizationForm />} />
    </Routes>
  );
}
export default AppRoutes;
