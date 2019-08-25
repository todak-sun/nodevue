const ogs = require('open-graph-scraper'),
    HashMap = require('hashmap'),
    Crypto = require('crypto-js'),
    SHA256 = require('crypto-js/sha256'),
    KEY = "nodevue";

//복호화 할 때 필요한 키 정의.
module.exports = {
    encrpytSha2(data, key) {
        if (!data) return null;
        key = key || KEY;

        try {
            return Crypto.SHA256(data + key).toString();
        } catch (Err) {

        }
    },
    encrypt(data, key) {
        return Crypto.AES.encrypt(data, key || KEY).toString();
    },
    decrpyt(data, key) {
        return Crypto.AES.decrypt(data, key || KEY).toString(Crypto.enc.Utf8);
    },
    ogsinfo(url, fn) {
        return ogs({
            url: url
        }, (error, result) => {
            fn(error, result);
        });
    }

}