import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ActionBar from './ActionBar'
import Home from './routes/Home'
import Jogar from './routes/Jogar'
import Quemsomos from './routes/Quemsomos'
import DevAPI from './routes/DevAPI'
import Login from './routes/Login'
import './index.css'
import "./globals.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ActionBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogar" element={<Jogar />} />
        <Route path="/quemsomos" element={<Quemsomos />} />
        <Route path="/api" element={<DevAPI />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
)