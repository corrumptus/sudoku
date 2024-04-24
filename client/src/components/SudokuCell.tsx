import { sudokuValue } from "./SudokuRepresentation"

export default function SudokuCell({
  posicao,
  valor,
  atualizaValor,
  trancada
}: {
  posicao: number,
  valor: sudokuValue | undefined,
  atualizaValor: (posicao: number, newValue: sudokuValue | undefined) => void,
  trancada: boolean
}) {
  function getValue(valor: string): sudokuValue | undefined {
    const numero = Number(valor);

    return numero !== 0 ? numero as sudokuValue : undefined;
  }

  if (trancada)
    return (
      <div className="sudoku_cell trancada">{valor}</div>
    );

  return (
    <div className="sudoku_cell">
      <select
        className="sudoku_select"
        onChange={e => atualizaValor(posicao, getValue(e.currentTarget.value))}
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
      </select>
    </div>
  )
}