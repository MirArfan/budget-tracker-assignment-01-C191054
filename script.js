const addExpenseButton = document.getElementById("add-expense-button");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const remainingBudget = document.getElementById("Available-Budget");
//const deleteBtn = document.getElementById("deleteBtn");
const deleteBtn = document.querySelectorAll(".deleteBtn");



function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  totalIncome.innerHTML = formatMoney(sum);
  console.log("inc = "+ sum);
  return sum;
}
calculateIncome();

/**
 * Task 1: Calculate total expense
 */
function calculateExpense() {
  let sums = 0;
  for (let item of expenseList.children) {
    const exp_valueString = item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");
    sums += parseFloat(exp_valueString);
  }
  totalExpense.innerHTML = formatMoney(sums); // Update the total-expense element
  console.log("exp = " + sums);
  return sums;
  // console.log("exp = "+ sum);
}
calculateExpense();
/**
 * Task 2: Calculate the budget
 */


function calculateBudget() {
  const incomeTotal=calculateIncome();
  const expenseTotal=calculateExpense();
  const availableBudget=(incomeTotal-Math.abs(expenseTotal)).toLocaleString(undefined, { minimumFractionDigits: 2,});

  remainingBudget.innerHTML=availableBudget;
  console.log("budget  "+availableBudget);
}
calculateBudget();
/**
 * Task 3: Delete Entry
 */
// function deleteEntry() {
//   //  console.log("dehee");
//   //  console.log(incomeList);
  
//   //   console.log(incomeList.children[0].children[0].remove());
   
//     const listItem = event.target.closest("li"); // Find the closest parent li element
//     listItem.remove();
// }


function deleteEntry() {
  const listItem = event.target.closest("li"); 
  console.log("listItem : " +listItem);
  listItem.remove();

  calculateIncome();
  calculateExpense();
  calculateBudget();
}
deleteBtn.forEach(btn => {
  btn.addEventListener("click", deleteEntry);
});
function addEntry() {
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;

  // data validation
  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (errors.length > 0) {
    alert(errors);
    return;
  }

  // insert entry
  const list = type === "income" ? incomeList : expenseList;
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";

  const newEntryHtml = `
    <li class="py-2.5">
      <div class="group flex justify-between gap-2 text-sm">
        <span>${description}</span>
        <div>
          <span id="deleteItem" class="${colorClass}">${sign}${formatMoney(value)}</span>
          <span
          id="deleteBtn" 
          onclick="deleteEntry()"
            class="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
          >
            Delete
          </span>
        </div>
      </div>
    </li>
    `;

  // Approach 1:
  list.innerHTML += newEntryHtml;

  // update total income value
  calculateIncome();
  calculateExpense();
  calculateBudget();
  
  // const newDeleteBtn = list.lastElementChild.querySelector('.deleteBtn');
  // newDeleteBtn.addEventListener('click', deleteEntry);
  // deleteBtn.forEach((incomeList) => {
  //   button.addEventListener("click", deleteEntry);
  // });
}

addExpenseButton.addEventListener("click", addEntry);
