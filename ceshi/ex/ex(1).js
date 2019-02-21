const ckMnemonic = require("bitcore-mnemonic")
const CryptoJS = require("crypto-js")
const EC = require("elliptic").ec
const ecc = require("eosjs-ecc")

var mn = 'donate ski absorb remove blame hire toddler insect novel spawn today orbit'
var code = new Mnemonic(mn)

// EVT
var evtkey = code.toHDPrivateKey().derive("m/44'/207'/0'/0").derive(0).privateKey.toWIF()
console.log(evtkey)
console.log("EVT address:","EVT"+ecc.privateToPublic(evtkey).substr(3))
