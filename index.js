'use strict'

const areAllNumbers = (arr) => {
  return (arr || []).reduce(function (a, b) {
    return a && typeof b === 'number' && !isNaN(b)
  }, true)
}

const getTail = (arr = []) => {
  const lastIndex = arr.length - 1
  return lastIndex >= 0 ? arr[lastIndex] : null
}

const groupByCharacters = (arr = []) => {
  const map = {}
  arr.forEach(num => {
    if (!(num in map)) {
      map[num] = 1
    } else {
      map[num] += 1
    }
  })
  return map
}

const groupByNumOfOccurrences = (map = {}) => {
  const result = {}
  for (const key in map) {
    const numOfOccurrence = map[key]
    if (result[numOfOccurrence] === undefined) { result[numOfOccurrence] = [key] } else { result[numOfOccurrence] = [...result[numOfOccurrence], key] }
  }
  return result
}

const checkDoubleOrTriple = (groupedByOccurrences) => {
  // has to have either one double digit OR one triple digit, never both.
  if (groupedByOccurrences[2] && groupedByOccurrences[2].length === 1 &&
      groupedByOccurrences[1] && groupedByOccurrences[1].length === 8) { return true } else if (groupedByOccurrences[3] && groupedByOccurrences[3].length === 1 &&
           groupedByOccurrences[1] && groupedByOccurrences[1].length === 7) { return true }
  return false
}

const checkConsecutivePositions = (firstTen) => {
  // Can only have number in two consecutive positions, never three.
  let recurrence = []

  for (let i = 0; i < firstTen.length; i++) {
    const num = firstTen[i]
    if (recurrence.includes(num)) { recurrence.push(num) } else { recurrence = [num] }

    if (recurrence.length === 3) { return false }
  }

  return true
}

const getChecksum = (steuerId = []) => {
  // Takes in an array of numbers
  const length = steuerId.length

  if (!length) return null

  const n = 11
  const m = 10
  let digit
  let product = m
  let sum

  for (let i = 0; i < length; i++) {
    digit = steuerId[i]
    sum = (digit + product) % m
    if (sum === 0) {
      sum = m
    }
    product = (2 * sum) % n
  }

  const checkDigit = n - product

  return (checkDigit === 10) ? 0 : checkDigit
}

const validate = (steuerId) => {
  // Make sure the steuerId is string then split it into an integer array
  steuerId = steuerId.split('').map(n => parseInt(n, 10))

  // Check that steuerId has exactly 11 digits and does not start with 0
  if (steuerId.length !== 11) { throw new TypeError('`steuerId` must contain exactly 11 digits') }
  if (!areAllNumbers(steuerId)) { throw new TypeError('`steuerId` can not contain non numerical characters') }
  if (steuerId[0] === 0) { return false }

  // Arranges the characters and their occurrences for easier checks.
  const firstTen = steuerId.slice(0, 10)
  const groupedByCharacters = groupByCharacters(firstTen)
  const groupedByOccurrences = groupByNumOfOccurrences(groupedByCharacters)

  // Checks the validaty of the steuerId
  const correct = checkDoubleOrTriple(groupedByOccurrences) && checkConsecutivePositions(firstTen)

  if (correct) {
    // Makes sure that the checksum character also matches.
    const checksum = getChecksum(firstTen)
    if (checksum === getTail(steuerId)) { return true }
  }

  return false
}

module.exports = (steuerId) => {
  if (typeof steuerId !== 'string') {
    throw new TypeError('`steuerId` must be a string')
  }

  return validate(steuerId)
}
