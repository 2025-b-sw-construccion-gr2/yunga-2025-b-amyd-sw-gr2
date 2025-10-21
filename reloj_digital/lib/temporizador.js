// lib/temporizador.js
let tiempoRestante = 0; // en segundos
let intervalo = null;
let tiempoInicial = 0;

export function configurarTemporizador(minutos, segundos) {
  tiempoRestante = minutos * 60 + segundos;
  tiempoInicial = tiempoRestante;
  return tiempoRestante;
}

export function iniciarTemporizador(elemento) {
  if (intervalo) return intervalo; // evitar duplicados
  if (tiempoRestante <= 0) return null;

  intervalo = setInterval(() => {
    if (tiempoRestante > 0) {
      tiempoRestante--;
      actualizarPantalla(elemento);
      
      // Cuando llega a cero
      if (tiempoRestante === 0) {
        detenerTemporizador();
        elemento.classList.add('pulsando');
        reproducirSonido();
        setTimeout(() => {
          alert('⏰ ¡Tiempo terminado!');
          elemento.classList.remove('pulsando');
        }, 100);
      }
    }
  }, 1000);

  return intervalo;
}

export function pausarTemporizador() {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
  }
}

export function detenerTemporizador() {
  pausarTemporizador();
}

export function reiniciarTemporizador(elemento) {
  detenerTemporizador();
  tiempoRestante = tiempoInicial;
  actualizarPantalla(elemento);
}

export function obtenerTiempoRestante() {
  return tiempoRestante;
}

function actualizarPantalla(elemento) {
  const minutos = String(Math.floor(tiempoRestante / 60)).padStart(2, '0');
  const segundos = String(tiempoRestante % 60).padStart(2, '0');
  elemento.textContent = `${minutos}:${segundos}`;
}

function reproducirSonido() {
  // Crear un beep simple usando Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}
