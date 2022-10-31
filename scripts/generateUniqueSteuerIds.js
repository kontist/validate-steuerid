const main = require("../dist/main");
console.dir(main.generateUniqueSteuerIds(Number(process.argv[2])), {maxArrayLength: null});
