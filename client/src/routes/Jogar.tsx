import SudokuRepresentation from "../components/jogar/SudokuRepresentation";
import { getNovoJogo } from "../sudoku-game-API/sudokuAPI";
import "../styles/jogar.css";

export default function Jogar() {
  return (
    <div className="jogar">
      <h1>Sudoku</h1>
      <SudokuRepresentation
        posicoes={getNovoJogo()}
      />
    </div>
  )
}