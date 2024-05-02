function validatePhoneNumber() {
  // get number input
  let userInput = document.getElementById('user-input')
  let number = userInput.value
  //no number alert
  if (number === '') {
    alert('Please provide a phone number')
  }
  // check validity
  const countryCode = '^(1\\s?)?'
  const areaCode = '(\\([0-9]{3}\\)|[0-9]{3})'
  const spacesDashes = '[\\s\\-]?'
  const phoneNumber = '[0-9]{3}[\\s\\-]?[0-9]{4}$'
  const phoneRegex = new RegExp(
    `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
  )
  let isNumberValid = phoneRegex.test(number)
  console.log(isNumberValid)
  displayValidity(isNumberValid, number)
}
function displayValidity(isNumberValid, number) {
  let resultsDiv = document.getElementById('results-div')
  isNumberValid
    ? (resultsDiv.innerText += `Valid US number: ${number}`)
    : (resultsDiv.innerText += `Invalid US number: ${number}`)
  resultsDiv.innerHTML += `</br>`
}

function clearResultsDiv() {
  let resultsDiv = document.getElementById('results-div')
  resultsDiv.innerText = ''
}

document.addEventListener('DOMContentLoaded', function () {
  let checkBtn = document.getElementById('check-btn')
  checkBtn.addEventListener('click', validatePhoneNumber)
  let clearBtn = document.getElementById('clear-btn')
  clearBtn.addEventListener('click', clearResultsDiv)
})
