function checkPalindrome() {
  console.log('entered checkPalindrome')
  // Get Input value
  let textInput = document.getElementById('text-input')
  let input = textInput.value
  console.log(input)
  if (input === '') {
    alert('Please input a value')
  } else {
    // keep only letters
    const regex = /[a-z0-9]/g
    const inputLetters = input.toLowerCase().match(regex)
    console.log(inputLetters)
    // compare letters in array?

    isPalindrome(inputLetters)
      ? declareAnswer(true, input)
      : declareAnswer(false, input)
  }
}

function isPalindrome(inputLetters) {
  if (inputLetters.length === 1) {
    return true
  }
  let limit = 0
  if (inputLetters.length % 2 === 0) {
    limit = inputLetters.length / 2
  } else {
    limit = (inputLetters.length - 1) / 2
  }
  let i = 0
  while (i < limit) {
    if (inputLetters[i] === inputLetters[inputLetters.length - 1 - i]) {
      if (i == limit - 1) {
        return true
      }
      i++
    } else {
      return false
    }
  }
}

function declareAnswer(condition, input) {
  let resultDiv = document.getElementById('result')
  resultDiv.innerText = ``
  if (condition) {
    resultDiv.innerText = `${input} is a palindrome`
  } else {
    resultDiv.innerText = `${input} is not a palindrome`
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let checkBtn = document.getElementById('check-btn')
  checkBtn.addEventListener('click', checkPalindrome)
  console.log('added event listener')
})
