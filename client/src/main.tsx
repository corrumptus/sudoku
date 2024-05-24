import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './routes/Home'
import Jogar from './routes/Jogar'
import Quemsomos from './routes/Quemsomos'
import DevAPI from './routes/DevAPI'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <nav className="main-navbar">
        <Link to="/">Home</Link>
        <Link to="/jogar">Jogar</Link>
        <Link to="/quemsomos">Quem somos</Link>
        <Link to="/api">API para devs</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogar" element={<Jogar />} />
        <Route path="/quemsomos" element={<Quemsomos />} />
        <Route path="/api" element={<DevAPI />} />
      </Routes>
    </Router>
  </React.StrictMode>
)