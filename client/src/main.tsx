import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import ActionBar from './ActionBar'
import './index.css'
import "./globals.css"
import SudokuRoutes from './SudokuRoutes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ActionBar />
      <SudokuRoutes />
    </Router>
  </React.StrictMode>
)