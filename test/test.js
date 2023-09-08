'use strict'
const { generateSteuerId, isSteuerIdValid, isOccurrencesValid, generateUniqueSteuerIds } = require('../dist/main')
const assert = require('assert')

const examples = [
  { steuerId: '26954371827', expected: true },
  { steuerId: '86095742719', expected: true },
  { steuerId: '65929970489', expected: true },

  { steuerId: '65299970480', expected: false },
  { steuerId: '26954371820', expected: false },
  { steuerId: '37505648067', expected: false },
  { steuerId: '11112345678', expected: false },
  { steuerId: '11111345677', expected: false },
  { steuerId: '11111145670', expected: false },
  { steuerId: '11111115672', expected: false },
  { steuerId: '11111111670', expected: false },
  { steuerId: '11111111178', expected: false },
  { steuerId: '11111111119', expected: false },

  // official examples from table 2-1 of https://download.elster.de/download/schnittstellen/Pruefung_der_Steuer_und_Steueridentifikatsnummer.pdf
  { steuerId: '86095742719', expected: true },
  { steuerId: '47036892816', expected: true },
  { steuerId: '65929970489', expected: true },
  { steuerId: '57549285017', expected: true },
  { steuerId: '25768131411', expected: true },
];

describe('isSteuerIdValid function', () => {
  for (const example of examples) {
    it('validates a steuerId ' + example.steuerId + ' and returns ' + example.expected, () => {
      assert.strictEqual(isSteuerIdValid(example.steuerId), example.expected)
    })
  }

  it('returns false if steuerId does not contain 11 digits', () => {
    assert.strictEqual(isSteuerIdValid('26954371'), false)
  })

  it('returns false if steuerId contains non numerical characters', () => {
    assert.strictEqual(isSteuerIdValid('26954371rfe'), false)
  })
});

describe('Generate function', () => {
  it('Is able to generate a number without entering into an infinite loop', () => {
    const generatedTaxID = generateSteuerId()
    assert.deepStrictEqual(typeof generatedTaxID, 'string')
  })

  it('Generates valid tax ids', () => {
    for (let i = 0; i < 10; i++) {
      const generatedTaxID = generateSteuerId()
      assert.deepStrictEqual(isSteuerIdValid(generatedTaxID), true)
    }
  })
})

describe('isOccurrencesValid function returns false on obviously false numbers', () => {
  it('Return false on triplets 10002345671', () => {
    const result = isOccurrencesValid(String(10002345671).split('').map(item => Number(item)))
    assert.deepStrictEqual(result, false)
  })
})

describe('Generate unique tax ids', () => {
  it('Generates the number of tax ids provided', () => {
    const taxIdArray = generateUniqueSteuerIds(2)
    assert.strictEqual(taxIdArray.length, 2)
  })
  it('Generates a unique set of tax ids', () => {
    const taxIdArray = generateUniqueSteuerIds(10)
    const taxIdSet = new Set(taxIdArray)
    assert.strictEqual(taxIdArray.length, taxIdSet.size)
  })
  it('Generates valid tax ids', () => {
    const taxIdArray = generateUniqueSteuerIds(2)
    taxIdArray.forEach((id) => assert.strictEqual(isSteuerIdValid(id), true))
  })
})
