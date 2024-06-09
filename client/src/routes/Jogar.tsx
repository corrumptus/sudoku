import { useParams } from "react-router-dom";
import SudokuRepresentation from "../components/jogar/SudokuRepresentation";
import "../styles/jogar.css";

export default function Jogar() {
  const { id } = useParams();

  

  return (
    <div className="jogar">
      <h1>Sudoku</h1>
      <SudokuRepresentation id={Number(id)} />
    </div>
  )
}