const addPercentageToEach = function (prices, percentage) {
  return prices.map(function (total) {
    total = parseFloat(total)
    return total + (total * percentage)
  })
}

const sum = function (prices) {
  return prices.reduce(function (currentSum, currentValue) {
    return parseFloat(currentSum) + parseFloat(currentValue)
  })
}

const percentFormat = function (percentage) {
  return parseFloat(percentage) * 100 + '%'
}

const dollarFormat = function (number) {
  return '$' + parseFloat(number).toFixed(2)
}

module.exports = {
  addPercentageToEach,
  sum,
  percentFormat,
  dollarFormat,
}