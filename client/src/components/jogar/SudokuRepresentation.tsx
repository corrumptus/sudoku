import { useState } from "react";
import SudokuCell from "./SudokuCell";
import { verificaJogo } from "../../sudoku-game-API/sudokuAPI";

export type sudokuRange = 0|1|2|3|4|5|6|7|8;
export type sudokuValue = 1|2|3|4|5|6|7|8|9;

export default function SudokuRepresentation({
  posicoes
}: {
  posicoes: { x: sudokuRange, y: sudokuRange, valor: sudokuValue }[]
}) {
  const posicoesTrancadas: { posicao: number, valor: sudokuValue }[] = posicoes.map(
    ({ x, y, valor }) => ({posicao: x + y*9, valor: valor})
  );
  const [ tabela, setTabela ] = useState(generateSudoku());

  function generateSudoku(): (sudokuValue | undefined)[] {

    let tabela: (sudokuValue | undefined)[] = Array.apply(null, Array(81)).map(() => undefined);

    for (let { posicao, valor } of posicoesTrancadas)
      tabela[posicao] = valor;

    return tabela;
  }

  function posicaoTrancada(posicao: number): boolean {
    return posicoesTrancadas.find(p => p.posicao === posicao) !== undefined;
  }

  function atualizaValor(posicao: number, newValue: sudokuValue | undefined) {
    let novaTabela = [...tabela];

    novaTabela[posicao] = newValue;

    setTabela(novaTabela);
  }

  return (
    <div className="sudoku_rapper">
      <div className="sudoku">
        {tabela.map((valor, i) =>
          <SudokuCell
            key={i}
            valor={valor}
            posicao={i}
            atualizaValor={atualizaValor}
            trancada={posicaoTrancada(i)}
          />
        )}
      </div>
      <button onClick={() => verificaJogo(tabela)}>Checar</button>
    </div>
  )
}