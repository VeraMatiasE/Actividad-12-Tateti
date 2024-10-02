const listaBotones = document.querySelectorAll(".element-tateti");
const botonRepetir = document.getElementById("repetir");
const divResult = document.querySelector(".result-text");
const resultadoTexto = divResult.querySelector("p");
const mostradorTurnoX = document.getElementById("turn-X");
const mostradorTurnoO = document.getElementById("turn-O");

if (!botonRepetir.disabled) botonRepetir.disabled = true;

let valuesBotones = Array(9).fill(0);
let actualValor = 0;
const simbolos = ["X", "O"];
let numeroPasos = 0;

function verificarResultado() {
  const combinacionesGanadoras = [
    // Filas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columnas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonales
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combinacion of combinacionesGanadoras) {
    if (
      combinacion.every((indice) => valuesBotones[indice] === actualValor + 1)
    ) {
      animarLineaGanadora(combinacion);
      return true;
    }
  }
  return false;
}

function animarLineaGanadora(combinacion) {
  combinacion.forEach((indice) => {
    listaBotones[indice].classList.remove("clicked");
    listaBotones[indice].classList.add("line-winner");
    listaBotones[indice].style.boxShadow = `0 0 20px ${
      actualValor === 0 ? "var(--X-color)" : "var(--O-color)"
    }`;
  });
}

function mostrarResultado(mensaje, colorFondo) {
  divResult.style.display = "flex";
  divResult.style.backgroundColor = colorFondo;
  resultadoTexto.textContent = mensaje;
  botonRepetir.disabled = false;
  mostradorTurnoO.classList.add("hidden");
  mostradorTurnoX.classList.add("hidden");
}

function limpiarValores() {
  listaBotones.forEach((boton) => {
    boton.textContent = " ";
    boton.classList.remove("clicked");
    boton.classList.remove("X-box");
    boton.classList.remove("O-box");
    boton.disabled = false;
    boton.style.boxShadow = "none";
    boton.classList.remove("line-winner");
    boton.classList.add("circle-animation");
  });
  valuesBotones.fill(0);
  numeroPasos = 0;
  actualValor = 0;
  divResult.style.display = "none";
  mostradorTurnoO.classList.remove("hidden");
  mostradorTurnoX.classList.remove("hidden");
}

function actualizarTurno() {
  if (actualValor === 0) {
    mostradorTurnoX.classList.add("active");
    mostradorTurnoO.classList.remove("active");
  } else {
    mostradorTurnoO.classList.add("active");
    mostradorTurnoX.classList.remove("active");
  }
}

function clickBoton(event) {
  numeroPasos++;
  this.textContent = simbolos[actualValor];
  this.disabled = true;
  valuesBotones[this.value] = actualValor + 1;
  this.classList.add("clicked");
  this.classList.add(actualValor === 0 ? "X-box" : "O-box");

  if (verificarResultado()) {
    listaBotones.forEach((boton) => (boton.disabled = true));
    mostrarResultado(
      `Ganó ${simbolos[actualValor]}`,
      actualValor === 0 ? "var(--X-color)" : "var(--O-color)"
    );
  } else if (numeroPasos === 9) {
    mostrarResultado("Empate", "var(--draw-color)");
  } else {
    if (numeroPasos === 1) {
      listaBotones.forEach((boton) =>
        boton.classList.remove("circle-animation")
      );
    }
    actualValor = (actualValor + 1) % 2;
    actualizarTurno();
  }
}

// Añadir los eventos
listaBotones.forEach((boton) => boton.addEventListener("click", clickBoton));
botonRepetir.addEventListener("click", (e) => {
  limpiarValores();
  e.target.disabled = true;
});
