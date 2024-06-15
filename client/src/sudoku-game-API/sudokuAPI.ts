export function verificaJogo(table: SudokuTable): boolean {
    const faces: SudokuForValidation =
        Object.keys(table)
        .reduce((acc, curr) => {
                acc[curr as SudokuFaces] = table[curr as SudokuFaces]
                    .map(line => line.map(cell => cell.valor))

                return acc;
            },
            {} as SudokuForValidation
        );

    if (!validaArray(faces)) {
        alert("termine o jogo primeiro");
        return false;
    }

    if (numeroRepetidoLinha(faces)) {
        alert("tem número repetido em uma linha");
        return false;
    }

    if (numeroRepetidoColuna(faces)) {
        alert("tem número repetido em uma coluna");
        return false;
    }

    if (numeroRepetidoQuadrante(faces)) {
        alert("tem número repetido em um quadrante");
        return false;
    }

    alert("parabens");
    return true;
}

function validaArray(table: SudokuForValidation): table is SudokuForValidationNotUndefined {
    return Object.values(table)
        .map(face => face.flat().flat())
        .find(face => face.includes(undefined)) === undefined;
}

function numeroRepetidoLinha(table: SudokuForValidationNotUndefined): boolean {
    const mainFacesList = Object.keys(table)
        .filter(key => !["top", "bottom"].includes(key))
        .map(key => table[key as SudokuFaces]);

    const mainLines = mainFacesList.map(() => new Array(0));

    mainFacesList.forEach((face, i) => mainLines[i].push(...face[i]));

    const secondaryFacesList = Object.keys(table)
        .filter(key => !["front", "back"].includes(key))
        .map(key => table[key as SudokuFaces]);

    const secondaryLines = secondaryFacesList.map(() => new Array(0));

    secondaryFacesList.forEach((face, i) => secondaryLines[i].push(...face[i]))

    const hasDuplicatesMainLines = mainLines
        .map(line => new Set(line))
        .find(line => line.size !== 16) !== null;

    const hasDuplicatesSecondaryLines = secondaryLines
        .map(line => new Set(line))
        .find(line => line.size !== 16) !== null;

    return hasDuplicatesMainLines || hasDuplicatesSecondaryLines;
}

function numeroRepetidoColuna(table: SudokuForValidationNotUndefined): boolean {
    const mainFacesList = Object.keys(table)
        .filter(key => !["left", "right"].includes(key))
        .map(key => table[key as SudokuFaces]);

    const mainColumns = mainFacesList.map(() => new Array(0));

    mainFacesList.forEach((face, i) => mainColumns[i].push(...face.map(line => line[i])));

    return mainColumns
        .map(line => new Set(line))
        .find(line => line.size !== 16) !== null;
}

function numeroRepetidoQuadrante(table: SudokuForValidationNotUndefined): boolean {
    return Object.values(table)
        .map(face => new Set(face.flat()))
        .find(face => face.size !== 16) !== null;
}

export type sudokuRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type sudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type LockedCell = { x: sudokuRange, y: sudokuRange, valor: sudokuValue };
export type SudokuTable = {
    [key in SudokuFaces]: {
        valor: sudokuValue | undefined,
        isLocked: boolean
    }[][]
};

type SudokuForValidation = {
    [key in SudokuFaces]: (sudokuValue | undefined)[][]
};
type SudokuForValidationNotUndefined = {
    [key in SudokuFaces]: sudokuValue[][]
};
export type SudokuFaces = "front" | "bottom" | "back" | "top" | "left" | "right";

export async function getGame(id: number): Promise<SudokuTable | null | undefined> {
    try {
        const response = await fetch("http://localhost:5000/jogos/" + id);

        if (!response.ok)
            return null;

        const { game: { lockedCells } }: { game: { lockedCells: LockedCell[] } }
            = await response.json();

        return new Array(81).fill(undefined).map((_, i) => {
            const lockedCell = lockedCells.find(lc => lc.x*lc.y === i);

            const isFinded = lockedCell !== undefined;

            return {
                valor: isFinded ? lockedCell.valor : undefined,
                isLocked: isFinded ? true : false
            };
        });
    } catch (e) {
        return undefined;
    }
}

export async function submitGame(id: number, time: number): Promise<number | null | undefined> {
    try {
        const response = await fetch("http://localhost:5000/jogos/" + id, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("sudoku-token") || ""
            },
            body: JSON.stringify({
                time: time
            })
        });

        if (!response.ok) {
            const { error } = await response.json();
    
            alert(error);
    
            return null;
        }

        return id;
    } catch (e) {
        return undefined;
    }
}

export async function getNewGame(): Promise<number | null | undefined> {
    try {
        const response = await fetch("http://localhost:5000/jogos/new", {
            headers: {
                "authorization": localStorage.getItem("sudoku-token") || ""
            }
        });

        if (!response.ok)
            return null;

        const { id } = await response.json();

        return id;
    } catch (e) {
        return undefined;
    }
}

export type GameRankings = {
    gameID: number,
    ranking: {
        name: string,
        time: number
    }[]
}

export async function getGameRanking(id: number): Promise<GameRankings | null | undefined> {
    try {
        const response = await fetch("http://localhost:5000/game/" + id + "/ranking");

        if (!response.ok)
            return null;

        const ranking = await response.json();

        return ranking;
    } catch(e) {
        return undefined;
    }
}

export type UserInfos = {
    name: string,
    totalFinished: number,
    lastTimes: { id: number, time: number }[],
    timeRankings: number[],
    nonFinishedGames: number[]
}

export async function getUserInfos(name: string): Promise<UserInfos | null | undefined> {
    try {
        const response = await fetch("http://localhost:5000/user/" + name);

        if (!response.ok)
            return null;

        const userInfos = await response.json();

        return userInfos;
    } catch(e) {
        return undefined;
    }
}