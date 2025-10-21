// lib/estilos.js
let temaClaro = false;

export function aplicarTema() {
  temaClaro = !temaClaro;
  
  if (temaClaro) {
    document.body.classList.add('tema-claro');
  } else {
    document.body.classList.remove('tema-claro');
  }
}
