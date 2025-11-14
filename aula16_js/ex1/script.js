const form = document.getElementById('form-tarefa');
const inputNome = document.getElementById('nome-tarefa');
const selectCategoria = document.getElementById('categoria');
const filtro = document.getElementById('filtro');
const lista = document.getElementById('lista-tarefas');
const msgVazia = document.getElementById('mensagem-vazia');

let tarefas = [];
let proximoId = 1;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = inputNome.value.trim();
  const categoria = selectCategoria.value;

  if (!nome) {
    alert('Digite um nome para a tarefa.');
    return;
  }

  const novaTarefa = {
    id: proximoId++,
    nome,
    categoria,
    concluida: false
  };

  tarefas.push(novaTarefa);
  inputNome.value = '';
  renderizar();
});

filtro.addEventListener('change', () => {
  renderizar();
});

function renderizar() {
  lista.innerHTML = '';

  let tarefasFiltradas = tarefas;
  if (filtro.value !== 'todas') {
    tarefasFiltradas = tarefas.filter(
      (t) => t.categoria === filtro.value
    );
  }

  if (tarefasFiltradas.length === 0) {
    msgVazia.style.display = 'block';
    return;
  } else {
    msgVazia.style.display = 'none';
  }

  tarefasFiltradas.forEach((tarefa) => {
    const li = document.createElement('li');
    if (tarefa.concluida) li.classList.add('concluida');

    const spanNome = document.createElement('span');
    spanNome.className = 'nome-tarefa';
    spanNome.textContent = tarefa.nome;

    const spanCategoria = document.createElement('span');
    spanCategoria.className = 'categoria ' + classeCategoria(tarefa.categoria);
    spanCategoria.textContent = capitalizar(tarefa.categoria);

    const divAcoes = document.createElement('div');
    divAcoes.className = 'acoes';

    const btnConcluir = document.createElement('button');
    btnConcluir.textContent = tarefa.concluida ? 'Desmarcar' : 'Concluir';
    btnConcluir.className = 'btn-concluir';
    btnConcluir.onclick = () => {
      tarefa.concluida = !tarefa.concluida;
      renderizar();
    };

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.className = 'btn-remover';
    btnRemover.onclick = () => {
      tarefas = tarefas.filter((t) => t.id !== tarefa.id);
      renderizar();
    };

    divAcoes.appendChild(btnConcluir);
    divAcoes.appendChild(btnRemover);

    li.appendChild(spanNome);
    li.appendChild(spanCategoria);
    li.appendChild(divAcoes);

    lista.appendChild(li);
  });
}

function classeCategoria(cat) {
  return {
    estudo: 'cat-estudo',
    trabalho: 'cat-trabalho',
    pessoal: 'cat-pessoal'
  }[cat];
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

renderizar();
