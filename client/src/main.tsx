import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import ActionBar from './ActionBar'
import SudokuRoutes from './SudokuRoutes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ActionBar />
      <SudokuRoutes />
    </Router>
  </React.StrictMode>
)