import { useState } from 'react'
import './App.css'
import OrganizationsList from "./features/organizations/OrganizationsList";

function App() {

  return (
    <>
      <div className="app">
      <h2>Organizations</h2>
      <OrganizationsList />
      </div>
    </>
  )
}

export default App
