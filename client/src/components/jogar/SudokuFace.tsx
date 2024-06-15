import { SudokuFaces, SudokuValue } from "../../sudoku-game-API/sudokuAPI"
import SudokuCell from "./SudokuCell"

export default function SudokuFace({
  face,
  cells,
  atualizaValor
}: {
  face: SudokuFaces,
  cells: { valor: SudokuValue | undefined, isLocked: boolean }[][],
  atualizaValor: (face: SudokuFaces, x: number, y: number, newValue: SudokuValue | undefined) => void
}) {
  return (
    <table id={face}>
      <tbody>
        {cells.map((line, y) =>
          <tr key={y}>
            {line.map((cell, x) =>
              <td key={x}>
                <SudokuCell
                  face={face}
                  x={x}
                  y={y}
                  valor={cell.valor}
                  trancada={cell.isLocked}
                  atualizaValor={atualizaValor}
                />
              </td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  )
}