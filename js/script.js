const preguntas = [
  { pregunta: "¿Qué componente procesa datos?", opciones: ["CPU", "RAM", "HDD"], correcta: 0 },
  { pregunta: "¿Qué es periférico de salida?", opciones: ["RAM", "Teclado", "Pantalla"], correcta: 2 },
  { pregunta: "¿Almacena permanentemente?", opciones: ["RAM", "Disco", "CPU"], correcta: 1 },
  { pregunta: "¿Componente para red?", opciones: ["Tarjeta de red", "Fuente", "Teclado"], correcta: 0 },
  { pregunta: "¿Qué es periférico de entrada?", opciones: ["Teclado", "Monitor", "Altavoz"], correcta: 0 }
];

let puntaje = 0;
let preguntasContestadas = 0;
let preguntasDisponibles = [...preguntas];

document.getElementById("empezar").addEventListener("click", () => {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("juego").style.display = "block";
  mostrarCartas();
  // Inicializa el puntaje mostrado
  document.getElementById("puntaje-actual").textContent = `${puntaje}`;
});

function mostrarCartas() {
  const cartasContainer = document.getElementById("cartas");
  cartasContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const carta = crearCarta(i);
    cartasContainer.appendChild(carta);
  }
}

function crearCarta(index) {
  const carta = document.createElement("div");
  carta.className = "carta";

  const cartaInner = document.createElement("div");
  cartaInner.className = "carta-inner";

  const cartaFront = document.createElement("div");
  cartaFront.className = "carta-front";
  cartaFront.textContent = `Carta ${index + 1}`;

  const cartaBack = document.createElement("div");
  cartaBack.className = "carta-back";
  const pregunta = obtenerPreguntaAleatoria();
  cartaBack.innerHTML = `<p>${pregunta.pregunta}</p>`;

  const opcionesDiv = document.createElement("div");
  opcionesDiv.className = "opciones";

  pregunta.opciones.forEach((opcion, i) => {
    const boton = document.createElement("button");
    boton.className = "btn btn-outline-primary opcion-btn";
    boton.textContent = opcion;
    boton.addEventListener("click", () => verificarRespuesta(pregunta, i));
    opcionesDiv.appendChild(boton);
  });

  cartaBack.appendChild(opcionesDiv);
  cartaInner.appendChild(cartaFront);
  cartaInner.appendChild(cartaBack);
  carta.appendChild(cartaInner);
  carta.addEventListener("click", () => carta.classList.toggle("flipped"));

  return carta;
}

function obtenerPreguntaAleatoria() {
  const index = Math.floor(Math.random() * preguntasDisponibles.length);
  return preguntasDisponibles.splice(index, 1)[0];
}

function verificarRespuesta(pregunta, opcionSeleccionada) {
  const feedbackMessage = document.getElementById("feedbackMessage");
  if (pregunta.correcta === opcionSeleccionada) {
    puntaje += 4;
    feedbackMessage.textContent = "¡Correcto!";
  } else {
    feedbackMessage.textContent = "Incorrecto.";
  }

  preguntasContestadas++;

  // Actualiza el puntaje en la interfaz
  document.getElementById("puntaje-actual").textContent = `${puntaje}`;

  $('#feedbackModal').modal('show');

  // Desaparece la ventana modal automáticamente después de 3 segundos
  setTimeout(() => {
    $('#feedbackModal').modal('hide');
  }, 3000); // 3000 ms = 3 segundos

  if (preguntasContestadas === 5) {
    setTimeout(mostrarResultado, 500);
  }
}

function mostrarResultado() {
  const mensaje = puntaje >= 20
    ? `¡Felicidades! 🎉 Has ganado con un puntaje de ${puntaje}! ¡Eres un verdadero experto en tecnología!` 
    : `¡Oh no! 😢 Has perdido con un puntaje de ${puntaje}. ¡No te desanimes, inténtalo de nuevo!`;

  alert(mensaje);
  reiniciarJuego();
}

document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
  puntaje = 0;
  preguntasContestadas = 0;
  preguntasDisponibles = [...preguntas];
  document.getElementById("inicio").style.display = "block";
  document.getElementById("juego").style.display = "none";
  document.getElementById("puntaje-actual").textContent = `0`; // Reiniciar el puntaje mostrado
}
