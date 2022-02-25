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

const getNumOccurencesMap = (arr = []) => {
  console.debug('Array to group: ', arr)
  const map = {}
  arr.forEach(num => {
    if (!(num in map)) {
      map[num] = 1
    } else {
      map[num] += 1
    }
  })
  console.debug('Number of occurrences: ', map)
  return map
}

const groupByNumOfOccurrences = (map = {}) => {
  const result = {}
  for (const key in map) {
    const numOfOccurrence = map[key]
    if (result[numOfOccurrence] === undefined) {
      result[numOfOccurrence] = [key]
    } else {
      result[numOfOccurrence] = [...result[numOfOccurrence], key]
    }
  }
  console.debug('Result of grouping by num of occurrences:', result)
  return result
}

const checkDoubleOrTriple = (groupedByOccurrences) => {
  // has to have either one double digit OR one triple digit, never both.
  if (groupedByOccurrences[2] && groupedByOccurrences[2].length === 1 &&
    groupedByOccurrences[1] && groupedByOccurrences[1].length === 8) {
    return true
  } else if (groupedByOccurrences[3] && groupedByOccurrences[3].length === 1 &&
    groupedByOccurrences[1] && groupedByOccurrences[1].length === 7) {
    return true
  }
  return false
}

const checkConsecutivePositions = (firstTen) => {
  // Can only have number in two consecutive positions, never three.
  let recurrence = []

  for (let i = 0; i < firstTen.length; i++) {
    const num = firstTen[i]
    if (recurrence.includes(num)) {
      recurrence.push(num)
    } else {
      recurrence = [num]
    }

    if (recurrence.length === 3) {
      return false
    }
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

export function validate (steuerId) {
  if (typeof steuerId !== 'string') {
    throw new TypeError('`steuerId` must be a string')
  }

  // Make sure the steuerId is string then split it into an integer array
  steuerId = steuerId.split('').map(n => parseInt(n, 10))

  // Check that steuerId has exactly 11 digits and does not start with 0
  if (steuerId.length !== 11) {
    throw new TypeError('`steuerId` must contain exactly 11 digits')
  }
  if (!areAllNumbers(steuerId)) {
    throw new TypeError('`steuerId` can not contain non numerical characters')
  }
  if (steuerId[0] === 0) {
    return false
  }

  // Arranges the characters and their occurrences for easier checks.
  const firstTen = steuerId.slice(0, 10)
  const groupedByCharacters = getNumOccurencesMap(firstTen)
  const groupedByOccurrences = groupByNumOfOccurrences(groupedByCharacters)

  // Checks the validaty of the steuerId
  const correct = checkDoubleOrTriple(groupedByOccurrences) && checkConsecutivePositions(firstTen)

  if (correct) {
    // Makes sure that the checksum character also matches.
    const checksum = getChecksum(firstTen)
    if (checksum === getTail(steuerId)) {
      return true
    }
  }

  return false
}

export function isOccurencesValid (digits) {
  const occurences = new Map()
  digits.forEach((item) => {
    if (occurences.get(item) === undefined) {
      occurences.set(item, 1)
    } else {
      occurences.set(item, occurences.get(item) + 1)
    }
  })
  console.debug('Occurences: ', occurences)
  let num2or3occurences = 0

  for (const [, value] of occurences) {
    console.debug('Value is:', value)
    // if any digit occurred 4 or more times, return false
    if (value >= 4) {
      console.debug('Found a 4 or more occurences in:', digits)
      return false
    }
    // if there is more than 1 2or3 occurrences return false
    if (value === 2 || value === 3) {
      num2or3occurences++
    }
    if (num2or3occurences > 1) {
      console.debug('Found more than 1 amount of 2 or three occurences is more than one:', num2or3occurences)
      return false
    }

    if (value === 3) {
      const triplet = digits.find((item, index, array) => (item === array[index - 1] && item === array[index - 2]))
      if (triplet) {
        console.debug('Triplet found ', triplet)
        return false
      }
    }
  }
  console.debug('Occurrences are valid: ', occurences)
  return true
}

/*
The first number is not 0
In the first 10 digits there is exactly one number double or triple
If there are 3 same numbers at the position 1 to 10 those double numbers could never be consecutive
 */
export function generate () {
  let digits = []
  // does not start with a 0
  const digit = Math.round((Math.random() * 8) + 1)
  digits.push(digit)

  let candidate = []
  while (digits.length < 10) {
    // console.debug('digit length is less than 10')

    let isValidDigit = false
    let candidateDigit
    while (!isValidDigit) {
      candidateDigit = Math.round(Math.random() * 9)
      candidate = [...digits, candidateDigit]
      console.debug('Candidate is: ', candidate)
      if (isOccurencesValid(candidate)) {
        isValidDigit = true
      }
    }
    digits = [...candidate]
  }

  return digits.join('') + String(getChecksum(digits))
}
