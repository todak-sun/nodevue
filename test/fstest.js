const fs = require('fs');
const util = require('util');

fs.readFile(__dirname + '/test.json', 'utf-8', (err, data) => {
    if (err) return util.error(err);
    util.log("data>>", data);
});

util.log("-----------------------------");
// return;
let data2 = fs.readFileSync(__dirname + '/test.json', 'utf-8');
util.log("data2>>", data2);

util.log("=============================");