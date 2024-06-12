import { useEffect, useState } from "react";
import { SudokuFaces, SudokuTable, sudokuValue, verificaJogo } from "../../sudoku-game-API/sudokuAPI";
import newGame from "../../sudoku-game-API/newGame.json";
import SudokuFace from "./SudokuFace";

export default function SudokuRepresentation({ id }: { id: number }) {
  const [ tabela, setTabela ] = useState<SudokuTable>();

  useEffect(() => {
    setTabela(generateTable());
  }, []);

  function generateTable(): SudokuTable {
    const faces: Record<string, { valor: sudokuValue | undefined, isLocked: boolean }[][]> = {}

    const createArray = () => new Array(4).fill(null)
      .map(() => new Array(4).fill({ valor: undefined, isLocked: false }));

    Object.keys(newGame).forEach(key => {
      const newArray: { valor: sudokuValue | undefined, isLocked: boolean }[][] = createArray();

      newGame[key as SudokuFaces].forEach(lockedCell => {
        newArray[lockedCell.y][lockedCell.x] = {
          valor: lockedCell.valor as sudokuValue,
          isLocked: true
        };
      });
      
      faces[key as SudokuFaces] = newArray;
    });

    return faces as SudokuTable;
  }

  function atualizaValor(face: SudokuFaces, x: number, y: number, newValue: sudokuValue | undefined) {
    const novaTabela = {...tabela as SudokuTable};

    const novasCelulas = novaTabela[face].map(line => line.map(cell => ({...cell})));

    novasCelulas[y][x].valor = newValue;

    novaTabela[face] = novasCelulas;

    setTabela(novaTabela);
  }

  async function handleSubmit() {
    if (verificaJogo(tabela as SudokuTable)) {
      console.log("parabéns");
    }
  }

  if (tabela === undefined) return (
    <div className="sudoku_rapper not-found">
      <h1>Jogo não encontrado: {id}</h1>
    </div>
  )

  return (
    <div className="sudoku_rapper">
      <div className="sudoku">
        {Object.entries(tabela).map(([ face, cells ]) =>
          <SudokuFace
            face={face as SudokuFaces}
            cells={cells}
            atualizaValor={atualizaValor}
          />
        )}
      </div>
      <div className="buttons">
        <button onClick={handleSubmit}>Checar</button>
      </div>
    </div>
  )
}