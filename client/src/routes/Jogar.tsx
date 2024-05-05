import SudokuRepresentation from "../components/SudokuRepresentation";
import { getNovoJogo } from "../sudoku-game-API/sudokuAPI";

export default function Jogar() {
  return (
    <div className="app">
      <h1>Sudoku</h1>
      <SudokuRepresentation
        posicoes={getNovoJogo()}
      />
    </div>
  )
}