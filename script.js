const changeDue = document.getElementById("change-due")
const cash = document.getElementById("cash")
const purchaseBtn = document.getElementById("purchase-btn")
const drawerChangeList = document.querySelectorAll(".changes");

let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];

cid.forEach((change, index) => {
  drawerChangeList[index].textContent += change[1];
})

const calculateChange = (inputValue) => {
  if (parseFloat(inputValue) >= price) {
    return parseFloat(inputValue) - price;
  } else {
    alert("Customer does not have enough money to purchase the item");
    inputValue = "";
  }
}

purchaseBtn.addEventListener("click", ()=> calculateChange(cash.value))
