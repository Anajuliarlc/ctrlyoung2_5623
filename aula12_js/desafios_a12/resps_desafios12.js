/* Desafio 1: Utilizando variáveis, substitua os nomes “Eduardo” e “Mônica” música “Eduardo e Mônica” por nomes informados pelo visitante do seu site. 

Entre no site que você quer substituir os nomes(ex: https://www.letras.mus.br/legiao-urbana/22497/
Depois use o código para pedir os nomes
Acesse no body do site aonde estão os nomes e substitua*/

// Substituir nomes no site
const nome1 = prompt("Digite o primeiro nome:");
const nome2 = prompt("Digite o segundo nome:");

document.body.innerHTML = document.body.innerHTML
  .replace(/Eduardo/g, nome1)
  .replace(/Mônica/g, nome2);


  
/* Desafio 2: Crie um site sobre saúde com diversas dicas para o seu visitante. Nesse site produza uma página que calcula o IMC (peso/altura²) e mostre a seguinte mensagem para o visitante: “Seu IMC é igual a…” no formato de um alerta. */

/* Você pode fazer o site presente na mesma pasta ou pode fazer no console
A versão abaixo é a de console */

// Calculadora de IMC via console
const peso = parseFloat(prompt("Digite seu peso em kg:"));
const altura = parseFloat(prompt("Digite sua altura em metros (ex: 1.75):"));

if (!peso || !altura || altura <= 0) {
  alert("Por favor, insira valores válidos para peso e altura!");
} else {
  const imc = peso / (altura * altura);
  alert("Seu IMC é igual a " + imc.toFixed(2));
}



/* Desafio 3: Crie um site sobre meteorologia que apresenta a temperatura média da sua cidade natal em Celsius e em Fahrenheit (use a fórmula 9/5C = F - 32).
Abaixo está a versão de console e há uma versão de site nessa mesma pasta. */

// Programa de meteorologia no console
const cidade = prompt("Digite o nome da sua cidade natal:");
const tempC = parseFloat(prompt("Digite a temperatura média em °C:"));

if (!cidade || isNaN(tempC)) {
  console.log("Por favor, insira valores válidos.");
} else {
  // Conversão para Fahrenheit
  const tempF = (tempC * 9/5) + 32;

  console.log(`🌤️ A temperatura média em ${cidade} é de ${tempC.toFixed(1)}°C.`);
  console.log(`Isso equivale a ${tempF.toFixed(1)}°F.`);
}
