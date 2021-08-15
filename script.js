const $inputs = document.querySelectorAll(".input");
const $errorZero = document.querySelector(".error-Zero");
const $percentage = document.querySelectorAll(".percentage");
const tipsBox = document.querySelector(".tips-box");
const custom = document.getElementById("custom");
const total = document.querySelector(".total__precio");
const total2 = document.querySelector(".total__precio2");
const btn = document.querySelector(".btn");
var frasco;
var selectedPercentage;

//Quitar Error de input
$inputs.forEach((input) => {
  input.addEventListener("click", () => {
    input.classList.remove("error-Input");
    input.placeholder = "";
  });
});

//Active Porcentaje
$percentage.forEach((percentage) => {
  percentage.addEventListener("click", () => {
    if (!(percentage.classList.contains("input"))) {
      custom.value = "";
      custom.placeholder = "Custom"
    }
    percentage.classList.add("active");
    selectedPercentage = percentage.textContent;
    selectedPercentage = parseInt(selectedPercentage.replace(/%/, ""));
    tipsBox.classList.remove("error-Porcentaje");
    if (frasco !== undefined) {
      frasco.classList.remove("active");
    }
    frasco = percentage;
  });
});

// Escucha enviar Info
btn.addEventListener("click", () => {
  let factura = document.getElementById("factura");
  let people = document.getElementById("people");
  let custom = document.getElementById("custom");


  // Validacion de la Factura
  if (factura.value === "") {
    factura.classList.add("error-Input");
    factura.placeholder = "Enter bill";
    return;
  }
  factura.classList.remove("error-Input");
  factura.placeholder = "";

  if (factura.value == 0) {
    $errorZero.style.display = "inline";
    factura.classList.add("error-Input");
    return;
  }
  $errorZero.style.display = "none";

  //Validacion de el Porcentaje
  if (!selectedPercentage && !custom.value) {
    tipsBox.classList.add("error-Porcentaje");
    return;
  }
  tipsBox.classList.remove("error-Porcentaje");

  //Validacion de Gente
  if (people.value === "") {
    people.classList.add("error-Input");
    people.placeholder = "Number of people";
    return;
  }
  people.classList.remove("error-Input");
  people.placeholder = "";

  if (people.value == 0) {
    $errorZero.style.display = "inline";
    people.classList.add("error-Zero");
    return;
  }
  $errorZero.style.display = "none";

  // Imprimir propina y total
  let factura2 = factura.value;
  factura2 = parseFloat(factura2);
  let percentage2 = frasco.textContent;
  percentage2 = parseFloat(percentage2);
  people = people.value;

  if (custom.value !== "") {
    custom.addEventListener("click", () => {
      frasco.classList.remove("active");
    });
    percentage2 = parseFloat(custom.value);
  }

  tipAmount = (factura2 * percentage2) / 100;
  numeroTotal1 = (tipAmount / people).toFixed(2);
  total.textContent = `$${numeroTotal1}`;
  numeroTotal2 = (tipAmount / people + factura2 / people).toFixed(2);
  total2.textContent = `$${numeroTotal2}`;
});
