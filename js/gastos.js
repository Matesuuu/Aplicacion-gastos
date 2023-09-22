let selectedCategory = '';
let sortBy = '';


function applyFilters() {
  selectedCategory = document.getElementById('categoryFilter').value;
  sortBy = document.getElementById('sortByFilter').value;
  filterExpenses();
}

document.getElementById("categoryFilter").addEventListener("change", () => {
  applyFilters();
});

document.getElementById("sortByFilter").addEventListener("change", () => {
  applyFilters();
});

document.addEventListener("DOMContentLoaded", () => {
  renderExpenseList();
});

function createExpenseCard(expense) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = expense.name;

  const category = document.createElement("p");
  category.classList.add("card-text");
  category.textContent = `Categoría: ${expense.category}`;

  const amount = document.createElement("p");
  amount.classList.add("card-text");
  amount.textContent = `Cantidad: $${expense.amount}`;

  const date = document.createElement("p");
  date.classList.add("card-text");
  date.textContent = `Fecha: ${expense.date}`;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Eliminar";
  deleteButton.addEventListener("click", function () {
    deleteExpense(expense.id);
  });

  cardBody.appendChild(title);
  cardBody.appendChild(category);
  cardBody.appendChild(amount);
  cardBody.appendChild(date);
  cardBody.appendChild(deleteButton);
  card.appendChild(cardBody);

  return card;
}

function deleteExpense(expenseId) {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  const expenseIndex = expenses.findIndex(expense => expense.id === expenseId);
  if (expenseIndex === -1) {
    console.log('Gasto no encontrado');
    return;
  }

  const deletedExpense = expenses[expenseIndex];
  const expenseAmount = deletedExpense.amount;

  expenses.splice(expenseIndex, 1);

  localStorage.setItem('expenses', JSON.stringify(expenses));

  let total = parseFloat(localStorage.getItem('totalExpenses')) || 0;
  total -= expenseAmount;
  localStorage.setItem('totalExpenses', total.toFixed(2));

  renderExpenseList();
}

function filterExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    let filteredExpenses = expenses;
    if (selectedCategory !== '') {
      filteredExpenses = filteredExpenses.filter(expense => expense.category === selectedCategory);
    }
  

    if (sortBy === 'amount-asc') {
      filteredExpenses.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
    } else if (sortBy === 'amount-desc') {
      filteredExpenses.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    }

    renderExpenseList(filteredExpenses);
  }
  

function renderExpenseList(expenses) {

expenses = expenses || JSON.parse(localStorage.getItem('expenses')) || [];


const expenseListContainer = document.getElementById('expenseList');


expenseListContainer.innerHTML = '';


expenses.forEach(expense => {
const expenseCard = createExpenseCard(expense);
expenseListContainer.appendChild(expenseCard);
});
}