let pesosCantidadInput = 0;
let dolarBlue = 0;

document.addEventListener('DOMContentLoaded', function() {

  const dollarAmountInput = document.getElementById('dollarAmount');
  const cantidadPesosEnDolares = document.getElementById('cantidadPesosEnDolares');
  const totalPesos = document.getElementById('cantidadPesos');
  const cantidadPesos = document.getElementById('pesosAmount'); 
  const valorDolarBlue = document.getElementById('valorDolarBlue');
  const textoConfirmacion = document.getElementById('textoConfirmacion')


  const storedDollarAmount = localStorage.getItem('dollarAmount');
  const storedPesosInDollars = localStorage.getItem('pesosInDollars');


  if (storedDollarAmount) {
    dollarAmountInput.value = storedDollarAmount;
  }
  if (storedPesosInDollars) {
    cantidadPesos.value = storedPesosInDollars;
  }

  document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let dollarAmount = parseFloat(dollarAmountInput.value);
    console.log('Cantidad de dólares ingresada:', dollarAmount);

    pesosCantidadInput = parseFloat(cantidadPesos.value);
    console.log('Cantidad de pesos ingresada:', pesosCantidadInput);

    agregarDolaresYpesos(dollarAmount);
  });

  function agregarDolaresYpesos(dollarAmount) {
    fetch('https://api.bluelytics.com.ar/v2/latest')
      .then(response => response.json())
      .then(data => {
        dolarBlue = data.blue.value_avg;
        console.log("valor dolar blue: ", dolarBlue);
        const cantidadEnPesos = dollarAmount * dolarBlue;
        cantidadPesosEnDolares.textContent = "Cantidad de pesos en dólares: " + cantidadEnPesos.toFixed(2);
        totalPesos.textContent = "Cantidad de pesos: " + pesosCantidadInput;
        valorDolarBlue.textContent = "Valor del dólar blue: " + dolarBlue;
        textoConfirmacion.textContent = "los valores se cargaron correctamente"

        localStorage.setItem('dollarAmount', dollarAmount);
        localStorage.setItem('pesosInDollars', cantidadEnPesos.toFixed(2));
        localStorage.setItem('pesosreales', pesosCantidadInput);
      })
      .catch(error => console.log(error));
  }
});
