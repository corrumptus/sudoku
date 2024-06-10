function repete(arr: sudokuValue[]): boolean {
    return new Set(arr).size !== 9;
}

function getLinha(arr: sudokuValue[], index: number): sudokuValue[] {
    return arr.filter((_, i) => {
        return i >= index * 9 && i < (index + 1) * 9;
    });
}

function getColuna(arr: sudokuValue[], index: number): sudokuValue[] {
    return arr.filter((_, i) => {
        return i % 9 === index;
    });
}

function getQuadrante(arr: sudokuValue[], index: number): sudokuValue[] {
    return arr.filter((_, i) => {
        const numeroDelimitadoPeloComecoDoQuadrante = (i: number, index: number, linha: 0 | 1 | 2): boolean =>
            i >= ((index % 3) * 3) + (9 * linha) + (27 * ((index - (index % 3)) / 3));

        const numeroDelimitadoPeloFimDoQuadrante = (i: number, index: number, linha: 0 | 1 | 2): boolean =>
            i < (((index % 3) + 1) * 3) + (9 * linha) + (27 * ((index - (index % 3)) / 3));


        const numeroEstaNaPrimeiraLinhaDoQuadrante = numeroDelimitadoPeloComecoDoQuadrante(i, index, 0) &&
            numeroDelimitadoPeloFimDoQuadrante(i, index, 0);

        const numeroEstaNaSegundaLinhaDoQuadrante = numeroDelimitadoPeloComecoDoQuadrante(i, index, 1) &&
            numeroDelimitadoPeloFimDoQuadrante(i, index, 1);

        const numeroEstaNaTerceiraLinhaDoQuadrante = numeroDelimitadoPeloComecoDoQuadrante(i, index, 2) &&
            numeroDelimitadoPeloFimDoQuadrante(i, index, 2);


        return numeroEstaNaPrimeiraLinhaDoQuadrante || numeroEstaNaSegundaLinhaDoQuadrante || numeroEstaNaTerceiraLinhaDoQuadrante;
    });
}

function numeroRepetidoLinha(arr: sudokuValue[]): boolean {
    for (let i = 0; i < 9; i++)
        if (repete(getLinha(arr, i)))
            return true;

    return false;
}

function numeroRepetidoColuna(arr: sudokuValue[]): boolean {
    for (let i = 0; i < 9; i++)
        if (repete(getColuna(arr, i)))
            return true;

    return false;
}

function numeroRepetidoQuadrante(arr: sudokuValue[]): boolean {
    for (let i = 0; i < 9; i++)
        if (repete(getQuadrante(arr, i)))
            return true;

    return false;
}

function validaArray(arr: (sudokuValue | undefined)[]): arr is sudokuValue[] {
    return !arr.includes(undefined);
}

export function verificaJogo(table: SudokuTable): boolean {
    const arr = table.map(c => c.valor);

    if (!validaArray(arr)) {
        alert("termine o jogo primeiro");
        return false;
    }

    if (numeroRepetidoLinha(arr)) {
        alert("tem número repetido em uma linha");
        return false;
    }

    if (numeroRepetidoColuna(arr)) {
        alert("tem número repetido em uma coluna");
        return false;
    }

    if (numeroRepetidoQuadrante(arr)) {
        alert("tem número repetido em um quadrante");
        return false;
    }

    alert("parabens");
    return true;
}

export type sudokuRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type sudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type LockedCell = { x: sudokuRange, y: sudokuRange, valor: sudokuValue };
export type SudokuTable = ({ valor: sudokuValue | undefined, isLocked: boolean })[];

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