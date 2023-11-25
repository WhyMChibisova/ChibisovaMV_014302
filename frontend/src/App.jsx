import { BrowserRouter as Router } from "react-router-dom"
import { useState } from 'react'
import NavBar from "./components/NavBar"
import AppRoutes from "./components/AppRoutes"

import './assets/stylesheets/Reset.css'
import './assets/stylesheets/Text.css'
import './assets/stylesheets/Spacing.css'
import './assets/stylesheets/Layout.css'
import './assets/stylesheets/Button.css'
import './assets/stylesheets/Form.css'
import './assets/stylesheets/Message.css'
import './assets/stylesheets/Item.css'

function App() {

  return (
    <Router>
      <div className="wrapper">
        
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App
