import React from 'react'
import ReactDOM from 'react-dom/client'
// import Dashboard from './pages/Dashboard.jsx'
// import Admin from './pages/Admin.jsx'
import { Dashboard, Admin } from './pages'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<Dashboard />}></Route>
      <Route path='/admin' element={<Admin />}></Route>
    </Routes>
  </BrowserRouter>,
)
