// lib/cronometro.js
let tiempo = 0;
let intervalo = null;

export function iniciarCronometro(elemento) {
  if (intervalo) return intervalo; // evitar duplicados

  intervalo = setInterval(() => {
    tiempo++;
    const horas = String(Math.floor(tiempo / 3600)).padStart(2, '0');
    const minutos = String(Math.floor((tiempo % 3600) / 60)).padStart(2, '0');
    const segundos = String(tiempo % 60).padStart(2, '0');
    elemento.textContent = `${horas}:${minutos}:${segundos}`;
  }, 1000);

  return intervalo;
}

export function detenerCronometro() {
  clearInterval(intervalo);
  intervalo = null;
}

export function reiniciarCronometro(elemento) {
  detenerCronometro();
  tiempo = 0;
  elemento.textContent = '00:00:00';
}
