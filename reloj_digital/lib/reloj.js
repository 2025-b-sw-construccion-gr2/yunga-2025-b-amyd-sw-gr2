// lib/reloj.js
export function iniciarReloj(elemento) {
  const actualizarHora = () => {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    elemento.textContent = `${horas}:${minutos}:${segundos}`;
  };

  actualizarHora();
  const intervalo = setInterval(actualizarHora, 1000);
  return intervalo;
}

export function detenerReloj(intervalo) {
  if (intervalo) clearInterval(intervalo);
}
