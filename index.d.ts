declare namespace validateSteuerId {
  // See https://github.com/typescript-eslint/typescript-eslint/issues/2867.
}

// See https://github.com/typescript-eslint/typescript-eslint/issues/1856.
// eslint-disable-next-line no-redeclare
declare const validateSteuerId: (
  /**
  Normalize a German tax number (*Steuernummer*) to the national format

  @param steuerId
  @returns Boolean value stating the validity of the given number

  @example
  ```
  import validateSteuerId = require('normalize-steuernummer')

  validateSteuerId('65299970480')
  ```
  */
  steuerId: string
) => boolean

export = validateSteuerId
