const util = require('util');
const utils = require('../utils');

let str = "NodeJS";
let enc = utils.encrypt(str);
util.log("enc = ", enc);
let dec = utils.decrpyt(enc);
util.log("dec = ", dec);
let enc2 = utils.encrpytSha2(str);
util.log("enc2 = ", enc2);
return;

let url = "https://www.naver.com";

utils.ogsinfo(url, (error, result) => {
    util.log(error, result);
});