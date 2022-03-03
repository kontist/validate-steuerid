'use strict'

const areAllNumbers = (arr: number[]) => {
  return arr.reduce(function (a, b) {
    return a && typeof b === 'number' && !isNaN(b)
  }, true);
}

const getTail = (arr: number[]) => {
  const lastIndex = arr.length - 1;
  return lastIndex >= 0 ? arr[lastIndex] : null;
}

const getNumOccurencesMap = (arr: number[]) => {
  const map = {};
  arr.forEach((num: number) => {
    if (!(num in map)) {
      map[num] = 1;
    } else {
      map[num] += 1;
    }
  });
  return map;
}

const groupByNumOfOccurrences = (map: Object) => {
  const result = {};
  for (const key in map) {
    const numOfOccurrence = map[key];
    if (result[numOfOccurrence] === undefined) {
      result[numOfOccurrence] = [key];
    } else {
      result[numOfOccurrence] = [...result[numOfOccurrence], key];
    }
  }
  return result;
}

// has to have either one double digit OR one triple digit, never both.
const checkDoubleOrTriple = (groupedByOccurrences = {}) => {
  let num2or3occurences = 0;

  for (const key in groupedByOccurrences) {
    const occurrence = parseInt(key);

    // if there is more than 1 2or3 occurrences return false
    if (occurrence >= 2) {
      num2or3occurences++;
    }

    if (num2or3occurences > 1) {
      return false;
    }
  }

  return true;
}

// Can only have number in two consecutive positions, never three.
const checkConsecutivePositions = (firstTen: number[]) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return !(firstTen.find((item, index, array) => (item === array[index - 1] && item === array[index - 2])));
}

const getChecksum = (steuerId: number[]) => {
  // Takes in an array of numbers
  const length = steuerId.length

  if (length === 0 || length === undefined || isNaN(length)) return null

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

export function isOccurencesValid(digits: number[]) {
  const groupedByCharacters = getNumOccurencesMap(digits);
  const groupedByOccurrences = groupByNumOfOccurrences(groupedByCharacters);
  let validConsecutive = true;

  if ('3' in groupedByOccurrences) {
    validConsecutive = checkConsecutivePositions(digits);
  }

  return checkDoubleOrTriple(groupedByOccurrences) && validConsecutive;
}

export function validateSteuerId(steuerId: String): boolean {
  if (typeof steuerId !== 'string') {
    throw new TypeError('`steuerId` must be a string');
  }

  // Make sure the steuerId is string then split it into an integer array
  let steuerIdArr = steuerId.split('').map(n => parseInt(n, 10));

  // Check that steuerId has exactly 11 digits and does not start with 0
  if (steuerId.length !== 11) {
    throw new TypeError('`steuerId` must contain exactly 11 digits');
  }
  if (!areAllNumbers(steuerIdArr)) {
    throw new TypeError('`steuerId` can not contain non numerical characters');
  }
  if (steuerIdArr[0] === 0) {
    return false;
  }

  // Arranges the characters and their occurrences for easier checks.
  const firstTen = steuerIdArr.slice(0, 10);
  // Checks the validaty of the steuerId
  const correct = isOccurencesValid(firstTen);

  if (correct) {
    // Makes sure that the checksum character also matches.
    const checksum = getChecksum(firstTen);
    if (checksum === getTail(steuerIdArr)) {
      return true;
    }
  }

  return false;
}

/*
The first number is not 0
In the first 10 digits there is exactly one number double or triple
If there are 3 same numbers at the position 1 to 10 those double numbers could never be consecutive
 */
export function generateSteuerId(): string {
  let digits: number[];
  digits = [];
  // does not start with a 0
  const digit = Math.round((Math.random() * 8) + 1);
  digits.push(digit);

  let candidate: number[];
  candidate = [];

  while (digits.length < 10) {
    let isValidDigit = false;
    let candidateDigit: number;
    while (!isValidDigit) {
      candidateDigit = Math.round(Math.random() * 9)
      candidate = [...digits, candidateDigit]
      if (isOccurencesValid(candidate)) {
        isValidDigit = true;
      }
    }
    digits = [...candidate];
  }

  return digits.join('') + String(getChecksum(digits))
}
