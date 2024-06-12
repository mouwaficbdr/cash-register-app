
let price = 1.87
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
]

const change = document.getElementById("change-due")
const cash = document.getElementById("cash")
const purchaseBtn = document.getElementById("purchase-btn")
const drawerChangeList = document.querySelectorAll(".changes")

const currencyUnits = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];

cid.forEach((change, index) => {
  drawerChangeList[index].textContent = change[1]
})

purchaseBtn.addEventListener("click", () => {
  const cashValue = parseFloat(cash.value)
  const changeDue = cashValue - price

  if (cashValue < price) {
    alert("Customer does not have enough money to purchase the item")
    return
  }
  if (cashValue === price) {
    change.textContent = "No change due - customer paid with exact cash"
    return
  }
  const changeResult = getChange(changeDue, cid)
  
  if(changeResult.status === "INSUFFICIENT_FUNDS" || changeResult.status === "CLOSED"){
    change.innerText = `Status: ${changeResult.status}
     ${formatChange(changeResult.change)}`
  } else {
    let changeText = `Status: ${changeResult.status}
     ${formatChange(changeResult.change)}`
    change.innerText = changeText
  }
})

const getChange = (changeDue, cid) => {
  const totalCid = parseFloat((cid.reduce((sum, [_, amount]) => sum + amount, 0)).toFixed(2))
  if (totalCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] }
  }

  let changeArr = []
  let remainingChange = changeDue

  for (let i = currencyUnits.length - 1; i >= 0; i--){
    let unit = currencyUnits[i][0]
    let unitValue = currencyUnits[i][1]
    let cidValue = cid[i][1]

    if (unitValue <= remainingChange && cidValue > 0) {
      let amountFromUnit = 0
      while (remainingChange >= unitValue && cidValue > 0) {
        remainingChange = (remainingChange - unitValue).toFixed(2)
        cidValue -= unitValue
        amountFromUnit += unitValue
      }
      if (amountFromUnit > 0) {
        changeArr.push([unit, amountFromUnit])
      }
    }
  }

  if(remainingChange > 0){
    return { status: "INSUFFICIENT_FUNDS", change: [] }
  }

  if(changeDue === totalCid){
    return { status: "CLOSED", change: cid }
  }

  return { status: "OPEN", change: changeArr }
}

const formatChange = changeArr => changeArr.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join("\n")