function newSolvedBoard() {
    const FACES = ["front", "left", "right", "back", "top", "bottom"];

    const newCube = FACES.reduce((acc, curr) => {
        const matrice = new Array(4)
            .fill(undefined)
            .map(() => new Array(4).fill(undefined));

        acc[curr] = matrice;

        return acc;
    }, {});

    try {
        fillPuzzle(newCube);
    } catch (error) {
        console.log(newCube);
        throw error;
    }

    return newCube;
}

function fillPuzzle(startingCube) {
    let i = 0;
    const emptyFaces = ["front", "back", "left", "right", "top", "bottom"];

    while (true) {
        console.log(i);
        if (i > 100_000)
            throw new Error("Recursion Timeout");

        if (emptyFaces.length === 0)
            return;

        i++;

        const randomFace = choose(emptyFaces);

        if (startingCube[randomFace].flat().indexOf(undefined) === -1) {
            emptyFaces.splice(emptyFaces.indexOf(randomFace), 1);
            i--;
            continue;
        }

        const emptyCell = findEmptyCell(startingCube[randomFace]);

        if (emptyCell === undefined)
            return;

        const randomNumber = randomMissNumber(startingCube[randomFace]);

        if (safeToPlace(startingCube, randomFace, emptyCell, randomNumber))
            startingCube[randomFace][emptyCell.y][emptyCell.x] = randomNumber
    }
}

function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function findEmptyCell(face) {
    const emptys = face
        .map((line, i) =>
            line.map((cell, j) => ({ x: j, y: i, valor: cell }))
        )
        .flat()
        .filter(cell => cell.valor === undefined);

    if (emptys.length === 0)
        return undefined;

    const { x, y } = choose(emptys);

    return { x , y };
}

function randomMissNumber(face) {
    const possible = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    const placed = face.flat().filter(c => c !== undefined);

    const remaning = possible.filter(p => placed.indexOf(p) === -1);

    return choose(remaning);
}

function safeToPlace(cube, face, cell, number) {
    return safeToPlacePrincipalLine(cube, face, cell, number) &&
        safeToPlacePrincipalColumn(cube, face, cell, number) &&
        safeToPlaceLineColumn(cube, face, cell, number) &&
        safeToPlaceFace(cube, face, number);
}

function safeToPlacePrincipalLine(cube, face, cell, number) {
    const principalLineFaces = ["front", "right", "back", "left"]

    if (principalLineFaces.indexOf(face) === -1)
        return true;

    const cellsPrincipalLine = Object.keys(cube)
        .filter(key => principalLineFaces.indexOf(key) !== -1)
        .map(key => {
            if (key === face) {
                const line = cube[key][cell.y].map(c => c);

                line[cell.x] = number;

                return line;
            }

            return cube[key][cell.y];
        })
        .flat()
        .filter(cell => cell !== undefined);

    return new Set(cellsPrincipalLine).size === cellsPrincipalLine.length;
}

function safeToPlacePrincipalColumn(cube, face, cell, number) {
    const principalColumnFaces = ["front", "top", "back", "bottom"];

    if (principalColumnFaces.indexOf(face) === -1)
        return true;

    const cellsPrincipalColumn = Object.keys(cube)
        .filter(key => principalColumnFaces.indexOf(key) !== -1)
        .map(key => {
            const isReverse = key === "back";

            if (key !== face && isReverse)
                return cube[key].map(line => line[4 - cell.x]);

            if (key === face) {
                const cellColumn = isReverse ? 4 - cell.x : cell.x;
                const cellLine = isReverse ? 4 - cell.y : cell.y;

                const column = cube[key].map(line => line[cellColumn]);

                column[cellLine] = number;

                return column;
            }

            return cube[key].map(line => line[cell.x]);
        })
        .flat()
        .filter(cell => cell !== undefined);

    return new Set(cellsPrincipalColumn).size === cellsPrincipalColumn.length;
}

function safeToPlaceLineColumn(cube, face, cell, number) {
    const lineColumn = ["top", "right", "bottom", "left"];
    const reversedFaces = ["right", "bottom"];

    if (lineColumn.indexOf(face) === -1)
        return true;

    const cellsLineColumn = Object.keys(cube)
        .filter(key => lineColumn.indexOf(key) !== -1)
        .map(key => {
            const isReverse = reversedFaces.indexOf(key) !== -1;

            if (key !== face && isReverse)
                return cube[key].map(line => line[4 - cell.x]);

            if (key === face) {
                const cellColumn = isReverse ? 4 - cell.x : cell.x;
                const cellLine = isReverse ? 4 - cell.y : cell.y;

                const column = cube[key].map(line => line[cellColumn]);

                column[cellLine] = number;

                return column;
            }

            return cube[key].map(line => line[cell.x]);
        })
        .flat()
        .filter(cell => cell !== undefined);

    return new Set(cellsLineColumn).size === cellsLineColumn.length;
}

function safeToPlaceFace(cube, face, number) {
    return cube[face].flat().indexOf(number) === -1;
}

console.log(newSolvedBoard())