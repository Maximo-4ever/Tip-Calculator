const $allInputs = document.querySelectorAll(".input");
const $inputFacture = document.querySelector("#factura");
const $inputCustomTip = document.querySelector("#custom");
const $inputPeople = document.querySelector("#people");
const $errorZero = document.querySelector(".error-Zero");

const tipsBox = document.querySelector(".selectTip");
const btnReset = document.querySelector(".total__btn");
let selectedPercentage = 15;

$allInputs.forEach((input) => {
  input.addEventListener("click", () => {
    input.classList.remove("error-Input");
  });
  input.addEventListener("input", () => calculateTip());
});

tipsBox.addEventListener("click", (evt) => {
  const { target } = evt;
  let listSiblings = target.parentElement.children;
  selectedPercentage = "";
  listSiblings = Array.from(listSiblings);
  if (target.classList.contains("input")) {
    // Si el porcentaje es personalizado:
    $inputCustomTip.addEventListener("input", (evt) => {
      selectedPercentage += evt.data;
    });
  } else if (target.classList.contains("selectTip__percentage")) {
    $inputCustomTip.value = "";
    selectedPercentage = parseInt(target.textContent.replace(/%/, ""));
  }
  listSiblings.forEach((element) => element.classList.remove("active"));
  target.classList.add("active");
});

const validations = (inputFacture, inputPeople) => {
  if (inputFacture.value == 0) {
    $errorZero.style.display = "inline";
    inputFacture.classList.add("error-Input");
    return;
  }
  if (inputPeople.value === "") {
    inputPeople.classList.add("error-Input");
    inputPeople.placeholder = "Number of people";
    return;
  }
  $errorZero.style.display = "none";
  inputPeople.classList.remove("error-Input");
  inputPeople.placeholder = "";
};

const printResult = (factura, percentage, people) => {
  const total1 = document.querySelector(".total__precio");
  const total2 = document.querySelector(".total__precio2");
  if ($inputCustomTip.value !== "") {
    percentage = parseFloat($inputCustomTip.value);
  }
  tipAmount = (factura * percentage) / 100;
  // Print
  numeroTotal1 = (tipAmount / people).toFixed(2);
  total1.textContent = `$${numeroTotal1}`;
  numeroTotal2 = (tipAmount / people + factura / people).toFixed(2);
  total2.textContent = `$${numeroTotal2}`;
};

const calculateTip = () => {
  if ($inputFacture.value === "") {
    $inputFacture.classList.add("error-Input");
    $inputFacture.placeholder = "0";
    return;
  }
  $inputFacture.classList.remove("error-Input");
  $inputFacture.placeholder = "";

  validations($inputFacture, $inputPeople);

  let factura = parseFloat($inputFacture.value);
  let percentage = parseFloat(selectedPercentage);
  let people = parseFloat($inputPeople.value);
  printResult(factura, percentage, people);
};

btnReset.addEventListener("click", () => {
  $inputFacture.value = 0;
});
