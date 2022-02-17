import { expectType, expectError } from 'tsd'
import validateSteuerId = require('.')

expectType<boolean>(validateSteuerId('65299970480'))
expectError(validateSteuerId(65299970480))
