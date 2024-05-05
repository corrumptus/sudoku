import SudokuRepresentation from "../components/SudokuRepresentation";
import { getNovoJogo } from "../sudoku-game-API/sudokuAPI";

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