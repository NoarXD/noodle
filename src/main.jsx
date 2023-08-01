import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './pages/Dashboard.jsx'
import Admin from './pages/Admin.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}></Route>
      <Route path='/dashboard' element={<Admin />}></Route>
    </Routes>
  </BrowserRouter>,
)
