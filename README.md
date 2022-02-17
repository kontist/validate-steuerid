# Description
> Package to validate German tax ID / steuer ID

# Installation
``` 
npm install validate-steuer-id
```

# Usage

```js
const validateSteuerId = require('validate-steuer-id')

validateSteuerId('65299970480')
// => false

validateSteuerId('65929970489')
// => true

validateSteuerId('26954371827')
// => true
```

# Parameters
## validateSteuerId(steuerId)
### steuerId
type: `string`

# References
For developing the algorithm, we referenced the European Commission's TIN check modules stated [here](https://ec.europa.eu/taxation_customs/tin/#/check-tin).
