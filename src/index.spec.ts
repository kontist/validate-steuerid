'use strict'
import { generate, validate, isOccurencesValid } from './index'
import * as assert from 'assert'

const examples = [
  { steuerId: '26954371827', expected: true },
  { steuerId: '86095742719', expected: true },
  { steuerId: '65929970489', expected: true },
  { steuerId: '65299970480', expected: false },
  { steuerId: '26954371820', expected: false }
]

for (const example of examples) {
  it('validates a steuerId successfully', () => {
    assert.strictEqual(validate(example.steuerId), example.expected)
  })
}

it('throws an error if steuerId is not a string', () => {
  assert.throws(() => validate(65299970480), {
    name: 'TypeError',
    message: '`steuerId` must be a string'
  })
})

it('throws an error if steuerId does not contain 11 digits', () => {
  assert.throws(() => validate('26954371'), {
    name: 'TypeError',
    message: '`steuerId` must contain exactly 11 digits'
  })
})

it('throws an error if steuerId contains non numerical characters', () => {
  assert.throws(() => validate('26954371rfe'), {
    name: 'TypeError',
    message: '`steuerId` can not contain non numerical characters'
  })
})

describe('Generate function', () => {
  it('Is able to generate a number without entering into an infinite loop', () => {
    const generatedTaxID = generate()
    console.debug('Generated TaxID: ', generatedTaxID)
    assert.deepStrictEqual(typeof generatedTaxID, 'string')
  })

  it('Generates valid tax ids', () => {
    for (let i = 0; i < 10; i++) {
      const generatedTaxID = generate()
      console.debug('Generated TaxID: ', generatedTaxID)
      assert.deepStrictEqual(validate(String(generatedTaxID)), true)
    }
  })
})

describe('isOccurencesValid function returs false on obviously false numbers', () => {
  it('Return false on triplets 10002345671', () => {
    const result = isOccurencesValid(String(10002345671).split(''))
    assert.deepStrictEqual(result, false)
  })
})
