// Referências gerais
const formGasto = document.getElementById('form-gasto');
const inputNomeGasto = document.getElementById('nome-gasto');
const selectCategoriaGasto = document.getElementById('categoria-gasto');
const inputValorGasto = document.getElementById('valor-gasto');

const formCategoria = document.getElementById('form-categoria');
const inputNomeCategoria = document.getElementById('nome-categoria');
const inputCorCategoria = document.getElementById('cor-categoria');

const corpoTabela = document.getElementById('corpo-tabela');
const mensagemVazia = document.getElementById('mensagem-vazia');
const totalMesSpan = document.getElementById('total-mes');

const graficoContainer = document.getElementById('grafico-container');
const legendaGrafico = document.getElementById('legenda-grafico');

// Dados
let gastos = [];
let proximoIdGasto = 1;

let categorias = [
  { id: 'alimentacao', nome: 'Alimentação', cor: '#fecaca' },
  { id: 'transporte',  nome: 'Transporte',  cor: '#bae6fd' },
  { id: 'lazer',       nome: 'Lazer',       cor: '#fef08a' },
  { id: 'outros',      nome: 'Outros',      cor: '#e5e7eb' }
];

// ===== Utilitários =====
function slugify(texto) {
  return texto
    .toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function formatarValor(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function encontrarCategoriaPorId(id) {
  return categorias.find(cat => cat.id === id);
}

// ===== Renderização =====
function renderizarCategoriasSelect() {
  selectCategoriaGasto.innerHTML = '';

  categorias.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.nome;
    selectCategoriaGasto.appendChild(opt);
  });
}

function renderizarTabela() {
  corpoTabela.innerHTML = '';

  if (gastos.length === 0) {
    mensagemVazia.style.display = 'block';
    return;
  } else {
    mensagemVazia.style.display = 'none';
  }

  gastos.forEach(gasto => {
    const tr = document.createElement('tr');

    const tdNome = document.createElement('td');
    tdNome.textContent = gasto.nome;

    const tdCategoria = document.createElement('td');
    const cat = encontrarCategoriaPorId(gasto.categoriaId);
    const spanCat = document.createElement('span');
    spanCat.className = 'categoria-tag';
    if (cat) {
      spanCat.style.backgroundColor = cat.cor;
      spanCat.textContent = cat.nome;
    } else {
      spanCat.style.backgroundColor = '#e5e7eb';
      spanCat.textContent = 'Sem categoria';
    }
    tdCategoria.appendChild(spanCat);

    const tdValor = document.createElement('td');
    tdValor.className = 'valor';
    tdValor.textContent = formatarValor(gasto.valor);

    const tdAcoes = document.createElement('td');
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.className = 'btn-remover';
    btnRemover.addEventListener('click', () => {
      gastos = gastos.filter(g => g.id !== gasto.id);
      renderizarTudo();
    });
    tdAcoes.appendChild(btnRemover);

    tr.appendChild(tdNome);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdValor);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  });
}

function renderizarTotal() {
  const total = gastos.reduce((soma, gasto) => soma + gasto.valor, 0);
  totalMesSpan.textContent = formatarValor(total);
}

function renderizarGrafico() {
  graficoContainer.innerHTML = '';
  legendaGrafico.innerHTML = '';

  if (categorias.length === 0) return;

  // Somar valores por categoria
  const totais = {};
  categorias.forEach(cat => {
    totais[cat.id] = 0;
  });

  gastos.forEach(gasto => {
    if (totais.hasOwnProperty(gasto.categoriaId)) {
      totais[gasto.categoriaId] += gasto.valor;
    }
  });

  const valores = Object.values(totais);
  const maxValor = Math.max(...valores, 0);
  const alturaMaxPx = 160;
  const fator = maxValor > 0 ? alturaMaxPx / maxValor : 0;

  // Barras
  categorias.forEach(cat => {
    const valorCat = totais[cat.id];

    const barra = document.createElement('div');
    barra.className = 'barra';
    barra.style.backgroundColor = cat.cor;
    barra.style.height = (valorCat * fator) + 'px';

    const labelValor = document.createElement('span');
    labelValor.textContent = valorCat > 0 ? formatarValor(valorCat) : '';

    barra.appendChild(labelValor);
    graficoContainer.appendChild(barra);
  });

  // Legenda
  categorias.forEach(cat => {
    const item = document.createElement('div');
    item.className = 'legenda-item';

    const cor = document.createElement('div');
    cor.className = 'legenda-cor';
    cor.style.backgroundColor = cat.cor;

    const texto = document.createElement('span');
    texto.textContent = cat.nome;

    item.appendChild(cor);
    item.appendChild(texto);
    legendaGrafico.appendChild(item);
  });
}

function renderizarTudo() {
  renderizarTabela();
  renderizarTotal();
  renderizarGrafico();
}

// ===== Eventos =====

// Adicionar gasto
formGasto.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = inputNomeGasto.value.trim();
  const categoriaId = selectCategoriaGasto.value;
  const valor = Number(inputValorGasto.value);

  if (!nome || !categoriaId || isNaN(valor) || valor <= 0) {
    alert('Preencha corretamente o nome, categoria e valor do gasto.');
    return;
  }

  const novoGasto = {
    id: proximoIdGasto++,
    nome,
    categoriaId,
    valor
  };

  gastos.push(novoGasto);

  inputNomeGasto.value = '';
  inputValorGasto.value = '';
  inputNomeGasto.focus();

  renderizarTudo();
});

// Adicionar categoria
formCategoria.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = inputNomeCategoria.value.trim();
  let cor = inputCorCategoria.value;

  if (!nome) {
    alert('Digite um nome para a categoria.');
    return;
  }

  const id = slugify(nome);

  const jaExiste = categorias.some(cat => cat.id === id);
  if (jaExiste) {
    alert('Já existe uma categoria com esse nome. Escolha outro nome.');
    return;
  }

  if (!cor) {
    cor = '#e5e7eb';
  }

  const novaCategoria = { id, nome, cor };
  categorias.push(novaCategoria);

  inputNomeCategoria.value = '';
  inputNomeCategoria.focus();

  renderizarCategoriasSelect();
  renderizarTudo();
});

// ===== Inicialização =====
renderizarCategoriasSelect();
renderizarTudo();
