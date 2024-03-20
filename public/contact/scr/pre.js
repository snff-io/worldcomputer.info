#!/usr/bin/node
// Path: public/scr/pre.js
const fs = require("fs")
const sha256 = require("./sha256-node.js")
const terser = require("terser");


function pre_index() {
    fs.copyFileSync("../index.pre.html", "../index.html")
    fs.copyFileSync("../index.html", "../index.html.bak")
}

function inline_ids() {
    var script_content = fs.readFileSync("./ids.js", "utf8");
    script_content = terser.minify(script_content).then(function (result) {
        var file = fs.readFileSync("../index.html", "utf8")
            .replace(/<!--identity_data_placeholder-->/, result.code);
        fs.writeFileSync("../index.html", file);
    });
}

function sha256_ids() {
    var script_content = fs.readFileSync("./ids.js", "utf8");
    script_content = terser.minify(script_content).then(function (result) {
        var sha = sha256(result.code);

        var file = fs.readFileSync("../index.html", "utf8")
            .replace(/<td class="hashvalue" id="sdh"><\/td>/, '<td class="hashvalue" id="sdh">' + sha + '<\/td>')

        fs.writeFileSync("../index.html", file);
    });
}

function inline_sha256() {
    var script_content = fs.readFileSync("./sha256.js", "utf8")
    terser.minify(script_content).then(function (result) {
        var file = fs.readFileSync("../index.html", "utf8")
            .replace(/\/\/sha256_placeholder/, result.code)
            .replace(/^\s*#!.*/gm, "");
        fs.writeFileSync("../index.html", file);
    });
}

function inline_spk() {
    var content = fs.readFileSync("./pubkey.asc", "utf8");
    var file = fs.readFileSync("../index.html", "utf8")
        .replace(/<!--spk_ph-->/, content.replace(/</,"[").replace(/>/,"]") );
    fs.writeFileSync("../index.html", file);
}

pre_index();
sha256_ids();
inline_ids();
inline_sha256();
inline_spk();