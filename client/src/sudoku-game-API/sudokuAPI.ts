import { sudokuRange, sudokuValue } from "../components/SudokuRepresentation";

function repete(arr: sudokuValue[]): boolean {
    return new Set(arr).size !== 9;
}

function getLinha(arr: sudokuValue[], index: number): sudokuValue[] {
    return arr.filter((_, i) => {
        return i >= index*9 && i < (index+1)*9;
    });
}

function getColuna(arr: sudokuValue[], index: number): sudokuValue[] {
    return arr.filter((_, i) => {
        return i%9 === index;
    });
}

function getQuadrante(arr: sudokuValue[], index: number): sudokuValue[] {
    return arr.filter((_, i) => {
        return (i >= ((index%3)*3)+(27*((index - (index%3))/3)) && i < (((index%3)+1)*3)+(27*((index - (index%3))/3))) ||
        (i >= ((index%3)*3)+9+(27*((index - (index%3))/3)) && i < (((index%3)+1)*3)+9+(27*((index - (index%3))/3))) ||
        (i >= ((index%3)*3)+18+(27*((index - (index%3))/3)) && i < (((index%3)+1)*3)+18+(27*((index - (index%3))/3)));
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

export function verificaJogo(arr: sudokuValue[]) {
    if (numeroRepetidoLinha(arr)) {
        console.log("tem número repetido em uma linha");
        return;
    }

    if (numeroRepetidoColuna(arr)) {
        console.log("tem número repetido em uma coluna");
        return;
    }

    if (numeroRepetidoQuadrante(arr)) {
        console.log("tem número repetido em um quadrante");
        return;
    }

    console.log("parabens");
}

export function getNovoJogo(): { x: sudokuRange, y: sudokuRange, valor: sudokuValue }[] {
    return [
        { x: 1, y: 0, valor: 6},
        { x: 3, y: 0, valor: 1},
        { x: 5, y: 0, valor: 4},
        { x: 7, y: 0, valor: 5},
        { x: 2, y: 1, valor: 8},
        { x: 3, y: 1, valor: 3},
        { x: 5, y: 1, valor: 5},
        { x: 6, y: 1, valor: 6},
        { x: 0, y: 2, valor: 2},
        { x: 8, y: 2, valor: 1},
        { x: 0, y: 3, valor: 8},
        { x: 3, y: 3, valor: 4},
        { x: 5, y: 3, valor: 7},
        { x: 8, y: 3, valor: 6},
        { x: 2, y: 4, valor: 6},
        { x: 6, y: 4, valor: 3},
        { x: 0, y: 5, valor: 7},
        { x: 3, y: 5, valor: 9},
        { x: 5, y: 5, valor: 1},
        { x: 8, y: 5, valor: 4},
        { x: 0, y: 6, valor: 5},
        { x: 8, y: 6, valor: 2},
        { x: 2, y: 7, valor: 7},
        { x: 3, y: 7, valor: 2},
        { x: 5, y: 7, valor: 6},
        { x: 6, y: 7, valor: 9},
        { x: 1, y: 8, valor: 4},
        { x: 3, y: 8, valor: 5},
        { x: 5, y: 8, valor: 8},
        { x: 7, y: 8, valor: 7}
    ];
}