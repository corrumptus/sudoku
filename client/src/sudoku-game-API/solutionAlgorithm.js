const tabelaDOM = document.querySelectorAll(".sudoku_cell");

let naoPreenchidos = 81;

const tabela = [...tabelaDOM].map(cell => {
    if (cell.classList.contains("trancada")) {
        naoPreenchidos--;
        return { valor: Number(cell.innerText) };
    }

    return { valor: -1, possiveis: [1,2,3,4,5,6,7,8,9] };
});

function getLinha(arr, index) {
    return arr.filter((_, i) => {
        return i >= index*9 && i < (index+1)*9;
    });
}

function getColuna(arr, index) {
    return arr.filter((_, i) => {
        return i%9 === index;
    });
}

function getQuadrante(arr, index) {
    return arr.filter((_, i) => {
        const numeroDelimitadoPeloComecoDoQuadrante = (i, index, linha) =>
            i >= ((index%3)*3)+(9*linha)+(27*((index - (index%3))/3));

        const numeroDelimitadoPeloFimDoQuadrante = (i, index, linha) =>
            i < (((index%3)+1)*3)+(9*linha)+(27*((index - (index%3))/3));


        const numeroEstaNaPrimeiraLinhaDoQuadrante = numeroDelimitadoPeloComecoDoQuadrante(i, index, 0) &&
            numeroDelimitadoPeloFimDoQuadrante(i, index, 0);

        const numeroEstaNaSegundaLinhaDoQuadrante = numeroDelimitadoPeloComecoDoQuadrante(i, index, 1) &&
            numeroDelimitadoPeloFimDoQuadrante(i, index, 1);

        const numeroEstaNaTerceiraLinhaDoQuadrante = numeroDelimitadoPeloComecoDoQuadrante(i, index, 2) &&
            numeroDelimitadoPeloFimDoQuadrante(i, index, 2);


        return numeroEstaNaPrimeiraLinhaDoQuadrante || numeroEstaNaSegundaLinhaDoQuadrante || numeroEstaNaTerceiraLinhaDoQuadrante;
    });
}

function removeDuplicados(base, numeros) {
    numeros.forEach(p => {
        const index = base.indexOf(p);

        if (index !== -1)
            base.splice(index, 1);
    });
}

const quadranteMap = [
    [0,1,2,  9,10,11,  18,19,20],
    [3,4,5,  12,13,14,  21,22,23],
    [6,7,8,  15,16,17,  24,25,26],
    
    [27,28,29,  36,37,38,  45,46,47],
    [30,31,32,  39,40,41,  48,49,50],
    [33,34,35,  42,43,44,  51,52,53],
    
    [54,55,56,  63,64,65,  72,73,74],
    [57,58,59,  66,67,68,  75,76,77],
    [60,61,62,  69,70,71,  78,79,80]
];

while (naoPreenchidos > 0) {
    for (let i = 0; i < 81; i++) {
        if (tabela[i].valor !== -1)
            continue;

        removeDuplicados(tabela[i].possiveis, getLinha(tabela, Math.floor(i/9)).map(cell => cell.valor).filter(n => n !== -1));

        removeDuplicados(tabela[i].possiveis, getColuna(tabela, i%9).map(cell => cell.valor).filter(n => n !== -1));

        removeDuplicados(tabela[i].possiveis, getQuadrante(tabela, quadranteMap.findIndex(q => q.includes(i))).map(cell => cell.valor).filter(n => n !== -1));

        if (tabela[i].possiveis.length === 1) {
            tabela[i].valor = tabela[i].possiveis[0]
            naoPreenchidos--;
            tabela[i].possiveis = undefined;
        }
    }
}

tabela.forEach(({ valor }, index) => {
    if (!tabelaDOM[index].classList.contains("trancada"))
        tabelaDOM[index].querySelector("select").value = valor;
});