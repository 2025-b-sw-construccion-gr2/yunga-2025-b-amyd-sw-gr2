// app.js
import { detenerCronometro, iniciarCronometro, reiniciarCronometro } from './lib/cronometro.js';
import { aplicarTema } from './lib/estilos.js';
import { detenerReloj, iniciarReloj } from './lib/reloj.js';
import {
    configurarTemporizador,
    detenerTemporizador,
    iniciarTemporizador,
    pausarTemporizador,
    reiniciarTemporizador
} from './lib/temporizador.js';

let modoActual = 'reloj'; // 'reloj', 'cronometro' o 'temporizador'
let intervaloCronometro = null;

// Referencias del DOM
const pantalla = document.getElementById('pantalla');
const modoActualTexto = document.getElementById('modoActual');
const btnReloj = document.getElementById('btnReloj');
const btnCronometro = document.getElementById('btnCronometro');
const btnTemporizador = document.getElementById('btnTemporizador');
const btnIniciar = document.getElementById('btnIniciar');
const btnPausar = document.getElementById('btnPausar');
const btnReiniciar = document.getElementById('btnReiniciar');
const btnTema = document.getElementById('btnTema');
const inputTemporizador = document.getElementById('inputTemporizador');
const inputMinutos = document.getElementById('minutos');
const inputSegundos = document.getElementById('segundos');
const btnSetTemporizador = document.getElementById('btnSetTemporizador');

let intervalo = null;

// --- Iniciar el reloj automáticamente al cargar ---
window.addEventListener('DOMContentLoaded', () => {
  modoActual = 'reloj';
  modoActualTexto.textContent = 'Reloj';
  intervalo = iniciarReloj(pantalla);
  actualizarBotones();
});

// --- Cambiar entre modos ---
btnReloj.addEventListener('click', () => {
  detenerTodo();
  pantalla.textContent = '';
  pantalla.classList.remove('pulsando');
  modoActual = 'reloj';
  modoActualTexto.textContent = 'Reloj';
  inputTemporizador.style.display = 'none';
  intervalo = iniciarReloj(pantalla);
  actualizarBotones();
});

btnCronometro.addEventListener('click', () => {
  detenerTodo();
  pantalla.textContent = '00:00:00';
  pantalla.classList.remove('pulsando');
  modoActual = 'cronometro';
  modoActualTexto.textContent = 'Cronómetro';
  inputTemporizador.style.display = 'none';
  actualizarBotones();
});

btnTemporizador.addEventListener('click', () => {
  detenerTodo();
  pantalla.classList.remove('pulsando');
  modoActual = 'temporizador';
  modoActualTexto.textContent = 'Temporizador';
  inputTemporizador.style.display = 'flex';
  
  // Configurar temporizador con valores por defecto
  const min = parseInt(inputMinutos.value) || 0;
  const seg = parseInt(inputSegundos.value) || 10;
  configurarTemporizador(min, seg);
  const minutos = String(min).padStart(2, '0');
  const segundos = String(seg).padStart(2, '0');
  pantalla.textContent = `${minutos}:${segundos}`;
  
  actualizarBotones();
});

// --- Configurar temporizador ---
btnSetTemporizador.addEventListener('click', () => {
  const min = parseInt(inputMinutos.value) || 0;
  const seg = parseInt(inputSegundos.value) || 0;
  
  if (min === 0 && seg === 0) {
    alert('⚠️ Por favor ingresa un tiempo válido');
    return;
  }
  
  detenerTemporizador();
  configurarTemporizador(min, seg);
  const minutos = String(min).padStart(2, '0');
  const segundos = String(seg).padStart(2, '0');
  pantalla.textContent = `${minutos}:${segundos}`;
});

// --- Controles ---
btnIniciar.addEventListener('click', () => {
  if (modoActual === 'cronometro') {
    intervaloCronometro = iniciarCronometro(pantalla);
  } else if (modoActual === 'temporizador') {
    intervalo = iniciarTemporizador(pantalla);
  }
});

btnPausar.addEventListener('click', () => {
  if (modoActual === 'cronometro') {
    detenerCronometro();
    intervaloCronometro = null;
  } else if (modoActual === 'temporizador') {
    pausarTemporizador();
    intervalo = null;
  }
});

btnReiniciar.addEventListener('click', () => {
  if (modoActual === 'cronometro') {
    reiniciarCronometro(pantalla);
    intervaloCronometro = null;
  } else if (modoActual === 'temporizador') {
    reiniciarTemporizador(pantalla);
    intervalo = null;
  } else if (modoActual === 'reloj') {
    // Reiniciar reloj (detener y volver a iniciar)
    detenerReloj(intervalo);
    intervalo = iniciarReloj(pantalla);
  }
});

// --- Cambiar tema visual ---
btnTema.addEventListener('click', () => aplicarTema());

// --- Funciones auxiliares ---
function detenerTodo() {
  if (intervalo) {
    detenerReloj(intervalo);
    detenerTemporizador();
    intervalo = null;
  }
  if (intervaloCronometro) {
    detenerCronometro();
    intervaloCronometro = null;
  }
}

function actualizarBotones() {
  // Mostrar/ocultar botones según el modo
  if (modoActual === 'reloj') {
    btnIniciar.style.display = 'none';
    btnPausar.style.display = 'none';
    btnReiniciar.style.display = 'inline-block';
  } else {
    btnIniciar.style.display = 'inline-block';
    btnPausar.style.display = 'inline-block';
    btnReiniciar.style.display = 'inline-block';
  }
}
