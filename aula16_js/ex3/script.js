const areaJogo = document.getElementById('area-jogo');
const quadrado = document.getElementById('quadrado');
const pontosSpan = document.getElementById('pontos');
const tempoSpan = document.getElementById('tempo');
const btnIniciar = document.getElementById('btn-iniciar');

const telaFinal = document.getElementById('tela-final');
const pontosFinaisSpan = document.getElementById('pontos-finais');
const avaliacaoTexto = document.getElementById('avaliacao-texto');
const btnReiniciar = document.getElementById('btn-reiniciar');

// (Opcional) se usar áudio, descomente no HTML e aqui:
// const somAcerto = document.getElementById('som-acerto');
// const somErro = document.getElementById('som-erro');

let pontos = 0;
let tempoRestante = 30;
let intervaloMovimento = 1000; // ms
let idIntervaloMovimento = null;
let idCronometro = null;
let jogoAtivo = false;
let clicouNaRodada = false;
let primeiroMovimento = true; // <- evita perder ponto antes do primeiro clique

// Iniciar / reiniciar jogo
btnIniciar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', iniciarJogo);

quadrado.addEventListener('click', () => {
  if (!jogoAtivo) return;
  if (clicouNaRodada) return; // já contou esse quadrado

  pontos++;
  clicouNaRodada = true;
  atualizarPontos();

  // if (somAcerto) somAcerto.play();
});

// ----------------- Funções principais -----------------

function iniciarJogo() {
  pontos = 0;
  tempoRestante = 30;
  intervaloMovimento = 1000;
  jogoAtivo = true;
  clicouNaRodada = false;
  primeiroMovimento = true; // reset da flag

  pontosSpan.textContent = pontos;
  tempoSpan.textContent = tempoRestante;

  telaFinal.classList.add('oculto');
  quadrado.style.display = 'block';
  btnIniciar.disabled = true;

  limparTimers();
  posicionarQuadrado();
  iniciarMovimento();
  iniciarCronometro();
}

function fimDeJogo() {
  jogoAtivo = false;
  limparTimers();
  quadrado.style.display = 'none';
  btnIniciar.disabled = false;

  pontosFinaisSpan.textContent = pontos;
  avaliacaoTexto.textContent = gerarAvaliacao(pontos);
  telaFinal.classList.remove('oculto');
}

function limparTimers() {
  if (idIntervaloMovimento) clearInterval(idIntervaloMovimento);
  if (idCronometro) clearInterval(idCronometro);
  idIntervaloMovimento = null;
  idCronometro = null;
}

// ----------------- Movimento do quadrado -----------------

function iniciarMovimento() {
  if (idIntervaloMovimento) clearInterval(idIntervaloMovimento);

  idIntervaloMovimento = setInterval(() => {
    // Só desconta ponto depois da primeira rodada
    if (!primeiroMovimento) {
      if (!clicouNaRodada) {
        pontos--;
        atualizarPontos();
        // if (somErro) somErro.play();
      }
    }

    // depois da primeira iteração, nunca mais é "primeiro movimento"
    primeiroMovimento = false;
    clicouNaRodada = false;

    posicionarQuadrado();
    ajustarVelocidade(); // aumenta a dificuldade ao longo do tempo
  }, intervaloMovimento);
}

function posicionarQuadrado() {
  const areaLargura = areaJogo.clientWidth;
  const areaAltura = areaJogo.clientHeight;
  const quadradoL = quadrado.offsetWidth;
  const quadradoA = quadrado.offsetHeight;

  const maxX = areaLargura - quadradoL;
  const maxY = areaAltura - quadradoA;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  quadrado.style.left = `${x}px`;
  quadrado.style.top = `${y}px`;
}

// ----------------- Cronômetro -----------------

function iniciarCronometro() {
  idCronometro = setInterval(() => {
    tempoRestante--;
    tempoSpan.textContent = tempoRestante;

    if (tempoRestante <= 0) {
      tempoSpan.textContent = 0;
      fimDeJogo();
    }
  }, 1000);
}

// ----------------- Dificuldade dinâmica -----------------

function ajustarVelocidade() {
  // Exemplo: a cada faixa de tempo, o quadrado fica mais rápido
  if (tempoRestante <= 10) {
    intervaloMovimento = 400;
  } else if (tempoRestante <= 20) {
    intervaloMovimento = 700;
  } else {
    intervaloMovimento = 1000;
  }

  // Reinicia o intervalo com novo valor
  if (jogoAtivo) {
    iniciarMovimento();
  }
}

// ----------------- UI -----------------

function atualizarPontos() {
  pontosSpan.textContent = pontos;
}

function gerarAvaliacao(pontos) {
  if (pontos >= 20) {
    return 'Excelente! Sua reação está afiada 👑';
  } else if (pontos >= 10) {
    return 'Muito bom! Continue treinando 👏';
  } else if (pontos >= 0) {
    return 'Você está no caminho, pratique mais 🙂';
  } else {
    return 'Tá difícil hoje, hein? Tente novamente 😅';
  }
}
