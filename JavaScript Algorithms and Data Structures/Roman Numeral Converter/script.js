function parseToRoman() {
  // get number input
  let number = document.getElementById('number')
  let n = number.value
  let output = document.getElementById('output')
  // check validity
  if (n === '') {
    output.innerText = ''
    output.innerText = 'Please enter a valid number'
  } else if (n.match('-')) {
    output.innerText = ''
    output.innerText = 'Please enter a number greater than or equal to 1'
  } else if (Number(n) >= 4000) {
    output.innerText = ''
    output.innerText = 'Please enter a number less than or equal to 3999'
  } else {
    // keep only number
    const regex = /[0-9]/g
    n = n.match(regex)
    n = n.join('')
    console.log(n)
    var table = n.toString().split('').reverse()
    console.log(table)
    for (let i = 0; i < table.length; i++) {
      let U = 'I'
      let M = 'V'
      let T = 'X'
      if (i === 1) {
        U = 'X'
        M = 'L'
        T = 'C'
      } else if (i === 2) {
        U = 'C'
        M = 'D'
        T = 'M'
      } else if (i === 3) {
        U = 'M'
        M = 'V/'
        T = 'X/'
      }
      console.log(table[i])
      switch (table[i]) {
        case '0':
          table[i] = ''
          break
        case '1':
          table[i] = U
          break
        case '2':
          table[i] = U + U
          break
        case '3':
          table[i] = U + U + U
          break
        case '4':
          table[i] = U + M
          break
        case '5':
          table[i] = M
          break
        case '6':
          table[i] = M + U
          break
        case '7':
          table[i] = M + U + U
          break
        case '8':
          table[i] = M + U + U
          break
        case '9':
          table[i] = U + T
          break
        default:
          break
      }
    }
    console.log(table)

    table = table.reverse()
    output.innerText = `${table.join('')}`
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let convertBtn = document.getElementById('convert-btn')
  convertBtn.addEventListener('click', parseToRoman)
  console.log('added event listener')
})
