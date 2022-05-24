//
// global.message = "안녕하시오";
//
// console.log(global);
//

// console.log(this);
// console.log(this === exports);
// console.log(this === module.exports);

const path = require('path');
const basepath = path.basename(__filename);
console.log(basepath);
console.log(path.basename(__dirname));
