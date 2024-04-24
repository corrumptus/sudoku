import './App.css'
import SudokuRepresentation from './components/SudokuRepresentation'
import { getNovoJogo } from './sudoku-game-API/sudokuAPI'

function App() {
  return (
    <div className="app">
      <h1>Sudoku</h1>
      <SudokuRepresentation
        posicoes={getNovoJogo()}
      />
    </div>
  )
}

export default App
