'use strict'

const assert = require('assert')
const validateSteuerId = require('.')

const examples = [
  { steuerId: '26954371827', expected: true },
  { steuerId: '86095742719', expected: true },
  { steuerId: '65929970489', expected: true },
  { steuerId: '65299970480', expected: false },
  { steuerId: '26954371820', expected: false }
]

for (const example of examples) {
  it('validates a steuerId successfully', () => {
    assert.strictEqual(validateSteuerId(example.steuerId), example.expected)
  })
}

it('throws an error if steuerId is not a string', () => {
  assert.throws(() => validateSteuerId(65299970480), {
    name: 'TypeError',
    message: '`steuerId` must be a string'
  })
})

it('throws an error if steuerId does not contain 11 digits', () => {
  assert.throws(() => validateSteuerId('26954371'), {
    name: 'TypeError',
    message: '`steuerId` must contain exactly 11 digits'
  })
})

it('throws an error if steuerId contains non numerical characters', () => {
  assert.throws(() => validateSteuerId('26954371rfe'), {
    name: 'TypeError',
    message: '`steuerId` can not contain non numerical characters'
  })
})
