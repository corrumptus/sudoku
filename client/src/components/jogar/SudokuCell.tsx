import { SudokuFaces, SudokuValue } from "../../sudoku-game-API/sudokuAPI";

export default function SudokuCell({
  face,
  x,
  y,
  valor,
  trancada,
  atualizaValor
}: {
  face: SudokuFaces,
  x: number,
  y: number,
  valor: SudokuValue | undefined,
  trancada: boolean,
  atualizaValor: (face: SudokuFaces, x: number, y: number, newValue: SudokuValue | undefined) => void
}) {
  function getValue(valor: string): SudokuValue | undefined {
    const numero = Number(valor);

    return numero !== 0 ? numero as SudokuValue : undefined;
  }

  if (trancada) return (
    <div className="trancada">{valor}</div>
  );

  return (
    <select
      onChange={e => atualizaValor(face, x, y, getValue(e.currentTarget.value))}
    >
      <option></option>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
      <option value={9}>9</option>
      <option value={10}>10</option>
      <option value={11}>11</option>
      <option value={12}>12</option>
      <option value={13}>13</option>
      <option value={14}>14</option>
      <option value={15}>15</option>
      <option value={16}>16</option>
    </select>
  )
}