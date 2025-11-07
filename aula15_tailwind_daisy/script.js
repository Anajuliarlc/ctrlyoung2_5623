// ===== utilidades =====
function appendLog(el, msg){
  const p = document.createElement('p');
  const time = new Date().toLocaleTimeString();
  p.innerHTML = `<span style="opacity:.6">${time}</span> — ${msg}`;
  el.prepend(p);
  const items = el.querySelectorAll('p');
  if(items.length > 40) el.removeChild(items[items.length-1]);
}
function flash(el){ el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
function hit(el){ el.classList.remove('hit'); void el.offsetWidth; el.classList.add('hit'); }

// ===== MOBA — teclado =====
const arena = document.getElementById('arena');
const avatar = document.getElementById('avatar');
const logMoba = document.getElementById('log-moba');

const keyMap = new Map([
  ['q','Habilidade Q'], ['w','Habilidade W'], ['e','Habilidade E'], ['r','Habilidade R'],
  ['d','Feitiço do Invocador (D)'], ['f','Feitiço do Invocador (F)'],
  ['1','Item 1'],['2','Item 2'],['3','Item 3'],['4','Item 4'],['5','Item 5'],['6','Item 6'],['7','Item 7'],
  ['a','Atacar um local (A)'], ['x','Atacar um local (X)'],
  ['s','Interromper ação (S)'],
  ['b','Voltar à base (B)'],
  ['y','Travar/Destravar câmera (Y)'],
  [' ','Centralizar câmera em você (Espaço)'],
  ['f1','Centralizar câmera em você (F1)'],
  ['f2','Centralizar câmera em um aliado (F2)'],
  ['f3','Centralizar câmera em um aliado (F3)'],
  ['f4','Centralizar câmera em um aliado (F4)'],
  ['f5','Centralizar câmera em um aliado (F5)'],
  ['enter','Abrir chat'], ['escape','Menu'],
  ['c','Informações do personagem (C)'],
  ['tab','Placar do jogo (Tab)'],
  ['p','Loja (P)'],
]);

function effectFor(action){
  if(action.includes('Habilidade') || action.includes('Feitiço')){
    hit(avatar);
  }else if(action.includes('Atacar') || action.includes('Item')){
    flash(arena);
  }else if(action.includes('Centralizar')){
    arena.scrollIntoView({behavior:'smooth', block:'center'});
    flash(arena);
  }else{
    hit(arena);
  }
}

window.addEventListener('keydown', (ev) => {
  // evita rolagem com Space/Tab
  if([' ','Tab'].includes(ev.key)) ev.preventDefault();

  const k = (ev.key || '').toLowerCase();
  const code = (ev.code || '').toLowerCase();
  const normalized = k.startsWith('f') ? k : code; // F1..F5

  const action = keyMap.get(normalized) || keyMap.get(k);
  if(action){
    appendLog(logMoba, `<span class="tag info">${action}</span> executada.`);
    effectFor(action);
  }
});

// ===== FPS — mouse =====
const alvo = document.getElementById('alvo');
const logFps = document.getElementById('log-fps');

alvo.addEventListener('click', () => {
  appendLog(logFps, `<span class="tag ok">Selecionar alvo</span>: você clicou no alvo.`);
  flash(alvo);
});
alvo.addEventListener('dblclick', () => {
  appendLog(logFps, `<span class="tag accent">Tiro</span>: disparo efetuado!`);
  hit(alvo);
});
alvo.addEventListener('mouseenter', () => {
  alvo.classList.add('aim');
  appendLog(logFps, `<span class="tag info">Mirar</span>: você está mirando o alvo.`);
});
alvo.addEventListener('mouseleave', () => {
  alvo.classList.remove('aim');
  appendLog(logFps, `Você saiu da mira.`);
});
