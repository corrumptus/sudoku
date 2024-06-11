import { GameDTO, SudokuRange, SudokuValue } from "../repository/GameRepository";

export default class GameRandomGenerator {
    private static counter: number = 0;
    private static pokeCounter: number = 0;

    static generate(emptyCells?: number): Omit<GameDTO, "id"> {
        let holes = emptyCells !== undefined ?
            emptyCells : Math.floor(Math.random() * 65);

        try {
            const solvedBoard = GameRandomGenerator.newSolvedBoard();

            GameRandomGenerator.makeHoles(solvedBoard, holes);

            const locations: GameDTO["lockedCells"]  = GameRandomGenerator.localizeNonEmptyCells(solvedBoard);

            return { lockedCells: locations };
        } catch (error) {
            return GameRandomGenerator.generate(holes);
        }
    }

    private static newSolvedBoard(): number[][] {
        const newBoard = GameRandomGenerator.duplicate() as number[][];

        GameRandomGenerator.fillPuzzle(newBoard);

        GameRandomGenerator.counter = 0;

        return newBoard;
    }

    private static fillPuzzle(startingBoard: (number | undefined)[][]): number[][] | undefined {
        const emptyCell = GameRandomGenerator.nextEmptyCell(startingBoard);

        if (emptyCell === undefined)
            return startingBoard as number[][];

        const NUM_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let num of GameRandomGenerator.shuffle(NUM_ARRAY)) {
            GameRandomGenerator.counter++;

            if (GameRandomGenerator.counter > 20_000_000) {
                GameRandomGenerator.counter = 0;

                throw new Error("Recursion Timeout");
            }

            if (!GameRandomGenerator.safeToPlace(startingBoard, emptyCell, num))
                continue;

            startingBoard[emptyCell.rowIndex][emptyCell.colIndex] = num;

            if (GameRandomGenerator.fillPuzzle(startingBoard))
                return startingBoard as number[][];

            startingBoard[emptyCell.rowIndex][emptyCell.colIndex] = undefined;
        }

        return undefined;
    }

    private static safeToPlace(
        puzzleArray: (number | undefined)[][],
        emptyCell: {
            rowIndex: number,
            colIndex: number
        },
        num: number
    ) {
        return GameRandomGenerator.rowSafe(puzzleArray, emptyCell, num) &&
            GameRandomGenerator.colSafe(puzzleArray, emptyCell, num) &&
            GameRandomGenerator.boxSafe(puzzleArray, emptyCell, num)
    }

    private static rowSafe(
        puzzleArray: (number | undefined)[][],
        emptyCell: {
            rowIndex: number,
            colIndex: number
        },
        num: number
    ) {
        return puzzleArray[emptyCell.rowIndex].indexOf(num) === -1
    }

    private static colSafe(
        puzzleArray: (number | undefined)[][],
        emptyCell: {
            rowIndex: number,
            colIndex: number
        },
        num: number
    ) {
        return puzzleArray.find(row => row[emptyCell.colIndex] === num) === undefined
    }

    private static boxSafe(
        puzzleArray: (number | undefined)[][],
        emptyCell: {
            rowIndex: number,
            colIndex: number
        },
        num: number
    ) {
        const boxLine = [0, 1, 2];

        const boxStartRow = Math.floor(emptyCell.rowIndex / 3) * 3;
        const boxStartCol = Math.floor(emptyCell.colIndex / 3) * 3;

        for (let rowIndex of boxLine)
            for (let colIndex of boxLine)
                if (puzzleArray[boxStartRow + rowIndex][boxStartCol + colIndex] === num)
                    return false;

        return true;
    }


    private static nextEmptyCell(puzzleArray: (number | undefined)[][]): {
        rowIndex: number,
        colIndex: number
    } | undefined {
        const emptyCell = { rowIndex: -1, colIndex: -1 }

        puzzleArray.forEach((row, rowIndex) => {
            if (emptyCell.colIndex !== -1)
                return;

            for (let i in row) {
                if (row[i] === undefined) {
                    emptyCell.colIndex = Number(i);
                    emptyCell.rowIndex = rowIndex;
                    break;
                }
            }
        });

        if (emptyCell.colIndex !== -1)
            return emptyCell;

        return undefined;
    }

    private static makeHoles(startingBoard: (number | undefined)[][], holes: number) {
        const emptyCells = 0;

        while (emptyCells < holes) {
            const random = Math.floor(Math.random() * 81)

            const rowIndex = Math.floor(random / 9);
            const colIndex = random % 9;

            if (!startingBoard[rowIndex])
                continue;

            if (startingBoard[rowIndex][colIndex] === undefined)
                continue;

            const removedValue = startingBoard[rowIndex][colIndex];

            startingBoard[rowIndex][colIndex] = undefined;

            const holedBoard = GameRandomGenerator.duplicate(startingBoard);

            if (GameRandomGenerator.multiplePossibleSolutions(holedBoard))
                startingBoard[rowIndex][colIndex] = removedValue;
        }
    }

    private static multiplePossibleSolutions(boardToCheck: (number | undefined)[][]) {
        const possibleSolutions = [];

        const emptyCellArray = GameRandomGenerator.emptyCellCoords(boardToCheck);

        for (let index = 0; index < emptyCellArray.length; index++) {
            const emptyCellClone = [...emptyCellArray];

            const startingPoint = emptyCellClone.splice(index, 1);

            emptyCellClone.unshift(startingPoint[0]);

            const thisSolution = GameRandomGenerator.fillFromArray(
                GameRandomGenerator.duplicate(boardToCheck),
                emptyCellClone
            );
            
            GameRandomGenerator.pokeCounter = 0;

            possibleSolutions.push((thisSolution as (number | undefined)[][]).join());

            if (new Set(possibleSolutions).size > 1)
                return true;
        }

        return false;
    }

    private static emptyCellCoords(startingBoard: (number | undefined)[][]) {
        const listOfEmptyCells = [];

        for (let row = 0; row < startingBoard.length; row++)
            for (let col = 0; col < startingBoard[row].length; col++)
                if (startingBoard[row][col] === 0)
                    listOfEmptyCells.push({ row, col });

        return listOfEmptyCells;
    }

    private static fillFromArray(
        startingBoard: (number | undefined)[][],
        emptyCellArray: { row: number, col: number }[]
    ) {
        const emptyCell = GameRandomGenerator.nextStillEmptyCell(startingBoard, emptyCellArray);

        if (emptyCell === undefined)
            return startingBoard;

        const NUM_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let num of GameRandomGenerator.shuffle(NUM_ARRAY)) {
            GameRandomGenerator.pokeCounter++;

            if (GameRandomGenerator.pokeCounter > 60_000_000) {
                GameRandomGenerator.pokeCounter = 0;

                throw new Error("Poke Timeout");
            }
    
            if (GameRandomGenerator.safeToPlace(startingBoard, emptyCell, num)) {
                startingBoard[emptyCell.rowIndex][emptyCell.colIndex] = num;
    
                if (GameRandomGenerator.fillFromArray(startingBoard, emptyCellArray))
                    return startingBoard;

                startingBoard[emptyCell.rowIndex][emptyCell.colIndex] = 0;
            }
        }

        return undefined;
    }

    private static nextStillEmptyCell(
        startingBoard: (number | undefined)[][],
        emptyCellArray: { row: number, col: number }[]
    ) {
        for (let coords of emptyCellArray) {
            if (startingBoard[coords.row][coords.col] === 0)
                return { rowIndex: coords.row, colIndex: coords.col }
        }
    
        return undefined;
    }

    private static localizeNonEmptyCells(solvedBoard: number[][]): GameDTO["lockedCells"] {
        const nonEmptyCells: GameDTO["lockedCells"] = [];

        for (let rowIndex in solvedBoard)
            for (let columnIndex in solvedBoard[rowIndex])
                if (solvedBoard[rowIndex][columnIndex] !== undefined)
                    nonEmptyCells.push({
                        x: Number(rowIndex) as SudokuRange,
                        y: Number(columnIndex) as SudokuRange,
                        valor: solvedBoard[rowIndex][columnIndex] as SudokuValue
                    });

        return nonEmptyCells;
    }

    private static duplicate(matrice?: (number | undefined)[][]): (number | undefined)[][] {
        if (matrice !== undefined)
            return JSON.parse(JSON.stringify(matrice));

        const BLANK_BOARD = new Array(81).fill(undefined);

        return BLANK_BOARD;
    }

    private static shuffle(array: number[]): number[] {
        let newArray = [...array];

        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }

        return newArray;
    }
}