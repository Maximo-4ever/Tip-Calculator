document.addEventListener("DOMContentLoaded", function () {
  // Variables
  var frasco = undefined;
  const inputs = document.querySelectorAll("input");
  const errorSpan = document.querySelector(".errorSpan");
  const errorSpan2 = document.querySelector(".errorSpan2");
  var tipsBox = document.querySelector(".tips-box");
  const percentage = document.querySelectorAll(".percentage");
  var selectedPercentage = undefined;
  var total = document.querySelector(".total__precio");
  var total2 = document.querySelector(".total__precio2");
  var btn = document.querySelector(".btn");

  //Quitar Error de input
  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      factura.classList.remove("errorPeople");
      factura.placeholder = "";
      people.classList.remove("errorPeople");
      people.placeholder = "";
    });
  });

  //Quitar Porcentaje
  removerActive = () => {
    if (frasco == undefined) {
      return;
    } else {
      frasco.classList.remove("active");
    }
  };

  //Active Porcentaje
  percentage.forEach((percentage) => {
    percentage.addEventListener("click", () => {
      custom = document.querySelector("#custom");
      custom.value = "";
      percentage.classList.add("active");
      selectedPercentage = percentage.textContent;
      selectedPercentage = parseInt(selectedPercentage.replace(/%/, ""));
      tipsBox.classList.remove("errorPorcentaje");
      removerActive();
      frasco = percentage;
    });
  });

  // Escucha enviar Info
  btn.addEventListener("click", () => {
    var factura = document.querySelector("#factura");
    var people = document.querySelector("#people");
    custom = document.querySelector("#custom");

    // Validacion de la Factura
    if (factura.value == "") {
      console.log("Es necesario seleccionar el dinero en total");
      factura.classList.add("errorPeople");
      factura.placeholder = "Enter bill";
      return;
    }
    factura.classList.remove("errorPeople");
    factura.placeholder = "";

    if (factura.value == 0) {
      console.log("no puede ser cero");
      errorSpan.style.display = "inline";
      factura.classList.add("errorPeople");
      return;
    }
    errorSpan.style.display = "none";

    //Validacion de el Porcentaje
    if (selectedPercentage == undefined && custom.value == "") {
      tipsBox.classList.add("errorPorcentaje");
      console.log("Es necesario seleccionar el selectedPercentage de propina");
      return;
    }
    tipsBox.classList.remove("errorPorcentaje");

    //Validacion de Gente
    if (people.value == "") {
      console.log("Es necesario seleccionar en cuanta gente se va a dividir");
      people.classList.add("errorPeople");
      people.placeholder = "Number of people";
      return;
    }
    people.classList.remove("errorPeople");
    people.placeholder = "";

    if (people.value == 0) {
      console.log("no puede ser cero");
      errorSpan2.style.display = "inline";
      people.classList.add("errorPeople");
      return;
    }
    errorSpan2.style.display = "none";

    // Imprimir propina y total
    factura2 = factura.value;
    factura2 = parseInt(factura2)
    percentage2 = frasco.textContent;

    if (custom.value != "") {
      custom.addEventListener("click", () => {
        frasco.classList.remove("active");
      });
      percentage2 = frasco.value;
      percentage2 = parseInt(percentage2)
      people = people.value;
      tipAmount = factura2 * percentage2 / 100;
      numeroTotal = (tipAmount / people).toFixed(2)
      total.textContent = `$${tipAmount / people}.00`;
      numeroTotal2 = (tipAmount / people * people).toFixed(2)
      total2.textContent = `$${tipAmount + tipAmount / people}.00`;
      return;
    }

    percentage2 = parseInt(percentage2)
    people = people.value;
    tipAmount = factura2 * percentage2 / 100;
    numeroTotal = (tipAmount / people).toFixed(2)
    total.textContent = `$${numeroTotal}`;
    numeroTotal2 = (tipAmount / people * people).toFixed(2)
    total2.textContent = `$${numeroTotal2}`;
  });
});
