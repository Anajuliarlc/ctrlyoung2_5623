const misto = [1, "dois", { tres: 3 }, [4]];
console.log(misto[0]); // 1
console.log(misto[2].tres); // 3


//


// Literal (mais comum)
const a = [10, 20, 30];

// Construtor (menos usado para criar com valores)
const b = new Array(3); // [ , , ]  -> array com 3 posições vazias (holes)
const c = Array(1, 2, 3); // [1, 2, 3]

// A partir de iteráveis/array-like
const d = Array.from("abc"); // ['a', 'b', 'c']
const e = Array.of(5);       // [5]


//


const arr = ["a", "b", "c"];
console.log(arr[0]);        // "a"
console.log(arr[arr.length - 1]); // "c"
console.log(arr.at(-1));    // "c" (mais legível)

const [primeiro, segundo, ...resto] = [10, 20, 30, 40];
console.log(primeiro, segundo, resto); // 10 20 [30, 40]

//


const v = [1, 2, 3, 4];
v.length = 2;
console.log(v); // [1, 2]

const pilha = [1, 2];
pilha.push(3);   // [1,2,3]
const x = pilha.pop(); // x=3, pilha=[1,2]

const fila = [2, 3];
fila.unshift(1); // [1,2,3]
const y = fila.shift(); // y=1, fila=[2,3]


const nomes = ["Ana", "Bruno", "Ana"];
console.log(nomes.indexOf("Ana"));     // 0
console.log(nomes.indexOf("Ana", 1));  // 2 (começa a buscar do índice 1)

const nums = [1, 2, 3, 4];
// Remover 2 elementos a partir do índice 1
const removidos = nums.splice(1, 2); // removidos=[2,3], nums=[1,4]

// Inserir sem remover (deleteCount=0)
nums.splice(1, 0, 99); // nums=[1,99,4]

const a1 = [10, 2, 30];
a1.sort(); // ['10','2','30'] -> como strings => [10, 2, 30] (ordem inesperada)

// Ordenação numérica correta:
a1.sort((x, y) => x - y); // [2, 10, 30]

// Não mutar o original:
const a2 = [10, 2, 30];
const ordenado = [...a2].sort((x, y) => x - y);


//


const original = [1, { nome: "Ana" }, [10, 20]];

const c1 = original.slice();      // clássica
const c2 = [...original];         // spread
const c3 = Array.from(original);  // também comum

c2[1].nome = "Bruno"; // altera no original também (mesmo objeto!)
console.log(original[1].nome); // "Bruno"


//

const grid = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(grid[0][1]); // 2
// ERRADO (todas as linhas apontam para o mesmo array):
const errado = Array(3).fill(Array(4).fill(0));
errado[0][0] = 1;
console.log(errado[1][0]); // 1 (efeito colateral indesejado)

// CERTO:
const linhas = 3, colunas = 4;
const matrizOk = Array.from({ length: linhas }, () =>
  Array(colunas).fill(0)
);
matrizOk[0][0] = 1;
console.log(matrizOk[1][0]); // 0 (cada linha é independente)

for (const linha of matrizOk) {
  for (const valor of linha) {
    // use valor
  }
}


//


let idade = 18;

if (idade < 18) {
  console.log("Menor de idade");
} else if (idade === 18) {
  console.log("Tem exatamente 18 anos");
} else {
  console.log("Maior de idade");
}


//


if ("") {
  console.log("não executa");
}
if ("texto") {
  console.log("executa"); // string não vazia é true
}


//


let dia = 3; 
//let dia = parseInt(prompt("Digite um dia de 1 a 3:"));
let nomeDia;

switch (dia) {
  case 1:
    nomeDia = "Domingo";
    break;
  case 2:
    nomeDia = "Segunda";
    break;
  case 3:
    nomeDia = "Terça";
    break;
  default:
    nomeDia = "Dia inválido";
}

console.log(nomeDia); // "Terça"


//


let idade2 = 20;
let temCarteira = true;

if (idade2 >= 18 && temCarteira) {
  console.log("Pode dirigir");
}

if (idade2 < 18 || !temCarteira) {
  console.log("Não pode dirigir");
}


//


let x1 = 5;
x1++;
console.log(x); // 6

x1 *= 2; // mesmo que x = x * 2
console.log(x); // 12


//


let contador = 0;

while (contador < 5) {
  console.log("Contador:", contador);
  contador++;
}


//


let senha;

do {
  senha = prompt("Digite sua senha:");
} while (senha !== "1234");

console.log("Acesso permitido!");


//


for (let i = 0; i < 5; i++) {
  console.log("i =", i);
}


//


let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}


//


const frutas = ["maçã", "banana", "uva"];
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

for (const fruta of frutas) {
  console.log(fruta);
}

for (const i in frutas) {
  console.log(i, frutas[i]);
}


//


for (let i = 1; i <= 5; i++) {
  if (i === 3) continue; // pula o número 3
  if (i === 5) break;    // interrompe quando chegar em 5
  console.log(i);
}
// Saída: 1, 2, 4
