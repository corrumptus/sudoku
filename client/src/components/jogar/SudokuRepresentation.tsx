import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SudokuCell from "./SudokuCell";
import { SudokuTable, getGame, submitGame, sudokuValue, verificaJogo } from "../../sudoku-game-API/sudokuAPI";

export default function SudokuRepresentation({ id }: { id: number }) {
  const navigate = useNavigate();

  const [ state, setState ] = useState(false);
  const [ tabela, setTabela ] = useState<SudokuTable>();
  const [ date ] = useState(new Date());

  useEffect(() => {
    setState(true);

    getGame(id)
      .then(game => {
        setState(false);

        if (game === null) {
          alert(`A tabela ${id} não existe`);
          return;
        }

        if (game === undefined) {
          alert("Não foi possível se conectar ao servidor");
          return;
        }

        setTabela(game);
      });
  }, []);

  function atualizaValor(posicao: number, newValue: sudokuValue | undefined) {
    let novaTabela = (tabela as SudokuTable).map(cell => ({...cell}));

    novaTabela[posicao].valor = newValue;

    setTabela(novaTabela);
  }

  async function handleSubmit() {
    const finishedTime = new Date().getTime();

    if (!verificaJogo(tabela as SudokuTable)) {
      return;
    }

    const initialTime = date.getTime();

    submitGame(id, finishedTime - initialTime)
      .then(id => {
        if (id === undefined) {
          alert("Não foi possível se conectar ao servidor");
          return;
        }

        if (id === null) {
          alert("Jogo não existe");
          return;
        }

        alert("Jogo enviado com sucesso");
      });
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
        {tabela.map((cell, i) =>
          <SudokuCell
            key={i}
            valor={cell.valor}
            posicao={i}
            atualizaValor={atualizaValor}
            trancada={cell.isLocked}
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