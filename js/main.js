
const expenseForm = document.getElementById('expenseForm');
expenseForm.addEventListener('submit', handleExpenseFormSubmit);

let totalExpenses = 0; 
let expenses = []; 

if('serviceWorker' in navigator){
  this.navigator.serviceWorker
              .register('../sw.js')
              .then(res => console.log('el sw se registro correctamente'))
              
              .catch(err => console.log('el sw no se pudo registrar correctamente'))
};

function handleExpenseFormSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('expenseName');
  const categoryInput = document.getElementById('expenseCategory');
  const amountInput = document.getElementById('expenseAmount');
  const name = nameInput.value;
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);
  const date = new Date().toLocaleDateString();

  if (name.trim() === '' || category.trim() === '' || isNaN(amount)) {
    return;
  }
  const expense = {
    name: name,
    category: category,
    amount: amount,
    date: date
  };

  expenses.push(expense);

  totalExpenses += amount;

  const totalPesos = parseFloat(localStorage.getItem('pesosInDollars'));
  let updatedTotalPesos = totalPesos - amount;
  localStorage.setItem('pesosInDollars', updatedTotalPesos.toFixed(2).toString());

  saveExpensesToLocalStorage();

  updateExpenseCount();
  const expenseCard = document.createElement('div');
  expenseCard.classList.add('col');

  const card = document.createElement('div');
  card.classList.add('card', 'h-100', 'text-center');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = name;

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.innerHTML = `Categoría: ${category}<br>
                        Cantidad: $${amount.toFixed(2)}<br>
                        Fecha: ${date}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Borrar';
  deleteButton.classList.add('btn', 'btn-danger', 'ms-2');
  deleteButton.addEventListener('click', () => handleExpenseDelete(expenseCard, amount));

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(deleteButton);

  card.appendChild(cardBody);
  expenseCard.appendChild(card);

  const expenseList = document.getElementById('expenseList');
  expenseList.appendChild(expenseCard);

  const totalExpensesElement = document.getElementById('totalExpenses');
  totalExpensesElement.textContent = `Total de gastos: $${totalExpenses.toFixed(2)}`;

  const GastosCantidad = document.getElementById('cantidadGastos');
  GastosCantidad.textContent = `cantidad de gastos: ${expenses.length}`;

  nameInput.value = '';
  categoryInput.value = '';
  amountInput.value = '';

}
function handleExpenseDelete(expenseCard, amount) {
  const expenseList = document.getElementById('expenseList');
  expenseList.removeChild(expenseCard);
  
  totalExpenses -= amount;
  
  const totalExpensesElement = document.getElementById('totalExpenses');
  totalExpensesElement.textContent = `Total de gastos: $${totalExpenses.toFixed(2)}`;

  const expenseIndex = expenses.findIndex(expense => expense.amount === amount);
  if (expenseIndex !== -1) {
  expenses.splice(expenseIndex, 1);
  saveExpensesToLocalStorage();
  }

  updateExpenseCount();
  }
  
  function saveExpensesToLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  localStorage.setItem('totalExpenses', totalExpenses.toFixed(2).toString());
  localStorage.setItem('cantidadGastos', expenses.length);
  }
  
  function loadExpensesFromLocalStorage() {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      expenses = JSON.parse(storedExpenses);
  
      const expenseList = document.getElementById('expenseList');
      expenseList.innerHTML = '';
      for (const expense of expenses) {
        const expenseCard = createExpenseCard(expense);
        expenseList.appendChild(expenseCard);
      }
    }
  
  const storedTotalExpenses = localStorage.getItem('totalExpenses');
  if (storedTotalExpenses) {
  totalExpenses = parseFloat(storedTotalExpenses);
  }

  const totalPesos = parseFloat(localStorage.getItem('pesosInDollars'));

  
  const expenseListContainer = document.createElement('div');
  expenseListContainer.classList.add('container');
  
  const expenseList = document.getElementById('expenseList');
  expenseList.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'g-4');
  

expenseListContainer.appendChild(expenseList);

const totalExpensesElement = document.getElementById('totalExpenses');
totalExpensesElement.textContent = `Total de gastos: $${totalExpenses.toFixed(2)}`;

const GastosCantidad = document.getElementById('cantidadGastos');
GastosCantidad.textContent = `cantidad de gastos: ${expenses.length}`;

const mainContainer = document.querySelector('main');
mainContainer.appendChild(expenseListContainer);

updateExpenseCount();
}

function updateExpenseCount() {
  const GastosCantidad = document.getElementById('cantidadGastos');
  GastosCantidad.textContent = `Cantidad de gastos: ${expenses.length}`;
}

loadExpensesFromLocalStorage();

function createExpenseCard(expense) {
  const expenseCard = document.createElement('div');
  expenseCard.classList.add('col');

  const card = document.createElement('div');
  card.classList.add('card', 'h-100', 'text-center');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = expense.name;

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.innerHTML = `Categoría: ${expense.category}<br>
                        Cantidad: $${expense.amount.toFixed(2)}<br>
                        Fecha: ${expense.date}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Borrar';
  deleteButton.classList.add('btn', 'btn-danger', 'ms-2');
  deleteButton.addEventListener('click', () => handleExpenseDelete(expenseCard, expense.amount));

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(deleteButton);

  card.appendChild(cardBody);
  expenseCard.appendChild(card);

  return expenseCard;
}


function updateCurrencyValues(dollars, pesos) {
  const dollarsElement = document.getElementById('dolares');
  const pesosElement = document.getElementById('pesos');
  let pesosReales= localStorage.getItem('pesosreales')
  let pesoscripto = localStorage.getItem('pesosInDollars')

  if(pesoscripto == null){
    dollarsElement.textContent = `USD/ARS: ${dollars}/0`;
  }else{
    dollarsElement.textContent = `USD/ARS: ${dollars}/${pesoscripto}`;
  }

  if (pesosReales == null) {
    pesosElement.textContent = `ARS: 0`;
  }else{
    pesosElement.textContent = `ARS: ${pesosReales}`;
  }


}

let valorDolarPrueba = localStorage.getItem('dollarAmount');
if (valorDolarPrueba == null) {
  updateCurrencyValues(0, 0);
} else {
  let valorDolarDiv = document.getElementById('dolares');
  updateCurrencyValues(valorDolarPrueba, localStorage.getItem('pesosreales'));
}



