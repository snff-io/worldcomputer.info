#!/usr/bin/node
// Path: public/scripts/sha256-node.js
const sha256 = require('./sha256.js');
module.exports = sha256

console.log(sha256(process.argv[1]))