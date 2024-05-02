let price = 19.5
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0],
]

const currencies = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100],
]

const calculateChangeToReturn = (changeDue, resultDiv) => {
  const cashInDrawer = calculateCashInDrawer()
  let changeToReturn = 0
  let changeDueMemory = changeDue
  for (let i = currencies.length - 1; i >= 0; i--) {
    console.log(i)
    let count = 0
    while (
      changeDue / currencies[i][1] >= 1 &&
      count < cid[i][1] &&
      cid[i][1] > 0
    ) {
      changeToReturn += currencies[i][1]
      console.log(changeToReturn)
      changeDue -= currencies[i][1]
      changeDue = Math.round(changeDue * 100) / 100
      count += currencies[i][1]
    }
    if (count) {
      resultDiv.innerHTML += `<p>${currencies[i][0]}: $${count}</p>`
    }
  }
  if (changeToReturn < changeDueMemory) {
    resultDiv.innerHTML = `Status: INSUFFICIENT_FUNDS`
  }
}

const calculateCashInDrawer = () => {
  let cashInDrawer = cid.reduce(
    (acc, currency) => Math.round((acc + currency[1]) * 100) / 100,
    0
  )
  return cashInDrawer
}
const displayPrice = () => {
  const totalPrice = document.getElementById('total-price')
  totalPrice.textContent = `Total: $${price}`
}
const displayChangeInDrawer = () => {
  const changeInDrawer = document.getElementById('change-in-drawer')

  cid.forEach((currency) => (changeInDrawer.innerHTML += `<p>${currency}</p>`))
}

const calculateChangeDue = (cash) => {
  return Math.round((cash - price) * 100) / 100
}

const calculateChange = () => {
  const cash = Number(document.getElementById('cash').value)
  const resultDiv = document.getElementById('change-due')
  const cashInDrawer = calculateCashInDrawer()
  // if cash insuffisant to purchase
  if (cash < price) {
    alert('Customer does not have enough money to purchase the item')
  } else if (cash === price) {
    resultDiv.textContent = 'No change due - customer paid with exact cash'
  } else {
    // else calculate change
    const changeDue = calculateChangeDue(cash)

    if (cashInDrawer < changeDue) {
      resultDiv.textContent = `Status: INSUFFICIENT_FUNDS`
    } else if (cashInDrawer === changeDue) {
      resultDiv.textContent = 'Status: CLOSED'
      calculateChangeToReturn(changeDue, resultDiv)
    } else {
      resultDiv.textContent = 'Status: OPEN'
      // print change to give
      calculateChangeToReturn(changeDue, resultDiv)
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  calculateCashInDrawer()
  displayPrice()
  displayChangeInDrawer()
  const purchaseBtn = document.getElementById('purchase-btn')
  purchaseBtn.addEventListener('click', calculateChange)
})
