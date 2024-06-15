import { MouseEvent, useEffect, useState } from "react";
import { SudokuFaces, SudokuTable, SudokuValue, verificaJogo } from "../../sudoku-game-API/sudokuAPI";
import newGame from "../../sudoku-game-API/newGame.json";
import SudokuFace from "./SudokuFace";

export default function SudokuRepresentation({ id }: { id: number }) {
  const [ tabela, setTabela ] = useState<SudokuTable>();

  const [ isPressed, setIsPressed ] = useState(false);
  const [ presser, setPresser ] = useState<HTMLElement | undefined>(undefined);
  const [ startX, setStartX ] = useState(0);
  const [ scrollLeft, setScrollLeft ] = useState(0);
  const [ startY, setStartY ] = useState(0);
  const [ scrollTop, setScrollTop ] = useState(0);
  const [ rotateX, setRotateX ] = useState(0);
  const [ rotateY, setRotateY ] = useState(0);

  function onMouseDown({ pageX, pageY, target }: MouseEvent<HTMLDivElement>) {
    setIsPressed(true);
    setPresser((target as HTMLDivElement));

    setStartX(pageX - (target as HTMLDivElement).offsetLeft);

    setScrollLeft((target as HTMLDivElement).scrollLeft);

    setStartY(pageY - (target as HTMLDivElement).offsetTop);

    setScrollTop((target as HTMLDivElement).scrollTop);
  }

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!isPressed)
      return;

    if (presser instanceof HTMLSelectElement)
      return;

    event.preventDefault();
    event.stopPropagation();

    const currentX = event.pageX - (presser as HTMLElement).offsetLeft;

    const walkX = (currentX - startX) * 1.5;

    setRotateY(- scrollLeft + walkX);

    const currentY = event.pageY - (presser as HTMLElement).offsetTop;

    const walkY = (currentY - startY) * 1.5;

    setRotateX(- scrollTop - walkY);
  }

  useEffect(() => {
    setTabela(generateTable());
  }, []);

  function generateTable(): SudokuTable {
    const faces: Record<string, { valor: SudokuValue | undefined, isLocked: boolean }[][]> = {}

    const createArray = () => new Array(4).fill(null)
      .map(() => new Array(4).fill({ valor: undefined, isLocked: false }));

    Object.keys(newGame).forEach(key => {
      const newArray: { valor: SudokuValue | undefined, isLocked: boolean }[][] = createArray();

      newGame[key as SudokuFaces].forEach(lockedCell => {
        newArray[lockedCell.y][lockedCell.x] = {
          valor: lockedCell.valor as SudokuValue,
          isLocked: true
        };
      });
      
      faces[key as SudokuFaces] = newArray;
    });

    return faces as SudokuTable;
  }

  function atualizaValor(face: SudokuFaces, x: number, y: number, newValue: SudokuValue | undefined) {
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
    <>
      <div
        className="sudoku_rapper"
        onMouseLeave={() => {setIsPressed(false); setPresser(undefined)}}
        onMouseUp={() => {setIsPressed(false); setPresser(undefined)}}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
      >
        <div
          className="sudoku"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          }}
        >
          {Object.entries(tabela).map(([ face, cells ]) =>
            <SudokuFace
              key={face}
              face={face as SudokuFaces}
              cells={cells}
              atualizaValor={atualizaValor}
            />
          )}
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleSubmit}>Checar</button>
      </div>
    </>
  )
}