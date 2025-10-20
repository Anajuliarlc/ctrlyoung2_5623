let nome = "Ana";
console.log(nome);
//console.log(Nome); // Erro! "Nome" ≠ "nome"

//

let a = 10;
let b = 20;
console.log(a + b);

//

if (true) {
  console.log("Este é um bloco de código!");
}

//

function exemplo() {
  let mensagem = "Olá!";
  console.log(mensagem); // funciona
}
exemplo();

console.log(mensagem); // erro - fora do escopo

//

2 + 2

//

let nome1 = "Brunno";
console.log(nome1);

//

function ola() {
  console.log("Olá, mundo!");
}
ola();

//

let nome3 = "Ana";
let idade = 20;

//

var nome4 = "Brunno";
let idade2 = 22;
const PI = 3.14159;

// sempre atribua valores iniciais
//let contador;
let contador = 0;
console.log(contador); 

//
//O comando prompt() é usado para pedir que o usuário digite um valor.
//Esse valor é sempre recebido como texto (string), mesmo que o usuário digite um número.
let nomeDec = prompt("Qual é o seu nome?");
alert("Olá, " + nomeDec + "! Seja bem-vindo!");

//

let nome5 = "Ana";
let idade3 = 22;
console.log("Meu nome é " + nome5 + " e tenho " + idade3 + " anos.");

//

let n1 = prompt("Digite um número:"); // Ex: 5
let n2 = prompt("Digite outro número:"); // Ex: 3

let resultado = n1 + n2;
console.log(resultado); // Saída: 53 (concatenação, não soma!)

//
let nota1 = parseInt(prompt("Digite um número:"));
let nota2 = parseInt(prompt("Digite outro número:"));
let soma = nota1 + nota2;
console.log("A soma é: " + soma);

//

let numero = 123;
let texto = numero.toString();
console.log("Número convertido em texto: " + texto);
console.log("Número convertido em texto: " + texto + 24);