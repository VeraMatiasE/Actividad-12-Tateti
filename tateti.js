const listaBotones = document.querySelectorAll(".element-tateti");
const botonRepetir = document.getElementById("repetir");
const divResult = document.querySelector(".result-text");

let valuesBotones = [0,0,0,0,0,0,0,0,0];
let actualValor = 1;
const simbolos = ["X","O"];
let numeroPasos = 0;

function verificarResultado(indiceValor, nuevoValor) {
    let verificarFilas = true;
    let verificarColumnas = true;
    let verificarDiagonales = nuevoValor % 2 == 0;
    let verificarDiagonal1 = true;
    let verificarDiagonal2 = true;

    let indiceColumna = indiceValor % 3;
    let indiceFila = indiceValor - indiceColumna;

    let indiceDiagonal1 = 0;
    let indiceDiagonal2 = 2;

    for(let i=0; i<3; i++) {
        // Verifica las columnas
        if(verificarColumnas && (valuesBotones[indiceColumna] == 0 || valuesBotones[indiceColumna] != nuevoValor)) {
            verificarColumnas = false;
        }

        // Verifica las filas
        if(verificarFilas && (valuesBotones[indiceFila] == 0 || valuesBotones[indiceFila] != nuevoValor)) {
            verificarFilas = false
        }

        // Verifica las diagonales
        if(verificarDiagonales) {
            if(verificarDiagonal1 && (valuesBotones[indiceDiagonal1] == 0 || valuesBotones[indiceDiagonal1] != nuevoValor)) {
                verificarDiagonal1 = false;
            }

            if(verificarDiagonal2 && (valuesBotones[indiceDiagonal2] == 0 || valuesBotones[indiceDiagonal2] != nuevoValor)) {
                verificarDiagonal2 = false;
            }
        }

        indiceColumna+=3;
        indiceFila++;
        indiceDiagonal1 += 4;
        indiceDiagonal2 += 2;
    }
    if(verificarColumnas || verificarFilas || (verificarDiagonales && (verificarDiagonal2 || verificarDiagonal1))) {
        return true;
    }

    return false;
}

function ganoJugador() {
    listaBotones.forEach(boton => boton.disabled = true);
    divResult.style['display'] = 'flex';
    divResult.style['background-color'] = '#13d913';
    let text = divResult.getElementsByTagName("p")[0];
    text.innerHTML = `Ganó ${simbolos[actualValor]}`;

}

function Empate() {
    divResult.style['display'] = 'flex';
    divResult.style['background-color'] = 'yellow';
    let text = divResult.getElementsByTagName("p")[0];
    text.innerHTML = "Empate";
}

function limpiarValores() {
    listaBotones.forEach(boton => {
        boton.innerHTML = " ";
        boton.disabled = false;
    });
    for(let i=0; i<9; i++) {
        valuesBotones[i] = 0;
    }
    numeroPasos = 0;
    actualValor = 1;
}

function clickBoton(event) {
    numeroPasos++;
    this.disabled = true;
    actualValor = (actualValor + 1) % 2;

    this.innerHTML = simbolos[actualValor];
    valuesBotones[this.value] = actualValor + 1;

    let resultado = verificarResultado(this.value, actualValor + 1);

    if(numeroPasos == 9 && (!resultado) ) {
        Empate();
        botonRepetir.disabled = false;
        return;
    }

    if(resultado) {
        ganoJugador();
        botonRepetir.disabled = false;
    }
}

// Añadir los eventos
listaBotones.forEach(boton => boton.addEventListener("click",clickBoton));
botonRepetir.addEventListener("click", e => {
    limpiarValores();
    e.target.disabled = true;
});