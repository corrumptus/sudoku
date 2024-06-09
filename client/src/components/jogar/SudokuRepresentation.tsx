import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SudokuCell from "./SudokuCell";
import { verificaJogo } from "../../sudoku-game-API/sudokuAPI";

export type sudokuRange = 0|1|2|3|4|5|6|7|8;
export type sudokuValue = 1|2|3|4|5|6|7|8|9;
export type LockedCell = { x: sudokuRange, y: sudokuRange, valor: sudokuValue }

export default function SudokuRepresentation({ id }: { id: number }) {
  const navigate = useNavigate();

  const [ state, setState ] = useState(false);
  const [ tabela, setTabela ] = useState<(sudokuValue | undefined)[]>();
  const posicoesTrancadas = useRef<{ posicao: number, valor: sudokuValue }[]>([]);
  const [ date ] = useState(new Date());

  useEffect(() => {
    (async () => {
      setState(true);
      const response = await fetch("http://localhost:5000/jogos/" + id);

      if (!response.ok) {
        const { error } = await response.json();

        alert(error);

        return;
      }

      const { game: { lockedCells } }: { game: { lockedCells: LockedCell[] } }
        = await response.json();

      posicoesTrancadas.current = lockedCells.map(
        ({ x, y, valor }) => ({posicao: x + y*9, valor: valor})
      );

      setTabela(generateSudoku());
    })()
  }, []);

  function generateSudoku(): (sudokuValue | undefined)[] {
    let tabela: (sudokuValue | undefined)[] = Array.apply(null, Array(81)).map(() => undefined);

    for (let { posicao, valor } of posicoesTrancadas.current)
      tabela[posicao] = valor;

    return tabela;
  }

  function posicaoTrancada(posicao: number): boolean {
    return posicoesTrancadas.current.find(p => p.posicao === posicao) !== undefined;
  }

  function atualizaValor(posicao: number, newValue: sudokuValue | undefined) {
    let novaTabela = [...tabela as (sudokuValue | undefined)[]];

    novaTabela[posicao] = newValue;

    setTabela(novaTabela);
  }

  async function handleSubmit() {
    const finishedTime = new Date().getTime();

    if (!verificaJogo(tabela as (sudokuValue | undefined)[])) {
      return;
    }

    const initialTime = date.getTime();

    const response = await fetch("http://localhost:5000/jogos/" + id, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": localStorage.getItem("sudoku-token") || ""
      },
      body: JSON.stringify({
        time: finishedTime - initialTime
      })
    });

    if (!response.ok) {
      const { error } = await response.json();

      alert(error);

      return;
    }

    alert("enviado com sucesso");
  }

  if (state) return (
    <div className="sudoku_rapper loading">
      <h1>Carregando</h1>
    </div>
  )

  if (tabela === undefined) return (
    <div className="sudoku_rapper not-found">
      <h1>Jogo não encontrado: {id}</h1>
    </div>
  )

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
      <div className="buttons">
        <button onClick={handleSubmit}>Enviar</button>
        <button onClick={() => navigate("/ranking/" + id)}>Ranking</button>
      </div>
    </div>
  )
}